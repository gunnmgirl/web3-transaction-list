"use client";

import { useState } from "react";

import TransactionForm from "./TransactionForm";
import NetworkInput from "@/app/components/NetworkInput";
import TransactionDetails from "./TransactionDetails";

import { NETWORKS } from "@/app/constants";
import { TransactionDetails as TransactionDetailsType } from "@/app/types";

const Transaction = ({
  transaction,
  hash,
}: {
  transaction: TransactionDetailsType;
  hash: string;
}) => {
  const [network, setNetwork] = useState(NETWORKS.ethereum.name);
  return (
    <div>
      <TransactionForm hash={hash} />
      <NetworkInput value={network} setValue={setNetwork} />
      <TransactionDetails transaction={transaction[network]} />
    </div>
  );
};

export default Transaction;
