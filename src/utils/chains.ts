import { chains } from "chain-registry";
import { valoperToPrefix } from "./helpers";

const prefixChainMap: Record<string, string> = {
  bze: "beezee",
  bcna: "bitcanna",
  swth: "carbon",
  c4e: "chain4energy",
  "did:com:": "commercionetwork",
  cosmos: "cosmoshub",
  cre: "crescent",
  crc: "cronos",
  cro: "crypto",
  fetch: "fetchai",
  genesis: "genesisl1",
  gravity: "gravitybridge",
  inj: "injective",
  iaa: "iris",
  ixo: "ixo",
  jkl: "jackal",
  juno: "juno",
  kava: "kava",
  ki: "kichain",
  lamb: "lambda",
  like: "likecoin",
  lumen: "lumenx",
  micro: "microtick",
  n: "nym",
  osmo: "osmosis",
  pasg: "passage",
  plq: "planq",
  pb: "provenance",
  quick: "quicksilver",
  sent: "sentinel",
  certik: "shentu",
  sif: "sifchain",
  stafi: "stafihub",
  stars: "stargaze",
  star: "starname",
  tori: "teritori",
  terra: "terra2",
  umee: "umee",
  und: "unification",
  vdl: "vidulum",
};

const chainList = chains.map(({ chain_name }) => chain_name);

const prefixToChain = (prefix: string): string =>
  prefixChainMap[prefix] || prefix;

const chainMatchValoper = (chain: string, valoper: string) =>
  prefixToChain(valoperToPrefix(valoper) || "") === chain;

export { prefixToChain, chainList, chainMatchValoper };
