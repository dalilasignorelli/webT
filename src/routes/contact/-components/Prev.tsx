import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSiteSettings } from "@/lib/site-settings";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState } from "react";

type PreventivoFormProps = {
  onSubmit: (data: { impianto: string; dimensione: string; intervento: string }) => void;
  onCancel?: () => void;
};

export function PreventivoForm({ onSubmit, onCancel }: PreventivoFormProps) {
  const { language } = useSiteSettings();
  const isEnglish = language === "en";
  const [impianto, setImpianto] = useState("");
  const [dimensione, setDimensione] = useState("");
  const [intervento, setIntervento] = useState(""); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!impianto || !dimensione || !intervento) {
      alert(isEnglish ? "Please fill in all fields" : "Per favore, compila tutti i campi");
      return;
    }
    onSubmit({ impianto, dimensione, intervento });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-md border p-4 dark:border-slate-700">
      <h3 className="mb-2 text-lg font-semibold">{isEnglish ? "Quote Details" : "Dettagli Preventivo"}</h3>
      
      <div>
        <Label htmlFor="impianto" className="mb-1 block font-medium">{isEnglish ? "System Type" : "Tipo di impianto"}</Label>
        <Input
          id="impianto"
          type="text"
          value={impianto}
          onChange={(e) => setImpianto(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder={isEnglish ? "E.g. Boiler - Air conditioner" : "Es. Caldaia - Condizionatore"}
          required
        />
      </div>

      <div>
        <Label htmlFor="dimensione" className="mb-1 block font-medium">{isEnglish ? "Property Size" : "Dimensione dell'abitazione"}</Label>
        <Input
          id="dimensione"
          type="text"
          value={dimensione}
          onChange={(e) => setDimensione(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          placeholder={isEnglish ? "E.g. 120 m²" : "Es. 120 m²"}
          required
        />
      </div>

    <div>
        <Label htmlFor="intervento">{isEnglish ? "Intervention Type *" : "Tipo di Intervento *"}</Label>
        <Select
          value={intervento}
          onValueChange={setIntervento}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={isEnglish ? "Select intervention type" : "Seleziona tipo intervento"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{isEnglish ? "Available Interventions" : "Interventi Disponibili"}</SelectLabel>
              <SelectItem value="installazione">{isEnglish ? "Installation" : "Installazione"}</SelectItem>
              <SelectItem value="riparazione">{isEnglish ? "Repair" : "Riparazione"}</SelectItem>
              <SelectItem value="manutenzione">{isEnglish ? "Maintenance" : "Manutenzione"}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex space-x-4">
        <Button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEnglish ? "Send Quote Request" : "Invia Preventivo"}
        </Button>
        {onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            {isEnglish ? "Cancel" : "Annulla"}
          </Button>
        )}
      </div>
    </form>
  );
}
