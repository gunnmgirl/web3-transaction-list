"use client";
import { useState } from "react";
import Table from "app/[address]/components/Table";
import { Transactions as TransactionsType } from "app/types";
import { NETWORKS } from "app/constants";
import { Button } from "app/components/Button";
import EthereumIcon from "app/icons/EthereumIcon";
import PolygonIcon from "app/icons/PolygonIcon";
import Pagination from "app/[address]/components/Pagination";

const Transactions = ({ transactions }: { transactions: TransactionsType }) => {
  const [network, setNetwork] = useState(NETWORKS.ethereum.name);

  return (
    <div>
      <span className="isolate inline-flex">
        <Button
          onClick={() => setNetwork("ethereum")}
          isActive={network === "ethereum"}
          className="rounded-none rounded-l-md"
        >
          <EthereumIcon />
          Ethereum
        </Button>
        <Button
          onClick={() => setNetwork("polygon")}
          isActive={network === "polygon"}
          className="-ml-px rounded-none rounded-r-md"
        >
          <PolygonIcon />
          Polygon
        </Button>
      </span>
      <Table transactions={transactions[network]} network={network} />
      <Pagination network={network} />
    </div>
  );
};

export default Transactions;
