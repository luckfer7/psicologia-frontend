type BadgeProps = {
    children: React.ReactNode
};

const Badge = ({ children }: BadgeProps) => {
    return(
        <span className=" bg-blue-100 text-blue700 px-2 py-1 rounded-full text-sm " >
            {children}
        </span>
    )
}

export default Badge;