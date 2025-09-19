
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

    // World ID and Assets
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
        if (!walletAddress) return;

        const fetchBalances = async () => {
            console.log(`Attempting to fetch balances for ${walletAddress}...`);
            try {
                // 1. 유저의 브라우저 지갑(MetaMask, World App Wallet 등)과 연결합니다.
                if (!window.ethereum) {
                    alert("Please install a web3 wallet like MetaMask or use the World App.");
                    return;
                }
                const provider = new ethers.BrowserProvider(window.ethereum);
                
                // 2. WGT_CONTRACT_ADDRESS와 WGT_CONTRACT_ABI는 이제 constants.ts에서 가져옵니다.
                const contract = new ethers.Contract(WGT_CONTRACT_ADDRESS, WGT_CONTRACT_ABI, provider);
                
                // 3. 잔액 조회 (이 부분은 동일)
                const wgtBalance = await contract.balanceOf(walletAddress);
                const formattedBalance = Number(ethers.formatUnits(wgtBalance, 18));
                
                console.log('Successfully fetched balance from contract:', formattedBalance);
                setWgt(formattedBalance);

            } catch (error) {
                console.error("Could not fetch balance from contract. Please ensure your wallet is connected to the Sepolia testnet and the contract address is correct.", error);
                // 에러 발생 시에는 mock 데이터를 사용하지 않고, 0으로 설정하여 문제가 있음을 명확히 보여줍니다.
                setWgt(0); 
            }
        };

        fetchBalances();
    }, [walletAddress]);
    
    const handleIDKitSuccess = (result: IDKitResult) => {
        console.log("IDKit Authentication Success:", result);
        // 월드코인 서버가 반환하는 credential_payload에서 실제 지갑 주소를 추출합니다.
        // 이 구조는 월드코인 문서나 실제 반환값을 보고 정확히 확인해야 할 수 있습니다.
        // 일반적으로 'eip155:1' (이더리움 메인넷) 또는 'eip155:84531' (OP Sepolia)과 같은 키를 가집니다.
        // 아래 코드는 가장 가능성 높은 예시입니다.
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
            console.log("Extracted Wallet Address:", foundAddress);
            setWalletAddress(foundAddress);
        } else {
            console.error("Could not find wallet address in IDKit result.");
            // 임시 방편: 지갑 주소를 찾지 못했을 경우 nullifier_hash를 사용 (디버깅용)
            const mockAddress = `0x${result.nullifier_hash.slice(0, 40)}`;
            setWalletAddress(mockAddress);
            alert("Wallet address not found in payload, using mock address for now.");
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

    const AuthView = () => (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <h1 className="text-4xl font-bold text-center font-orbitron">
                {t('common.title')}
            </h1>
            <p className="my-8 text-text-muted">
                Please sign in with your World ID to play the game and manage your assets.
            </p>
            <IDKitWidget
                app_id="app_e18331f89f35a634aab08d5cdfc15b2c" // 당신의 Client ID
                action="game-login" // ★★★★★ 여기에 방금 생성한 Identifier 값을 입력!
                onSuccess={handleIDKitSuccess}
                credential_types={['document']}
            >
                {({ open }) => <Button onClick={open}>Sign in with World ID</Button>}
            </IDKitWidget>
        </div>
    );

    return (
        <GameContext.Provider value={contextValue}>
            <div className="min-h-screen bg-surface-base font-sans flex items-center justify-center p-4">
                <div className="w-full max-w-md mx-auto bg-surface-raised rounded-2xl shadow-2xl overflow-hidden border-2 border-surface-inset flex flex-col" style={{height: '90vh', maxHeight: '800px'}}>
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