import { chainMatchValoper, prefixToChain } from "./chains";

describe("chainMatchValoper()", () => {
  test.each([
    // Cosmos
    {
      chain: "cosmoshub",
      address: "cosmosvaloper1sjllsnramtg3ewxqwwrwjxfgc4n4ef9u2lcnj0",
      expected: true,
    },
    // Cronos
    {
      chain: "cronos",
      address: "crcvaloper1yldx0l594euhr02lu8twgs44ms9d0vyxj09ury",
      expected: true,
    },
    // Gravity Bridge
    {
      chain: "gravitybridge",
      address: "gravityvaloper1pvd3uzer0pv4pyc3h7ft9ky082pd3rj3lqm9yq",
      expected: true,
    },
    // Invalid address
    {
      chain: "gravitybridge",
      address: "invalid-address",
      expected: false,
    },
    // Invalid chain
    {
      chain: "does-not-exist",
      address: "gravityvaloper1pvd3uzer0pv4pyc3h7ft9ky082pd3rj3lqm9yq",
      expected: false,
    },
  ])("chainMatchValoper($chain, $address)", ({ chain, address, expected }) => {
    expect(chainMatchValoper(chain, address)).toEqual(expected);
  });
});

describe("prefixToChain($agoric)", () => {
  test.each([
    {
      prefix: "agoric",
      expected: "agoric",
    },
    {
      prefix: "did:com:",
      expected: "commercionetwork",
    },
    {
      prefix: "cosmos",
      expected: "cosmoshub",
    },
    {
      prefix: "gravity",
      expected: "gravitybridge",
    },
    {
      prefix: "does-not-exist",
      expected: "does-not-exist",
    },
  ])("chainMatchValoper($chain, $address)", ({ prefix, expected }) => {
    expect(prefixToChain(prefix)).toEqual(expected);
  });
});
