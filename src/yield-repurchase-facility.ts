import {
  NextYieldSet as NextYieldSetEvent,
  RepoMarket as RepoMarketEvent,
  Shutdown as ShutdownEvent
} from "../generated/YieldRepurchaseFacility/YieldRepurchaseFacility"
import { NextYieldSet, RepoMarket, Shutdown } from "../generated/schema"

export function handleNextYieldSet(event: NextYieldSetEvent): void {
  let entity = new NextYieldSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.nextYield = event.params.nextYield

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRepoMarket(event: RepoMarketEvent): void {
  let entity = new RepoMarket(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.marketId = event.params.marketId
  entity.bidAmount = event.params.bidAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleShutdown(event: ShutdownEvent): void {
  let entity = new Shutdown(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
