import { redirect } from "next/navigation";

import { ETHEREUM_SAMPLE_ADDRESS } from "app/constants";

const Page = () => redirect(`${ETHEREUM_SAMPLE_ADDRESS}?page=1`);

export default Page;
