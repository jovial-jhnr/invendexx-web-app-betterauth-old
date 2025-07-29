"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  UserRoundCog,
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
import { authClient } from "@/lib/auth-client";

// Users are fetches here
const fetchUsers = async ({ queryKey }) => {
  const [_key, pageSize, pageIndex] = queryKey;
  const res = await authClient.admin.listUsers({
    query: {
      limit: pageIndex,
      offset: pageSize * pageIndex,
    },
  });
  // console.log("Fetched users", res.data);
  return {
    users: res?.data?.users,
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
    accessorKey: "firstName",
    header: "First Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("firstName")}</div>
    ),

    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "middleName",
    header: "Middle Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("middleName")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "lastName",
    header: "Last Name",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("lastName")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

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
    accessorKey: "emailVerified",
    header: "Email Verified",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("emailVerified")?.emailVerified}
      </div>
    ),
    enableSorting: false,
    enableHiding: true,
  },

  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const users = row.original;

      // Function to impersonate users.
      const impersonatedSession = async () =>
        await authClient.admin.impersonateUser({
          userId: users?.id,
        });

      const revokedSession = async () =>
        await authClient.admin.revokeUserSession({
          sessionToken: session?.session?.token,
        });

      // Remove (Delete) user function.
      const deleteUser = async () =>
        await authClient.admin.removeUser({
          userId: users?.id,
        });

      // Change user role here
      const updatedUser = async () =>
        await authClient.admin.setRole({
          userId: users?.id,
          role: "user", // this can also be an array for multiple roles (e.g. ["admin", "sale"])
        });

      // Ban User function
      const bannedUser = async () =>
        await authClient.admin.banUser({
          userId: users?.id,
          banReason: "", // Optional (if not provided, the default ban reason will be used - No reason)
          banExpiresIn: 60 * 60 * 24 * 7, // Optional (if not provided, the ban will never expire)
        });

      // Unban User function
      const unbannedUser = async () =>
        await authClient.admin.unbanUser({
          userId: users?.id,
        });

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
              onClick={deleteUser}
            >
              <Trash2 className="text-red-500" />
              Delete User
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
export function UserManagementTable() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0 ?? 0,
    pageSize: 10 ?? 10,
  });

  // Users from the json
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", pagination.pageIndex, pagination.pageSize],
    queryFn: fetchUsers,
    keepPreviousData: true,
  });

  const table = useReactTable({
    data: users?.users ?? [],
    columns,
    manualPagination: true, // <--- ADD THIS
    pageCount: Math.ceil(users?.total / pagination.pageSize) ?? -1, // <-- add this
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
            placeholder="Filter emails..."
            value={table.getColumn("email")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
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
                    <TableHead key={header.id} className="text-start">
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
              Page {table.getState().pagination.pageIndex + 1} {""}
              {table.getPageCount().toLocaleString}
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

export default UserManagementTable;

//

//   <div className="text-sm font-semibold">
//   <select
//     value={table.getState().pagination.pageSize}
//     onChange={(e) => {
//       table.setPageSize(Number(e.target.value));
//     }}
//   >
//     {[10, 20, 30, 40, 50].map((pageSize) => (
//       <option key={pageSize} value={pageSize}>
//         Show {pageSize}
//       </option>
//     ))}
//   </select>
// </div>;
