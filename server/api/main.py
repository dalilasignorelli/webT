import os
import re
import smtplib
import ssl
from email.message import EmailMessage
from enum import Enum

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

load_dotenv()

app = FastAPI()


def parse_bool(value: str | None, default: bool) -> bool:
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


frontend_origins = [
    origin.strip()
    for origin in os.getenv("FRONTEND_ORIGINS", "http://localhost:5173,http://localhost:5174").split(",")
    if origin.strip()
]

contact_to_email = os.getenv("CONTACT_TO_EMAIL", "signo.carlo@alice.it")

app.add_middleware(
    CORSMiddleware,
    allow_origins=frontend_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ContactStatus(str, Enum):
    initial = "initial"
    awaiting_details = "awaiting_details"


def sanitize_email(email: str) -> str:
    email = email.replace('\n', '').replace('\r', '')
    pattern = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"
    if not re.match(pattern, email):
        raise ValueError("Email non valida")
    return email

class AIResponse(BaseModel):
    reply: str
    category: str
    priority: str
    next_step: str

class ContactForm(BaseModel):
    name: str
    email: str
    phone: str | None = None
    service: str | None = None
    message: str
    status: ContactStatus = ContactStatus.initial
    impianto: str | None = None
    dimensione: str | None = None
    intervento: str | None = None


def sanitize_text(value: str | None, fallback: str = "-") -> str:
    if value is None:
      return fallback
    cleaned = value.strip()
    return cleaned or fallback


def get_smtp_settings() -> dict[str, str | int | bool]:
    settings = {
        "host": os.getenv("SMTP_HOST", "").strip(),
        "port": int(os.getenv("SMTP_PORT", "587")),
        "username": os.getenv("SMTP_USERNAME", "").strip(),
        "password": os.getenv("SMTP_PASSWORD", "").strip(),
        "from_email": os.getenv("SMTP_FROM", "").strip(),
        "use_starttls": parse_bool(os.getenv("SMTP_USE_STARTTLS"), True),
        "use_ssl": parse_bool(os.getenv("SMTP_USE_SSL"), False),
    }

    missing = [
        key
        for key in ("host", "username", "password", "from_email")
        if not settings[key]
    ]
    if missing:
        missing_fields = ", ".join(missing)
        raise HTTPException(
            status_code=500,
            detail=f"Configurazione email mancante nel backend: {missing_fields}",
        )

    return settings


def build_email_subject(form: ContactForm, ai_response: AIResponse) -> str:
    service_label = sanitize_text(form.service, "contatto generico")
    if form.status == ContactStatus.awaiting_details:
        return f"Aggiornamento preventivo sito - {service_label}"
    return f"Nuovo messaggio dal sito - {service_label}"


def build_email_body(form: ContactForm) -> str:
    lines = [
        "Nuova richiesta inviata dal sito web.",
        "",
        "Dati cliente:",
        f"- Nome: {sanitize_text(form.name)}",
        f"- Email: {sanitize_text(form.email)}",
        f"- Telefono: {sanitize_text(form.phone)}",
        f"- Servizio: {sanitize_text(form.service)}",
        f"- Stato richiesta: {form.status.value}",
        "",
        "Messaggio:",
        sanitize_text(form.message),
    ]

    if form.status == ContactStatus.awaiting_details:
        lines.extend(
            [
                "",
                "Dettagli preventivo:",
                f"- Impianto: {sanitize_text(form.impianto)}",
                f"- Dimensione: {sanitize_text(form.dimensione)}",
                f"- Intervento: {sanitize_text(form.intervento)}",
            ]
        )

    return "\n".join(lines)


def send_contact_email(form: ContactForm, ai_response: AIResponse) -> None:
    smtp_settings = get_smtp_settings()
    recipient = sanitize_email(contact_to_email)
    reply_to = sanitize_email(form.email)

    message = EmailMessage()
    message["Subject"] = build_email_subject(form, ai_response)
    message["From"] = str(smtp_settings["from_email"])
    message["To"] = recipient
    message["Reply-To"] = reply_to
    message.set_content(build_email_body(form))

    try:
        if smtp_settings["use_ssl"]:
            with smtplib.SMTP_SSL(
                str(smtp_settings["host"]),
                int(smtp_settings["port"]),
                context=ssl.create_default_context(),
                timeout=20,
            ) as server:
                server.login(str(smtp_settings["username"]), str(smtp_settings["password"]))
                server.send_message(message)
            return

        with smtplib.SMTP(str(smtp_settings["host"]), int(smtp_settings["port"]), timeout=20) as server:
            server.ehlo()
            if smtp_settings["use_starttls"]:
                server.starttls(context=ssl.create_default_context())
                server.ehlo()
            server.login(str(smtp_settings["username"]), str(smtp_settings["password"]))
            server.send_message(message)
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Invio email fallito: {exc}") from exc


def ai_analyze(form: ContactForm) -> AIResponse:
    msg = form.message.lower()

    if any(word in msg for word in ["gas", "perdita", "allagamento", "non funziona", "incendio", "rischio"]):
        return AIResponse(
            reply=(
                "Grazie per averci contattato.\n"
                "Da quanto descrivi sembra una situazione urgente.\n"
                "Se c'è rischio immediato, ti consigliamo di chiamarci subito."
            ),
            category="emergenza",
            priority="alta",
            next_step="call"
        )

    # Se siamo ancora allo step iniziale, chiediamo dettagli preventivo
    if form.status == ContactStatus.initial:
        if "preventivo" in msg or "costo" in msg:
            return AIResponse(
                reply=(
                    "Perfetto 😊\n"
                    "Per preparare un preventivo ho bisogno di qualche dettaglio:\n"
                    "- tipo di impianto\n"
                    "- dimensione dell'abitazione\n"
                    "- tipo di intervento"
                ),
                category="preventivo",
                priority="media",
                next_step="awaiting_details"
            )

    # Se invece lo status dice che siamo in attesa di dettagli, li usiamo per fare il preventivo
    if form.status == ContactStatus.awaiting_details:
        if form.intervento == "installazione":
            reply_text = (
                f"Grazie per le informazioni:\n"
                f"- Impianto: {form.impianto}\n"
                f"- Dimensione: {form.dimensione}\n"
                f"- Intervento: Installazione\n\n"
                "Il costo stimato per l'installazione è di circa 1500€."
            )
        elif form.intervento == "riparazione":
            reply_text = (
                f"Grazie per le informazioni:\n"
                f"- Impianto: {form.impianto}\n"
                f"- Dimensione: {form.dimensione}\n"
                f"- Intervento: Riparazione\n\n"
                "Il costo stimato per la riparazione è di circa 900€."
            )
        elif form.intervento == "manutenzione":
            reply_text = (
                f"Grazie per le informazioni:\n"
                f"- Impianto: {form.impianto}\n"
                f"- Dimensione: {form.dimensione}\n"
                f"- Intervento: Manutenzione\n\n"
                "Il costo stimato per la manutenzione è di circa 400€."
            )
        else:
            reply_text = (
                f"Grazie per le informazioni:\n"
                f"- Impianto: {form.impianto}\n"
                f"- Dimensione: {form.dimensione}\n"
                "Ti confermo che il preventivo stimato è di circa 1200€."
            )
        return AIResponse(
            reply=reply_text,
            category="preventivo",
            priority="media",
            next_step="close"
        )



    return AIResponse(
        reply="Grazie per il messaggio! La richiesta e stata inoltrata e riceverai risposta al piu presto.",
        category="info",
        priority="bassa",
        next_step="close"
    )


@app.post("/api/contact")
def contact(form: ContactForm):
    clean_name = form.name.strip()
    if not clean_name:
        raise HTTPException(status_code=400, detail="Nome non valido")

    try:
        clean_email = sanitize_email(form.email)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    sanitized_form = form.model_copy(
        update={
            "name": clean_name,
            "email": clean_email,
            "phone": sanitize_text(form.phone),
            "service": sanitize_text(form.service),
            "message": form.message.strip(),
            "impianto": sanitize_text(form.impianto),
            "dimensione": sanitize_text(form.dimensione),
            "intervento": sanitize_text(form.intervento),
        }
    )

    ai_response = ai_analyze(form)
    send_contact_email(sanitized_form, ai_response)

    return {
        "success": True,
        "reply": ai_response.reply,
        "category": ai_response.category,
        "priority": ai_response.priority,
        "next_step": ai_response.next_step,
        "email_sent": True,
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

