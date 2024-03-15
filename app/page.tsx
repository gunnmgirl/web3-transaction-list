import { redirect } from "next/navigation";

import { ETHEREUM_SAMPLE_ADDRESS, NETWORKS } from "./constants/constants";

const Page = () =>
  redirect(`${ETHEREUM_SAMPLE_ADDRESS}?network=${NETWORKS.ethereum.name}`);

export default Page;
