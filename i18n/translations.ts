import { Translation, Translations } from '../types';

const enTranslations: Translation = {
  common: {
    title: "WLD Baseball",
    wgt: "WGT: {{count}}",
    returnToMain: "Return to Main",
    goBack: "Go Back",
    cancel: "Cancel",
    confirm: "Confirm",
    close: "Close",
    settings: "Settings",
  },
  main: {
    dailyChallenge: "Daily Challenge",
    practiceMode: "Practice Mode",
    play: "Play Now",
    remainingTime: "Resets in {{time}}",
    assets: "My Assets",
    referral: "Friend Referral"
  },
  game: {
    swing: "Swing!",
    giveUp: "Give Up",
    useHint: "Use Hint",
    hintCost: "({{count}} WGT)",
    inning: "Inning {{inning}}/{{max}}",
    dailyChallengeTitle: "Daily Challenge",
    practiceModeTitle: "Practice Mode",
    hit_short: "H",
    foul_short: "F",
    strike_short: "S",
  },
  commentary: {
    ready: "Step up to the plate!",
    need3Numbers: "You must select 3 numbers!",
    result: "{{hits}} Hits, {{fouls}} Fouls! Nice try!",
    strike: "Strike! Better luck next time!",
    homerun: "HOME RUN!!! A perfect hit!",
    hintUsed: "[Hint] The number '{{hint}}' is not included!",
    notEnoughWgt: "Not enough WGT!",
    noMoreHintInGame: "No more hints can be used in this game.",
    dynamic: {
      homerun: [
        "HOME RUN! It's over the fence! A perfect hit to end the game!",
        "A thrilling walk-off home run! Victory is yours!",
        "A three-run blast! You've completely demolished the pitcher!",
        "Today's highlight, right here! A fantastic home run!",
        "Accurate analysis, bold prediction! That's pure skill!"
      ],
      hit1: ["Nice hit! You got one right!", "One down, but a ways to go. Look forward to the next at-bat!", "A Hit! You've got a good clue.", "A crucial hit at a key moment! Stay calm and aim for the next one."],
      hit2: ["Multi-hit! Two numbers are in the exact right place!", "Fantastic swing! Almost a perfect hit!", "Two precise hits! Are you aiming for a home run next?", "The pitcher is starting to waver! This is your chance to push!"],
      foul1: ["So close! One number was a match, but not in the right spot!", "You found one number, but not its position. A little more focus!", "The direction was right, but it needed a bit more power! Let's try again!"],
      foul2: ["Two fouls! Two numbers are correct but misplaced. Very close!", "You see two of the numbers, but they're not in their spots! Try a new combination!", "The pitcher's throw was clever. You caught two numbers, but their positions are off!"],
      foul3: ["Three fouls! All three numbers are correct but in the wrong positions. Almost perfect, what a shame!", "All three numbers are there, hiding! But all their positions are off. Re-arrange your strategy!", "The pitcher is expertly dodging your hits! The three numbers are correct, but it's not a hit!"],
      strike: ["Strike! That swing completely missed!", "Unfortunately, you didn't hit anything. Aim for the next chance!", "The pitcher's experience shines through! You must choose the next pitch carefully.", "This at-bat ends in vain. Regroup for the next opportunity!"],
      strikeout: ["Strikeout! Unfortunately, you couldn't hit a home run in 9 innings. The game is over.", "Game over! Hope for a better result next time, and challenge again!", "That's all for today's game. But your passion doesn't end here! Prepare for the next match!"],
      hintUsed: ["Here's the report from the analyst! The number '{{hint}}' is not in the secret code.", "Good info! Think with the number '{{hint}}' excluded.", "A sign from the manager! '{{hint}}' is a discard."]
    }
  },
  modal: {
    giveUp: {
      title: "Are you sure you want to give up?",
      message: "Used hints cannot be returned, and their cost will be deducted.",
      messagePractice: "Do you want to quit the game?",
    },
    result: {
      homerun: "HOME RUN!",
      strikeout: "STRIKEOUT!",
      congrats: "Congratulations! You won!",
      nextTime: "Too bad. Better luck next time!",
      correctAnswer: "The correct number was:",
      totalWinnings: "Total Winnings (WGT)",
    },
    referral: {
        title: "Friend Referral",
        description: "Enter a friend's referral ID to get 10 WGT! They will also receive 10 WGT.",
        enterId: "Enter Referrer ID (Wallet Address)",
        claimBonus: "Claim Bonus",
        yourId: "Your Referral ID",
        copyId: "Copy ID",
        copied: "Copied!",
        invalidId: "Invalid ID. Please check the address.",
        alreadyClaimed: "You have already claimed a referral bonus!",
        claimSuccess: "Success! You and your friend received 10 WGT each."
    },
    settings: {
      title: "Settings",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      dusk: "Dusk",
      sakura: "Sakura",
    }
  },
  languageSelector: {
    title: "Select Language"
  },
  help: {
    title: "How to Play",
    objective: {
        title: "Game Objective",
        description: "Guess the 3 unique secret numbers created by the computer within 9 tries!",
    },
    results: {
        title: "How to Read Results",
        hit: "Hit: The number and its position are both correct.",
        foul: "Foul: The number exists, but in a different position.",
        strike: "Strike: None of the guessed numbers are in the secret code.",
        example: {
            answer: "Answer",
            guess: "Your Guess",
            result: "Result",
        },
    },
    currency: {
        title: "Currency Guide",
        wgt: "WGT: The World Genius Token is a utility token required to play WGT Mode and use hints. Earn it by winning your free daily challenge or through friend referrals.",
    },
    rewards: {
        title: "Daily Challenge Rewards",
        description: "The fewer tries it takes to hit a homerun, the bigger the reward!",
        inning: "Success in {{count}} tries",
        reward: "+{{reward}} WGT",
    },
  },
};

