import { Suspense } from "react";

import TransactionDetails from "./components/TransactionDetailsTemp";
import TransactionForm from "./components/TransactionFormTemp";
import Loading from "@/app/components/Loading";

import { NETWORKS } from "@/app/constants/constants";

const Page = ({
  searchParams = {
    network: NETWORKS.ethereum.name,
  },
  params,
}: {
  searchParams: {
    network: string;
  };
  params: { hash: string };
}) => {
  return (
    <div>
      <h1>Transaction</h1>
      <TransactionForm
        transaction={params.hash}
        network={searchParams.network}
      />
      <Suspense fallback={<Loading />}>
        <TransactionDetails
          transaction={params.hash}
          network={searchParams.network}
        />
      </Suspense>
    </div>
  );
};

export default Page;
