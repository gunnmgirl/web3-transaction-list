import { redirect } from "next/navigation";

import { ETHEREUM_SAMPLE_ADDRESS, NETWORKS } from "app/constants";

const Page = () =>
  redirect(
    `${ETHEREUM_SAMPLE_ADDRESS}?network=${NETWORKS.ethereum.name}&page=1`
  );

export default Page;
