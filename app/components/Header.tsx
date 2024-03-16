"use client";
import { useParams } from "next/navigation";
import { Address, Hash } from "viem";
import Link from "next/link";
import SearchForm from "app/components/SearchForm";
import Balance from "app/[address]/components/Balance";
import { Button } from "app/components/Button";

const Header = () => {
  const params = useParams();
  const address = (
    Array.isArray(params?.address) ? params?.address[0] : params?.address || ""
  ) as Address;
  const hash = (
    Array.isArray(params?.hash) ? params?.hash[0] : params?.hash || ""
  ) as Hash;

  return (
    <header className="flex flex-col justify-between items-center p-4 md:flex-row">
      {address ? (
        <Balance address={address} />
      ) : (
        <Link href="/">
          <Button>Home</Button>
        </Link>
      )}
      <SearchForm
        inputType={address ? "address" : "hash"}
        initialValue={address ? address : hash}
      />
    </header>
  );
};

export default Header;
