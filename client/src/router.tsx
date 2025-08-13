import { createRootRoute, createRoute, createRouter, Outlet, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Sidebar, SidebarHeader, SidebarProvider } from './components/ui/sidebar'

function RootLayout() {
  const queryClient = new QueryClient()

  function LayoutWithSidebar() {
    const { location } = useRouterState()
    const isLogin = location.pathname === '/login'
    return (
      <SidebarProvider>
        {!isLogin && (
          <Sidebar>
          <SidebarHeader className='text-2xl font-bold'>TFI Admin</SidebarHeader>
          </Sidebar>
        )}
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
      </SidebarProvider>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <LayoutWithSidebar />
    </QueryClientProvider>
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

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
})

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, contactRoute, loginRoute])

export const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
