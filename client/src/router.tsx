import { createRootRoute, createRoute, createRouter, Outlet, Link } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

function RootLayout() {
  return (
    <div>
      <nav style={{ display: 'flex', gap: '12px', padding: '12px 0' }}>
        <Link to="/" activeProps={{ style: { fontWeight: 'bold' } }}>Home</Link>
        <Link to="/about" activeProps={{ style: { fontWeight: 'bold' } }}>About</Link>
        <Link to="/contact" activeProps={{ style: { fontWeight: 'bold' } }}>Contact</Link>
      </nav>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  )
}

const rootRoute = createRootRoute({
  component: RootLayout,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
})

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: Contact,
})

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, contactRoute])

export const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}


