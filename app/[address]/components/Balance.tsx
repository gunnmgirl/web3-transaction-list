import { NETWORKS } from "@/app/constants/constants";
import { getNetworkApiParams } from "@/app/helpers/helpers";

async function getData(address: string, network: string) {
  try {
    const { apiBaseUrl, apiKey, sampleAddress } = getNetworkApiParams(network);
    const addressParam = address || sampleAddress;

    const res = await fetch(
      `${apiBaseUrl}?module=account&action=balance&address=${addressParam}&tag=latest&apikey=${apiKey}`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    if (data?.status === "0") {
      return "";
    }

    const balanceValue = data.result / Math.pow(10, 18);

    return `${balanceValue} ${NETWORKS[network].currency}`;
  } catch (error) {
    return "";
  }
}

const Balance = async ({
  address,
  network,
}: {
  address: string;
  network: string;
}) => {
  const balance = await getData(address, network);

  return (
    <div>
      <h1>Balance</h1>
      <span>{balance}</span>
    </div>
  );
};

export default Balance;
