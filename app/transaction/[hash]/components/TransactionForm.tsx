"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "app/components/Input";

const TransactionForm = ({ hash }: { hash: string }) => {
  const [transactionValue, setTransactionValue] = useState(hash);

  const { push } = useRouter();

  const updateParams = () => {
    push(transactionValue);
  };

  return (
    <div>
      <Input
        label="Transaction"
        value={transactionValue}
        setValue={setTransactionValue}
      />
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
