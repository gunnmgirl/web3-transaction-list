"use client";
import { Hash, formatEther } from "viem";
import Link from "next/link";
import { useBlock, useTransaction, useTransactionReceipt } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import Header from "app/components/Header";
import { Divider } from "app/components/Divider";
import {
  ETHERSCAN_BASE_URL,
  NETWORKS,
  POLYGONSCAN_BASE_URL,
} from "app/constants";

const Page = ({
  params,
  searchParams,
}: {
  params: { hash: Hash };
  searchParams: { network: string };
}) => {
  const { network } = searchParams;
  const linkColor = network
    ? `text-[${NETWORKS[network].color}]`
    : `text-[${NETWORKS.polygon.color}]`;
  const baseUrl =
    network === NETWORKS.ethereum.name
      ? ETHERSCAN_BASE_URL
      : POLYGONSCAN_BASE_URL;
  const chainId = network === NETWORKS.ethereum.name ? mainnet.id : polygon.id;
  const currency = NETWORKS[network]?.currency || "";
  const transaction = useTransaction({
    hash: params.hash,
    chainId,
  });
  const receipt = useTransactionReceipt({
    hash: params.hash,
    chainId,
  });
  const block = useBlock({ blockHash: transaction.data?.blockHash, chainId });
  const value = formatEther(
    (transaction.data?.value || 0) as unknown as bigint
  );
  const gasUsed = Number(receipt.data?.gasUsed) || 0;
  const gasPrice = Number(transaction.data?.gasPrice) || 0;
  const transactionFee = gasUsed * gasPrice;

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
            <p>Timestamp:</p>
          </div>
          <div>
            <Link
              href={`${baseUrl}/tx/${transaction.data?.hash}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {transaction.data?.hash}
            </Link>
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
            <p>From:</p>
            <p>To:</p>
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
            <p>Value:</p>
            <p>Transaction Fee:</p>
            <p>Gas Price:</p>
          </div>
          <div>
            <p>{`${value} ${currency}`}</p>
            <p>{`${formatEther(
              transactionFee as unknown as bigint
            )} ${currency}`}</p>
            <p>{`${formatEther(gasPrice as unknown as bigint)} ${currency}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
