import { sha256 } from "@cosmjs/crypto";
import { fromBase64, fromBech32, toBech32, toHex } from "@cosmjs/encoding";

const pubKeyToSha256 = (pubKey: string): Uint8Array => {
  const pubkey = {
    type: "tendermint/PubKeyEd25519",
    value: pubKey,
  };
  const ed25519PubkeyRaw = fromBase64(pubkey.value);
  return sha256(ed25519PubkeyRaw).slice(0, 20);
};

const pubKeyToBench32 = (pubKey: string, prefix: string): string => {
  const addressData = pubKeyToSha256(pubKey);
  const bech32Address = toBech32(prefix, addressData);
  return bech32Address;
};

const pubKeyToHexAddress = (pubKey: string): string => {
  const addressData = pubKeyToSha256(pubKey);
  return toHex(addressData).toUpperCase();
};

const operatorAddressToAccount = (address: string): string => {
  const { prefix, data } = fromBech32(address);
  const prefixMap: Record<string, string> = {
    iva: "iaa",
    crocncl: "cro",
  };
  const subPrefix = prefixMap[prefix] || prefix.replace("valoper", "");
  return toBech32(subPrefix, data);
};

export { pubKeyToBench32, pubKeyToHexAddress, operatorAddressToAccount };
