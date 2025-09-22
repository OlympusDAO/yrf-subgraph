import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import {
  NextYieldSet,
  RepoMarket,
  Shutdown
} from "../generated/YieldRepurchaseFacility/YieldRepurchaseFacility"

export function createNextYieldSetEvent(nextYield: BigInt): NextYieldSet {
  let nextYieldSetEvent = changetype<NextYieldSet>(newMockEvent())

  nextYieldSetEvent.parameters = new Array()

  nextYieldSetEvent.parameters.push(
    new ethereum.EventParam(
      "nextYield",
      ethereum.Value.fromUnsignedBigInt(nextYield)
    )
  )

  return nextYieldSetEvent
}

export function createRepoMarketEvent(
  marketId: BigInt,
  bidAmount: BigInt
): RepoMarket {
  let repoMarketEvent = changetype<RepoMarket>(newMockEvent())

  repoMarketEvent.parameters = new Array()

  repoMarketEvent.parameters.push(
    new ethereum.EventParam(
      "marketId",
      ethereum.Value.fromUnsignedBigInt(marketId)
    )
  )
  repoMarketEvent.parameters.push(
    new ethereum.EventParam(
      "bidAmount",
      ethereum.Value.fromUnsignedBigInt(bidAmount)
    )
  )

  return repoMarketEvent
}

export function createShutdownEvent(): Shutdown {
  let shutdownEvent = changetype<Shutdown>(newMockEvent())

  shutdownEvent.parameters = new Array()

  return shutdownEvent
}
