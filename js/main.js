function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}


function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}


function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}


function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const asunto = document.getElementById('asunto').value;
        const mensaje = document.getElementById('mensaje').value;
        
        if (!nombre || !email || !asunto || !mensaje) {
            alert('Por favor, completa todos los campos');
            return;
        }
        
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, introduce un email válido');
            return;
        }
        
        
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = '✓ Mensaje Enviado';
            submitButton.style.background = 'linear-gradient(135deg, #00ff41, #00cc33)';
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
                contactForm.reset();
                
                
                alert('¡Mensaje enviado con éxito!');
            }, 3000);
        }, 1500);
    });
}


function initTypingEffect() {
    const heroTitle = document.getElementById('heroTitle');
    
    if (!heroTitle) return;
    
    const originalTitle = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.classList.add('typing-cursor');
    
    let charIndex = 0;
    function typeWriter() {
        if (charIndex < originalTitle.length) {
            heroTitle.textContent += originalTitle.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        } else {
            heroTitle.classList.remove('typing-cursor');
        }
    }
    
    setTimeout(typeWriter, 1000);
}


function initBlogInteractions() {
    const likeButtons = document.querySelectorAll('.like-button');
    const commentButtons = document.querySelectorAll('.comment-button');
    const shareButtons = document.querySelectorAll('.share-button');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentText = this.textContent;
            const likeCount = parseInt(currentText.match(/\d+/)?.[0] || 0);
            const newCount = likeCount + 1;
            this.textContent = `❤️ ${newCount}`;
            this.style.color = '#ff6b6b';
            
            setTimeout(() => {
                this.style.color = '';
            }, 1000);
        });
    });
    
    commentButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Función de comentarios disponible próximamente');
        });
    });
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    url: window.location.href
                }).catch(() => {});
            } else {
                // Fallback
                const dummy = document.createElement('input');
                document.body.appendChild(dummy);
                dummy.value = window.location.href;
                dummy.select();
                document.execCommand('copy');
                document.body.removeChild(dummy);
                alert('Enlace copiado al portapapeles');
            }
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNavbarScroll();
    initSmoothScroll();
    initContactForm();
    initTypingEffect();
    initBlogInteractions();
});


if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initMobileMenu,
        initNavbarScroll,
        initSmoothScroll,
        initContactForm,
        initTypingEffect,
        initBlogInteractions
    };
}