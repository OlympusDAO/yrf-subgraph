import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt } from "@graphprotocol/graph-ts"
import { NextYieldSet } from "../generated/schema"
import { NextYieldSet as NextYieldSetEvent } from "../generated/YieldRepurchaseFacility/YieldRepurchaseFacility"
import { handleNextYieldSet } from "../src/yield-repurchase-facility"
import { createNextYieldSetEvent } from "./yield-repurchase-facility-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let nextYield = BigInt.fromI32(234)
    let newNextYieldSetEvent = createNextYieldSetEvent(nextYield)
    handleNextYieldSet(newNextYieldSetEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("NextYieldSet created and stored", () => {
    assert.entityCount("NextYieldSet", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "NextYieldSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "nextYield",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
