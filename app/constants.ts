export const NETWORKS: {
  [key: string]: { currency: string; name: string; color: string };
} = {
  ethereum: { currency: "ETH", name: "ethereum", color: "#6ab5db" },
  polygon: { currency: "MATIC", name: "polygon", color: "#884bf2" },
};
export const ETHERSCAN_API_BASE_URL = "https://api.etherscan.io/api";
export const ETHERSCAN_BASE_URL = "https://etherscan.io";
export const ETHEREUM_SAMPLE_ADDRESS =
  "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
export const ETHEREUM_SAMPLE_TRANSACTION =
  "0xea00c8eab66c807811ae216eb920f89d3c2a406c61e334fde8dbc72efaefcab5";
export const POLYGONSCAN_API_BASE_URL = "https://api.polygonscan.com/api";
export const POLYGONSCAN_BASE_URL = "https://polygonscan.com";
export const POLYGON_SAMPLE_ADDRESS =
  "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619";
export const POLYGON_SAMPLE_TRANSACTION =
  "0xea00c8eab66c807811ae216eb920f89d3c2a406c61e334fde8dbc72efaefcab5";
