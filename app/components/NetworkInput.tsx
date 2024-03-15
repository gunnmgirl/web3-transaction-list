"use client";

import { NETWORKS } from "@/app/constants";

const NetworkInput = ({
  value,
  setValue,
}: {
  value: string;
  setValue: Function;
}) => {
  return (
    <div>
      <input
        type="radio"
        id="ethereum"
        name="blockchain_network"
        value={NETWORKS.ethereum.name}
        checked={value === NETWORKS.ethereum.name}
        onChange={() => setValue(NETWORKS.ethereum.name)}
      />
      <label htmlFor={NETWORKS.ethereum.name}>ETHEREUM</label>
      <input
        type="radio"
        id="polygon"
        name="blockchain_network"
        value={NETWORKS.polygon.name}
        checked={value === NETWORKS.polygon.name}
        onChange={() => setValue(NETWORKS.polygon.name)}
      />
      <label htmlFor={NETWORKS.polygon.name}>POLYGON</label>
    </div>
  );
};

export default NetworkInput;
