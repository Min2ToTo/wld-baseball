import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { GameScreen } from './components/GameScreen';
import { MainScreen } from './components/MainScreen';
import { GameContext, GameContextType } from './contexts/GameContext';
import { GameMode, Language, IDKitResult, Theme } from './types';
import { translations } from './i18n/translations';
import { LanguageSelectionModal } from './components/modals/LanguageSelectionModal';
import { HelpModal } from './components/modals/HelpModal';
import { IDKitWidget } from '@worldcoin/idkit';
import { Button } from './components/ui/Button';
import { ethers } from 'ethers';
import { WGT_CONTRACT_ADDRESS, WGT_CONTRACT_ABI } from './constants';

const App: React.FC = () => {
    const [screen, setScreen] = useState<'main' | 'game'>('main');
    const [gameMode, setGameMode] = useState<GameMode | null>(null);
    const [language, setLanguage] = useState<Language>('en');
    const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [theme, setTheme] = useState<Theme>('light');

    // ★★★ 1. walletAddress 초기값을 null로 설정 ★★★
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [wgt, setWgt] = useState(0);
    
    useEffect(() => {
        const savedLang = localStorage.getItem('wld-baseball-lang') as Language;
        if (savedLang && translations[savedLang]) {
            setLanguage(savedLang);
        } else {
            setIsLanguageModalOpen(true);
        }

        const savedTheme = localStorage.getItem('wld-baseball-theme') as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);
    
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('wld-baseball-theme', theme);
    }, [theme]);

    // Fetch user balances when wallet address is available
    useEffect(() => {
        // ★ walletAddress가 null이면 아무것도 하지 않음
        if (!walletAddress) return;

        const fetchBalances = async () => {
            console.log(`Attempting to fetch balances for ${walletAddress}...`);
            try {
                if (!window.ethereum) {
                    alert("Please install a web3 wallet like MetaMask or use the World App.");
                    return;
                }
                const provider = new ethers.BrowserProvider(window.ethereum);
                const contract = new ethers.Contract(WGT_CONTRACT_ADDRESS, WGT_CONTRACT_ABI, provider);
                const wgtBalance = await contract.balanceOf(walletAddress);
                const formattedBalance = Number(ethers.formatUnits(wgtBalance, 18));
                
                console.log('Successfully fetched balance from contract:', formattedBalance);
                setWgt(formattedBalance);

            } catch (error) {
                console.error("Could not fetch balance from contract.", error);
                setWgt(0); 
            }
        };

        fetchBalances();
    }, [walletAddress]);
    
    const handleIDKitSuccess = (result: IDKitResult) => {
        console.log("IDKit Authentication Success:", result);
        let foundAddress: string | null = null;
        if (result.credential_payload) {
            for (const key in result.credential_payload) {
                if (key.startsWith('eip155:')) {
                    foundAddress = result.credential_payload[key].address;
                    break;
                }
            }
        }
        if (foundAddress) {
            setWalletAddress(foundAddress);
        } else {
            console.error("Could not find wallet address in IDKit result.");
            // 디버깅용 mock 주소는 제거하거나, alert으로 명확히 알림
            alert("Could not extract a valid wallet address from the World ID proof.");
        }
    };

    const t = useCallback((key: string, params?: { [key: string]: string | number }) => {
        const keys = key.split('.');
        let result: any = translations[language];
        for (const k of keys) {
            result = result?.[k];
            if (result === undefined) return key;
        }

        if (Array.isArray(result)) {
            result = result[Math.floor(Math.random() * result.length)];
        }

        if (typeof result !== 'string') {
             console.error(`Translation for key '${key}' is not a string.`);
             return key;
        }

        if (params) {
            return result.replace(/\{\{(\w+)\}\}/g, (match, placeholder) => {
                return params[placeholder] !== undefined ? String(params[placeholder]) : match;
            });
        }
        
        return result;
    }, [language]);

    const startGame = useCallback((mode: GameMode) => {
        setGameMode(mode);
        setScreen('game');
    }, []);

    const quitGame = useCallback(() => {
        setGameMode(null);
        setScreen('main');
    }, []);

    const contextValue: GameContextType = useMemo(() => ({
        wgt,
        setWgt,
        startGame,
        quitGame,
        t,
        language,
        setLanguage,
        isLanguageModalOpen,
        setIsLanguageModalOpen,
        isHelpModalOpen,
        setIsHelpModalOpen,
        walletAddress,
        isAuthenticated: !!walletAddress,
        theme,
        setTheme,
    }), [wgt, startGame, quitGame, t, language, isLanguageModalOpen, isHelpModalOpen, walletAddress, theme]);

    // ★★★ 2. 로그인 전용 뷰(컴포넌트) 정의 ★★★
    const AuthView = () => (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <h1 className="text-4xl font-bold text-center font-orbitron">
                {t('common.title')}
            </h1>
            <p className="my-8 text-text-muted">
                Please sign in with your World ID to play the game and manage your assets.
            </p>
            <IDKitWidget
                app_id="app_e18331f89f35a634aab08d5cdfc15b2c"
                action="game_login"
                onSuccess={handleIDKitSuccess}
                credential_types={['orb', 'device']} // Orb 또는 Device 인증 허용
            >
                {({ open }) => <Button onClick={open}>Sign in with World ID</Button>}
            </IDKitWidget>
        </div>
    );

    return (
        <GameContext.Provider value={contextValue}>
            <div className="min-h-screen bg-surface-base font-sans flex items-center justify-center p-4">
                <div className="w-full max-w-md mx-auto bg-surface-raised rounded-2xl shadow-2xl overflow-hidden border-2 border-surface-inset flex flex-col" style={{height: '90vh', maxHeight: '800px'}}>
                    {/* ★★★ 3. 로그인 여부에 따라 렌더링 분기 ★★★ */}
                    {!walletAddress ? (
                        <AuthView />
                    ) : screen === 'game' && gameMode ? (
                        <GameScreen mode={gameMode} />
                    ) : (
                        <MainScreen />
                    )}
                </div>
            </div>
            <LanguageSelectionModal isOpen={isLanguageModalOpen} />
            <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
        </GameContext.Provider>
    );
};

export default App;