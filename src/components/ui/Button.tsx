type ButtonProps = {
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    disabled?: boolean;
};

const Button = ({ children,
    type = "button",
    onClick,
    disabled = false,
 }: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
        >
            
            {children}
        </button>
    ) 
}

export default Button;