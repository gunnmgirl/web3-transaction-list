"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Input from "@/app/components/Input";

const AddressForm = ({ address }: { address: string }) => {
  const [addressValue, setAddressValue] = useState(address);

  const { push } = useRouter();

  const updateParams = () => {
    push(addressValue);
  };

  return (
    <div>
      <Input
        label="Transaction"
        value={addressValue}
        setValue={setAddressValue}
      />
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
