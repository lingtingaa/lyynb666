// 音效控制器
const Sound = {
    play(id) {
        const audio = document.getElementById(id);
        if (!audio) return;
        audio.currentTime = 0;
        audio.play().catch(() => {});
    }
}

// 游戏配置
const GameConfig = {
    moves: ['✊', '✌️', '🖐️'],
    results: {
        win: { 
            text: "🎉 吕阳阳天天开心", 
            color: "#8aff6f", 
            sound: 'win-sound' 
        },
        lose: { 
            text: "💢 笨蛋吕阳阳", 
            color: "#ff6b6b", 
            sound: 'lose-sound' 
        },
        draw: { 
            text: "🤝 加油吕阳阳", 
            color: "#ffe66f" 
        }
    }
}

// 初始化按钮事件
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function() {
        Sound.play('click-sound');
        playGame(this.dataset.move);
    });

    // 移动端触摸反馈
    btn.addEventListener('touchstart', () => btn.style.transform = 'scale(0.9)');
    btn.addEventListener('touchend', () => btn.style.transform = 'scale(1)');
});

// 核心游戏逻辑
function playGame(userMove) {
    const computerMove = GameConfig.moves[Math.floor(Math.random() * 3)];
    const resultDiv = document.getElementById('game-result');
    
    // 清空旧结果
    resultDiv.innerHTML = `<div class="result-card">你：${userMove} VS 电脑：${computerMove}</div>`;

    // 延迟显示结果
    setTimeout(() => {
        const result = calculateResult(userMove, computerMove);
        showResult(result);
    }, 1500);
}

// 胜负判断
function calculateResult(user, computer) {
    if (user === computer) return 'draw';
    const winConditions = [
        ['✊', '✌️'],
        ['✌️', '🖐️'],
        ['🖐️', '✊']
    ];
    return winConditions.some(([a, b]) => a === user && b === computer) ? 'win' : 'lose';
}

// 显示结果
function showResult(resultType) {
    const { text, color, sound } = GameConfig.results[resultType];
    const resultDiv = document.getElementById('game-result');
    
    // 播放音效
    if (sound) Sound.play(sound);
    
    // 创建结果元素
    const resultElement = document.createElement('div');
    resultElement.className = 'result-card';
    resultElement.style.color = color;
    resultElement.textContent = text;
    
    resultDiv.appendChild(resultElement);

    // 6秒后自动清理
    setTimeout(() => resultDiv.innerHTML = '', 6000);
}