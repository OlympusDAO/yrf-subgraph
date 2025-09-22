import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";

export function convertTokenAmountToDecimal(amount: BigInt, decimals: i32): BigDecimal {
  const divisor = BigInt.fromI32(10).pow(decimals as u8);
  return amount.toBigDecimal().div(divisor.toBigDecimal());
}

export const ZERO_BD = BigDecimal.fromString("0");
export const ONE_BD = BigDecimal.fromString("1");
export const BI_18 = BigInt.fromI32(18);
