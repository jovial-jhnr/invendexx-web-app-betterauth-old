"use client";
import React from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import users_icon from "@/assets/table-ui-icons/users_icon.png";

import {
  ArrowUpDown,
  ChevronDown,
  LockKeyholeOpen,
  MoreHorizontal,
  SquareUser,
  UserLock,
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
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import AdminEditRoleModal from "@/modal/user-management/admin-edit-role-modal";
import AdminEditPasswordModal from "@/modal/user-management/admin-edit-password-modal";
import BanUserModal from "@/modal/user-management/ban-user-modal";

// Users are fetches here from the backend
const fetchUsers = async ({ queryKey }) => {
  const [_key, pageIndex, pageSize] = queryKey;
  const res = await authClient.admin.listUsers({
    query: {
      limit: pageSize,
      offset: pageSize * pageIndex,
    },
  });
  // console.log("Fetched users", res.data);
  return {
    users: res?.data?.users,
    total: res?.data?.total,
    limit: res?.data?.limit,
    offset: res?.data?.offset,
  };
};

//  ==== MAIN TABLE FUNCTION ===
export function UserManagementTable() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0 ?? 0,
    pageSize: 30 ?? 30,
  });

  // Modal state
  // const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = React.useState(false);
  const [isBanModalOpen, setIsBanModalOpen] = React.useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState();

  // Navigation setup
  const navigate = useNavigate();

  // User Session data here
  const {
    data: session, //user session
    refetch: refetchSession, // Refetches the user session
    error,
  } = authClient.useSession();

  // Users from the json
  const {
    data: users,
    isLoading,
    isError,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["users", pagination.pageIndex, pagination.pageSize],
    queryFn: fetchUsers,
    keepPreviousData: true,
  });

  // Handle edit role
  const handleEditRole = (user) => {
    setSelectedUser(user);
    setIsRoleModalOpen(true);
  };
  // Handle setting password
  const handleEditPassword = (user) => {
    setSelectedUser(user);
    setIsPasswordModalOpen(true);
  };

  // Handle ban user
  const handleBanUser = (user) => {
    setSelectedUser(user);
    setIsBanModalOpen(true);
  };

  // Handle modal close (only when closing, not opening)
  const handleModalClose = (open) => {
    if (!open) {
      // only run logic when closing
      setIsBanModalOpen(false);
      setIsRoleModalOpen(false);
      setIsPasswordModalOpen(false);
      setSelectedUser(null);
      refetch(); // refresh only on close
    }
  };

  // Success handler (just close modal, refetch will happen there)
  const handleSuccess = () => {
    setIsBanModalOpen(false);
    setIsRoleModalOpen(false);
    setIsPasswordModalOpen(false);
    setSelectedUser(null);
    // refetch();
  };

  // Table columns
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
        cell: ({ row }) => (
          <div className="lowercase text-blue-600">{row.getValue("email")}</div>
        ),
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
        cell: ({ row }) => (
          <div className="capitalize text-blue-500 font-semibold">
            {row.getValue("role")}
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "emailVerified",
        header: "Email Verified",
        cell: ({ row }) => (
          <div className="capitalize font-bold font-inter">
            {row?.original?.emailVerified?.toString()}
          </div>
        ),
        enableSorting: false,
        enableHiding: true,
      },

      {
        accessorKey: "banReason",
        header: "Banned Reason",
        cell: ({ row }) => (
          <div className="capitalize font-bold font-inter">
            {row?.getValue("banReason")}
          </div>
        ),
        enableSorting: false,
        enableHiding: true,
      },

      {
        accessorKey: "banned",
        header: "Is Banned",
        cell: ({ row }) => (
          <div className="capitalize font-semibold font-inter text-orange-500">
            {row?.original?.banned?.toString()}
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
          // const impersonatedSession = async () => {

          const impersonatedSession = async () =>
            await authClient.admin.impersonateUser(
              {
                userId: users?.id,
              },
              {
                onSuccess: () => {
                  toast.success("Successfully impersonated User");
                  refetchSession();
                  navigate("/storedashboard");
                },
                onError: (ctx) => {
                  toast.error("Failed to impersonate User");
                },
              }
            );

          //   try {
          //     await authClient.admin.impersonateUser({
          //       userId: users?.id,
          //     });

          //     toast.success("Impersonated User now");
          //     refetchSession();
          //     navigate("/storedashboard");
          //     // await refetch();
          //   } catch (error) {
          //     toast.error("Failed to impersonate User");
          //   }
          // };

          // Function to revoke user session
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

          // Remove (Delete) user function.
          const deleteUser = async () => {
            // Checks for the users role before deleting
            if (users?.role === "admin") {
              toast.error("User is Admin, Cannot delete");
              return;
            }

            await authClient.admin.removeUser(
              {
                userId: users?.id,
              },
              {
                onSuccess(ctx) {
                  toast.success("Successfully deleted User permanently");
                },
                onError(ctx) {
                  toast.error("Failed to delete User");
                },
              }
            );
          };

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

                {/* Change user roles or add more */}
                <DropdownMenuItem onClick={() => handleEditRole(users)}>
                  <SquareUser />
                  Set User Role
                </DropdownMenuItem>

                {/* Change user Password admin only */}
                <DropdownMenuItem onClick={() => handleEditPassword(users)}>
                  <UserLock />
                  Set User Password
                </DropdownMenuItem>

                {/* Impersonate User Session */}
                <DropdownMenuItem onClick={impersonatedSession} className="">
                  <UserRoundCog />
                  Impersonate User
                </DropdownMenuItem>

                {/* Revoke user Session */}
                <DropdownMenuItem onClick={revokedSession}>
                  <VenetianMask />
                  Logout User
                </DropdownMenuItem>

                {/* Ban user */}
                <DropdownMenuItem onClick={() => handleBanUser(users)}>
                  <Ban />
                  Ban User
                </DropdownMenuItem>

                {/* Unban User */}
                <DropdownMenuItem onClick={unbannedUser}>
                  <LockKeyholeOpen />
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
    ],
    [handleEditPassword, handleEditRole, handleBanUser, handleSuccess]
  );

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
                        src={users_icon}
                        alt="No Users Available"
                        className="w-20 h-20 mb-4"
                      />
                      <p className="font-semibold text-md">
                        No Users Available
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
              {Math?.ceil(users?.total / Number(users?.limit))}
            </p>
          </div>

          {/* This lets you select the limit you want */}
          <div className="text-sm font-semibold">
            <Input
              type="number"
              min={1}
              defaultValue={30}
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="w-24"
            />
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

      {/* Admin edit role modal */}
      <div>
        <AdminEditRoleModal
          open={isRoleModalOpen}
          onOpenChange={handleModalClose}
          user={selectedUser}
          onSuccess={handleSuccess}
        />
      </div>

      {/* Admin edit user password */}
      <div>
        <AdminEditPasswordModal
          open={isPasswordModalOpen}
          onOpenChange={handleModalClose}
          user={selectedUser}
          onSuccess={handleSuccess}
        />
      </div>

      {/* Admin ban user */}
      <div>
        <BanUserModal
          open={isBanModalOpen}
          onOpenChange={handleModalClose}
          user={selectedUser}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
}

export default UserManagementTable;
