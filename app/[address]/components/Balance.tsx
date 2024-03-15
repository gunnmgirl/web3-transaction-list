"use client";
import { Address, formatEther } from "viem";
import { useBalance } from "wagmi";
import BigNumber from "bignumber.js";

const Balance = ({ address }: { address: Address }) => {
  const result = useBalance({
    address: address,
  });

  const balanceEth = result.data?.value
    ? new BigNumber(formatEther(result.data.value))
    : 0;

  return (
    <div>
      <span>Current Balance: </span>
      <span className="text-[#00FFFF]">
        {result.isLoading
          ? "..."
          : `${balanceEth.toFixed(6)} ${result.data?.symbol || ""}`}
      </span>
    </div>
  );
};

export default Balance;
