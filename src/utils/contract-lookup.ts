import { Address } from "@graphprotocol/graph-ts";

import { Contract } from "../../generated/schema";
import { YieldRepurchaseFacilityV1_0 } from "../../generated/YieldRepurchaseFacilityV1_0/YieldRepurchaseFacilityV1_0";
import { YieldRepurchaseFacilityV1_1 } from "../../generated/YieldRepurchaseFacilityV1_1/YieldRepurchaseFacilityV1_1";
import { getOrCreateToken } from "./token-lookup";

export function getContractVersion(address: Address): string {
  const addressStr = address.toHexString().toLowerCase();

  if (addressStr == "0x30a967eb957e5b1ee053b75f1a57ea6bfb2e907e") {
    return "1.0";
  } else if (addressStr == "0xcaa3d3e653a626e2656d2e799564fe952d39d855") {
    return "1.1";
  } else if (addressStr == "0x271e35a8555a62f6ba76508e85dfd76d580b0692") {
    return "1.2";
  }

  return "unknown";
}

export function getMajorVersion(version: string): i32 {
  const parts = version.split(".");
  if (parts.length >= 1) {
    return parseInt(parts[0]) as i32;
  }
  return 0;
}

export function getMinorVersion(version: string): i32 {
  const parts = version.split(".");
  if (parts.length >= 2) {
    return parseInt(parts[1]) as i32;
  }
  return 0;
}

export function getOrCreateContractV1_0(address: Address): Contract {
  let contract = Contract.load(address.toHexString());

  if (contract == null) {
    contract = new Contract(address.toHexString());
    contract.address = address;
    contract.version = "1.0";
    contract.majorVersion = 1;
    contract.minorVersion = 0;

    const contractInstance = YieldRepurchaseFacilityV1_0.bind(address);
    const daiResult = contractInstance.try_dai();
    if (!daiResult.reverted) {
      const reserveToken = getOrCreateToken(daiResult.value);
      contract.reserveToken = reserveToken.id;
    }

    contract.save();
  }

  return contract as Contract;
}

export function getOrCreateContractV1_1Plus(address: Address): Contract {
  let contract = Contract.load(address.toHexString());

  if (contract == null) {
    contract = new Contract(address.toHexString());
    contract.address = address;

    const version = getContractVersion(address);
    contract.version = version;
    contract.majorVersion = getMajorVersion(version);
    contract.minorVersion = getMinorVersion(version);

    const contractInstance = YieldRepurchaseFacilityV1_1.bind(address);
    const sReserveResult = contractInstance.try_sReserve();
    if (!sReserveResult.reverted) {
      const reserveToken = getOrCreateToken(sReserveResult.value);
      contract.reserveToken = reserveToken.id;
    }

    contract.save();
  }

  return contract as Contract;
}
