type ContainerProps = {
    children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
    return (
        <main className="flex-1 bg-gray-100 min-h-screen p-8" >
            {children}
        </main>
    )
}

export default Container;