import Transaction from "app/transaction/[hash]/components/Transaction";
import { getNetworkApiParams } from "app/helpers";
import { NETWORKS } from "app/constants";
import { ProxyTransaction } from "app/types";

const getData = async (transaction: string, network: string) => {
  try {
    const { apiBaseUrl, apiKey, sampleTransaction } =
      getNetworkApiParams(network);
    const transactionParam = transaction || sampleTransaction;

    const resTransaction = await fetch(
      `${apiBaseUrl}?module=proxy&action=eth_getTransactionByHash&txhash=${transactionParam}&apikey=${apiKey}`
    );
    const dataTransaction = await resTransaction.json();
    const { blockNumber } = dataTransaction.result;

    const resBlock = await fetch(
      `${apiBaseUrl}?module=proxy&action=eth_getBlockByNumber&tag=${blockNumber}&boolean=true&apikey=${apiKey}`
    );
    const dataBlock = (await resBlock.json()) || {};

    const resStatus = await fetch(
      `${apiBaseUrl}?module=transaction&action=gettxreceiptstatus&txhash=${transactionParam}&apikey=${apiKey}`
    );
    const dataStatus = (await resStatus.json()) || {};

    if (!resTransaction.ok) {
      return {};
    }

    const { timestamp } = dataBlock?.result || {};
    const { status } = dataStatus?.result || {};

    return { ...dataTransaction.result, timestamp, status };
  } catch (error) {
    return {};
  }
};

const Page = async ({ params }: { params: { hash: string } }) => {
  const ethereum: ProxyTransaction = await getData(
    params.hash,
    NETWORKS.ethereum.name
  );
  const polygon: ProxyTransaction = await getData(
    params.hash,
    NETWORKS.polygon.name
  );

  return (
    <div>
      <h1>Transaction</h1>
      <Transaction transaction={{ ethereum, polygon }} hash={params.hash} />
    </div>
  );
};

export default Page;
