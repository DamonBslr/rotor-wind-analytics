"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu, DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "./ui/badge"

const data: Machine[] = [
  {
    id: "m5gr84i9",
    sensor_id: '1',
    temp: 62,
    status: "running",
    anomaly: 0,
    maintenance: "2025-09-01",
  },
  {
    id: "m5gr84i8",
    sensor_id: '2',
    temp: 77,
    status: "running",
    anomaly: 2,
    maintenance: "2025-10-05",
  },
  {
    id: "m5gr84i7",
    sensor_id: '3',
    temp: 38,
    status: "running",
    anomaly: 0,
    maintenance: "2025-03-06",
  },
  {
    id: "m5gr84i6",
    sensor_id: '4',
    temp: 13,
    status: "running",
    anomaly: 0,
    maintenance: "2025-05-05",
  },
  {
    id: "m5gr84i5",
    sensor_id: '5',
    temp: 74,
    status: "running",
    anomaly: 0,
    maintenance: "2025-03-03",
  },
]

export type Machine = {
  id: string
  sensor_id: string
  temp: number
  status: "running" | "stopped" | "warning" | "error",
  anomaly?: number
  maintenance: string
}

export const columns: ColumnDef<Machine>[] = [
  {
    accessorKey: "sensor_id",
    header: "ID",
    cell: ({ row }) => row.getValue("sensor_id"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge className="capitalize bg-green-600" variant={'default'}>{row.getValue("status")}</Badge>
    ),
  },
  {
    accessorKey: "temp",
    header: "Temperatur",
    cell: ({ row }) => {
      return <div>{row.getValue("temp")}°C</div>
    },
  },
  {
    accessorKey: "maintenance",
    header: "Wartung",
    cell: ({ row }) => {
      const maintenanceDate = new Date(row.getValue("maintenance"));
      const currentDate = new Date();
      const diffTime = Math.abs(currentDate.getTime() - maintenanceDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return <Badge variant={diffDays < 30 ? "destructive" : "outline"}>In {diffDays} Tagen</Badge>
    },
  },
  {
    accessorKey: "anomaly",
    header: "Anomalien",
    cell: ({ row }) => {
      return <Badge variant={row.getValue("anomaly") as number > 0 ? 'destructive' : 'outline'}>{row.getValue("anomaly")} erkannt</Badge>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function MachineDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
