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
    <div>
      <label htmlFor={label}>{label}</label>
      <input
        className="ml-2 border-2"
        name={label}
        value={value}
        onChange={(event) => updateValue(event?.target?.value)}
      />
    </div>
  );
};

export default Input;
