"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { formatEther } from "viem";
import BigNumber from "bignumber.js";
import { formatDistanceToNow, fromUnixTime } from "date-fns";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { NETWORKS } from "app/constants";
import { Transaction } from "app/types";
import { formatHash } from "app/helpers";

const columnHelper = createColumnHelper<Transaction>();

const Table = ({
  transactions,
  network,
}: {
  transactions: Transaction[];
  network: string;
}) => {
  const linkColor = `text-[${NETWORKS[network].color}]`;

  const columns = useMemo(
    () => [
      columnHelper.accessor("hash", {
        id: "hash",
        header: () => "Hash",
        cell: (info) => {
          const value = info.getValue();
          return (
            <Link
              className={linkColor}
              href={`/transaction/${value}?network=${network}`}
            >
              {formatHash(value)}
            </Link>
          );
        },
        enableSorting: false,
      }),
      columnHelper.accessor("blockNumber", {
        id: "blockNumber",
        header: () => "Block",
        cell: (info) => {
          return info.renderValue();
        },
        enableSorting: false,
      }),

      columnHelper.accessor("timeStamp", {
        id: "timeStamp",
        header: () => "Age",
        cell: (info) => {
          const timestamp = info.getValue();
          const date = fromUnixTime(parseInt(timestamp));
          const value = formatDistanceToNow(date);
          return value;
        },
        enableSorting: false,
      }),
      columnHelper.accessor("from", {
        id: "from",
        header: () => "From",
        cell: (info) => {
          const value = info.getValue();
          const formatValue = formatHash(value);
          return (
            <Link href={`/${value}`} className={linkColor}>
              {formatValue}
            </Link>
          );
        },
        enableSorting: false,
      }),
      columnHelper.accessor("to", {
        id: "to",
        header: () => "To",
        cell: (info) => {
          const value = info.getValue();
          const formatValue = formatHash(value);
          return (
            <Link href={`/${value}`} className={linkColor}>
              {formatValue}
            </Link>
          );
        },
        enableSorting: false,
      }),
      columnHelper.accessor("value", {
        id: "value",
        header: () => "Value",
        cell: (info) => {
          const value = new BigNumber(
            formatEther(info.getValue() as unknown as bigint)
          );
          return `${value.toFixed(6)} ${
            network === NETWORKS.ethereum.name
              ? NETWORKS.ethereum.currency
              : NETWORKS.polygon.currency
          }`;
        },
        enableSorting: false,
      }),
      columnHelper.accessor("gasPrice", {
        id: "gasPrice",
        header: () => "Transaction Fee",
        cell: (info) => {
          const bigIntZero = 0 as unknown as bigint;
          const gasUsed =
            (info.row.original?.gasUsed as unknown as bigint) || bigIntZero;
          const gasPrice = (info.getValue() as unknown as bigint) || bigIntZero;
          const transactionFee = new BigNumber(formatEther(gasUsed * gasPrice));
          return transactionFee.toFixed(6);
        },
        enableSorting: false,
      }),
    ],
    [network]
  );

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table className="min-w-full divide-y divide-gray-700">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semiboldsm:pl-0"
              >
                {header.isPlaceholder ? null : (
                  <div
                    className={`${
                      header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : ""
                    }`}
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
      <tbody className="divide-y divide-gray-800">
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium  sm:pl-0"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
