import { Address } from "@graphprotocol/graph-ts";

import { Contract } from "../../generated/schema";
import { YieldRepurchaseFacilityV1_1 } from "../../generated/YieldRepurchaseFacilityV1_1/YieldRepurchaseFacilityV1_1";
import { getOrCreateToken } from "./token-lookup";

export function getOrCreateContract(address: Address): Contract {
  let contract = Contract.load(address.toHexString());

  if (contract == null) {
    contract = new Contract(address.toHexString());
    contract.address = address;

    const contractInstance = YieldRepurchaseFacilityV1_1.bind(address);

    const version = contractInstance.VERSION();

    // Version
    contract.majorVersion = version.getMajor();
    contract.minorVersion = version.getMinor();
    contract.version = version.getMajor().toString() + "." + version.getMinor().toString();

    // Reserve token
    const reserveAddress = contractInstance.reserve();
    const reserveToken = getOrCreateToken(reserveAddress);
    contract.reserveToken = reserveToken.id;

    contract.save();
  }

  return contract as Contract;
}
