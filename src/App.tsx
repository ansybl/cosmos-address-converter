import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import { pubKeyToBench32 } from "./utils/helpers";

interface InputTextProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  labelText: string;
}
const InputText = (props: InputTextProps) => (
  <>
    <label>{props.labelText}: </label>
    <input type="text" name="name" onChange={props.onChange} />
  </>
);

const App = () => {
  const [publicKey, setPublicKey] = useState<string>("");
  const [convertTo, setConvertTo] = useState<string>("");
  const [converted, setConverted] = useState<string>("");

  useEffect(() => {
    if ([publicKey, convertTo].includes("")) return;
    setConverted(pubKeyToBench32(publicKey, convertTo));
  }, [publicKey, convertTo]);

  return (
    <div className="App">
      <header className="App-header">
        <InputText
          labelText="Public Key"
          onChange={(e) => setPublicKey(e.target.value)}
        />
        <InputText
          labelText="Convert To"
          onChange={(e) => setConvertTo(e.target.value)}
        />
        <p>Converted: {converted}</p>
      </header>
    </div>
  );
};

export default App;
