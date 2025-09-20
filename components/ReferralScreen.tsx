import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { WGT_CONTRACT_ABI, WGT_CONTRACT_ADDRESS } from "../constants";
import { fetchBalances } from "../utils";

const Referral = () => {
    const [referralCount, setReferralCount] = useState(0);
    const [totalWgt, setTotalWgt] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            // 유저의 지갑 주소 가져오기
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();

            // 계약 인스턴스 생성
            const contract = new ethers.Contract(WGT_CONTRACT_ADDRESS, WGT_CONTRACT_ABI, signer);

            // 추천인 수와 총 WGT 조회
            const count = await contract.getReferralCount(address);
            const wgt = await contract.getTotalWgt(address);

            setReferralCount(count);
            setTotalWgt(ethers.utils.formatEther(wgt));
        };

        fetchData();
    }, []);

    const handleClaimReferral = async (referrerAddress: string) => {
        try {
            // 친구 추천 보상은 유저가 직접 가스비를 내고 청구하는 것이 일반적
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner(); // 유저의 서명을 받음
            const contract = new ethers.Contract(WGT_CONTRACT_ADDRESS, WGT_CONTRACT_ABI, signer);

            const tx = await contract.claimReferralBonus(referrerAddress);
            
            alert("Claiming referral bonus... Please confirm in your wallet.");
            await tx.wait();
            alert("Referral bonus claimed successfully!");

            // 성공 시 WGT 잔액 새로고침
            fetchBalances();

        } catch (error) {
            console.error("Failed to claim referral bonus:", error);
            alert("Failed to claim referral bonus. You may have already claimed it.");
        }
    };

    return (
        <div>
            <h2>친구 추천 프로그램</h2>
            <div>
                받은 보상: {referralCount}명 / {totalWgt} WGT
            </div>
            {/* 추가 UI 요소 및 기능 구현 */}
        </div>
    );
};

export default Referral;