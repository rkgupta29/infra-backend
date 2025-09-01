import { createRootRoute, createRoute, createRouter, Outlet, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Home from './pages/Home'
import { ChevronRight, FileText, GraduationCap, PieChart } from "lucide-react"
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarProvider,
} from "@/components/ui/sidebar"
import KnowledgeResearchPaperSectors from './pages/sectors/page'
import KnowledgeResearchPaperData from './pages/knowledge/research-papers/data'
import { Toaster } from '@/components/ui/sonner'
import { AuthGuard } from './guards/auth'


function RootLayout() {
  const queryClient = new QueryClient()

  function LayoutWithSidebar() {
    const { location } = useRouterState()
    const isLogin = location.pathname === '/login'
    
    return (
      <SidebarProvider>
        <AuthGuard>
        {!isLogin && (
          <Sidebar>
            <SidebarHeader className='pl-6 pt-6'>
              <img src="https://theinfravisionfoundation.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.b9dcc570.png&w=640&q=75" alt="TFI Admin" className='h-12 w-auto object-contain object-left' />
            </SidebarHeader>
            <SidebarContent className='overflow-hidden'>
              <SidebarGroup>
                <SidebarGroupLabel>Knowledge Page</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <Collapsible defaultOpen className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="w-full">
                            <GraduationCap className="h-4 w-4" />
                            <span>Knowledge</span>
                            <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub className='w-full pr-4'>
                            <SidebarMenuSubButton className='cursor-pointer h-9'href='/knowledge/sectors'>
                              <span className='w-full  flex gap-2 items-center'>
                                <PieChart className="h-4 w-4" />
                                <span>Sectors</span>
                              </span>
                            </SidebarMenuSubButton>
                            <SidebarMenuSubButton className='cursor-pointer h-9'href='/knowledge/research-papers'>
                            <span className='w-full flex gap-2 items-center'>
                              <FileText className="h-4 w-4" />
                              <span>Research Paper</span>
                              </span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        )}
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
        </AuthGuard>
      </SidebarProvider>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <LayoutWithSidebar />
      <Toaster />
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

const knowledgeResearchPaperSectorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/knowledge/sectors',
  component: KnowledgeResearchPaperSectors,
})

const knowledgeResearchPaperDataRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/knowledge/research-papers',
  component: KnowledgeResearchPaperData,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
})

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, contactRoute, loginRoute, knowledgeResearchPaperSectorsRoute, knowledgeResearchPaperDataRoute])

export const router = createRouter({
  routeTree,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
