import { X } from "lucide-react";
import { useState } from "react";
import ReactDOM from "react-dom/client";

export enum AlertButtonType {
    Outlined,
    Filled
}

export interface AlertProps {
    title: string;
    message: string;
    buttons: AlertButtonProps[];
    className?: string;
    onClose?: () => void;
}

export interface AlertButtonProps {
    text: string;
    type: AlertButtonType;
    onPress?: () => void;
}


export function showAlert(
    title: string,
    message: string,
    options?: Partial<Omit<AlertProps, "title" | "message" | "buttons">> & {
        buttons?: AlertProps["buttons"];
    }
) {
    const container = document.createElement("div");
    document.body.appendChild(container);

    const root = ReactDOM.createRoot(container);

    const handleClose = () => {
        root.unmount();
        container.remove();
        options?.onClose?.();
    };

    root.render(
        <Alert
            title={title}
            message={message}
            buttons={options?.buttons || [
                {
                    text: "OK",
                    type: AlertButtonType.Filled,
                },
            ]}
            className={options?.className}
            onClose={handleClose}
        />
    );
}


export function AlertButton({ text, type, onPress }: AlertButtonProps) {
    const alertButtonStyles: Record<AlertButtonType, string> = {
        [AlertButtonType.Outlined]: "hover:bg-white/10 active:bg-white/20 text-white/50",
        [AlertButtonType.Filled]: "hover:bg-white/18 active:bg-white/20 bg-white/12 text-white/75"
    };

    return (
        <button
            className={`w-full px-[8px] py-[12px] cursor-pointer ${alertButtonStyles[type]}`}
            onClick={onPress}
        >
            {text}
        </button>
    );
}

export function Alert({ title, message, buttons, className, onClose }: AlertProps) {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className={`bg-[#111] rounded-xl border border-[#222] text-[#ddd] font-mono min-w-[400px] max-w-[600px] overflow-hidden ${className}`}>
                <div className="p-[16px] pb-[24px] flex flex-col gap-[12px]">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold">{title}</span>
                        <button
                            className="p-[8px] cursor-pointer hover:bg-white/10 active:bg-white/20 rounded-xl"
                            onClick={() => {
                                setIsOpen(false);
                                if (onClose) {
                                    onClose();
                                }
                            }}
                        >
                            <X className="w-5 h-5 text-white/50" />
                        </button>
                    </div>
                    <div className="text-sm w-full text-white/75">
                        {message}
                    </div>
                </div>
                <div className="flex justify-end border-t border-[#222] text-sm">
                    {buttons.map((button, index) => (
                        <AlertButton
                            key={index}
                            text={button.text}
                            type={button.type}
                            onPress={() => {
                                button.onPress?.();
                                setIsOpen(false);
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
