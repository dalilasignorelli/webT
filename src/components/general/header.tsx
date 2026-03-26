import { useState } from "react";
import { Globe, Menu, Moon, Sun, X } from 'lucide-react';
import { Button } from "../ui/button";
import logo from "../../assets/logo.svg";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useSiteSettings } from "@/lib/site-settings";

interface HeaderProps {
  currentPage: 'home' | 'services' | 'about' | 'contact';
  onNavigate: (page: 'home' | 'services' | 'about' | 'contact') => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, theme, toggleTheme } = useSiteSettings();
  const isEnglish = language === 'en';

  const navItems = [
    { id: 'home' as const, label: 'Home' },
    { id: 'services' as const, label: isEnglish ? 'Services' : 'Servizi' },
    { id: 'about' as const, label: isEnglish ? 'About Us' : 'Chi Siamo' },
    { id: 'contact' as const, label: isEnglish ? 'Contact' : 'Contatti' },
  ];

  const themeLabel = theme === 'dark'
    ? (isEnglish ? 'Switch to light mode' : 'Passa alla modalità chiara')
    : (isEnglish ? 'Switch to dark mode' : 'Passa alla modalità scura');

  const handleNavigate = (page: 'home' | 'services' | 'about' | 'contact') => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-2"
          >
            <div className="w-14 h-14 rounded-lg flex items-center justify-center">
               <img src={logo} alt="logo" className="w-12 h-12 object-contain" />
            </div>
            <span className="text-blue-900 dark:text-blue-200">Termoidraulica Signorelli</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200'
                    : 'bg-slate-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-blue-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Select value={language} onValueChange={(value) => setLanguage(value as 'it' | 'en')}>
              <SelectTrigger>
                  <Globe className="w-4 h-4" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="it">Italiano</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              aria-label={themeLabel}
              title={themeLabel}
              className="rounded-full"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            <Button onClick={() => handleNavigate('contact')}>
              {isEnglish ? 'Request a Quote' : 'Richiedi Preventivo'}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden rounded-full p-2 text-slate-700 dark:text-slate-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`rounded-full px-4 py-3 text-left text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200'
                      : 'bg-slate-100 text-gray-700 hover:bg-blue-50 hover:text-blue-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-blue-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Select value={language} onValueChange={(value) => setLanguage(value as 'it' | 'en')}>
                  <SelectTrigger className="w-full rounded-full">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="it">Italiano</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  type="button"
                  variant={"outline"}
                  onClick={toggleTheme}
                  className="w-full rounded-full"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  {theme === 'dark'
                    ? (isEnglish ? 'Light mode' : 'Modalità chiara')
                    : (isEnglish ? 'Dark mode' : 'Modalità scura')}
                </Button>
              </div>

              <Button onClick={() => handleNavigate('contact')} className="w-full">
                {isEnglish ? 'Request a Quote' : 'Richiedi Preventivo'}
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}