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