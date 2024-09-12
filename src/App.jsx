import { useCallback, useEffect, useState, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) {
      str += "0123456789";
    }
    if (symbols) {
      str += "!@#$%&*?";
    }

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, symbols, setPassword]);
  useEffect(() => {
    passwordGenerator();
  }, [length, number, symbols, passwordGenerator]);
  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.selectSelectionRange(0, 30);
    window.navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <>
      <div className="w-full max-w-md mx-auto rounded-lg my-8 py-4 px-4 text-blue-500 bg-gray-800 shadow-md">
        <h1 className="text-4xl text-center text-white py-4 px-4">
          Password Generator
        </h1>
        <div className="flex my-2 rounded-lg overflow-hidden shadow  bg-white ">
          <input
            className="w-full py-2 px-2 outline-none"
            type="text"
            value={password}
            placeholder="Password"
            ref={passwordRef}
            readOnly
          />
        </div>
        <div className="w-full gap-x-2 py-2 px-2 flex text-sm text-white ">
          <div className="flex gap-3">
            <label>length {length}</label>
            <input
              type="range"
              min={8}
              max={30}
              value={length}
              className="cursor-pointer"
              onChange={(event) => {
                setLength(event.target.value);
              }}
            />
          </div>
          <div className="flex gap-3">
            <label>Numbers</label>
            <input
              type="checkbox"
              defaultChecked={number}
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
          </div>
          <div className="flex gap-3">
            <label>symbols</label>
            <input
              type="checkbox"
              defaultChecked={symbols}
              onChange={() => {
                setSymbols((prev) => !prev);
              }}
            />
          </div>
        </div>
        <div className="flex gap-4 my-3 " >
      
          <button
            className="bg-blue-400 rounded-lg py-2 px-4 text-black "
            onClick={passwordGenerator}
          >
            Generate
          </button>
          <button
            className="bg-blue-400 rounded-lg py-2 px-8 text-black"
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
