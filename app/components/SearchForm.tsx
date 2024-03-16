"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "app/components/Input";
import { Button } from "app/components/Button";

const AddressForm = ({
  initialValue,
  inputType,
}: {
  initialValue: string;
  inputType: "address" | "hash";
}) => {
  const [value, setValue] = useState(initialValue);
  const placeholder =
    inputType === "address" ? "Search by address" : "Search by hash";
  const { push } = useRouter();

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    inputType === "address" ? push(`/${value}`) : push(`/transaction/${value}`);
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex items-end justify-center mt-2 md:mt-0"
    >
      <Input
        label=""
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
      />
      <Button type="submit" className="ml-2">
        Search
      </Button>
    </form>
  );
};

export default AddressForm;
