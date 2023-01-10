import { sha256 } from "@cosmjs/crypto";
import { fromBase64, toBech32 } from "@cosmjs/encoding";

const pubKeyToBench32 = (pubKey: string, prefix: string) => {
  const pubkey = {
    type: "tendermint/PubKeyEd25519",
    value: pubKey,
  };
  const ed25519PubkeyRaw = fromBase64(pubkey.value);
  const addressData = sha256(ed25519PubkeyRaw).slice(0, 20);
  const bech32Address = toBech32(prefix, addressData);
  return bech32Address;
};

export { pubKeyToBench32 };
