import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Flame, Droplet, Wrench, Thermometer, Gauge, Settings, AlertCircle, Phone } from 'lucide-react';
import { useSiteSettings } from '@/lib/site-settings';

export function ServicesPage() {
  const { language } = useSiteSettings();
  const isEnglish = language === 'en';

  const services = [
    {
      category: isEnglish ? 'Boilers and Heating' : 'Caldaie e Riscaldamento',
      icon: Flame,
      badge: isEnglish ? 'Main Service' : 'Servizio Principale',
      items: [
        isEnglish ? 'Condensing boiler installation' : 'Installazione caldaie a condensazione',
        isEnglish ? 'Routine boiler maintenance' : 'Manutenzione ordinaria caldaie',
        isEnglish ? 'Boiler repair for all brands' : 'Riparazione caldaie di tutte le marche',
        isEnglish ? 'Support and certification' : 'Assistenza e certificazione',
        isEnglish ? 'Replacement of obsolete boilers' : 'Sostituzione caldaie obsolete',
        isEnglish ? 'Flue gas checks and combustion analysis' : 'Controllo fumi e analisi combustione',
      ],
    },
    {
      category: isEnglish ? 'Heating Systems' : 'Impianti di Riscaldamento',
      icon: Thermometer,
      badge: isEnglish ? 'Main Service' : 'Servizio Principale',
      items: [
        isEnglish ? 'Radiator installation' : 'Installazione termosifoni e radiatori',
        isEnglish ? 'Underfloor heating systems' : 'Impianti a pavimento (radiante)',
        isEnglish ? 'Heat pump installation' : 'Installazione pompe di calore',
        isEnglish ? 'Thermostatic valves' : 'Valvole termostatiche',
        isEnglish ? 'Climate systems' : 'Sistemi di climatizzazione',
        isEnglish ? 'Heating system maintenance' : 'Manutenzione impianti di riscaldamento',
      ],
    },
    {
      category: isEnglish ? 'Plumbing Systems' : 'Impianti Idraulici',
      icon: Droplet,
      badge: null,
      items: [
        isEnglish ? 'Water system installation' : 'Installazione impianti idrici',
        isEnglish ? 'Water leak repair' : 'Riparazione perdite d\'acqua',
        isEnglish ? 'Replacement of sanitary ware and faucets' : 'Sostituzione sanitari e rubinetteria',
        isEnglish ? 'Water softening system installation' : 'Installazione impianti di addolcimento',
        isEnglish ? 'Complete bathroom renovation' : 'Rifacimento bagni completo',
      ],
    },
    {
      category: isEnglish ? 'Gas Systems' : 'Impianti Gas',
      icon: Gauge,
      badge: null,
      items: [
        isEnglish ? 'Gas system certification' : 'Certificazione impianti gas',
        isEnglish ? 'Gas meter installation' : 'Installazione contatori gas',
        isEnglish ? 'System tightness verification' : 'Verifica tenuta impianto',
        isEnglish ? 'Conversion from methane to LPG' : 'Conversione da metano a GPL',
        isEnglish ? 'Gas system maintenance' : 'Manutenzione impianti gas',
        isEnglish ? 'Testing and safety checks' : 'Collaudo e messa in sicurezza',
      ],
    },
    {
      category: isEnglish ? 'Repairs and Maintenance' : 'Riparazioni e Manutenzione',
      icon: Wrench,
      badge: null,
      items: [
        isEnglish ? 'Fault repair' : 'Riparazione guasti',
        isEnglish ? 'Water leaks' : 'Perdite d\'acqua',
        isEnglish ? 'Boiler lockout issues' : 'Caldaia in blocco',
        isEnglish ? 'Scheduled maintenance' : 'Manutenzione programmata',
        isEnglish ? 'Technical support' : 'Assistenza tecnica',
      ],
    },
    {
      category: isEnglish ? 'Additional Services' : 'Servizi Aggiuntivi',
      icon: Settings,
      badge: null,
      items: [
        isEnglish ? 'Flue video inspections' : 'Videoispezioni canne fumarie',
        isEnglish ? 'Anti-scale system installation' : 'Installazione sistemi anticalcare',
        isEnglish ? 'Water treatment' : 'Trattamento acqua',
        isEnglish ? 'Energy consulting' : 'Consulenza energetica',
        isEnglish ? 'Inspections and quotes' : 'Sopralluoghi e preventivi',
      ],
    },
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="mb-4">{isEnglish ? 'Our Services' : 'I Nostri Servizi'}</h1>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-slate-300">
            {isEnglish
              ? 'We offer a complete range of heating and plumbing services, from routine maintenance to complex interventions, with a focus on professionalism and quality.'
              : 'Offriamo una gamma completa di servizi termoidraulici per soddisfare ogni tua esigenza. Dalla semplice manutenzione agli interventi più complessi, garantiamo professionalità e qualità.'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="p-6 transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-200">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3>{service.category}</h3>
                </div>
                {service.badge && (
                  <Badge variant="secondary">
                    {service.badge}
                  </Badge>
                )}
              </div>
              
              <ul className="space-y-2">
                {service.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2 text-gray-600 dark:text-slate-300">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="rounded-lg bg-gray-50 p-8 text-center dark:bg-slate-900/70">
          <h2 className="mb-4">{isEnglish ? 'Need Something Else?' : 'Non Trovi il Servizio che Cerchi?'}</h2>
          <p className="mb-6 max-w-2xl mx-auto text-gray-600 dark:text-slate-300">
            {isEnglish
              ? 'These are only some of the services we provide. Contact us for any heating or plumbing need and we will be happy to review your specific case.'
              : 'Questi sono solo alcuni dei servizi che offriamo. Contattaci per qualsiasi esigenza termoidraulica, saremo felici di valutare il tuo caso specifico.'}
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

        {/* Info Box */}
        <div className="mt-12 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900/80 dark:bg-blue-950/40">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <p className="mb-2 text-blue-900 dark:text-blue-100">
                <strong>{isEnglish ? 'Note:' : 'Nota:'}</strong>
              </p>
              <p className="text-blue-800 dark:text-blue-200">
                {isEnglish
                  ? 'For detailed information about our real services, please contact us directly. For appointments call the landline number, for technical advice call the mobile number. We are always available to help you.'
                  : 'Per informazioni dettagliate sui nostri servizi reali, ti invitiamo a contattarci direttamente. Per appuntamenti chiamare al numero fisso, per consulenza tecnica chiamare al cellulare. Siamo sempre disponibili per assisterti!'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}