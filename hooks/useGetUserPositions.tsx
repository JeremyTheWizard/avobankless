import { useEthers } from "@usedapp/core";
import axios from "axios";

const getUserPositions = async () => {
  const { account } = useEthers();

  let nfts: any;

  const options = {
    method: "GET",
    url: "https://api.nftport.xyz/v0/accounts/0xfd94B585517d532BC4B80E35bC26383E7834f8b9",
    params: {
      chain: "goerli",
      contract_address: "0xd4188B2E56098B13DB31F41E08357C5a8273E9Cf",
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: "1a528522-d34f-46e4-be38-b3636bb4407f",
    },
  };

  await axios
    .request(options)
    .then(function (response) {
      nfts = response.data.nfts;
    })
    .catch(function (error) {
      console.error(error);
    });

  let tokenIds: string[] = [];

  for (let i = 0; i < nfts.length; i++) {
    tokenIds.push(nfts[i].tokenId);
  }

  return tokenIds;
};

export default getUserPositions;
