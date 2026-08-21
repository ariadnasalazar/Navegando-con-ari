class AnimationManager {
    constructor() {
        this.observer = null;
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupParallaxEffects();
        this.setupHoverEffects();
        this.setupScrollProgress();
    }
    
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, options);
        
        
        document.querySelectorAll('.card, .blog-post, .bio-card, .contact-method, .timeline-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            this.observer.observe(el);
        });
    }
    
    setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero');
            
            parallaxElements.forEach(el => {
                const speed = 0.5;
                el.style.backgroundPosition = `center ${scrolled * speed}px`;
            });
        });
    }
    
    setupHoverEffects() {
        
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.transition = 'all 0.3s ease';
            });
        });
    }
    
    setupScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #0066ff, #00d4ff);
            z-index: 9999;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = `${progress}%`;
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const animationManager = new AnimationManager();
    
   
    createFloatingParticles();
    
    
    if (window.innerWidth > 1024) {
        createCursorTrail();
    }
});


function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const color = Math.random() > 0.5 ? '#0066ff' : '#00d4ff';
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s infinite;
            animation-delay: ${Math.random() * 5}s;
            opacity: 0.3;
        `;
        
        particlesContainer.appendChild(particle);
    }
    

    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0) translateX(0);
                opacity: 0.3;
            }
            25% {
                transform: translateY(-20px) translateX(10px);
                opacity: 0.6;
            }
            50% {
                transform: translateY(-10px) translateX(-10px);
                opacity: 0.3;
            }
            75% {
                transform: translateY(-30px) translateX(5px);
                opacity: 0.5;
            }
        }
    `;
    document.head.appendChild(style);
}


function createCursorTrail() {
    const trailContainer = document.createElement('div');
    trailContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
    `;
    document.body.appendChild(trailContainer);
    
    const trailPoints = [];
    const maxTrailPoints = 10;
    
    document.addEventListener('mousemove', (e) => {
        trailPoints.push({ x: e.clientX, y: e.clientY });
        
        if (trailPoints.length > maxTrailPoints) {
            trailPoints.shift();
        }
        
        trailContainer.innerHTML = '';
        
        trailPoints.forEach((point, index) => {
            const trail = document.createElement('div');
            const size = (index + 1) * 2;
            const opacity = (index + 1) / maxTrailPoints * 0.3;
            
            trail.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: #0066ff;
                border-radius: 50%;
                left: ${point.x - size / 2}px;
                top: ${point.y - size / 2}px;
                opacity: ${opacity};
                pointer-events: none;
                transition: all 0.1s ease;
            `;
            
            trailContainer.appendChild(trail);
        });
    });
}