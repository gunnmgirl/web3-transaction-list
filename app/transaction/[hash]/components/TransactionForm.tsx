"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Input from "@/app/components/Input";
import NetworkInput from "@/app/components/NetworkInput";

const TransactionForm = ({
  transaction,
  network,
}: {
  transaction: string;
  network: string;
}) => {
  const [transactionValue, setTransactionValue] = useState(transaction);
  const [networkValue, setNetworkValue] = useState(network);

  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const updateParams = () => {
    const params = new URLSearchParams(searchParams);
    params.set("network", networkValue);

    replace(`${transactionValue}?${params.toString()}`);
  };

  return (
    <div>
      <Input
        label="Transaction"
        value={transactionValue}
        setValue={setTransactionValue}
      />
      <NetworkInput value={networkValue} setValue={setNetworkValue} />
      <button
        onClick={updateParams}
        className="py-1 px-2 rounded-sm bg-gray-200"
      >
        Go
      </button>
    </div>
  );
};

export default TransactionForm;
