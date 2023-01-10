import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import {
  operatorAddressToAccount,
  pubKeyToBench32,
  pubKeyToHexAddress,
} from "./utils/address";
import { valoperToPrefix } from "./utils/helpers";
import { chainList, prefixToChain, chainMatchValoper } from "./utils/chains";
import { getValidator } from "./services/chain-apis";

interface InputTextProps {
  labelText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputText = (props: InputTextProps) => (
  <>
    <label>{props.labelText}: </label>
    <input type="text" name="name" onChange={props.onChange} />
  </>
);

interface InputSelectProps {
  labelText: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  value?: string;
}
const InputSelect = (props: InputSelectProps) => (
  <>
    <label>Chain: </label>
    <select onChange={props.onChange} value={props.value}>
      {props.options?.length &&
        props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
    </select>
  </>
);

const App = () => {
  const [valoper, setValoper] = useState<string>("");
  const [publicKey, setPublicKey] = useState<string>("");
  const [prefix, setPrefix] = useState<string>("cosmos");
  const [chain, setChain] = useState<string>("cosmos");
  const [accountAddress, setAccountAddress] = useState<string>("");
  const [valconsAddress, setValconsAddress] = useState<string>("");
  const [hexAddress, setHexAddress] = useState<string>("");

  useEffect(() => {
    if (publicKey === "") return;
    setValconsAddress(pubKeyToBench32(publicKey, prefix + "valcons"));
    setHexAddress(pubKeyToHexAddress(publicKey));
    setAccountAddress(operatorAddressToAccount(valoper));
  }, [publicKey]);

  useEffect(() => {
    const newPrefix = valoperToPrefix(valoper);
    if (newPrefix === null) return;
    setPrefix(newPrefix);
  }, [valoper]);

  useEffect(() => {
    setChain(prefixToChain(prefix));
  }, [prefix]);

  // fetch & set public key for the validator
  useEffect(() => {
    if ([chain, valoper].includes("")) return;
    // make sure that all of the dependecy array are up to date
    if (!chainMatchValoper(chain, valoper)) return;
    const fetchData = async () => {
      const validator = await getValidator(chain, valoper);
      setPublicKey(validator.consensus_pubkey.key);
    };
    fetchData();
  }, [chain, valoper]);

  return (
    <div className="App">
      <header className="App-header">
        <InputText
          labelText="Operator Address"
          onChange={(e) => setValoper(e.target.value)}
        />
        <InputSelect
          labelText="Select a chain"
          onChange={(e) => setChain(e.target.value)}
          options={chainList}
          value={chain}
        />
        <p>Consensus Public Address: {publicKey}</p>
        <p>Account Address: {accountAddress}</p>
        <p>Consensus Address: {valconsAddress}</p>
        <p>Hex Address: {hexAddress}</p>
      </header>
    </div>
  );
};

export default App;
