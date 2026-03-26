import { Card } from '@/components/ui/card';
import { Award, Users, Clock, CheckCircle } from 'lucide-react';
import { useSiteSettings } from '@/lib/site-settings';

export function AboutPage() {
  const { language } = useSiteSettings();
  const isEnglish = language === 'en';

  const stats = [
    { icon: Clock, value: '30+', label: isEnglish ? 'Years of Experience' : 'Anni di Esperienza' },
    { icon: Users, value: '1000+', label: isEnglish ? 'Satisfied Clients' : 'Clienti Soddisfatti' },
    { icon: Award, value: '100%', label: isEnglish ? 'Guaranteed Work' : 'Lavori Garantiti' },
    { icon: CheckCircle, value: isEnglish ? 'Always' : 'Sempre', label: isEnglish ? 'Available' : 'Disponibili' },
  ];

  const values = [
    {
      title: isEnglish ? 'Professionalism' : 'Professionalità',
      description: isEnglish
        ? 'Qualified technicians constantly updated on the latest technologies'
        : 'Tecnici qualificati e costantemente aggiornati sulle nuove tecnologie',
    },
    {
      title: isEnglish ? 'Reliability' : 'Affidabilità',
      description: isEnglish
        ? 'Punctual service and full respect for every commitment made'
        : 'Puntualità negli interventi e rispetto degli impegni presi',
    },
    {
      title: isEnglish ? 'Quality' : 'Qualità',
      description: isEnglish
        ? 'Certified materials and top brands from the industry'
        : 'Utilizzo di materiali certificati e delle migliori marche del settore',
    },
    {
      title: isEnglish ? 'Transparency' : 'Trasparenza',
      description: isEnglish
        ? 'Clear and detailed quotes, with no surprises or hidden costs'
        : 'Preventivi chiari e dettagliati, senza sorprese o costi nascosti',
    },
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="mb-4">{isEnglish ? 'About Us' : 'Chi Siamo'}</h1>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-slate-300">
            {isEnglish
              ? 'Our experience and passion serving your comfort'
              : 'La nostra esperienza e passione al servizio del tuo comfort'}
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="p-8 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="mb-6">{isEnglish ? 'Our Story' : 'La Nostra Storia'}</h2>
            <div className="space-y-4 text-gray-600 dark:text-slate-300">
              <p>
                {isEnglish
                  ? 'Termoidraulica Signorelli was founded more than 30 years ago from the passion and dedication of heating and plumbing professionals. Since then, we have built our reputation by delivering high-quality service and reliable customer support.'
                  : 'Termoidraulica Signorelli nasce oltre 30 anni fa dalla passione e dalla dedizione di professionisti del settore termoidraulico. Da allora, abbiamo costruito la nostra reputazione offrendo servizi di qualità superiore e un\'assistenza clienti impeccabile.'}
              </p>
              <p>
                {isEnglish
                  ? 'Over the years, we have evolved with the latest technologies in the field, specializing in condensing boilers, heat pumps and high-efficiency heating systems.'
                  : 'Nel corso degli anni, ci siamo evoluti insieme alle nuove tecnologie del settore, specializzandoci nell\'installazione di caldaie a condensazione, pompe di calore e sistemi di riscaldamento ad alta efficienza energetica.'}
              </p>
              <p>
                {isEnglish
                  ? 'Today we are a trusted reference point in the area for installation, maintenance and repair of heating and plumbing systems for both private clients and businesses. Our team is always ready to provide fast and effective solutions.'
                  : 'Oggi siamo un punto di riferimento nella provincia per installazioni, manutenzioni e riparazioni di impianti termoidraulici, sia per privati che per aziende. Il nostro team di tecnici esperti è sempre pronto ad intervenire, garantendo soluzioni rapide ed efficaci.'}
              </p>
            </div>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-200">
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-blue-600 mb-1">{stat.value}</div>
              <p className="text-gray-600 dark:text-slate-300">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-center mb-12">{isEnglish ? 'Our Values' : 'I Nostri Valori'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 dark:border-slate-800 dark:bg-slate-900">
                <h3 className="mb-3 text-blue-600">{value.title}</h3>
                <p className="text-gray-600 dark:text-slate-300">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="rounded-lg bg-gray-50 p-8 dark:bg-slate-900/70">
          <h2 className="text-center mb-8">{isEnglish ? 'Certifications and Guarantees' : 'Certificazioni e Garanzie'}</h2>
          <div className="max-w-3xl mx-auto space-y-4 text-gray-600 dark:text-slate-300">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <p>
                <strong>{isEnglish ? 'Certified and Qualified:' : 'Certificati e Abilitati:'}</strong>{' '}
                {isEnglish
                  ? 'All our technicians are fully certified to work on gas systems, boilers and heating systems'
                  : 'Tutti i nostri tecnici sono regolarmente certificati per lavorare su impianti gas, caldaie e sistemi di riscaldamento'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <p>
                <strong>{isEnglish ? 'Work Guarantee:' : 'Garanzia sui Lavori:'}</strong>{' '}
                {isEnglish
                  ? 'Every intervention is covered by guarantee in compliance with current regulations'
                  : 'Tutti i nostri interventi sono coperti da garanzia secondo le normative vigenti'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <p>
                <strong>{isEnglish ? 'Certified Materials:' : 'Materiali Certificati:'}</strong>{' '}
                {isEnglish
                  ? 'We only use certified materials and components from leading brands'
                  : 'Utilizziamo solo materiali e componenti certificati delle migliori marche del settore'}
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <p>
                <strong>{isEnglish ? 'Insurance:' : 'Assicurazione:'}</strong>{' '}
                {isEnglish
                  ? 'Our company is covered by professional insurance for maximum client protection'
                  : 'La nostra azienda è coperta da assicurazione professionale per la massima tutela dei clienti'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}