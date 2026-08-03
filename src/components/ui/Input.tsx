
type InputProps = {
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const Input = ({
    type = "text",
    placeholder,
    value,
    onChange,
}: InputProps) => {
    return (
        <input 
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="border rounded-lg px-3 py-2 w-full outline-none focus:ring-2 focus:ring-blue-500"
        />
    )
}

export default Input;