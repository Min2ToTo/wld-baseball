
import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Theme } from '../../types';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
    const { t, theme, setTheme } = useGame();

    const themes: { id: Theme; name: string; }[] = [
        { id: 'light', name: t('modal.settings.light') },
        { id: 'dark', name: t('modal.settings.dark') },
        { id: 'dusk', name: t('modal.settings.dusk') },
        { id: 'sakura', name: t('modal.settings.sakura') },
    ];

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">{t('modal.settings.title')}</h2>
                
                <div className="my-6">
                    <h3 className="text-lg font-semibold text-text-muted mb-3">{t('modal.settings.theme')}</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {themes.map(themeOption => (
                            <button
                                key={themeOption.id}
                                onClick={() => setTheme(themeOption.id)}
                                className={`p-3 rounded-lg font-bold transition-all ${
                                    theme === themeOption.id 
                                    ? 'bg-accent text-white ring-2 ring-accent-hover' 
                                    : 'bg-surface-inset text-text-base hover:bg-opacity-80'
                                }`}
                            >
                                {themeOption.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-8">
                    <Button onClick={onClose} variant="secondary">{t('common.close')}</Button>
                </div>
            </div>
        </Modal>
    );
};