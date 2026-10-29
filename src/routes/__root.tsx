import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackDevtools } from '@tanstack/react-devtools'
import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackDevtools />
    </>
  )
}
