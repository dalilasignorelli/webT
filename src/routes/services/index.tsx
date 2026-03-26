import { createFileRoute } from '@tanstack/react-router'
import { ServicesPage } from './-components/Services'

export const Route = createFileRoute('/services/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <ServicesPage />
    </>
  )
}
