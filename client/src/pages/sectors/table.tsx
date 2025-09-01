"use client"

import { useState } from "react";
import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner"

// Data type for a sector
import { type Sector } from "./types";
import { useCreateSector, useDeleteSector, useToggleSectorStatus, useUpdateSector } from "./queries";
import { useQueryClient } from "@tanstack/react-query";
import SectorCreateForm from "./create-form";
import DeleteWarningModal from "./delete-warning";



const SectorActions = ({ sector }: { sector: Sector }) => {
    const { mutateAsync: toggleSectorStatus, isPending: isTogglingSectorStatus } = useToggleSectorStatus();
    const { mutateAsync: deleteSector, isPending: isDeletingSector } = useDeleteSector();
    const { mutateAsync: updateSector, isPending: isUpdatingSector } = useUpdateSector();
    const queryClient = useQueryClient();
    const [deleteWarningOpen, setDeleteWarningOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    
    return (
        <>
            {deleteWarningOpen && <DeleteWarningModal onClose={() => setDeleteWarningOpen(false)} onConfirm={async () => {
                await deleteSector(sector.id)
                setDeleteWarningOpen(false)
                queryClient.invalidateQueries({ queryKey: ["knowledge", "sectors"] })
            }} />}
            {editModalOpen && <SectorCreateForm  initialValues={sector} onClose={() => setEditModalOpen(false)} onSubmit={async (data: Partial<Sector>) => {
                await updateSector({id: sector.id, data})
                setEditModalOpen(false)
                queryClient.invalidateQueries({ queryKey: ["knowledge", "sectors"] })
            }} />}
            <div className=" flex items-center justify-end">
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
                            onClick={() => {
                                navigator.clipboard.writeText(sector.id)
                                toast.success("Sector ID copied to clipboard")
                            }}
                        >
                            Copy sector ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={async () => {
                            await toggleSectorStatus(sector.id)
                            queryClient.invalidateQueries({ queryKey: ["knowledge", "sectors"] })
                        }} disabled={isTogglingSectorStatus}>Toggle Visibility</DropdownMenuItem>
                        <DropdownMenuItem onClick={async () => {
                        setDeleteWarningOpen(true)
                        }} disabled={isDeletingSector}>Delete Sector</DropdownMenuItem>
                        <DropdownMenuItem onClick={async () => {
                            setEditModalOpen(true)
                        }} disabled={isUpdatingSector}>Edit Sector</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    );
};

// Table columns definition
export const columns: ColumnDef<Sector>[] = [
    {
        accessorKey: "Name",
        header: ({ column }) => {
            return (
                <span className="pl-4 ">{column.id.charAt(0).toUpperCase() + column.id.slice(1)}</span>
            )
        },
        cell: ({ row }) => {
            return <div className="pl-4 font-semibold w-[300px] line-clamp-1">{row.original.name || row.original.slug}</div>
        },
    },
    {
        accessorKey: "slug",
        header: "Slug",
        cell: ({ row }) => <div className="w-[90px] line-clamp-1">{row.original.slug}</div>,
    },

    {
        accessorKey: "active",
        header: "Status",
        cell: ({ row }) => {
            const active = row.original.active;
            return (
                <div className="w-[90px]">
                    <Badge variant={active ? "default" : "secondary"}>
                        {active ? "Active" : "Inactive"}
                    </Badge>
                </div>
            );
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const sector = row.original;
            return (
                <SectorActions sector={sector} />
            );
        },
    },
];

// Table component
export default function SectorsTable({
    sectors,
}: {
    sectors: Sector[];
}) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const { mutateAsync: createSector, isPending: isCreatingSector } = useCreateSector();
    const [openModal, setOpenModal] = useState(false);
    const queryClient = useQueryClient();
    const table = useReactTable({
        data: sectors,
        columns,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            columnFilters,
            columnVisibility,
        },
    });

    return (
        <div className="w-full">
            {openModal && <SectorCreateForm onSubmit={async (data) => {
                await createSector(data)
                setOpenModal(false)
                queryClient.invalidateQueries({ queryKey: ["knowledge", "sectors"] })
            }}
                onClose={() => setOpenModal(false)}
            />}

            <div className="flex items-center py-4">
                <Button variant="outline" className="ml-auto" onClick={async () => {
                    setOpenModal(true)
                    queryClient.invalidateQueries({ queryKey: ["knowledge", "sectors"] })
                }} disabled={isCreatingSector}>Add Sector</Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-2">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
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
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
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
                                    className="h-24 text-center text-gray-400"
                                >
                                    No sectors found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
