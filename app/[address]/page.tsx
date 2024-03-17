import { Address } from "viem";
import Transactions from "app/[address]/components/Transactions";
import Header from "app/components/Header";
import { getNetworkApiParams } from "app/helpers";
import { ETHEREUM_SAMPLE_ADDRESS, NETWORKS } from "app/constants";
import { Transaction } from "app/types";

const getApiUrl = (
  address: string,
  network: string,
  page: string | number,
  offset: string
) => {
  const { apiBaseUrl, apiKey, sampleAddress } = getNetworkApiParams(network);
  const addressParam = address || sampleAddress;
  const actions = `module=account&action=txlist&page=${page}&offset=${offset}`;

  return `${apiBaseUrl}?${actions}&address=${addressParam}&apikey=${apiKey}`;
};

const getData = async (
  address: string,
  network: string,
  page: string | number,
  offset: string
) => {
  try {
    const apiUrl = getApiUrl(address, network, page, offset);
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
  searchParams,
  params,
}: {
  searchParams: {
    page: string;
    offset: string;
  };
  params: { address: Address };
}) => {
  const page = searchParams?.page || "1";
  const offset = searchParams?.offset || "20";
  const address = params?.address || ETHEREUM_SAMPLE_ADDRESS;

  const ethereum: Transaction[] = await getData(
    address,
    NETWORKS.ethereum.name,
    page,
    offset
  );
  const polygon: Transaction[] = await getData(
    address,
    NETWORKS.polygon.name,
    page,
    offset
  );

  return (
    <div className="h-screen gap-1 grid grid-rows-[auto,1fr]">
      <Header />
      <div className="p-4 grid min-h-[400px] grid-rows-[auto,auto,1fr,auto]">
        <h1 className="text-lg mb-2">Transactions</h1>
        <Transactions transactions={{ ethereum, polygon }} />
      </div>
    </div>
  );
};

export default Page;
