import Link from "next/link";
import { Button } from "./components/Button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-grow items-center justify-center">
      <div className="rounded-lg bg-gray p-8 text-center shadow-xl">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="text-gray-600">
          Oops! The page you are looking for could not be found.
        </p>
        <Link href="/" className="mt-4 inline-block rounded px-4 py-2">
          <Button>Go back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
