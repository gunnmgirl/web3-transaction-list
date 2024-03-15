"use client";
import { useParams } from "next/navigation";
import { Address } from "viem";
import AddressForm from "app/[address]/components/AddressForm";
import Balance from "app/[address]/components/Balance";

const Header = () => {
  const params = useParams();
  const address = (
    Array.isArray(params?.address) ? params?.address[0] : params?.address || ""
  ) as Address;

  return (
    <header className="flex justify-between p-2">
      <Balance address={address} />
      <AddressForm address={address} />
    </header>
  );
};

export default Header;
