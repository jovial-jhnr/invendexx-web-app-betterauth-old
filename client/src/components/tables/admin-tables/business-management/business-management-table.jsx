"use client";
import React from "react";
import toast from "react-hot-toast";
import store_icon from "@/assets/table-ui-icons/store_icon.png";
import StoreSettingsModal from "@/Modal/StoreSettingsModals/StoreSettingsModal";
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
const fetchBusinesses = async ({ queryKey }) => {
  const [_key, pageIndex, pageSize] = queryKey;
  const res = await backendUrl.get("/admin/businesses/get-all-businesses", {
    params: {
      limit: pageSize,
      offset: pageIndex,
    },
  });
  // console.log("Fetched all Stores", res?.data);
  // return res?.data?.result;
  return {
    stores: res?.data?.result,
    total: res?.data?.total,
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
    header: "Store Name",
    cell: ({ row }) => (
      <div className="capitalize font-semibold">{row.getValue("name")}</div>
    ),

    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "slug",
    header: "Store Slug",
    cell: ({ row }) => <div className="">{row.getValue("slug")}</div>,

    enableSorting: false,
    enableHiding: false,
  },

  //   {
  //     accessorKey: "middleName",
  //     header: "Middle Name",
  //     cell: ({ row }) => (
  //       <div className="capitalize">{row.getValue("middleName")}</div>
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },

  //   {
  //     accessorKey: "lastName",
  //     header: "Last Name",
  //     cell: ({ row }) => (
  //       <div className="capitalize">{row.getValue("lastName")}</div>
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },

  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },

  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("phoneNumber")}</div>
    ),
    enableSorting: false,
    enableHiding: true,
  },

  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div className="capitalize">{row.getValue("role")}</div>,
    enableSorting: false,
    enableHiding: false,
  },

  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const stores = row.original;

      const updateStore = async () => {};

      // Function to impersonate users.
      const impersonatedSession = async () =>
        await authClient.admin.impersonateUser(
          {
            userId: users?.id,
          },
          {
            onSuccess(ctx) {
              toast.success("Successfully impersonated User");
            },
            onError(ctx) {
              toast.error("Failed to impersonate User");
            },
          }
        );

      const revokedSession = async () =>
        await authClient.admin.revokeUserSession(
          {
            sessionToken: session?.session?.token,
          },
          {
            onSuccess(ctx) {
              toast.success("Successfully revoved Users Session");
            },
            onError(ctx) {
              toast.error("Failed to revoke session");
            },
          }
        );

      // Remove (Delete) Store function.
      const deleteStore = async () => {
        const storeId = stores?.id;

        await backendUrl.post(
          `/admin/businesses/store/${storeId}/delete-store`
        );
      };

      // Change user role here
      const updatedUser = async () =>
        await authClient.admin.setRole({
          userId: users?.id,
          role: "user", // this can also be an array for multiple roles (e.g. ["admin", "sale"])
        });

      // Ban User function
      const bannedUser = async () =>
        await authClient.admin.banUser(
          {
            userId: users?.id,
            banReason: "", // Optional (if not provided, the default ban reason will be used - No reason)
            banExpiresIn: 60 * 60 * 24 * 7, // Optional (if not provided, the ban will never expire)
          },
          {
            onSuccess(ctx) {
              toast.success("Successfully banned User ");
            },
            onError(ctx) {
              toast.error("Failed to ban User ");
            },
          }
        );

      // Unban User function
      const unbannedUser = async () =>
        await authClient.admin.unbanUser(
          {
            userId: users?.id,
          },
          {
            onSuccess(ctx) {
              toast.success("Successfully unbanned User");
            },
            onError(ctx) {
              toast.error("Failed to unban User");
            },
          }
        );

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

            {/* Upsate store details */}
            <StoreSettingsModal />
            {/* <DropdownMenuItem
              onClick={StoreSettingsModal}
              className="font-medium"
            >
              <Store />
              Update Store
            </DropdownMenuItem> */}

            {/* Impersonate User Session */}
            <DropdownMenuItem
              onClick={impersonatedSession}
              className="font-medium"
            >
              <UserRoundCog />
              Impersonate User
            </DropdownMenuItem>

            {/* Revoke user Session */}
            <DropdownMenuItem onClick={revokedSession}>
              <VenetianMask />
              Revoke User Session
            </DropdownMenuItem>

            {/* Ban user */}
            <DropdownMenuItem onClick={bannedUser}>
              <Ban /> Ban User
            </DropdownMenuItem>

            {/* Unban User */}
            <DropdownMenuItem onClick={unbannedUser}>
              <ShieldCheck />
              Unban User
            </DropdownMenuItem>

            {/* Deleter user dropdown */}
            <DropdownMenuItem
              className="text-red-500 font-medium"
              onClick={deleteStore}
            >
              <Trash2 className="text-red-500" />
              Delete Store
            </DropdownMenuItem>

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
export function BusinessManagementTable() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0 ?? 0,
    pageSize: 10 ?? 10,
  });

  // User details to confirm user
  const { data: session } = authClient.useSession();
  const userRole = session?.user?.role;

  // Users from the json
  const {
    data: stores,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["stores", pagination.pageIndex, pagination.pageSize],
    queryFn: fetchBusinesses,
    keepPreviousData: true,
  });

  const table = useReactTable({
    data: stores?.stores ?? [],
    columns,
    manualPagination: true, // <--- ADD THIS
    pageCount: Math.ceil(stores?.total / pagination.pageSize) ?? -1, // <-- add this
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
                    className="h-38 text-center"
                  >
                    <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                      <img
                        src={store_icon}
                        alt="No Stores Available"
                        className="w-20 h-20 mb-4"
                      />
                      <p className="font-semibold text-md">
                        No Stores Available
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
              {Math?.ceil(stores?.total / pagination?.pageSize)}
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

export default BusinessManagementTable;
