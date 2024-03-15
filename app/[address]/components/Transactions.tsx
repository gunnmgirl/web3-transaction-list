"use client";

import { useState } from "react";

import Table from "./Table";

import { Transaction } from "@/app/types";
import { NETWORKS } from "@/app/constants";
import NetworkInput from "@/app/components/NetworkInput";

const Transactions = ({
  transactions,
}: {
  transactions: {
    [key: string]: Transaction[];
  };
}) => {
  const [network, setNetwork] = useState(NETWORKS.ethereum.name);

  return (
    <div>
      <h1>Transactions</h1>
      <NetworkInput value={network} setValue={setNetwork} />
      <Table transactions={transactions[network]} network={network} />
    </div>
  );
};

export default Transactions;
