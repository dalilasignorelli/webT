import { useEffect } from 'react'
import { Outlet, createRootRoute, useLocation, useNavigate } from '@tanstack/react-router'
import { Header } from '@/components/general/header'
import { SiteSettingsProvider } from '@/lib/site-settings'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <SiteSettingsProvider>
      <AppShell />
    </SiteSettingsProvider>
  )
}

function AppShell() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  const currentPage = (() => {
    if (location.pathname === '/') return 'home'
    if (location.pathname === '/services') return 'services'
    if (location.pathname === '/about') return 'about'
    if (location.pathname === '/contact') return 'contact'
    return 'home' // fallback
  })()

  const onNavigate = (page: 'home' | 'services' | 'about' | 'contact') => {
    const pathMap = {
      home: '/',
      services: '/services',
      about: '/about',
      contact: '/contact',
    }
    navigate({ to: pathMap[page] })
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors">
      {/* Header visibile su tutte le pagine */}
      <Header currentPage={currentPage} onNavigate={onNavigate} />

      {/* Contenuto dinamico delle pagine */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer opzionale */}
      {/* <Footer /> */}
    </div>
  )
}
