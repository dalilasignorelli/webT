import { createFileRoute } from '@tanstack/react-router'
import { AboutPage } from './-components/About'

export const Route = createFileRoute('/about/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <> 
      <AboutPage />
    </>
  )
}
