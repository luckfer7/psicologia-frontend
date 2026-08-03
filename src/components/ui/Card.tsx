
type CardProps = {
    children: React.ReactNode;
};

const Card = ({ children }: CardProps) => {
    return (
        <div className="bg-white rounded-xl shadow p-6" >
            {children}
        </div>
    )
}

export default Card;