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

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-md">Sensor Health</CardTitle>
              <CardDescription>
                All machines are operating within normal parameters
              </CardDescription>
            </CardHeader>
            <CardContent>
             
            </CardContent>
            <CardFooter className="flex justify-between">
            </CardFooter>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-md">Maintenance</CardTitle>
              <CardDescription>
                2 machines are due for maintenance
              </CardDescription>
            </CardHeader>
            <CardContent>
             
            </CardContent>
            <CardFooter className="flex justify-between">
            </CardFooter>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-md">Maintenance</CardTitle>
              <CardDescription>
                2 machines are due for maintenance
              </CardDescription>
            </CardHeader>
            <CardContent>
             
            </CardContent>
            <CardFooter className="flex justify-between">
            </CardFooter>
          </Card>

          <div className="col-span-3 md:col-span-2">
            <CurrentTempChart className="h-full" />
          </div>
          <div className="grid-cols-3 md:grid-cols-1">
            <CurrentTempList className="h-full" />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
