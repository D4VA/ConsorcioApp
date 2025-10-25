interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "danger" | "print";
}

const styles = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  danger: "bg-red-500 hover:bg-red-600 text-white",
  print: "mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
};

export const Button = ({
  children,
  onClick,
  variant = "primary",
}: ButtonProps) => (
  <a
    className={`text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer ${styles[variant]}`}
    onClick={onClick}
  >
    {children}
  </a>
);
