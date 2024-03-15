"use client";

const Input = ({
  value,
  setValue,
  label,
}: {
  value: string;
  setValue: Function;
  label: string;
}) => {
  const updateValue = (valueParam: string) => {
    setValue(valueParam);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={label}>{label}</label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg outline-none focus:border-gray-400 block w-full p-2.5"
        name={label}
        value={value}
        onChange={(event) => updateValue(event?.target?.value)}
      />
    </div>
  );
};

export default Input;
