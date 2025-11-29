import React from "react";

export default function Input({ placeholder, defaultValue, handleChange }) {
  return (
    <input
      className="h-10 border p-4 w-full mb-2 rounded-full"
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={handleChange}
    />
  );
}
