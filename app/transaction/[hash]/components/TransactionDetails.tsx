import { getNetworkApiParams } from "@/app/helpers";
import { ProxyTransaction } from "@/app/types";

const getTransactionInfo = (transaction: ProxyTransaction) => {
  const amountInWei = Number(transaction.value);
  const amount = amountInWei / Math.pow(10, 18);

  const milliseconds = Number(transaction.timestamp) * 1000;
  const dateTime = new Date(milliseconds);
  const localDateTime = dateTime.toLocaleString();

  const gas = parseInt(transaction.gas, 16);
  const gasPrice = parseInt(transaction.gasPrice, 16);
  const transactionFee = (gas * gasPrice) / Math.pow(10, 18);

  const status =
    transaction.status === "1"
      ? "Successful transaction"
      : transaction.status === "0"
      ? "Failed transaction"
      : "Loading";

  return { status, transactionFee, localDateTime, amount };
};

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

const TransactionDetails = async ({
  transaction,
  network,
}: {
  transaction: string;
  network: string;
}) => {
  const data: ProxyTransaction = await getData(transaction, network);
  const transactionInfo = getTransactionInfo(data);
  return (
    <div>
      {`Amount: ${transactionInfo.amount}, Date and Time: ${transactionInfo.localDateTime}, Transaction fee: ${transactionInfo.transactionFee}, Status: ${transactionInfo.status}`}
    </div>
  );
};

export default TransactionDetails;
