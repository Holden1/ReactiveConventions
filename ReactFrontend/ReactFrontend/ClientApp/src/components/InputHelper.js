import React, {useState } from "react";

export function useInput({ type /*...*/ }) {
  const [value, setValue] = useState("");
  const input = (
    <input className="from-control"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type={type}
    />
  );
  return [value, input];
}