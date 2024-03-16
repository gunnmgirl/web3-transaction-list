"use client";
import { Address, formatEther } from "viem";
import { useBalance } from "wagmi";
import { polygon } from "wagmi/chains";
import BigNumber from "bignumber.js";

const Balance = ({ address }: { address: Address }) => {
  const resultEth = useBalance({
    address: address,
  });
  const resultMatic = useBalance({
    address: address,
    chainId: polygon.id,
  });

  const balanceEth = resultEth.data?.value
    ? new BigNumber(formatEther(resultEth.data.value))
    : 0;
  const balanceMatic = resultMatic.data?.value
    ? new BigNumber(formatEther(resultMatic.data.value))
    : 0;

  return (
    <div className="flex gap-2">
      <span>Current Balance:</span>
      <span className="text-[#6ab5db]">
        {resultEth.isLoading
          ? "..."
          : `${balanceEth.toFixed(6)} ${resultEth.data?.symbol || ""}`}
      </span>
      <span className="text-[#884bf2]">
        {resultMatic.isLoading
          ? "..."
          : `${balanceMatic.toFixed(6)} ${resultMatic.data?.symbol || ""}`}
      </span>
    </div>
  );
};

export default Balance;
