"use client";
import React from "react";
import Link from "next/link";
import { useTransactionCount } from "wagmi";
import { Address } from "viem";
import { mainnet, polygon } from "wagmi/chains";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Button } from "app/components/Button";
import ChevronLeftIcon from "app/icons/ChevronLeftIcon";
import ChevronRightIcon from "app/icons/ChevronRightIcon";
import { NETWORKS } from "app/constants";
import Select from "app/components/Select";

const options = [
  { value: 10, label: "10" },
  { value: 25, label: "25" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];

const Pagination = ({ network }: { network: string }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { address } = useParams();
  const { push } = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;
  const offset = Number(searchParams.get("offset")) || 20;
  const result = useTransactionCount({
    address: address as Address,
    chainId: network === NETWORKS.ethereum.name ? mainnet.id : polygon.id,
  });
  const totalPages = result?.data ? Math.round(result.data / offset) : 1;

  const createUrl = (paramName: string, paramValue: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set(paramName, paramValue.toString());
    if (paramName === "offset") {
      params.set("page", "1");
    }
    return `${pathname}?${params.toString()}`;
  };

  const updateOffset = (value: string) => {
    const url = createUrl("offset", value);
    push(url);
  };

  return (
    <div className="flex flex-col-reverse gap-2 items-end m-4 sm:flex-row sm:justify-between">
      <Select
        value={offset}
        onChange={(event) => updateOffset(event.target.value)}
        options={options}
        label="Show:"
      />
      <div className="flex items-center gap-1">
        <Link href={createUrl("page", 1)}>
          <Button className="h-7">First</Button>
        </Link>
        <Link href={createUrl("page", currentPage - 1)}>
          <Button
            disabled={currentPage < 2}
            icon={<ChevronLeftIcon />}
          ></Button>
        </Link>
        <Button className="h-7 text-xs sm:text-sm">
          <span className="hidden sm:inline">Page</span>
          {`${currentPage} of ${result.isLoading ? ".." : totalPages}`}
        </Button>
        <Link href={createUrl("page", currentPage + 1)}>
          <Button
            disabled={currentPage >= totalPages}
            icon={<ChevronRightIcon />}
          ></Button>
        </Link>
        <Link href={createUrl("page", totalPages)}>
          <Button className="h-7">Last</Button>
        </Link>
      </div>
    </div>
  );
};

export default Pagination;
