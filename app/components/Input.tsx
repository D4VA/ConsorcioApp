interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const Input = ({ value, onChange, placeholder }: InputProps) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="border rounded-md px-3 py-2 w-full outline-none focus:ring-2 focus:ring-blue-400"
  />
);