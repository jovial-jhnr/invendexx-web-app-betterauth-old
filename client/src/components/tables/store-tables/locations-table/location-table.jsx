"use client";
import React from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import branch_icon from "@/assets/table-ui-icons/branch_icon.png";
import { EditLocationModal } from "@/app/Modal/LocationModal/LocationModal";

import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  UserRoundCog,
  Store,
  Pencil,
} from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Ban, VenetianMask, ShieldCheck } from "lucide-react";
import MetricCard from "@/components/ui/metric-card";
import { useQuery } from "@tanstack/react-query";
import backendUrl from "@/lib/backendUrl";
import { authClient } from "@/lib/auth-client";
import Spinner from "@/components/ui/spinner";

// Users are fetches here from the backend
const fetchLocations = async ({ queryKey }) => {
  const [_key, storeId, pageIndex, pageSize] = queryKey;
  const res = await backendUrl.get(
    `/stores/store/${storeId}/locations/location/all-store-locations`,
    {
      params: {
        limit: pageSize,
        offset: pageIndex * pageSize,
      },
    }
  );

  return {
    location: res?.data?.result,
    total: res?.data?.meta?.totalCount,
  };
};

//  ==== MAIN TABLE FUNCTION ===
export function LocationTable() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0 ?? 0,
    pageSize: 30 ?? 30,
  });

  // Modal state
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [selectedLocation, setSelectedLocation] = React.useState(null);

  const { data: activeOrganization } = authClient.useActiveOrganization();
  const storeId = activeOrganization?.id;

  // Users from the json
  const {
    data: location,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["locations", storeId, pagination.pageIndex, pagination.pageSize],
    queryFn: fetchLocations,
    enabled: !!storeId,
    keepPreviousData: true,
  });

  // Handle edit location
  const handleEditLocation = (locationData) => {
    setSelectedLocation(locationData);
    setIsEditModalOpen(true);
  };

  // Handle modal close and refetch data
  const handleModalClose = (open) => {
    if (!open) {
      setIsEditModalOpen(false);
      setSelectedLocation(null);
    }
    // refetch(); // Refetch data when modal closes
  };

  // Success handler (called after update)
  const handleSuccess = () => {
    refetch(); // refresh table
    handleModalClose(); // then close
  };

  const columns = React.useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },

      {
        accessorKey: "name",
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Location Name
            <ArrowUpDown />
          </Button>
        ),
        cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
      },

      {
        accessorKey: "city",
        header: "City",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("city")}</div>
        ),
        enableSorting: false,
        enableHiding: false,
      },

      {
        accessorKey: "region",
        header: "Region",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("region")}</div>
        ),
        enableSorting: false,
        enableHiding: false,
      },

      {
        accessorKey: "country",
        header: "Country",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("country")}</div>
        ),
        enableSorting: false,
        enableHiding: false,
      },

      {
        accessorKey: "address",
        header: "Address",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("address")}</div>
        ),
        enableSorting: false,
        enableHiding: false,
      },

      // {
      //   accessorKey: "email",
      //   header: ({ column }) => (
      //     <Button
      //       variant="ghost"
      //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      //     >
      //       Email
      //       <ArrowUpDown />
      //     </Button>
      //   ),
      //   cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
      // },

      // {
      //   accessorKey: "phoneNumber",
      //   header: "Phone Number",
      //   cell: ({ row }) => (
      //     <div className="capitalize">{row.getValue("phoneNumber")}</div>
      //   ),
      //   enableSorting: false,
      //   enableHiding: true,
      // },

      //  Actions for the table
      {
        id: "actions",
        header: "Actions",
        enableHiding: false,
        cell: ({ row }) => {
          const locations = row.original;

          const updateStore = async () => {};

          // Remove (Delete) Store function.
          const deleteLocation = async () => {
            const { id: locationId, storeId } = locations;

            await backendUrl.post(
              `/stores/store/${storeId}/locations/${locationId}/delete-location`
            );
            toast.success("Location deleted successfully");
          };

          // Change user role here

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
                <DropdownMenuSeparator />

                {/* Edit Location */}
                <DropdownMenuItem onClick={() => handleEditLocation(locations)}>
                  <Pencil />
                  Edit Location
                </DropdownMenuItem>

                {/* Deleter user dropdown */}
                <DropdownMenuItem
                  className="text-red-500 font-medium"
                  onClick={deleteLocation}
                >
                  <Trash2 className="text-red-500" />
                  Delete Location
                </DropdownMenuItem>

                {/* <DropdownMenuItem onClick={deleteUser}>
              Delete User
            </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: location?.location ?? [],
    columns,
    manualPagination: true, // <--- ADD THIS
    pageCount: Math.ceil(location?.total / pagination.pageSize) ?? -1, // <-- add this
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  // console.log(table.getHeaderGroups());

  return (
    <div className="w-full">
      <MetricCard>
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter store name..."
            value={table.getColumn("name")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border grid grid-cols-1 text-center">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
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
                    className="h-28 text-center"
                  >
                    <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                      <img
                        src={branch_icon}
                        alt="No Stores Location Available"
                        className="w-20 h-20 mb-4"
                      />
                      <p className="font-semibold text-md">
                        No Stores Location Available
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Number of rows selected */}
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          {/* THe page numbers */}
          <div>
            <p className="text-sm font-mono">
              Page {table.getState().pagination.pageIndex + 1} of {""}
              {Math?.ceil(location?.total / pagination?.pageSize)}
            </p>
          </div>
          {/* This lets you select the limit you want */}
          <div className="text-sm  font-semibold">
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="text-inherit"
            >
              {[1, 2, 5, 10, 20, 30, 40, 50, 75, 100].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div className="space-x-2">
            {/* To first page */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </Button>

            {/* Previous Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>

            {/* Next Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>

            {/* Last Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </Button>
          </div>
        </div>
      </MetricCard>

      {/* Edit Location Modal */}
      <EditLocationModal
        open={isEditModalOpen}
        onOpenChange={handleModalClose}
        location={selectedLocation}
        onSuccess={handleSuccess} // <-- call this inside your form after successful update
      />
    </div>
  );
}

export default LocationTable;
