"use client";
import { useState } from "react";
import Table from "app/[address]/components/Table";
import { Transactions as TransactionsType } from "app/types";
import NetworkInput from "app/components/NetworkInput";
import AddressForm from "app/[address]/components/AddressForm";
import { NETWORKS } from "app/constants";

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
      <AddressForm address={address} />
      <NetworkInput value={network} setValue={setNetwork} />
      <Table transactions={transactions[network]} network={network} />
    </div>
  );
};

export default Transactions;
