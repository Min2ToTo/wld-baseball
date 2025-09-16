
import React, { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose?: () => void;
    children: ReactNode;
    size?: 'sm' | 'lg' | 'full';
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, size = 'sm' }) => {
    if (!isOpen) return null;

    const containerClasses = size === 'full' 
        ? "fixed inset-0 bg-surface-base z-50 flex flex-col"
        : "fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300 p-4";
    
    const contentClasses = 
        size === 'full' ? "w-full h-full bg-surface-base overflow-y-auto" :
        size === 'lg' ? "bg-surface-raised p-6 rounded-2xl shadow-xl w-full max-w-lg border-2 border-surface-inset transform transition-transform duration-300 scale-95" :
        "bg-surface-raised p-6 rounded-lg shadow-xl w-11/12 max-w-sm border-2 border-surface-inset transform transition-transform duration-300 scale-95";

    return (
        <div 
            className={containerClasses}
            onClick={size !== 'full' ? onClose : undefined}
        >
            <div 
                className={contentClasses}
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};
