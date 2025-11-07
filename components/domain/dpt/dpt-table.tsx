/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { addToAntrian } from "@/action/dpt/add-to-antrian";
import { Dpt, Kelas } from "@/app/generated/prisma";
import { DataTable } from "@/components/data-table/data-table";
import { DataTableSortList } from "@/components/data-table/data-table-sort-list";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import StatusBadge from "@/components/status/status-badge";
import { ActionButton } from "@/components/ui/action-button";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useClientAction } from "@/hooks/use-client-action";
import { useDataTable } from "@/hooks/use-data-table";
import { IconUserPlus } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useEffect, useMemo } from "react";

interface DptTableProps {
    kelasList: Kelas[];
    dptList: (Dpt & { kelas: Kelas })[];
}

export default function DptTable({ kelasList, dptList }: DptTableProps) {
    const [nameFilter] = useQueryState("name", parseAsString.withDefault(""));
    const [kelasFilter] = useQueryState(
        "kelasId",
        parseAsString.withDefault("")
    );
    const [statusFilter] = useQueryState(
        "status",
        parseAsArrayOf(parseAsString).withDefault([])
    );

    const filteredData = useMemo(() => {
        return dptList.filter((row) => {
            const matchName =
                !nameFilter ||
                row.name.toLowerCase().includes(nameFilter.toLowerCase());
            const matchKelas =
                !kelasFilter || row.kelasId === Number(kelasFilter);
            const matchStatus =
                statusFilter.length === 0 ||
                statusFilter.includes(row.status as any);
            return matchName && matchKelas && matchStatus;
        });
    }, [dptList, nameFilter, kelasFilter, statusFilter]);

    const columns = useMemo<ColumnDef<(typeof filteredData)[number]>[]>(() => {
        return [
            {
                id: "select",
                header: ({ table }) => (
                    <Checkbox
                        checked={table.getIsAllPageRowsSelected()}
                        aria-checked={
                            table.getIsSomePageRowsSelected()
                                ? "mixed"
                                : undefined
                        }
                        onCheckedChange={(v: any) =>
                            table.toggleAllPageRowsSelected(!!v)
                        }
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(v: any) => row.toggleSelected(!!v)}
                    />
                ),
                enableSorting: false,
                enableHiding: false,
                size: 32,
            },
            {
                id: "id",
                accessorKey: "id",
                header: "ID",
            },
            {
                id: "name",
                accessorKey: "name",
                header: "Nama",
                meta: {
                    label: "Nama",
                    placeholder: "Search Nama…",
                    variant: "text",
                },
                enableColumnFilter: true,
            },
            {
                id: "kelasId",
                accessorKey: "kelasId",
                header: "Kelas",
                meta: {
                    label: "Kelas",
                    variant: "select",
                    options: kelasList.map((k) => ({
                        label: k.name,
                        value: String(k.id),
                    })),
                },
                enableColumnFilter: true,
                cell: ({ row }) => <span>{row.original.kelas.name}</span>,
            },
            {
                id: "status",
                accessorKey: "status",
                header: "Status",
                cell: ({ row }) => {
                    const status = row.original.status;
                    return <StatusBadge status={status} />;
                },
                meta: {
                    label: "Status",
                    variant: "multiSelect",
                    options: [
                        { label: "Belum Memilih", value: "BELUM_MEMILIH" },
                        { label: "Dalam Antrian", value: "DALAM_ANTRIAN" },
                        { label: "Dalam Bilik", value: "DALAM_BILIK" },
                        { label: "Sudah Memilih", value: "SUDAH_MEMILIH" },
                    ],
                },
                enableColumnFilter: true,
                enableSorting: true,
                 
            },
            {
                id: "actions",
                header: "Actions",
                cell: ({ row }) => {
                    const current = row.original;

                    // ✅ useClientAction hook at top-level
                    const { run: runAddToAntrian, loading } = useClientAction(
                        addToAntrian,
                        {
                            successMessage:
                                "DPT added to Antrian successfully!",
                            errorMessage: "Failed to add to Antrian",
                        }
                    );
                    return (
                        <ActionButton
                            isLoading={loading} 
                            loadingText="Adding"
                            onClick={() => runAddToAntrian({ id: Number(current.id) })} 
                        >
                            Add to Antrian
                        </ActionButton>
                    );
                },
            },
        ];
    }, [kelasList]);

    const { table } = useDataTable({
        data: filteredData,
        columns,
        enableRowSelection: true,
        pageCount: Math.ceil(filteredData.length / 10),
        initialState: {
            pagination: { pageIndex: 0, pageSize: 10 },
            sorting: [{ id: "id", desc: true }],
        },
        getRowId: (row) => String(row.id),
    });

    useEffect(() => {
        table.setPageIndex(0);
    }, [filteredData, table]);

    return (
        <div className="space-y-6">
            {" "}
            <DataTable
                table={table}
                // actionBar={
                //     <Button
                //         onClick={handleAddToAntrian}
                //         disabled={selectedCount === 0}
                //         className="bg-blue-600 text-white hover:bg-blue-700"
                //     >
                //         {" "}
                //         Add to Antrian ({selectedCount}){" "}
                //     </Button>
                // }
            >
                <DataTableToolbar table={table}>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            console.log("Navigate to Add DPT");
                        }}
                    >
            
                        <IconUserPlus className="text-muted-foreground" /> New
                        DPT
                    </Button>
                </DataTableToolbar>
            </DataTable>
        </div>
    );
}
