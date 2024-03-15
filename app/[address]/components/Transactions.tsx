import Table from "./Table";

import { Transaction } from "@/app/types";
import {
  ETHEREUM_SAMPLE_ADDRESS,
  ETHERSCAN_BASE_URL,
  NETWORKS,
  POLYGONSCAN_BASE_URL,
  POLYGON_SAMPLE_ADDRESS,
} from "@/app/constants";

const getNetworkApiParams = (network: string) => {
  switch (network) {
    case NETWORKS.ethereum.name:
      return {
        apiKey: process.env.ETHERSCAN_API_KEY,
        apiBaseUrl: ETHERSCAN_BASE_URL,
        sampleAddress: ETHEREUM_SAMPLE_ADDRESS,
      };

    case NETWORKS.polygon.name:
      return {
        apiKey: process.env.POLYGONSCAN_API_KEY,
        apiBaseUrl: POLYGONSCAN_BASE_URL,
        sampleAddress: POLYGON_SAMPLE_ADDRESS,
      };

    default:
      return {
        apiKey: process.env.ETHERSCAN_API_KEY,
        apiBaseUrl: ETHERSCAN_BASE_URL,
        sampleAddress: ETHEREUM_SAMPLE_ADDRESS,
      };
  }
};

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

const Transactions = async ({
  network,
  address,
  page,
}: {
  network: string;
  address: string;
  page: string | number;
}) => {
  const transactions: Transaction[] = await getData(address, network, page);

  return (
    <div>
      <h1>Transactions</h1>
      {transactions?.length ? (
        <Table
          transactions={transactions}
          network={network}
          address={address}
        />
      ) : (
        <div>No transactions</div>
      )}
    </div>
  );
};

export default Transactions;
