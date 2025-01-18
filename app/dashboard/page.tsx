import { AppSidebar } from "@/components/app-sidebar";
import { CurrentTempChart } from "@/components/current-temp-chart";
import { CurrentTempList } from "@/components/current-temp-list";
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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

        <div className="grid grid-cols-12 gap-4 p-4 pt-0">

          <div className="col-span-12 md:col-span-8">
            <CurrentTempChart className="h-full" />
          </div>
          <div className="ol-span-12 md:col-span-4">
            <CurrentTempList className="h-full" />
          </div>

          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="text-md">Sensor Status</CardTitle>
              <CardDescription>
                Alle Sensoren reagieren im Normalbereich
              </CardDescription>
            </CardHeader>
            <CardContent>
             
            </CardContent>
            <CardFooter className="flex justify-between">
            </CardFooter>
          </Card>

          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="text-md">Wartungsoptimierung</CardTitle>
              <CardDescription>
                2 machines are due for maintenance
              </CardDescription>
            </CardHeader>
            <CardContent>
             
            </CardContent>
            <CardFooter className="flex justify-between">
            </CardFooter>
          </Card>
          
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="text-md">Anomalieerkennung</CardTitle>
              <CardDescription>
                Das System hat keine Anomalien erkannt
              </CardDescription>
            </CardHeader>
            <CardContent>
             
            </CardContent>
            <CardFooter className="flex justify-between">
            </CardFooter>
          </Card>

        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
