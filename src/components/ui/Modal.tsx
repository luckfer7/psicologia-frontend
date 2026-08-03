type ModalProps = {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}

const Modal = ({
    isOpen,
    title,
    children,
    onClose,

}: ModalProps) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center" >
            <div className="bg-white rounded-xl p-6 w-[500px]" >
                <div className="flex justify-between items-center mb-4" >
                    <h2 className=" text-xl font-bold " >{title}</h2>
                    <button onClick={onClose} >X</button>
                </div>

                {children}
            </div>
        </div>
    )
}

export default Modal;