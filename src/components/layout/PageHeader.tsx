type PageHeaderProps = {
    title: string;
    subtitle?: string;
    children?: React.ReactNode;
};

const PageHeader = ({
    title,
    subtitle,
    children,
}: PageHeaderProps) => {
    return (
        <div className="flex items-center justify-between mb-8" >
            <div>
                <h1 className="text-3xl font-bold text-gray-800" >{title}</h1>

                {subtitle && (
                    <p className="text-gray-500 mt-1" >{subtitle}</p>
                )}
            </div>

            {children}
        </div>
    )
}

export default PageHeader;