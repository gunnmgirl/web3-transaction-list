"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "app/components/Input";

const AddressForm = ({ address }: { address: string }) => {
  const [addressValue, setAddressValue] = useState(address);

  const { push } = useRouter();

  const updateParams = () => {
    push(addressValue);
  };

  return (
    <div className="flex flex-row my-4 justify-center">
      <Input label="" value={addressValue} setValue={setAddressValue} />
      <button
        onClick={updateParams}
        className="py-1 px-4 rounded-r-lg bg-gray-200"
      >
        Go
      </button>
    </div>
  );
};

export default AddressForm;
