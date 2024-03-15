"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Input from "@/app/components/Input";
import NetworkInput from "@/app/components/NetworkInput";

const AddressForm = ({
  address,
  network,
}: {
  address: string;
  network: string;
}) => {
  const [addressValue, setAddressValue] = useState(address);
  const [networkValue, setNetworkValue] = useState(network);

  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const updateParams = () => {
    const params = new URLSearchParams(searchParams);
    params.set("network", networkValue);
    params.set("page", "1");

    replace(`${address}?${params.toString()}`);
  };

  return (
    <div>
      <Input label="Address" value={addressValue} setValue={setAddressValue} />
      <NetworkInput value={networkValue} setValue={setNetworkValue} />
      <button
        onClick={updateParams}
        className="py-1 px-2 rounded-sm bg-gray-200"
      >
        Go
      </button>
    </div>
  );
};

export default AddressForm;
