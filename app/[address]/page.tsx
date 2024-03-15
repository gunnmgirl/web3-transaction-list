import { Suspense } from "react";

import Pagination from "./components/Pagination";
import Transactions from "./components/Transactions";
import Loading from "../components/Loading";
import AddressForm from "./components/AddressForm";
import Balance from "./components/Balance";

import { ETHEREUM_SAMPLE_ADDRESS, NETWORKS } from "../constants/constants";

const Page = ({
  searchParams = { network: NETWORKS.ethereum.name, page: "1" },
  params,
}: {
  searchParams: {
    network: string;
    page: string;
  };
  params: { address: string };
}) => {
  const network = searchParams.network;
  const page = searchParams.page;
  const address = params?.address || ETHEREUM_SAMPLE_ADDRESS;

  return (
    <div>
      <h1>Transactions</h1>
      <Suspense fallback={<Loading />}>
        <Balance address={address} network={network} />
      </Suspense>
      <AddressForm address={address} network={network} />
      <Suspense fallback={<Loading />}>
        <Transactions network={network} address={address} page={page} />
      </Suspense>
      <div>
        <Pagination />
      </div>
    </div>
  );
};

export default Page;
