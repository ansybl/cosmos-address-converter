import { chains } from "chain-registry";
import { Chain } from "@chain-registry/types";

const getChainInfo = (chainName: string): Chain | undefined =>
  chains.find(({ chain_name }) => chain_name === chainName);

export { getChainInfo };
