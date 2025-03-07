import { useState } from "react";

const Test = () => {
  const [fields, setFields] = useState([{ key: "", value: "" }]);

  // Handle input change
  const handleChange = (index, field, value) => {
    const newFields = [...fields];
    newFields[index][field] = value;
    setFields(newFields);
  };

  // Add new key-value pair
  const addField = () => {
    setFields([...fields, { key: "", value: "" }]);
  };

  return (
    <div className="p-4 border rounded-md w-1/2 mx-auto">
      {fields.map((field, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            value={field.key}
            onChange={(e) => handleChange(index, "key", e.target.value)}
            placeholder="Enter Key"
            className="border px-2 py-1 rounded-md w-1/2"
          />
          <input
            type="text"
            value={field.value}
            onChange={(e) => handleChange(index, "value", e.target.value)}
            placeholder="Enter Value"
            className="border px-2 py-1 rounded-md w-1/2"
          />
        </div>
      ))}
      <button
        onClick={addField}
        className="mt-2 bg-blue-500 text-white px-4 py-1 rounded-md"
      >
        +
      </button>

      {/* Displaying the object data */}
      <pre className="mt-4 bg-gray-100 p-2 rounded-md">{JSON.stringify(fields, null, 2)}</pre>
    </div>
  );
};

export default Test;
