import { Address } from "viem";
import Pagination from "app/[address]/components/Pagination";
import Transactions from "app/[address]/components/Transactions";
import Header from "app/components/Header";
import { getNetworkApiParams } from "app/helpers";
import { ETHEREUM_SAMPLE_ADDRESS, NETWORKS } from "app/constants";
import { Transaction } from "app/types";

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
  searchParams,
  params,
}: {
  searchParams: {
    page: string;
  };
  params: { address: Address };
}) => {
  const page = searchParams?.page || "1";
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
      <Header />
      <div className="p-2">
        <h1 className="text-lg mb-2">Transactions</h1>
        <Transactions transactions={{ ethereum, polygon }} />
        <Pagination />
      </div>
    </div>
  );
};

export default Page;
