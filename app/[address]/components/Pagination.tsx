"use client";
import React from "react";
import Link from "next/link";
import { Address } from "viem";
import { mainnet, polygon } from "wagmi/chains";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { Button } from "app/components/Button";
import ChevronLeftIcon from "app/icons/ChevronLeftIcon";
import ChevronRightIcon from "app/icons/ChevronRightIcon";
import { useTransactionCount } from "wagmi";
import { NETWORKS } from "app/constants";

const Pagination = ({ network }: { network: string }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { address } = useParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const result = useTransactionCount({
    address: address as Address,
    chainId: network === NETWORKS.ethereum.name ? mainnet.id : polygon.id,
  });
  const totalPages = result.data || 1;

  const createPageUrl = (pageParam: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageParam.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex justify-between m-4">
      <div />
      <div className="flex items-center gap-1">
        <Link href={createPageUrl(1)}>
          <Button className="h-7">First</Button>
        </Link>
        <Link href={createPageUrl(currentPage - 1)}>
          <Button
            disabled={currentPage < 2}
            icon={<ChevronLeftIcon />}
          ></Button>
        </Link>
        <Button className="h-7">{`Page ${currentPage} of ${
          result.isLoading ? ".." : totalPages
        }`}</Button>
        <Link href={createPageUrl(currentPage + 1)}>
          <Button
            disabled={currentPage >= totalPages}
            icon={<ChevronRightIcon />}
          ></Button>
        </Link>
        <Link href={createPageUrl(totalPages)}>
          <Button className="h-7">Last</Button>
        </Link>
      </div>
    </div>
  );
};

export default Pagination;
