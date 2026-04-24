import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { HomePage } from "src/routes/-components/HomePage.tsx"

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate()

  const handleNavigate = (page: 'home' | 'services' | 'about' | 'contact') => {
    switch (page) {
      case 'home':
        navigate({ to: '/' })
        break
      case 'services':
        navigate({ to: '/services' })
        break
      case 'about':
        navigate({ to: '/about' })
        break
      case 'contact':
        navigate({ to: '/contact' })
        break
    }
  }
  return (
    <>
      <HomePage onNavigate={handleNavigate}/>
    </>
  )
}