const koTranslations: Translation = {
    common: {
      title: "World Baseball", // 기존 "WLD 베이스볼"에서 변경
      wgt: "WGT: {{count}}",
      returnToMain: "메인으로 돌아가기",
      goBack: "뒤로가기",
      cancel: "취소",
      confirm: "확인",
      close: "닫기",
      settings: "설정",
    },
    main: {
      dailyChallenge: "오늘의 도전",
      practiceMode: "연습 모드",
      play: "플레이",
      remainingTime: "{{time}} 후 초기화",
      assets: "내 자산",
      referral: "친구 추천"
    },
    game: {
      swing: "타격!",
      giveUp: "포기하기",
      useHint: "힌트 사용",
      hintCost: "(WGT {{count}}개)",
      inning: "{{inning}} / {{max}}회",
      dailyChallengeTitle: "오늘의 도전",
      practiceModeTitle: "연습 모드",
      hit_short: "안타",
      foul_short: "파울",
      strike_short: "스",
    },
    commentary: {
      ...enTranslations.commentary as Translation,
      ready: "타석을 준비하세요!",
      need3Numbers: "숫자 3개를 모두 선택해야 합니다!",
      result: "{{hits}} 안타, {{fouls}} 파울! 좋은 시도입니다!",
      strike: "스트라이크! 다음 공을 노리세요!",
      homerun: "홈런!!! 완벽한 타격입니다!",
      hintUsed: "[힌트] 숫자 '{{hint}}'는 포함되지 않습니다!",
      notEnoughWgt: "WGT가 부족합니다!",
      noMoreHintInGame: "이번 게임에서는 더 이상 힌트를 사용할 수 없습니다.",
      dynamic: {
        homerun: ["홈런! 담장을 넘겼습니다! 완벽한 타격으로 경기를 끝냅니다!", "짜릿한 역전 홈런! 승리의 여신이 당신의 편이네요!", "쓰리런 홈런! 완벽하게 상대 투수를 무너뜨렸습니다!", "오늘의 하이라이트는 바로 이 장면입니다! 환상적인 홈런!", "정확한 분석, 대담한 예측! 이것이 바로 당신의 실력입니다!"],
        hit1: ["좋은 타격! 공 하나는 제대로 맞혔습니다!", "하나 맞혔지만, 아직 갈 길이 멉니다. 다음 타석을 기대하죠!", "안타! 좋은 힌트를 얻었군요.", "중요한 순간, 한 방을 날렸습니다! 침착하게 다음을 노려보세요."],
        hit2: ["멀티 히트! 두 개의 숫자는 정확한 위치에 있습니다!", "환상적인 타격! 거의 완벽한 안타였습니다!", "정확한 타구 두 개! 다음 타석에서 홈런을 노려볼까요?", "상대 투수가 흔들리기 시작합니다! 몰아붙일 기회예요!"],
        foul1: ["아깝습니다! 공 하나는 스쳤지만, 제대로 맞춰내지 못했네요!", "숫자 하나는 있었지만, 위치를 찾지 못했습니다. 조금 더 집중해야 합니다!", "방향은 맞았지만, 조금만 더 힘을 냈어야죠! 다시 노려봅시다!"],
        foul2: ["투 파울! 두 개의 공이 스쳐 지나갔습니다. 아주 아슬아슬하네요!", "두 개의 숫자가 보이지만, 제자리를 찾지 못했습니다! 다시 한번 조합해 보세요!", "투수의 공이 영리하네요. 두 개의 숫자를 잡았지만, 위치가 다릅니다!"],
        foul3: ["쓰리 파울! 세 개의 공이 모두 스쳐 지나갔습니다. 거의 완벽했지만, 아쉽네요!", "세 개의 숫자가 모두 숨어 있습니다! 하지만 위치는 모두 빗나갔습니다. 다시 한번 수를 놓아보시죠!", "상대 투수가 당신의 타구를 절묘하게 피해갑니다! 세 개의 숫자는 있었지만, 안타는 아닙니다!"],
        strike: ["스트라이크! 이번 타구는 완전히 빗나갔습니다!", "아쉽게도 아무것도 맞히지 못했습니다. 다시 기회를 노려보세요!", "투수의 노련함이 돋보입니다! 다음 투구는 신중하게 선택해야 합니다.", "현재 타석은 허무하게 돌아갑니다. 다음 기회를 위해 심기일전하세요!"],
        strikeout: ["삼진 아웃! 아쉽게도 9번의 타석에서 홈런을 치지 못했습니다. 경기는 종료됩니다.", "경기 종료! 다음 번에는 더 나은 결과를 기대하며, 다시 도전해 보세요!", "오늘의 경기는 여기까지입니다. 하지만 당신의 열정은 끝나지 않습니다! 다음 경기를 준비하세요!"],
        hintUsed: ["전력분석관의 리포트입니다! '{{hint}}'번 숫자는 비밀 숫자에 포함되어 있지 않습니다.", "좋은 정보입니다! 숫자 '{{hint}}'는 제외하고 생각하세요.", "감독의 사인! '{{hint}}'는 버리는 카드입니다."]
      }
    },
    modal: {
      giveUp: {
        title: "정말 포기하시겠습니까?",
        message: "사용한 힌트는 되돌려받을 수 없으며, 비용이 차감됩니다.",
        messagePractice: "게임을 포기하시겠습니까?",
      },
      result: {
        homerun: "홈런!",
        strikeout: "삼진 아웃!",
        congrats: "축하합니다! 승리했습니다!",
        nextTime: "아쉽네요. 다음 기회에!",
        correctAnswer: "정답은 다음과 같았습니다:",
        totalWinnings: "총 획득 (WGT)",
      },
      referral: {
        title: "친구 추천",
        description: "친구의 추천인 ID를 입력하고 10 WGT를 받으세요! 친구도 10 WGT를 받습니다.",
        enterId: "추천인 ID 입력 (지갑 주소)",
        claimBonus: "보너스 받기",
        yourId: "나의 추천인 ID",
        copyId: "ID 복사",
        copied: "복사됨!",
        invalidId: "잘못된 ID입니다. 주소를 확인해주세요.",
        alreadyClaimed: "이미 추천 보너스를 받았습니다!",
        claimSuccess: "성공! 당신과 친구분에게 각각 10 WGT가 지급되었습니다."
      },
      settings: {
        title: "설정",
        theme: "테마",
        light: "라이트",
        dark: "다크",
        dusk: "황혼",
        sakura: "벚꽃",
      }
    },
    languageSelector: {
      title: "언어 선택"
    },
    help: {
        title: "게임 방법",
        objective: {
            title: "게임 목표",
            description: "컴퓨터가 만든 3개의 서로 다른 비밀 숫자를 9번의 기회 안에 맞히세요!",
        },
        results: {
            title: "결과 판정 방법",
            hit: "안타 (Hit): 숫자와 위치가 모두 일치하는 경우.",
            foul: "파울 (Foul): 숫자는 있지만 위치가 다른 경우.",
            strike: "스트라이크 (Strike): 추리한 숫자가 하나도 포함되지 않은 경우.",
            example: {
                answer: "정답",
                guess: "내 추리",
                result: "결과",
            },
        },
        currency: {
            title: "게임 재화 안내",
            wgt: "WGT: World Genius Token은 WGT 모드를 플레이하고 힌트를 사용하는데 필요한 유틸리티 토큰입니다. 하루에 한번 무료로 도전하여 승리하거나 친구 추천으로 획득하세요."
        },
        rewards: {
            title: "오늘의 도전 보상",
            description: "더 적은 시도로 홈런을 칠수록 더 큰 보상을 받습니다!",
            inning: "{{count}}회 성공",
            reward: "+{{reward}} WGT",
        },
    },
};

