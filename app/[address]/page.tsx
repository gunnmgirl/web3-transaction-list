import { Suspense } from "react";

import Pagination from "./components/Pagination";
import Transactions from "./components/Transactions";
import Loading from "../components/Loading";
import Balance from "./components/Balance";

import { getNetworkApiParams } from "../helpers";
import { ETHEREUM_SAMPLE_ADDRESS, NETWORKS } from "../constants";
import { Transaction } from "../types";

const getApiUrl = (address: string, network: string, page: string | number) => {
  const { apiBaseUrl, apiKey, sampleAddress } = getNetworkApiParams(network);
  const addressParam = address || sampleAddress;
  const actions = `module=account&action=txlist&page=${page}&offset=${10}`;

  return `${apiBaseUrl}?${actions}&address=${addressParam}&apikey=${apiKey}`;
};

const getData = async (
  address: string,
  network: string,
  page: string | number
) => {
  try {
    const apiUrl = getApiUrl(address, network, page);
    const res = await fetch(apiUrl);

    if (!res.ok) {
      return [];
    }
    const data = await res.json();
    if (data?.status === "0") {
      return [];
    }
    return data.result;
  } catch (error) {
    return [];
  }
};

const Page = async ({
  searchParams = { page: "1" },
  params,
}: {
  searchParams: {
    page: string;
  };
  params: { address: string };
}) => {
  const page = searchParams.page;
  const address = params?.address || ETHEREUM_SAMPLE_ADDRESS;

  const ethereum: Transaction[] = await getData(
    address,
    NETWORKS.ethereum.name,
    page
  );
  const polygon: Transaction[] = await getData(
    address,
    NETWORKS.polygon.name,
    page
  );

  return (
    <div>
      <h1>Transactions</h1>
      <Suspense fallback={<Loading />}>
        <Balance address={address} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Transactions transactions={{ ethereum, polygon }} />
      </Suspense>
      <div>
        <Pagination />
      </div>
    </div>
  );
};

export default Page;
