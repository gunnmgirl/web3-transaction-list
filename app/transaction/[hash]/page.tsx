"use client";
import { Hash } from "viem";
import { useBlock, useTransaction, useTransactionReceipt } from "wagmi";
import Header from "app/components/Header";
import { Divider } from "app/components/Divider";

const Page = ({ params }: { params: { hash: Hash } }) => {
  const transaction = useTransaction({
    hash: params.hash,
  });

  const receipt = useTransactionReceipt({
    hash: params.hash,
  });

  const block = useBlock({ blockHash: transaction.data?.blockHash });

  return (
    <div>
      <Header />
      <div className="p-4">
        <h1 className="text-lg mb-2">Transaction Details</h1>
        <div className="grid grid-cols-[200px_1fr]">
          <div>
            <p>Hash:</p>
            <p>Status:</p>
            <p>Block:</p>
            <p>Timestamp</p>
          </div>
          <div>
            <p>{transaction.data?.hash}</p>
            {receipt.data?.status === "success" ? (
              <p className="text-[#39FF14]">Success</p>
            ) : (
              <p>Reverted</p>
            )}
            <p>{block.data?.number.toString()}</p>
            <p>{block.data?.timestamp.toString()}</p>
          </div>
        </div>
        <Divider className="my-4" />
        <div className="grid grid-cols-[200px_1fr]">
          <div>
            <p>From</p>
            <p>To</p>
          </div>
          <div>
            <p>{transaction.data?.from}</p>
            <p>{transaction.data?.to}</p>
          </div>
        </div>
        <Divider className="my-4" />
        <div className="grid grid-cols-[200px_1fr]">
          <div>
            <p>Value</p>
            <p>Transaction Fee</p>
            <p>Gas Price</p>
          </div>
          <div>
            <p>{transaction.data?.value.toString()}</p>
            <p>{transaction.data?.gas.toString()}</p>
            <p>{transaction.data?.gasPrice?.toString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