// FIX: Cast object properties to Translation before spreading to satisfy TypeScript's type checker.
const jaTranslations: Translation = { ...koTranslations, common: {...(koTranslations.common as Translation), title: "WLDベースボール", returnToMain: "メインに戻る", goBack: "戻る", cancel: "キャンセル", confirm: "確認", close: "閉じる", settings: "設定"}, main: {...(koTranslations.main as Translation), dailyChallenge: "デイリーチャレンジ", practiceMode: "練習モード", play: "プレイ", remainingTime: "{{time}}後にリセット", assets: "私の資産", referral: "友達紹介"}, game: {...(koTranslations.game as Translation), swing: "スイング！", giveUp: "ギブアップ", useHint: "ヒントを使う", hintCost: "({{count}} WGT)", inning: "イニング {{inning}}/{{max}}", dailyChallengeTitle: "デイリーチャレンジ", practiceModeTitle: "練習モード", hit_short: "H", foul_short: "F", strike_short: "S"}, modal: {...(koTranslations.modal as Translation), giveUp: {title: "本当にギブアップしますか？", message: "使用したヒントは返却されず、費用が差し引かれます。", messagePractice: "ゲームを終了しますか？"}, result: {homerun: "ホームラン！", strikeout: "三振！", congrats: "おめでとうございます！勝利です！", nextTime: "残念でした。またの機会に！", correctAnswer: "正解の数字は：", totalWinnings: "総獲得 (WGT)"}, referral: { ...((koTranslations.modal as Translation).referral as Translation), title: "友達紹介", description: "友達の紹介IDを入力して10 WGTをゲット！友達も10 WGTを受け取れます。", enterId: "紹介者IDを入力 (ウォレットアドレス)", claimBonus: "ボーナスを受け取る", yourId: "あなたの紹介ID", copyId: "IDをコピー", copied: "コピーしました！", invalidId: "無効なIDです。アドレスを確認してください。", alreadyClaimed: "すでに紹介ボーナスを受け取り済みです！", claimSuccess: "成功！あなたと友達にそれぞれ10 WGTが贈られました。"}, settings: {title: "設定", theme: "テーマ", light: "ライト", dark: "ダーク", dusk: "夕暮れ", sakura: "さくら"}}, languageSelector: {title: "言語選択"}, help: {...(koTranslations.help as Translation), title: "遊び方", objective: {title: "ゲームの目的", description: "コンピュータが作成した3つの異なる秘密の数字を9回以内に当ててください！"}, results: {title: "結果の読み方", hit: "ヒット：数字と位置の両方が正しい。", foul: "ファウル：数字は存在するが、位置が違う。", strike: "ストライク：推測した数字が秘密のコードに一つも含まれていない。", example: {answer: "正解", guess: "あなたの推測", result: "結果"}}, currency: {title: "通貨ガイド", wgt: "WGT：ゲーム内ヒントに使用するユーティリティトークン。デイリーチャレンジに勝利するか、友達紹介で獲得できます。"}, rewards: {title: "デイリーチャレンジ報酬", description: "少ない試行回数でホームランを打つほど、報酬は大きくなります！", inning: "{{count}}回で成功", reward: "+{{reward}} WGT"}}};
const esTranslations: Translation = { ...koTranslations, common: {...(koTranslations.common as Translation), title: "Béisbol WLD", returnToMain: "Volver al Principal", goBack: "Atrás", cancel: "Cancelar", confirm: "Confirmar", close: "Cerrar", settings: "Ajustes"}, main: {...(koTranslations.main as Translation), dailyChallenge: "Reto Diario", practiceMode: "Modo Práctica", play: "Jugar", remainingTime: "Reinicia en {{time}}", assets: "Mis Activos", referral: "Referir Amigo"}, game: {...(koTranslations.game as Translation), swing: "¡Batea!", giveUp: "Rendirse", useHint: "Usar Pista", hintCost: "({{count}} WGT)", inning: "Entrada {{inning}}/{{max}}", dailyChallengeTitle: "Reto Diario", practiceModeTitle: "Modo Práctica", hit_short: "H", foul_short: "F", strike_short: "S"}, modal: {...(koTranslations.modal as Translation), giveUp: {title: "¿Seguro que quieres rendirte?", message: "Las pistas usadas no se pueden devolver y su costo será deducido.", messagePractice: "¿Quieres salir del juego?"}, result: {homerun: "¡JONRÓN!", strikeout: "¡PONCHADO!", congrats: "¡Felicidades! ¡Has ganado!", nextTime: "Lástima. ¡Mejor suerte la próxima vez!", correctAnswer: "El número correcto era:", totalWinnings: "Ganancias Totales (WGT)"}, referral: { ...((koTranslations.modal as Translation).referral as Translation), title: "Referir Amigo", description: "¡Introduce el ID de referido de un amigo para obtener 10 WGT! Él también recibirá 10 WGT.", enterId: "Introduce el ID de Referido (Dirección de Billetera)", claimBonus: "Reclamar Bono", yourId: "Tu ID de Referido", copyId: "Copiar ID", copied: "¡Copiado!", invalidId: "ID inválido. Por favor, comprueba la dirección.", alreadyClaimed: "¡Ya has reclamado un bono de referido!", claimSuccess: "¡Éxito! Tú y tu amigo recibieron 10 WGT cada uno."}, settings: {title: "Ajustes", theme: "Tema", light: "Claro", dark: "Oscuro", dusk: "Anochecer", sakura: "Sakura"}}, languageSelector: {title: "Seleccionar Idioma"}, help: {...(koTranslations.help as Translation), title: "Cómo Jugar", objective: {title: "Objetivo del Juego", description: "¡Adivina los 3 números secretos únicos creados por la computadora en 9 intentos!"}, results: {title: "Cómo Leer los Resultados", hit: "Hit: El número y su posición son correctos.", foul: "Foul: El número existe, pero en una posición diferente.", strike: "Strike: Ninguno de los números adivinados está en el código secreto.", example: {answer: "Respuesta", guess: "Tu Adivinanza", result: "Resultado"}}, currency: {title: "Guía de Moneda", wgt: "WGT: Un token de utilidad para pistas en el juego. Gánalo ganando Retos Diarios o por referidos."}, rewards: {title: "Recompensas del Reto Diario", description: "¡Cuantos menos intentos necesites para un jonrón, mayor será la recompensa!", inning: "Éxito en {{count}} intentos", reward: "+{{reward}} WGT"}}};
const deTranslations: Translation = { ...koTranslations, common: {...(koTranslations.common as Translation), title: "WLD Baseball", returnToMain: "Zurück zum Hauptmenü", goBack: "Zurück", cancel: "Abbrechen", confirm: "Bestätigen", close: "Schließen", settings: "Einstellungen"}, main: {...(koTranslations.main as Translation), dailyChallenge: "Tages-Challenge", practiceMode: "Übungsmodus", play: "Spielen", remainingTime: "Zurücksetzung in {{time}}", assets: "Mein Vermögen", referral: "Freunde werben"}, game: {...(koTranslations.game as Translation), swing: "Schlag!", giveUp: "Aufgeben", useHint: "Hinweis nutzen", hintCost: "({{count}} WGT)", inning: "Inning {{inning}}/{{max}}", dailyChallengeTitle: "Tages-Challenge", practiceModeTitle: "Übungsmodus", hit_short: "H", foul_short: "F", strike_short: "S"}, modal: {...(koTranslations.modal as Translation), giveUp: {title: "Möchtest du wirklich aufgeben?", message: "Verwendete Hinweise können nicht zurückgegeben werden und ihre Kosten werden abgezogen.", messagePractice: "Möchtest du das Spiel beenden?"}, result: {homerun: "HOMERUN!", strikeout: "STRIKEOUT!", congrats: "Herzlichen Glückwunsch! Du hast gewonnen!", nextTime: "Schade. Nächstes Mal mehr Glück!", correctAnswer: "Die richtige Nummer war:", totalWinnings: "Gesamtgewinn (WGT)"}, referral: { ...((koTranslations.modal as Translation).referral as Translation), title: "Freunde werben", description: "Gib die Empfehlungs-ID eines Freundes ein und erhalte 10 WGT! Dein Freund erhält ebenfalls 10 WGT.", enterId: "Empfehler-ID eingeben (Wallet-Adresse)", claimBonus: "Bonus beanspruchen", yourId: "Deine Empfehler-ID", copyId: "ID kopieren", copied: "Kopiert!", invalidId: "Ungültige ID. Bitte überprüfe die Adresse.", alreadyClaimed: "Du hast bereits einen Empfehlungsbonus beansprucht!", claimSuccess: "Erfolg! Du und dein Freund haben jeweils 10 WGT erhalten."}, settings: {title: "Einstellungen", theme: "Thema", light: "Hell", dark: "Dunkel", dusk: "Dämmerung", sakura: "Sakura"}}, languageSelector: {title: "Sprache auswählen"}, help: {...(koTranslations.help as Translation), title: "Spielanleitung", objective: {title: "Spielziel", description: "Errate die 3 einzigartigen Geheimzahlen des Computers innerhalb von 9 Versuchen!"}, results: {title: "Ergebnisse lesen", hit: "Hit: Zahl und Position sind korrekt.", foul: "Foul: Die Zahl existiert, aber an einer anderen Position.", strike: "Strike: Keine der geratenen Zahlen ist im Geheimcode.", example: {answer: "Antwort", guess: "Dein Tipp", result: "Ergebnis"}}, currency: {title: "Währungsleitfaden", wgt: "WGT: Ein Utility-Token für Hinweise im Spiel. Verdiene ihn durch Gewinnen von Tages-Challenges oder durch Freundschaftswerbung."}, rewards: {title: "Tages-Challenge Belohnungen", description: "Je weniger Versuche für einen Homerun, desto größer die Belohnung!", inning: "Erfolg in {{count}} Versuchen", reward: "+{{reward}} WGT"}}};
const frTranslations: Translation = { ...koTranslations, common: {...(koTranslations.common as Translation), title: "WLD Baseball", returnToMain: "Retour au menu principal", goBack: "Retour", cancel: "Annuler", confirm: "Confirmer", close: "Fermer", settings: "Paramètres"}, main: {...(koTranslations.main as Translation), dailyChallenge: "Défi Quotidien", practiceMode: "Mode Entraînement", play: "Jouer", remainingTime: "Réinitialisation dans {{time}}", assets: "Mes Actifs", referral: "Parrainage"}, game: {...(koTranslations.game as Translation), swing: "Frapper !", giveUp: "Abandonner", useHint: "Utiliser Indice", hintCost: "({{count}} WGT)", inning: "Manche {{inning}}/{{max}}", dailyChallengeTitle: "Défi Quotidien", practiceModeTitle: "Mode Entraînement", hit_short: "H", foul_short: "F", strike_short: "S"}, modal: {...(koTranslations.modal as Translation), giveUp: {title: "Voulez-vous vraiment abandonner ?", message: "Les indices utilisés ne peuvent être rendus et leur coût sera déduit.", messagePractice: "Voulez-vous quitter la partie ?"}, result: {homerun: "HOME RUN !", strikeout: "ÉLIMINÉ !", congrats: "Félicitations ! Vous avez gagné !", nextTime: "Dommage. Meilleure chance la prochaine fois !", correctAnswer: "Le bon numéro était :", totalWinnings: "Gains Totaux (WGT)"}, referral: { ...((koTranslations.modal as Translation).referral as Translation), title: "Parrainage d'amis", description: "Entrez l'ID de parrainage d'un ami pour obtenir 10 WGT ! Il recevra également 10 WGT.", enterId: "Entrez l'ID du parrain (Adresse de portefeuille)", claimBonus: "Réclamer le bonus", yourId: "Votre ID de parrainage", copyId: "Copier l'ID", copied: "Copié !", invalidId: "ID invalide. Veuillez vérifier l'adresse.", alreadyClaimed: "Vous avez déjà réclamé un bonus de parrainage !", claimSuccess: "Succès ! Vous et votre ami avez reçu 10 WGT chacun."}, settings: {title: "Paramètres", theme: "Thème", light: "Clair", dark: "Sombre", dusk: "Crépuscule", sakura: "Sakura"}}, languageSelector: {title: "Sélectionner la langue"}, help: {...(koTranslations.help as Translation), title: "Comment Jouer", objective: {title: "Objectif du jeu", description: "Devinez les 3 numéros secrets uniques créés par l'ordinateur en 9 essais !"}, results: {title: "Comment lire les résultats", hit: "Hit : Le numéro et sa position sont corrects.", foul: "Foul : Le numéro existe, mais à une position différente.", strike: "Strike : Aucun des numéros devinés n'est dans le code secret.", example: {answer: "Réponse", guess: "Votre Essai", result: "Résultat"}}, currency: {title: "Guide des devises", wgt: "WGT : Un jeton utilitaire pour les indices en jeu. Gagnez-le en remportant des Défis Quotidiens ou par parrainage."}, rewards: {title: "Récompenses du Défi Quotidien", description: "Moins il faut d'essais pour un home run, plus la récompense est grande !", inning: "Succès en {{count}} essais", reward: "+{{reward}} WGT"}}};
const ptTranslations: Translation = { ...koTranslations, common: {...(koTranslations.common as Translation), title: "WLD Baseball", returnToMain: "Voltar ao Início", goBack: "Voltar", cancel: "Cancelar", confirm: "Confirmar", close: "Fechar", settings: "Configurações"}, main: {...(koTranslations.main as Translation), dailyChallenge: "Desafio Diário", practiceMode: "Modo de Prática", play: "Jogar", remainingTime: "Reinicia em {{time}}", assets: "Meus Ativos", referral: "Indicar Amigo"}, game: {...(koTranslations.game as Translation), swing: "Bater!", giveUp: "Desistir", useHint: "Usar Dica", hintCost: "({{count}} WGT)", inning: "Entrada {{inning}}/{{max}}", dailyChallengeTitle: "Desafio Diário", practiceModeTitle: "Modo de Prática", hit_short: "H", foul_short: "F", strike_short: "S"}, modal: {...(koTranslations.modal as Translation), giveUp: {title: "Tem certeza que quer desistir?", message: "Dicas usadas não podem ser devolvidas e seu custo será deduzido.", messagePractice: "Quer sair do jogo?"}, result: {homerun: "HOME RUN!", strikeout: "STRIKEOUT!", congrats: "Parabéns! Você venceu!", nextTime: "Que pena. Mais sorte da próxima vez!", correctAnswer: "O número correto era:", totalWinnings: "Ganhos Totais (WGT)"}, referral: { ...((koTranslations.modal as Translation).referral as Translation), title: "Indicação de Amigo", description: "Insira o ID de indicação de um amigo para ganhar 10 WGT! Ele também receberá 10 WGT.", enterId: "Insira o ID do Indicador (Endereço da Carteira)", claimBonus: "Resgatar Bônus", yourId: "Seu ID de Indicação", copyId: "Copiar ID", copied: "Copiado!", invalidId: "ID inválido. Por favor, verifique o endereço.", alreadyClaimed: "Você já resgatou um bônus de indicação!", claimSuccess: "Sucesso! Você e seu amigo receberam 10 WGT cada."}, settings: {title: "Configurações", theme: "Tema", light: "Claro", dark: "Escuro", dusk: "Crepúsculo", sakura: "Sakura"}}, languageSelector: {title: "Selecionar Idioma"}, help: {...(koTranslations.help as Translation), title: "Como Jogar", objective: {title: "Objetivo do Jogo", description: "Adivinhe os 3 números secretos únicos criados pelo computador em 9 tentativas!"}, results: {title: "Como Ler os Resultados", hit: "Hit: O número e sua posição estão corretos.", foul: "Foul: O número existe, mas em uma posição diferente.", strike: "Strike: Nenhum dos números adivinhados está no código secreto.", example: {answer: "Resposta", guess: "Seu Palpite", result: "Resultado"}}, currency: {title: "Guia de Moedas", wgt: "WGT: Um token utilitário para dicas no jogo. Ganhe vencendo Desafios Diários ou por indicações."}, rewards: {title: "Recompensas do Desafio Diário", description: "Quanto menos tentativas para um home run, maior a recompensa!", inning: "Sucesso em {{count}} tentativas", reward: "+{{reward}} WGT"}}};
const ruTranslations: Translation = { ...koTranslations, common: {...(koTranslations.common as Translation), title: "WLD Бейсбол", returnToMain: "Вернуться в главное меню", goBack: "Назад", cancel: "Отмена", confirm: "Подтвердить", close: "Закрыть", settings: "Настройки"}, main: {...(koTranslations.main as Translation), dailyChallenge: "Ежедневное испытание", practiceMode: "Тренировка", play: "Играть", remainingTime: "Сброс через {{time}}", assets: "Мои активы", referral: "Пригласить друга"}, game: {...(koTranslations.game as Translation), swing: "Удар!", giveUp: "Сдаться", useHint: "Подсказка", hintCost: "({{count}} WGT)", inning: "Иннинг {{inning}}/{{max}}", dailyChallengeTitle: "Ежедневное испытание", practiceModeTitle: "Тренировка", hit_short: "Х", foul_short: "Ф", strike_short: "С"}, modal: {...(koTranslations.modal as Translation), giveUp: {title: "Вы уверены, что хотите сдаться?", message: "Использованные подсказки не возвращаются, и их стоимость будет списана.", messagePractice: "Хотите выйти из игры?"}, result: {homerun: "ХОУМ-РАН!", strikeout: "СТРАЙК-АУТ!", congrats: "Поздравляем! Вы победили!", nextTime: "Жаль. Удачи в следующий раз!", correctAnswer: "Правильным числом было:", totalWinnings: "Общий выигрыш (WGT)"}, referral: { ...((koTranslations.modal as Translation).referral as Translation), title: "Пригласить друга", description: "Введите реферальный ID друга и получите 10 WGT! Ваш друг также получит 10 WGT.", enterId: "Введите ID пригласившего (адрес кошелька)", claimBonus: "Получить бонус", yourId: "Ваш реферальный ID", copyId: "Копировать ID", copied: "Скопировано!", invalidId: "Неверный ID. Проверьте адрес.", alreadyClaimed: "Вы уже получили реферальный бонус!", claimSuccess: "Успех! Вы и ваш друг получили по 10 WGT."}, settings: {title: "Настройки", theme: "Тема", light: "Светлая", dark: "Темная", dusk: "Сумерки", sakura: "Сакура"}}, languageSelector: {title: "Выберите язык"}, help: {...(koTranslations.help as Translation), title: "Как играть", objective: {title: "Цель игры", description: "Угадайте 3 уникальных секретных числа, созданных компьютером, за 9 попыток!"}, results: {title: "Как читать результаты", hit: "Хит: Число и его позиция верны.", foul: "Фол: Число существует, но на другой позиции.", strike: "Страйк: Ни одно из угаданных чисел не входит в секретный код.", example: {answer: "Ответ", guess: "Ваша догадка", result: "Результат"}}, currency: {title: "Руководство по валюте", wgt: "WGT: Утилитарный токен для подсказок в игре. Зарабатывайте его, выигрывая ежедневные испытания или приглашая друзей."}, rewards: {title: "Награды за ежедневное испытание", description: "Чем меньше попыток для хоум-рана, тем больше награда!", inning: "Успех за {{count}} попыток", reward: "+{{reward}} WGT"}}};
const hiTranslations: Translation = { ...koTranslations, common: {...(koTranslations.common as Translation), title: "WLD बेसबॉल", returnToMain: "मुख्य पर लौटें", goBack: "वापस", cancel: "रद्द करें", confirm: "पुष्टि करें", close: "बंद करें", settings: "सेटिंग्स"}, main: {...(koTranslations.main as Translation), dailyChallenge: "दैनिक चुनौती", practiceMode: "अभ्यास मोड", play: "खेलें", remainingTime: "{{time}} में रीसेट", assets: "मेरी संपत्ति", referral: "मित्र को आमंत्रित करें"}, game: {...(koTranslations.game as Translation), swing: "बल्ला घुमाओ!", giveUp: "छोड़ दें", useHint: "संकेत का प्रयोग करें", hintCost: "({{count}} WGT)", inning: "पारी {{inning}}/{{max}}", dailyChallengeTitle: "दैनिक चुनौती", practiceModeTitle: "अभ्यास मोड", hit_short: "हि", foul_short: "फा", strike_short: "स्ट"}, modal: {...(koTranslations.modal as Translation), giveUp: {title: "क्या आप वाकई छोड़ना चाहते हैं?", message: "इस्तेमाल किए गए संकेत वापस नहीं किए जा सकते हैं, और उनकी लागत काट ली जाएगी।", messagePractice: "क्या आप खेल छोड़ना चाहते हैं?"}, result: {homerun: "होम रन!", strikeout: "स्ट्राइकआउट!", congrats: "बधाई हो! आप जीत गए!", nextTime: "कोई बात नहीं। अगली बार बेहतर suerte!", correctAnswer: "सही संख्या थी:", totalWinnings: "कुल जीत (WGT)"}, referral: { ...((koTranslations.modal as Translation).referral as Translation), title: "मित्र रेफरल", description: "10 WGT पाने के लिए मित्र का रेफरल आईडी दर्ज करें! उन्हें भी 10 WGT मिलेगा।", enterId: "रेफरर आईडी दर्ज करें (वॉलेट पता)", claimBonus: "बोनस का दावा करें", yourId: "आपका रेफरल आईडी", copyId: "आईडी कॉपी करें", copied: "कॉपी किया गया!", invalidId: "अमान्य आईडी। कृपया पता जांचें।", alreadyClaimed: "आप पहले ही एक रेफरल बोनस का दावा कर चुके हैं!", claimSuccess: "सफलता! आपको और आपके मित्र को प्रत्येक 10 WGT प्राप्त हुए।"}, settings: {title: "सेटिंग्स", theme: "थीम", light: "लाइट", dark: "डार्क", dusk: "सांझ", sakura: "सकुरा"}}, languageSelector: {title: "भाषा चुनें"}, help: {...(koTranslations.help as Translation), title: "कैसे खेलें", objective: {title: "खेल का उद्देश्य", description: "कंप्यूटर द्वारा बनाए गए 3 अद्वितीय गुप्त नंबरों का 9 प्रयासों में अनुमान लगाएं!"}, results: {title: "परिणाम कैसे पढ़ें", hit: "हिट: संख्या और उसकी स्थिति दोनों सही हैं।", foul: "फाउल: संख्या मौजूद है, लेकिन एक अलग स्थिति में।", strike: "स्ट्राइक: अनुमानित संख्याओं में से कोई भी गुप्त कोड में नहीं है।", example: {answer: "उत्तर", guess: "आपका अनुमान", result: "परिणाम"}}, currency: {title: "मुद्रा गाइड", wgt: "WGT: इन-गेम संकेतों के लिए एक उपयोगिता टोकन। इसे दैनिक चुनौतियों को जीतकर या मित्र रेफरल के माध्यम से अर्जित करें।"}, rewards: {title: "दैनिक चुनौती पुरस्कार", description: "होम रन मारने में जितने कम प्रयास लगते हैं, उतना बड़ा इनाम मिलता है!", inning: "{{count}} प्रयासों में सफलता", reward: "+{{reward}} WGT"}}};
const zhTranslations: Translation = { ...koTranslations, common: {...(koTranslations.common as Translation), title: "WLD棒球", returnToMain: "返回主菜单", goBack: "返回", cancel: "取消", confirm: "确认", close: "关闭", settings: "设置"}, main: {...(koTranslations.main as Translation), dailyChallenge: "每日挑战", practiceMode: "练习模式", play: "开始游戏", remainingTime: "{{time}}后重置", assets: "我的资产", referral: "好友推荐"}, game: {...(koTranslations.game as Translation), swing: "挥棒！", giveUp: "放弃", useHint: "使用提示", hintCost: "({{count}} WGT)", inning: "第{{inning}}/{{max}}局", dailyChallengeTitle: "每日挑战", practiceModeTitle: "练习模式", hit_short: "安", foul_short: "坏", strike_short: "好"}, modal: {...(koTranslations.modal as Translation), giveUp: {title: "确定要放弃吗？", message: "已使用的提示无法退回，并将扣除其费用。", messagePractice: "要退出游戏吗？"}, result: {homerun: "本垒打！", strikeout: "三振出局！", congrats: "恭喜！你赢了！", nextTime: "太遗憾了。下次好运！", correctAnswer: "正确数字是：", totalWinnings: "总奖金 (WGT)"}, referral: { ...((koTranslations.modal as Translation).referral as Translation), title: "好友推荐", description: "输入好友的推荐ID即可获得10 WGT！他们也将获得10 WGT。", enterId: "输入推荐人ID（钱包地址）", claimBonus: "领取奖励", yourId: "你的推荐ID", copyId: "复制ID", copied: "已复制！", invalidId: "ID无效。请检查地址。", alreadyClaimed: "您已经领取过推荐奖励了！", claimSuccess: "成功！您和您的朋友各自获得了10 WGT。"}, settings: {title: "设置", theme: "主题", light: "浅色", dark: "深色", dusk: "黄昏", sakura: "樱花"}}, languageSelector: {title: "选择语言"}, help: {...(koTranslations.help as Translation), title: "游戏玩法", objective: {title: "游戏目标", description: "在9次尝试内猜出电脑创建的3个不重复的秘密数字！"}, results: {title: "如何解读结果", hit: "安打：数字和位置都正确。", foul: "坏球：数字存在，但位置不正确。", strike: "好球：猜测的数字均未在秘密代码中。", example: {answer: "答案", guess: "你的猜测", result: "结果"}}, currency: {title: "货币指南", wgt: "WGT：用于游戏内提示的实用代币。通过赢得每日挑战或好友推荐来赚取。"}, rewards: {title: "每日挑战奖励", description: "击出本垒打的尝试次数越少，奖励就越大！", inning: "在{{count}}次尝试中成功", reward: "+{{reward}} WGT"}}};

export const translations: Translations = {
  en: enTranslations,
  ko: koTranslations,
  ja: jaTranslations,
  es: esTranslations,
  de: deTranslations,
  fr: frTranslations,
  pt: ptTranslations,
  ru: ruTranslations,
  hi: hiTranslations,
  zh: zhTranslations,
  // Fallback for other languages to English
  ar: enTranslations,
  ur: enTranslations,
  bn: enTranslations,
  id: enTranslations,
  am: enTranslations,
  tl: enTranslations,
  vi: enTranslations,
};