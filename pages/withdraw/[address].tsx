import { useRouter } from "next/router";

import { NextPage } from "next";

type Props = {};

const address: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { address } = router.query;

  return <div></div>;
};

export default address;
