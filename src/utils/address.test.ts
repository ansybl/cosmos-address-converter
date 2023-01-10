import {
  pubKeyToBench32,
  pubKeyToHexAddress,
  operatorAddressToAccount,
} from "./address";

const pubKey = "PqWnXUJKp3/1GG1rcX7QGqBXAUGVh9eLxhhlFCJdjg4=";

describe("pubKeyToBench32()", () => {
  const prefix = "gravityvalcons";

  test("happy scenario", () => {
    const expected = "gravityvalcons1rdr8m294t9p34wjeq2qtt3q7errsufrjjyu8g0";
    expect(pubKeyToBench32(pubKey, prefix)).toEqual(expected);
  });

  test("invalid public key", () => {
    const pubKey = "invalid";
    const expected = "Invalid string. Length must be a multiple of 4";
    expect(() => pubKeyToBench32(pubKey, prefix)).toThrow(expected);
  });
});

describe("pubKeyToHexAddress()", () => {
  test("happy scenario", () => {
    const expected = "1B467DA8B559431ABA590280B5C41EC8C70E2472";
    expect(pubKeyToHexAddress(pubKey)).toEqual(expected);
  });
});

describe("operatorAddressToAccount()", () => {
  test.each([
    // Gravity Bridge
    {
      address: "gravityvaloper1pvd3uzer0pv4pyc3h7ft9ky082pd3rj3lqm9yq",
      expected: "gravity1pvd3uzer0pv4pyc3h7ft9ky082pd3rj3wtzmw5",
    },
    // Cronos (special case)
    {
      address: "crcvaloper1yldx0l594euhr02lu8twgs44ms9d0vyxj09ury",
      expected: "crc1yldx0l594euhr02lu8twgs44ms9d0vyxcs5sad",
    },
    // Irish (special case)
    {
      address: "iva1543nj4z07vjqztvu3358fr2z2hcp0qtmceank5",
      expected: "iaa1543nj4z07vjqztvu3358fr2z2hcp0qtmdghutn",
    },
  ])("happy scenario $address", ({ address, expected }) => {
    expect(operatorAddressToAccount(address)).toEqual(expected);
  });
});
