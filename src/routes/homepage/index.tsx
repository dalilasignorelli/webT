import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from './-components/HomePage'
import { useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/homepage/')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  const handleNavigate = (page: 'home' | 'services' | 'about' | 'contact') => {
    switch (page) {
      case 'home':
        navigate({ to: '/homepage' })
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
