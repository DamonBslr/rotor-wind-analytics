import { AppSidebar } from "@/components/app-sidebar";
import SensorOverview from "@/components/sensor-overview";
import { TempAreaChart } from "@/components/temp-area-chart";
import { TempLineChart } from "@/components/temp-line-chart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="grid grid-cols-3 gap-4 p-4 pt-0">
          <div className="col-span-3 md:col-span-2">
            <TempLineChart />
          </div>
          <div className="grid-cols-3 md:grid-cols-1">
            <SensorOverview />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
