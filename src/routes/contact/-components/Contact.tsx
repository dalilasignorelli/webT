import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { Phone, Mail, MapPin, Clock, Send, Wrench } from 'lucide-react';
import { useState } from 'react';
import { PreventivoForm } from './Prev';
import { useSiteSettings } from '@/lib/site-settings';

export function ContactPage() {
  const { language } = useSiteSettings();
  const isEnglish = language === 'en';
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    status: 'initial',
  });

const [aiReply, setAiReply] = useState<string | null>(null);
const [nextStep, setNextStep] = useState<string | null>(null);
const [, setPriority] = useState<string | null>(null);
const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setAiReply(null);

  try {
    const res = await fetch(`${apiBaseUrl}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.detail || (isEnglish ? 'Sending error' : 'Errore invio'));

    setAiReply(data.reply);
    setNextStep(data.next_step);
    setPriority(data.priority);

  } catch (err) {
    console.error(err);
    alert(err instanceof Error ? err.message : (isEnglish ? "Error while sending" : "Errore durante l’invio"));
  } finally {
    setLoading(false);
  }
};


const handlePreventivoSubmit = async (details: { impianto: string; dimensione: string; intervento: string }) => {
  setLoading(true);
  try {
    const res = await fetch(`${apiBaseUrl}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        ...formData, 
        ...details,
        status: 'awaiting_details'
      }),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.detail || (isEnglish ? 'Quote sending error' : 'Errore invio preventivo'));

    setAiReply(data.reply);
    
    // Mostra il messaggio del preventivo e chiudi il form
    if (data.next_step === 'close') {
      setNextStep(null);
      setFormData(prev => ({ ...prev, status: 'initial' }));
    } else {
      setNextStep(data.next_step);  // nel caso serva altro step
    }

  } catch (error) {
    alert(error instanceof Error ? error.message : (isEnglish ? "Error while sending the quote request" : "Errore durante l’invio del preventivo"));
  } finally {
    setLoading(false);
  }
};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: isEnglish ? 'Appointments' : 'Appuntamenti',
      details: ['035952111'],
      link: 'tel:035952111',
    },
    {
      icon: Phone,
      title: isEnglish ? 'Mobile' : 'Cellulare',
      details: ['+39 334 110 78 79'],
      link: 'tel:+393341107879',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['signo.carlo@alice.it'],
      link: 'mailto:signo.carlo@alice.it',
    },
    {
      icon: MapPin,
      title: isEnglish ? 'Address' : 'Indirizzo',
      details: ['Via Giovanni Verga 11', '24060 Montello, Bergamo'],
      link: null,
    },
    {
      icon: Clock,
      title: isEnglish ? 'Hours' : 'Orari',
      details: isEnglish ? ['Mon-Fri: 8:00-18:00', 'Sat: 8:00-12:00'] : ['Lun-Ven: 8:00-18:00', 'Sab: 8:00-12:00'],
      link: null,
    },
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="mb-4">{isEnglish ? 'Contact Us' : 'Contattaci'}</h1>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-slate-300">
            {isEnglish
              ? 'We are available for any information or for a free quote'
              : 'Siamo a tua disposizione per qualsiasi informazione o per un preventivo gratuito'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-200">
                    <info.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="mb-2">{info.title}</h3>
                    {info.link ? (
                      <a href={info.link} className="text-gray-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-200">
                        {info.details.map((detail, i) => (
                          <p key={i}>{detail}</p>
                        ))}
                      </a>
                    ) : (
                      <div className="text-gray-600 dark:text-slate-300">
                        {info.details.map((detail, i) => (
                          <p key={i}>{detail}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* AI Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 dark:border-slate-800 dark:bg-slate-900">
              <h2 className="mb-6">{isEnglish ? 'Request Information' : 'Richiedi Informazioni'}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">{isEnglish ? 'Name *' : 'Nome *'}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={isEnglish ? 'Your full name' : 'Il tuo nome e cognome'}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder={isEnglish ? 'your@email.com' : 'tuamail@esempio.it'}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">{isEnglish ? 'Phone' : 'Telefono'}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={isEnglish ? 'Optional phone number' : 'Numero di telefono facoltativo'}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">{isEnglish ? 'Service Type' : 'Tipo di Servizio'}</Label>
                  <Select 
                    value={formData.service} 
                    onValueChange={(value) =>
                        handleChange({
                            target: { name: 'service', value },
                        } as React.ChangeEvent<HTMLInputElement>)}>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder={isEnglish ? 'Select a service' : 'Seleziona un servizio'} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>{isEnglish ? 'Available Services' : 'Servizi Disponibili'}</SelectLabel>
                                <SelectItem value="caldaie">{isEnglish ? 'Boilers' : 'Caldaie'}</SelectItem>
                                <SelectItem value="idraulica">{isEnglish ? 'Plumbing Systems' : 'Impianti Idraulici'}</SelectItem>
                                <SelectItem value="riparazione">{isEnglish ? 'Repair' : 'Riparazione'}</SelectItem>
                                <SelectItem value="manutenzione">{isEnglish ? 'Maintenance' : 'Manutenzione'}</SelectItem>
                                <SelectItem value="altro">{isEnglish ? 'Other' : 'Altro'}</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{isEnglish ? 'Message *' : 'Messaggio *'}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder={isEnglish
                      ? "Briefly describe your request"
                      : "Descrivi brevemente la tua richiesta"}
                    rows={5}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  {isEnglish ? 'Send Request' : 'Invia Richiesta'}
                </Button>
              </form>
              
              {loading && (
                <div className="text-center text-gray-500 dark:text-slate-400">
                  {isEnglish ? 'The assistant is analyzing your request...' : 'L’assistente sta analizzando la richiesta...'}
                </div>
              )}
              
              {aiReply && (
                <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900 dark:bg-blue-950/40">
                  <p className="mb-2 font-semibold">{isEnglish ? 'Virtual assistant' : 'Assistente virtuale'}</p>
                  <p className="whitespace-pre-line text-gray-700 dark:text-slate-200">{aiReply}</p>
                  {nextStep === 'close' && (
                    <p className="mt-3 text-sm text-blue-800 dark:text-blue-200">
                      {isEnglish
                        ? 'The request has also been forwarded by email to the business mailbox.'
                        : 'La richiesta è stata inoltrata anche via email alla casella dell\'attività.'}
                    </p>
                  )}
                </div>
              )}
              
              {nextStep === "awaiting_details" && (
                <PreventivoForm
                onSubmit={handlePreventivoSubmit}
                onCancel={() => setNextStep(null)}/>
              )}
              
              {nextStep === "call" && (
                <div className="mt-4 text-center">
                  <a
                  href="tel:+393341107879"
                  className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
                  >
                    <Phone className="w-5 h-5" />
                    {isEnglish ? 'Call Now' : 'Chiama Subito'}
                  </a>
                </div>
              )}

            </Card>
          </div>
        </div>


        {/* Emergency CTA */}
        <Card className="mt-8 border-blue-200 bg-blue-50 p-8 dark:border-blue-900 dark:bg-blue-950/40">
          <div className="text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-200">
              <Phone className="w-8 h-8" />
            </div>
            <h2 className="mb-2 text-blue-900 dark:text-blue-100">{isEnglish ? 'Need Help?' : 'Hai Bisogno di Aiuto?'}</h2>
            <p className="mb-6 text-blue-800 dark:text-blue-200">
              {isEnglish ? 'Call us to receive immediate assistance' : 'Contattaci telefonicamente per ricevere assistenza immediata'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
              href="tel:035952111" 
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Phone className="w-5 h-5" />
              {isEnglish ? 'Call Now: 035 952111' : 'Chiama Ora: 035 952111'}
            </a>
            <a 
              href="tel:+393341107879" 
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Wrench className="w-5 h-5" />
              {isEnglish ? 'Call Now: +39 334 110 7879' : 'Chiama Ora: +39 334 110 7879'}
            </a>
          </div>
          </div>
        </Card>
      </div>
    </div>
  );
}