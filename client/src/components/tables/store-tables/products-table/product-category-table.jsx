"use client";
import React from "react";
import toast from "react-hot-toast";
import StoreSettingsModal from "@/app/Modal/StoreSettingsModals/StoreSettingsModal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  UserRoundCog,
  Store,
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
const fetchProductCategory = async ({ queryKey }) => {
  const [_key, storeId, pageIndex, pageSize] = queryKey;
  const res = await backendUrl.get(
    `/stores/store/${storeId}/products/product-category/all-product-category`,
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

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("category")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "product",
    header: "Product Quantity",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("product")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // {
  //   accessorKey: "address",
  //   header: "Address",
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue("address")}</div>
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
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
      const productscategory = row.original;

      const updateStore = async () => {};

      // Remove (Delete) Store function.
      const deleteLocation = async (storeId) => {
        // const storeId =
        const productCategoryId = productscategory?.id;

        await backendUrl.post(
          `/stores/store/${storeId}/products/product-category/${productCategoryId}/delete-category`
        );
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

            {/* Deleter user dropdown */}
            <DropdownMenuItem
              className="text-red-500 font-medium"
              onClick={deleteLocation}
            >
              <Trash2 className="text-red-500" />
              Delete Location
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            {/* <DropdownMenuItem onClick={deleteUser}>
              Delete User
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

//  ==== MAIN TABLE FUNCTION ===
export function ProductCategoryTable() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0 ?? 0,
    pageSize: 30 ?? 10,
  });

  const { data: activeOrganization } = authClient.useActiveOrganization();
  const storeId = activeOrganization?.id;

  // Users from the json
  const {
    data: productCategory,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["locations", storeId, pagination.pageIndex, pagination.pageSize],
    queryFn: fetchProductCategory,
    enabled: !!storeId,
    keepPreviousData: true,
  });

  const table = useReactTable({
    data: productCategory?.location ?? [],
    columns,
    manualPagination: true, // <--- ADD THIS
    pageCount: Math.ceil(productCategory?.total / pagination.pageSize) ?? -1, // <-- add this
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
                    No results.
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
              {Math?.ceil(productCategory?.total / pagination?.pageSize)}
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
    </div>
  );
}

export default ProductCategoryTable;
