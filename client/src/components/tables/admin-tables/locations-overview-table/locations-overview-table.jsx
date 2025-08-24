"use client";
import React from "react";
import toast from "react-hot-toast";
import location_icon from "@/assets/table-ui-icons/location_icon.png";
import { EditLocationModal } from "@/Modal/LocationModal/LocationModal";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Eye,
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Trash,
  NotebookPen,
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

// Users are fetches here from the backend
const fetchBusinesses = async ({ queryKey }) => {
  const [_key, pageIndex, pageSize] = queryKey;
  const res = await backendUrl.get(
    `/admin/locations/location/list-all-locations`,
    {
      params: {
        limit: pageSize,
        offset: pageIndex * pageSize,
      },
    }
  );
  // console.log("Fetched all Stores", res?.data?.result);

  return {
    location: res?.data?.result,
    total: res?.data?.meta?.totalCount,
  };
};

//  ==== MAIN TABLE FUNCTION ===
export function LocationOverviewTable() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0 ?? 0,
    pageSize: 10 ?? 10,
  });

  // Modal state
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [selectedLocation, setSelectedLocation] = React.useState();

  const navigate = useNavigate();

  //   const { data: activeOrganization } = authClient.useActiveOrganization();
  //   const storeId = activeOrganization?.id;

  // Handle edit location
  const handleEditLocation = (location) => {
    setSelectedLocation(location);
    setIsEditModalOpen(true);
  };

  // Handle modal close (only when closing, not opening)
  const handleModalClose = (open) => {
    if (!open) {
      // only run logic when closing
      setIsEditModalOpen(false);
      setSelectedLocation(null);
      refetch(); // refresh only on close
    }
  };

  // Success handler (just close modal, refetch will happen there)
  const handleSuccess = () => {
    setIsEditModalOpen(false);
    setSelectedLocation(null);
    // refetch();
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
      //   accessorKey: "description",
      //   header: ({ column }) => (
      //     <Button
      //       variant="ghost"
      //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      //     >
      //       Location Description
      //       {/* <ArrowUpDown /> */}
      //     </Button>
      //   ),
      //   cell: ({ row }) => (
      //     <div className="lowercase">{row.getValue("description")}</div>
      //   ),
      // },

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

          const { id: locationId, storeId } = locations;

          const updateStore = async () => {};

          // Remove (Delete) Store function.
          const deleteLocation = async () => {
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

                <DropdownMenuItem
                  onClick={() =>
                    navigate(`/storedashboard/branch/${locationId}`)
                  }
                >
                  <Eye className="text-green-500" />
                  View Location
                </DropdownMenuItem>

                {/* Edit Location */}
                <DropdownMenuItem onClick={() => handleEditLocation(locations)}>
                  <NotebookPen className="text-green-500" />
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
    [handleModalClose, handleEditLocation]
  );

  // Users from the json
  const {
    data: location,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["locations", pagination.pageIndex, pagination.pageSize],
    queryFn: fetchBusinesses,
    keepPreviousData: true,
  });

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
                        src={location_icon}
                        alt="No Stores Available"
                        className="w-20 h-20 mb-4"
                      />
                      <p className="font-semibold text-md">
                        No Locations Available
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

export default LocationOverviewTable;
