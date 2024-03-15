"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const Pagination = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageUrl = (pageParam: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageParam.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div>
      <h1>Pagination</h1>
      <Link href={createPageUrl(currentPage - 1)}>Back</Link>
      <Link href={createPageUrl(currentPage + 1)}>Forward</Link>
    </div>
  );
};

export default Pagination;
