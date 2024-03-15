"use client";

import React from "react";
import Link from "next/link";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { NETWORKS } from "@/app/constants";
import { Transaction } from "@/app/types";

const columnHelper = createColumnHelper<Transaction>();

const columns = [
  columnHelper.accessor("timeStamp", {
    id: "timeStamp",
    header: () => "Date and Time",
    cell: (info) => {
      const milliseconds = Number(info.getValue()) * 1000;
      const dateTime = new Date(milliseconds);
      return <p suppressHydrationWarning>{dateTime.toLocaleString()}</p>;
    },
    sortingFn: (rowA, rowB) => {
      return Number(rowA.original.timeStamp) - Number(rowB.original.timeStamp);
    },
  }),
  columnHelper.accessor("value", {
    id: "value",
    header: () => "Amount",
    cell: (info) => {
      return `${Number(info.getValue()) / Math.pow(10, 18)} ${
        NETWORKS[info?.table?.options?.meta?.network || NETWORKS.ethereum.name]
          .currency
      }`;
    },
    sortingFn: (rowA, rowB) => {
      return Number(rowA.original.value) - Number(rowB.original.value);
    },
  }),
  columnHelper.accessor("hash", {
    id: "hash",
    header: () => "Visit",
    cell: (info) => {
      return (
        <Link
          href={`transaction/${info.getValue()}?network=${
            info.table.options.meta?.network
          }`}
        >
          {info.renderValue()}
        </Link>
      );
    },
    enableSorting: false,
  }),
];

const Table = ({
  transactions,
  network,
  address,
}: {
  transactions: Transaction[];
  network: string;
  address: string;
}) => {
  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    meta: {
      network,
      address,
    },
  });

  return (
    <div>
      <h1>Table</h1>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div
                      className={
                        header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : ""
                      }
                      onClick={header.column.getToggleSortingHandler()}
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === "asc"
                            ? "Sort ascending"
                            : header.column.getNextSortingOrder() === "desc"
                            ? "Sort descending"
                            : "Clear sort"
                          : undefined
                      }
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: " ▲",
                        desc: " ▼",
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
