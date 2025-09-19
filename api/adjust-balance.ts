// api/adjust-balance.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ethers } from 'ethers';
import { WGT_CONTRACT_ADDRESS, WGT_CONTRACT_ABI } from '../src/constants'; // src 폴더의 상수 파일을 가져옴

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // 1. 보안: 이 함수는 POST 요청만 허용합니다.
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    // 2. 프론트엔드에서 보낸 데이터 (userAddress, hintsUsed, rewardAmount)를 받습니다.
    const { userAddress, hintsUsed, rewardAmount } = request.body;

    // 3. Vercel 환경 변수에서 안전하게 관리자 개인키를 불러옵니다.
    const relayerPrivateKey = process.env.RELAYER_PRIVATE_KEY;
    if (!relayerPrivateKey) {
      throw new Error("RELAYER_PRIVATE_KEY is not set in environment variables.");
    }
    
    // 4. Sepolia 테스트넷에 연결합니다.
    const provider = new ethers.JsonRpcProvider('https://rpc.sepolia.org');
    
    // 5. 개인키를 사용해 관리자 지갑(서명자)을 만듭니다.
    const adminWallet = new ethers.Wallet(relayerPrivateKey, provider);

    // 6. 스마트 컨트랙트와 연결합니다.
    const contract = new ethers.Contract(WGT_CONTRACT_ADDRESS, WGT_CONTRACT_ABI, adminWallet);

    console.log(`[Relayer] Calling adjustBalanceAndRecordChallenge for ${userAddress}`);

    // 7. 스마트 컨트랙트의 함수를 호출하는 트랜잭션을 보냅니다.
    const tx = await contract.adjustBalanceAndRecordChallenge(userAddress, hintsUsed, rewardAmount);
    
    console.log(`[Relayer] Transaction sent! Hash: ${tx.hash}`);
    
    // 8. 트랜잭션이 완료될 때까지 기다립니다.
    await tx.wait();
    
    console.log(`[Relayer] Transaction confirmed for ${userAddress}`);

    // 9. 프론트엔드에 성공 메시지를 보냅니다.
    response.status(200).json({ success: true, txHash: tx.hash });

  } catch (error: any) {
    console.error("[Relayer] Error:", error);
    // 10. 실패 시 에러 메시지를 보냅니다.
    response.status(500).json({ success: false, message: error.message });
  }
}