import {
  ETHEREUM_SAMPLE_ADDRESS,
  ETHEREUM_SAMPLE_TRANSACTION,
  ETHERSCAN_API_BASE_URL,
  NETWORKS,
  POLYGONSCAN_API_BASE_URL,
  POLYGON_SAMPLE_ADDRESS,
  POLYGON_SAMPLE_TRANSACTION,
} from "app/constants";

export const getNetworkApiParams = (network: string) => {
  switch (network) {
    case NETWORKS.ethereum.name:
      return {
        apiKey: process.env.ETHERSCAN_API_KEY,
        apiBaseUrl: ETHERSCAN_API_BASE_URL,
        sampleAddress: ETHEREUM_SAMPLE_ADDRESS,
        sampleTransaction: ETHEREUM_SAMPLE_TRANSACTION,
      };

    case NETWORKS.polygon.name:
      return {
        apiKey: process.env.POLYGONSCAN_API_KEY,
        apiBaseUrl: POLYGONSCAN_API_BASE_URL,
        sampleAddress: POLYGON_SAMPLE_ADDRESS,
        sampleTransaction: POLYGON_SAMPLE_TRANSACTION,
      };

    default:
      return {
        apiKey: process.env.ETHERSCAN_API_KEY,
        apiBaseUrl: ETHERSCAN_API_BASE_URL,
        sampleAddress: ETHEREUM_SAMPLE_ADDRESS,
        sampleTransaction: ETHEREUM_SAMPLE_TRANSACTION,
      };
  }
};

export const formatHash = (hash: string) => {
  const start = hash.substring(0, 6);
  const end = hash.substring(hash.length - 4);

  return `${start}...${end}`;
};
