import { Address } from "@graphprotocol/graph-ts";

import { Contract } from "../../generated/schema";
import { YieldRepurchaseFacilityV1_0 } from "../../generated/YieldRepurchaseFacilityV1_0/YieldRepurchaseFacilityV1_0";
import { getOrCreateToken } from "./token-lookup";

export function getOrCreateContract(address: Address): Contract {
  let contract = Contract.load(address.toHexString());

  if (contract == null) {
    contract = new Contract(address.toHexString());
    contract.address = address;

    const contractInstance = YieldRepurchaseFacilityV1_0.bind(address);

    contract.majorVersion = 1;
    contract.minorVersion = 0;
    contract.version = "1.0";

    const daiAddress = contractInstance.dai();
    const reserveToken = getOrCreateToken(daiAddress);
    contract.reserveToken = reserveToken.id;

    contract.save();
  }

  return contract as Contract;
}
