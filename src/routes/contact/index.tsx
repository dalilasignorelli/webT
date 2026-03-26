import { createFileRoute } from '@tanstack/react-router'
import { ContactPage } from './-components/Contact'

export const Route = createFileRoute('/contact/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <> 
      <ContactPage />
    </>
  )
}
