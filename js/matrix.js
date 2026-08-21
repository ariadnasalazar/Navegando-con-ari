function createMatrixRain() {
    const matrixBg = document.getElementById('matrixBg');
    
    if (!matrixBg) return;
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    const rainCount = window.innerWidth < 768 ? 10 : 20;
    
    for (let i = 0; i < rainCount; i++) {
        const rain = document.createElement('div');
        rain.className = 'matrix-rain';
        rain.style.left = `${Math.random() * 100}%`;
        rain.style.animationDuration = `${Math.random() * 10 + 10}s`;
        rain.style.animationDelay = `${Math.random() * 10}s`;
        rain.style.fontSize = `${Math.random() * 10 + 10}px`;
        
        let text = '';
        const textLength = Math.floor(Math.random() * 20 + 10);
        for (let j = 0; j < textLength; j++) {
            text += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        rain.textContent = text;
        matrixBg.appendChild(rain);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    createMatrixRain();
});


window.addEventListener('resize', () => {
    const matrixBg = document.getElementById('matrixBg');
    if (matrixBg) {
        matrixBg.innerHTML = '';
        createMatrixRain();
    }
});