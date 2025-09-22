import { NextYieldSet, RepoMarket, Shutdown } from "../../generated/schema";
import {
  NextYieldSet as NextYieldSetEvent,
  RepoMarket as RepoMarketEvent,
  Shutdown as ShutdownEvent,
} from "../../generated/YieldRepurchaseFacilityV1_1/YieldRepurchaseFacilityV1_1";
import { getOrCreateContract } from "../utils/contract-lookup-v1_1";
import { convertTokenAmountToDecimal } from "../utils/decimal-conversion";
import { getToken } from "../utils/token-lookup";

export function handleNextYieldSet(event: NextYieldSetEvent): void {
  const entity = new NextYieldSet(event.transaction.hash.concatI32(event.logIndex.toI32()));

  const contract = getOrCreateContract(event.address);
  const reserveToken = getToken(contract.reserveToken);

  entity.contract = contract.id;
  entity.nextYield = event.params.nextYield;
  entity.nextYieldDecimal = convertTokenAmountToDecimal(
    event.params.nextYield,
    reserveToken.decimals
  );

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleRepoMarket(event: RepoMarketEvent): void {
  const entity = new RepoMarket(event.transaction.hash.concatI32(event.logIndex.toI32()));

  const contract = getOrCreateContract(event.address);
  const reserveToken = getToken(contract.reserveToken);

  entity.contract = contract.id;
  entity.marketId = event.params.marketId;
  entity.bidAmount = event.params.bidAmount;
  entity.bidAmountDecimal = convertTokenAmountToDecimal(
    event.params.bidAmount,
    reserveToken.decimals
  );

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleShutdown(event: ShutdownEvent): void {
  const entity = new Shutdown(event.transaction.hash.concatI32(event.logIndex.toI32()));

  const contract = getOrCreateContract(event.address);
  entity.contract = contract.id;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
