import { Address, log } from "@graphprotocol/graph-ts";

import { Token } from "../../generated/schema";
import { ERC20 } from "../../generated/YieldRepurchaseFacilityV1_0/ERC20";

export function getToken(address: string): Token {
  const token = Token.load(address);

  if (token == null) {
    throw new Error("Token not found for address: " + address);
  }

  return token as Token;
}

export function getOrCreateToken(address: Address): Token {
  let token = Token.load(address.toHexString());

  if (token == null) {
    token = new Token(address.toHexString());
    token.address = address;

    const erc20Contract = ERC20.bind(address);

    const symbolResult = erc20Contract.try_symbol();
    if (!symbolResult.reverted) {
      token.symbol = symbolResult.value;
    } else {
      log.warning("Failed to get symbol for token {}", [address.toHexString()]);
      token.symbol = "UNKNOWN";
    }

    const nameResult = erc20Contract.try_name();
    if (!nameResult.reverted) {
      token.name = nameResult.value;
    } else {
      log.warning("Failed to get name for token {}", [address.toHexString()]);
      token.name = "Unknown Token";
    }

    const decimalsResult = erc20Contract.try_decimals();
    if (!decimalsResult.reverted) {
      token.decimals = decimalsResult.value;
    } else {
      log.warning("Failed to get decimals for token {}", [address.toHexString()]);
      token.decimals = 18;
    }

    token.save();
  }

  return token as Token;
}
