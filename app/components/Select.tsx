import { SelectHTMLAttributes, useId } from "react";

type Props = {
  label: string;
  options: { value: number; label: string }[];
} & SelectHTMLAttributes<HTMLSelectElement>;

const Select = (props: Props) => {
  const { label, options, ...rest } = props;
  const selectId = useId();

  return (
    <div className="flex gap-2 items-center">
      <label
        htmlFor={selectId}
        className="block text-sm font-medium leading-6 text-white"
      >
        {label}
      </label>
      <select
        name={selectId}
        id={selectId}
        className="block w-full rounded-md border-0 bg-white/10 px-2.5 py-1 text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        {...rest}
      >
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
