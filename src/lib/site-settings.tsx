import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

export type Language = "it" | "en"
export type ThemeMode = "light" | "dark"

type SiteSettingsContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void
}

const SiteSettingsContext = createContext<SiteSettingsContextValue | null>(null)

const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "it"

  const savedLanguage = window.localStorage.getItem("site-language")
  if (savedLanguage === "it" || savedLanguage === "en") return savedLanguage

  return window.navigator.language.toLowerCase().startsWith("en") ? "en" : "it"
}

const getInitialTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "light"

  const savedTheme = window.localStorage.getItem("site-theme")
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme)

  useEffect(() => {
    window.localStorage.setItem("site-language", language)
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
    window.localStorage.setItem("site-theme", theme)
  }, [theme])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      theme,
      setTheme,
      toggleTheme: () => {
        setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"))
      },
    }),
    [language, theme],
  )

  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext)

  if (!context) {
    throw new Error("useSiteSettings must be used inside SiteSettingsProvider")
  }

  return context
}