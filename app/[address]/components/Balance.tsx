import { NETWORKS } from "app/constants";
import { getNetworkApiParams } from "app/helpers";

async function getData(address: string, network: string) {
  try {
    const { apiBaseUrl, apiKey, sampleAddress } = getNetworkApiParams(network);
    const addressParam = address || sampleAddress;

    const res = await fetch(
      `${apiBaseUrl}?module=account&action=balance&address=${addressParam}&tag=latest&apikey=${apiKey}`
    );

    if (!res.ok) {
      console.error("Error on fetch current balance", res);
    }

    const data = await res.json();
    if (data?.status === "0") {
      return "";
    }

    const balanceValue = data.result / Math.pow(10, 18);

    return `${balanceValue} ${NETWORKS[network].currency}`;
  } catch (error) {
    console.error("Error on fetch current balance", error);
    return "";
  }
}

const Balance = async ({ address }: { address: string }) => {
  const balanceEtf = await getData(address, NETWORKS.ethereum.name);
  const balanceMatic = await getData(address, NETWORKS.polygon.name);

  return (
    <div>
      <h1>Balance</h1>
      <p>{balanceEtf}</p>
      <p>{balanceMatic}</p>
    </div>
  );
};

export default Balance;
