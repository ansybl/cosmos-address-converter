import { strict as assert } from "assert";
import { getChainInfo } from "./chain-registry";
import { handleFetchError, randomChoice } from "../utils/helpers";

const getChainRestUrl = (chainName: string): string => {
  const chainInfo = getChainInfo(chainName);
  const restList = chainInfo?.apis?.rest || [];
  assert(restList.length > 0, `No REST for this chain (${chainName})`);
  const rest = randomChoice(restList);
  return rest.address;
};

const getValidator = async (
  chainName: string,
  validatorAddress: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<Record<string, any>> => {
  const rest = getChainRestUrl(chainName);
  const url = `${rest}/cosmos/staking/v1beta1/validators/${validatorAddress}`;
  const response = await fetch(url);
  handleFetchError(response);
  const { validator } = await response.json();
  return validator;
};

export { getValidator };
