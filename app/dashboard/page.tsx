"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { CurrentTempChart } from "@/components/current-temp-chart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockData } from "@/lib/convert-sensor-data";
import { HoverProvider } from "@/components/HoverContext";
import { MachineDataTable } from "@/components/machine-data-table";

const criticalTemp = mockData.some((d) => d.temp > 94);
const warningTemp = mockData.some((d) => d.temp > 74);

export default function Page() {
  return (
    <HoverProvider>
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

          <div className="grid grid-cols-12 gap-4 p-4 pt-0">
            {criticalTemp && (
              <div className="col-span-12 bg-red-100 border-l-4 border-red-500 p-4">
                Es wurden kritische Temperaturen festgestellt!
              </div>
            )}
            {warningTemp && (
              <div className="col-span-12 bg-orange-100 border-l-4 border-orange-500 p-4">
                Es wurden erhöhte Temperaturen festgestellt!
              </div>
            )}

            <div className="col-span-12">
              <CurrentTempChart data={mockData} className="h-full" />
            </div>

            <Card className="col-span-12">
              <CardHeader>
                <CardTitle className="text-md">Maschinenübersicht</CardTitle>
              </CardHeader>
              <CardContent>
                <MachineDataTable />
              </CardContent>
              <CardFooter className="flex justify-between"></CardFooter>
            </Card>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </HoverProvider>
  );
}
