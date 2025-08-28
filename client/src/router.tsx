import { createRootRoute, createRoute, createRouter, Outlet, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Home from './pages/Home'
import { ChevronRight, Database, FileText, GraduationCap, PieChart } from "lucide-react"
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
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import KnowledgeResearchPaperSectors from './pages/knowledge/research-papers/sectors'
import KnowledgeResearchPaperData from './pages/knowledge/research-papers/data'


function RootLayout() {
  const queryClient = new QueryClient()

  function LayoutWithSidebar() {
    const { location } = useRouterState()
    const isLogin = location.pathname === '/login'
    return (
      <SidebarProvider>
        {!isLogin && (
          <Sidebar>
          <SidebarHeader className='pl-6 pt-6'>
            <img src="https://theinfravisionfoundation.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.b9dcc570.png&w=640&q=75" alt="TFI Admin" className='h-12 w-auto object-contain object-left' />
          </SidebarHeader>
          <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
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
                      <Collapsible className="group/nested">
                        <SidebarMenuSubItem className='w-full'>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuSubButton className='cursor-pointer'>
                              <FileText className="h-4 w-4" />
                              <span>Research Paper</span>
                              <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/nested:rotate-90" />
                            </SidebarMenuSubButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild>
                                  <a href="/knowledge/research-paper/sectors">
                                    <PieChart className="h-4 w-4" />
                                    <span>Sectors</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                              <SidebarMenuSubItem>
                                <SidebarMenuSubButton asChild>
                                  <a href="/knowledge/research-paper/data">
                                    <Database className="h-4 w-4" />
                                    <span>Data</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuSubItem>
                      </Collapsible>
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

  const knowledgeResearchPaperSectorsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/knowledge/research-paper/sectors',
  component: KnowledgeResearchPaperSectors,
})

const knowledgeResearchPaperDataRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/knowledge/research-paper/data',
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
