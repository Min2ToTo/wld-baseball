
import React from 'react';
import { useGame } from '../../contexts/GameContext';
import { Modal } from '../ui/Modal';
import { LanguageOption, Language } from '../../types';

const languageOptions: LanguageOption[] = [
    { code: 'en', nativeName: 'English', flag: '🇺🇸' },
    { code: 'es', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'de', nativeName: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', nativeName: 'Français', flag: '🇫🇷' },
    { code: 'pt', nativeName: 'Português', flag: '🇧🇷' },
    { code: 'ru', nativeName: 'Русский', flag: '🇷🇺' },
    { code: 'ja', nativeName: '日本語', flag: '🇯🇵' },
    { code: 'ko', nativeName: '한국어', flag: '🇰🇷' },
    { code: 'zh', nativeName: '中文 (简体)', flag: '🇨🇳' },
    { code: 'hi', nativeName: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ar', nativeName: 'العربية', flag: '🇸🇦' },
    { code: 'bn', nativeName: 'বাংলা', flag: '🇧🇩' },
    { code: 'ur', nativeName: 'اردو', flag: '🇵🇰' },
    { code: 'id', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'vi', nativeName: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'tl', nativeName: 'Filipino', flag: '🇵🇭' },
    { code: 'am', nativeName: 'አማርኛ', flag: '🇪🇹' },
];

interface LanguageSelectionModalProps {
    isOpen: boolean;
}

export const LanguageSelectionModal: React.FC<LanguageSelectionModalProps> = ({ isOpen }) => {
    const { t, setLanguage, setIsLanguageModalOpen } = useGame();

    const handleSelectLanguage = (langCode: Language) => {
        setLanguage(langCode);
        localStorage.setItem('wld-baseball-lang', langCode);
        setIsLanguageModalOpen(false);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <Modal isOpen={isOpen} size="full">
            <div className="flex flex-col items-center justify-center h-full text-text-base">
                <h1 className="text-3xl font-bold mb-8 font-orbitron">
                    {t('languageSelector.title')}
                </h1>
                <div className="w-full max-w-xs space-y-4 overflow-y-auto">
                    {languageOptions.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleSelectLanguage(lang.code)}
                            className="w-full text-left p-4 bg-surface-inset rounded-lg text-xl flex items-center justify-between hover:bg-opacity-80 transition-colors"
                        >
                            <span>{lang.nativeName}</span>
                            <span className="text-2xl">{lang.flag}</span>
                        </button>
                    ))}
                </div>
            </div>
        </Modal>
    );
};
