"use client";

import { useState } from "react";

import Table from "./Table";

import { Transactions as TransactionsType } from "@/app/types";
import { NETWORKS } from "@/app/constants";
import NetworkInput from "@/app/components/NetworkInput";
import AddressForm from "./AddressForm";

const Transactions = ({
  transactions,
  address,
}: {
  address: string;
  transactions: TransactionsType;
}) => {
  const [network, setNetwork] = useState(NETWORKS.ethereum.name);

  return (
    <div>
      <h1>Transactions</h1>
      <AddressForm address={address} />
      <NetworkInput value={network} setValue={setNetwork} />
      <Table transactions={transactions[network]} network={network} />
    </div>
  );
};

export default Transactions;
