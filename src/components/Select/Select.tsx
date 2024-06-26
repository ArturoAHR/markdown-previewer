type SelectProps = {
  options: SelectOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  className?: string;
};

export type SelectOption = {
  value: string | number;
  label: string;
};

export const Select = ({
  className,
  value,
  onChange,
  options,
}: SelectProps) => {
  return (
    <select
      className={className}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
