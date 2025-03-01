import React from "react";

export const Dropdown = ({ title, options = [], func }) => {
  return (
    <div className="relative w-full max-w-xs">
      <select
        defaultValue="0"
        onChange={func}
        className="w-[37vh] border rounded-lg bg-zinc-700 text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="0" disabled>
          {title}
        </option>
        {options.map((o, i) => (
          <option key={i} value={o}>
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
