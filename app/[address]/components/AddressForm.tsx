"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "app/components/Input";
import { Button } from "app/components/Button";

const AddressForm = ({ address }: { address: string }) => {
  const [addressValue, setAddressValue] = useState(address);

  const { push } = useRouter();

  const updateParams = () => {
    push(addressValue);
  };

  return (
    <form className="flex items-end justify-center">
      <Input
        label=""
        value={addressValue}
        onChange={(event) => setAddressValue(event.target.value)}
        placeholder="Search by address"
      />
      <Button className="ml-2" onClick={updateParams}>
        Search
      </Button>
    </form>
  );
};

export default AddressForm;
