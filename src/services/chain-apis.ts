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

const getValidatorOnce = async (
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

const getValidator = async (
  chainName: string,
  validatorAddress: string,
  retry = 3
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<Record<string, any>> => {
  while (retry > 0) {
    try {
      return await getValidatorOnce(chainName, validatorAddress);
    } catch (error) {
      console.error(error);
      console.log("Error fetching validator info, retrying");
      retry--;
    }
  }
  throw Error("Error fetching validator info");
};

export { getValidator };
