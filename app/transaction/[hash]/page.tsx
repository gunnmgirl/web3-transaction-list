"use client";
import { Hash } from "viem";
import Link from "next/link";
import { useBlock, useTransaction, useTransactionReceipt } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import Header from "app/components/Header";
import { Divider } from "app/components/Divider";
import { NETWORKS } from "app/constants";

const Page = ({
  params,
  searchParams,
}: {
  params: { hash: Hash };
  searchParams: { network: string };
}) => {
  const linkColor = `text-[${NETWORKS[searchParams.network].color}]`;
  const chainId =
    searchParams.network === NETWORKS.ethereum.name ? mainnet.id : polygon.id;
  const transaction = useTransaction({
    hash: params.hash,
    chainId,
  });
  const receipt = useTransactionReceipt({
    hash: params.hash,
    chainId,
  });
  const block = useBlock({ blockHash: transaction.data?.blockHash, chainId });

  return (
    <div>
      <Header />
      <div className="p-4">
        <h1 className="text-lg mb-2">Transaction Details</h1>
        <div className="grid grid-cols-[200px,1fr]">
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
        <div className="grid grid-cols-[200px,1fr]">
          <div>
            <p>From</p>
            <p>To</p>
          </div>
          <div>
            <Link href={`/${transaction.data?.from}`} className={linkColor}>
              <p>{transaction.data?.from}</p>
            </Link>
            <Link href={`/${transaction.data?.to}`} className={linkColor}>
              <p>{transaction.data?.to}</p>
            </Link>
          </div>
        </div>
        <Divider className="my-4" />
        <div className="grid grid-cols-[200px,1fr]">
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
