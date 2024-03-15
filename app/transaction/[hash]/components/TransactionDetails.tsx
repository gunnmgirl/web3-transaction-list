import { ProxyTransaction } from "app/types";

const getTransactionInfo = (transaction: ProxyTransaction) => {
  const amountInWei = Number(transaction?.value);
  const amount = amountInWei / Math.pow(10, 18);

  const milliseconds = Number(transaction?.timestamp) * 1000;
  const dateTime = new Date(milliseconds);
  const localDateTime = dateTime?.toLocaleString();

  const gas = parseInt(transaction?.gas, 16);
  const gasPrice = parseInt(transaction?.gasPrice, 16);
  const transactionFee = (gas * gasPrice) / Math.pow(10, 18);

  const status =
    transaction.status === "1"
      ? "Successful transaction"
      : transaction.status === "0"
      ? "Failed transaction"
      : "Loading";

  return { status, transactionFee, localDateTime, amount };
};

const TransactionDetails = ({
  transaction,
}: {
  transaction: ProxyTransaction;
}) => {
  const transactionInfo = getTransactionInfo(transaction);
  return (
    <div>
      {`Amount: ${transactionInfo.amount}, Date and Time: ${transactionInfo.localDateTime}, Transaction fee: ${transactionInfo.transactionFee}, Status: ${transactionInfo.status}`}
    </div>
  );
};

export default TransactionDetails;
