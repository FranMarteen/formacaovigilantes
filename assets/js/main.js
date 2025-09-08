// JavaScript principal para o site formacaodevigilantes.com.br

document.addEventListener('DOMContentLoaded', function() {
    
    // FAQ Accordion Functionality
    initFAQAccordion();
    
    // Smooth Scrolling para links âncora
    initSmoothScrolling();
    
    // Tracking de eventos para Analytics
    initEventTracking();
    
    // Lazy Loading de imagens
    initLazyLoading();
    
    // Mobile Menu Toggle
    initMobileMenu();
    
});

// FAQ Accordion
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.style.display === 'block';
            
            // Fechar todas as outras respostas
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.style.display = 'none';
            });
            
            // Toggle da resposta atual
            if (!isOpen) {
                answer.style.display = 'block';
                
                // Scroll suave para a pergunta
                this.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Smooth Scrolling para navegação
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Altura do header fixo
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Track navigation events
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'navigation_click', {
                        'section': targetId,
                        'page_title': document.title
                    });
                }
            }
        });
    });
}

// Event Tracking para Analytics
function initEventTracking() {
    
    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const buttonHref = this.getAttribute('href');
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'cta_click', {
                    'button_text': buttonText,
                    'button_url': buttonHref,
                    'page_location': window.location.href
                });
            }
        });
    });
    
    // Track specialty card interactions
    const specCards = document.querySelectorAll('.spec-card');
    specCards.forEach(card => {
        card.addEventListener('click', function() {
            const specTitle = this.querySelector('h3').textContent.trim();
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'specialization_interest', {
                    'specialization': specTitle,
                    'page_location': window.location.href
                });
            }
        });
    });
    
    // Track Table of Contents clicks
    const tocItems = document.querySelectorAll('.toc-item');
    tocItems.forEach(item => {
        item.addEventListener('click', function() {
            const sectionTitle = this.querySelector('h3').textContent.trim();
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'toc_navigation', {
                    'section': sectionTitle,
                    'page_location': window.location.href
                });
            }
        });
    });
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', throttle(function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
            maxScroll = scrollPercent;
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'scroll_depth', {
                    'percent_scrolled': scrollPercent,
                    'page_location': window.location.href
                });
            }
        }
    }, 1000));
}

// Lazy Loading de imagens
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Mobile Menu Toggle
function initMobileMenu() {
    // Criar botão de menu mobile se não existir
    const navbar = document.querySelector('.navbar .container');
    if (navbar && !document.querySelector('.mobile-menu-toggle')) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '☰';
        menuToggle.setAttribute('aria-label', 'Toggle Menu');
        
        menuToggle.addEventListener('click', function() {
            const navMenu = document.querySelector('.navbar-nav');
            navMenu.classList.toggle('mobile-active');
            this.classList.toggle('active');
        });
        
        navbar.appendChild(menuToggle);
    }
}

// Utility function: Throttle
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Form submission tracking (se houver formulários)
function trackFormSubmission(formId, formName) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(e) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'form_name': formName,
                    'page_location': window.location.href
                });
            }
        });
    }
}

// WhatsApp integration
function initWhatsAppButton() {
    const whatsappNumber = '5588999999999'; // Substituir pelo número real
    const whatsappMessage = encodeURIComponent('Olá! Gostaria de mais informações sobre os cursos de formação de vigilantes.');
    
    // Criar botão flutuante do WhatsApp
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.target = '_blank';
    whatsappBtn.innerHTML = '💬';
    whatsappBtn.setAttribute('aria-label', 'Conversar no WhatsApp');
    
    // Adicionar tracking ao WhatsApp
    whatsappBtn.addEventListener('click', function() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_click', {
                'page_location': window.location.href
            });
        }
    });
    
    document.body.appendChild(whatsappBtn);
}

// Inicializar WhatsApp quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    initWhatsAppButton();
});

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitorar Core Web Vitals
    if ('web-vital' in window) {
        import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({getCLS, getFID, getFCP, getLCP, getTTFB}) => {
            function sendToAnalytics(metric) {
                if (typeof gtag !== 'undefined') {
                    gtag('event', metric.name, {
                        event_category: 'Web Vitals',
                        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                        non_interaction: true,
                    });
                }
            }
            
            getCLS(sendToAnalytics);
            getFID(sendToAnalytics);
            getFCP(sendToAnalytics);
            getLCP(sendToAnalytics);
            getTTFB(sendToAnalytics);
        });
    }
}

// Inicializar monitoramento de performance
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPerformanceMonitoring);
} else {
    initPerformanceMonitoring();
}
