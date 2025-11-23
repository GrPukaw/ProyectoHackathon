/* ==========================================
   VARIABLES GLOBALES
   ========================================== */
const header = document.getElementById('header');
const navMenu = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelectorAll('.nav__link');
const scrollTopBtn = document.getElementById('scrollTop');
const sections = document.querySelectorAll('section[id]');

/* ==========================================
   MENÚ MÓVIL - Toggle
   ========================================== */
function toggleMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // Prevenir scroll cuando el menú está abierto
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Event listener para el botón toggle
if (navToggle) {
    navToggle.addEventListener('click', toggleMenu);
}

/* ==========================================
   CERRAR MENÚ AL HACER CLICK EN UN LINK
   ========================================== */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Cerrar menú móvil
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

/* ==========================================
   CERRAR MENÚ AL HACER CLICK FUERA
   ========================================== */
document.addEventListener('click', (e) => {
    const isClickInsideNav = navMenu.contains(e.target);
    const isClickOnToggle = navToggle.contains(e.target);
    
    if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

/* ==========================================
   CAMBIAR ESTILO DEL HEADER AL HACER SCROLL
   ========================================== */
function scrollHeader() {
    if (window.scrollY >= 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', scrollHeader);

/* ==========================================
   SCROLL SUAVE PARA LINKS DE NAVEGACIÓN
   ========================================== */
function smoothScroll(e) {
    const targetId = this.getAttribute('href');
    
    // Solo aplicar scroll suave a links internos (que empiezan con #)
    if (targetId.startsWith('#')) {
        e.preventDefault();
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Aplicar scroll suave a todos los links de navegación
navLinks.forEach(link => {
    link.addEventListener('click', smoothScroll);
});

/* ==========================================
   RESALTAR LINK ACTIVO EN LA NAVEGACIÓN
   ========================================== */
function highlightActiveLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightActiveLink);

/* ==========================================
   BOTÓN SCROLL TO TOP
   ========================================== */
function toggleScrollTopButton() {
    if (window.scrollY >= 400) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Event listeners para el botón scroll top
window.addEventListener('scroll', toggleScrollTopButton);

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', scrollToTop);
}

/* ==========================================
   ANIMACIÓN DE ELEMENTOS AL HACER SCROLL
   ========================================== */
function animateOnScroll() {
    const elements = document.querySelectorAll('.course-card, .feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        observer.observe(element);
    });
}

// Ejecutar animación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', animateOnScroll);

/* ==========================================
   LAZY LOADING PARA IMÁGENES (si las agregas)
   ========================================== */
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Ejecutar lazy loading si hay imágenes
document.addEventListener('DOMContentLoaded', lazyLoadImages);

/* ==========================================
   CONTADOR ANIMADO PARA NÚMEROS
   ========================================== */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60 FPS
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Ejemplo de uso (puedes agregar contadores en tu HTML):
// <span class="counter" data-target="1000">0</span>
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

document.addEventListener('DOMContentLoaded', initCounters);

/* ==========================================
   FORMULARIO DE CONTACTO (si lo agregas)
   ========================================== */
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log('Formulario enviado:');
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
    
    // Mostrar mensaje de éxito
    showNotification('¡Mensaje enviado con éxito!', 'success');
    
    // Resetear formulario
    form.reset();
}

// Event listener para formularios
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

/* ==========================================
   SISTEMA DE NOTIFICACIONES
   ========================================== */
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Agregar estilos inline si no existen en CSS
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#4299e1'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/* ==========================================
   MODO OSCURO (OPCIONAL)
   ========================================== */
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // Guardar preferencia en localStorage
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Cargar preferencia de modo oscuro al iniciar
function loadDarkModePreference() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
}

// Event listener para botón de modo oscuro (si lo agregas)
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
}

document.addEventListener('DOMContentLoaded', loadDarkModePreference);

/* ==========================================
   FILTRO DE CURSOS (OPCIONAL)
   ========================================== */
function filterCourses(category) {
    const courses = document.querySelectorAll('.course-card');
    
    courses.forEach(course => {
        if (category === 'all' || course.dataset.category === category) {
            course.style.display = 'flex';
            course.style.animation = 'fadeInUp 0.5s ease';
        } else {
            course.style.display = 'none';
        }
    });
}

// Event listeners para botones de filtro (si los agregas)
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.filter;
        filterCourses(category);
        
        // Actualizar botón activo
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

/* ==========================================
   BÚSQUEDA DE CURSOS (OPCIONAL)
   ========================================== */
function searchCourses(query) {
    const courses = document.querySelectorAll('.course-card');
    const searchQuery = query.toLowerCase();
    
    courses.forEach(course => {
        const title = course.querySelector('.course-card__title').textContent.toLowerCase();
        const description = course.querySelector('.course-card__description').textContent.toLowerCase();
        
        if (title.includes(searchQuery) || description.includes(searchQuery)) {
            course.style.display = 'flex';
        } else {
            course.style.display = 'none';
        }
    });
}

// Event listener para buscador (si lo agregas)
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        searchCourses(e.target.value);
    });
}

/* ==========================================
   MANEJO DE ERRORES GLOBAL
   ========================================== */
window.addEventListener('error', (e) => {
    console.error('Error capturado:', e.message);
    // Aquí puedes agregar lógica para reportar errores
});

/* ==========================================
   PREVENIR COMPORTAMIENTO POR DEFECTO
   ========================================== */
// Prevenir zoom en doble tap en móviles
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

/* ==========================================
   INICIALIZACIÓN CUANDO EL DOM ESTÁ LISTO
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Sitio web cargado correctamente');
    console.log('📚 Academia Tech - JavaScript iniciado');
    
    // Aquí puedes agregar más inicializaciones si es necesario
    scrollHeader();
    highlightActiveLink();
    toggleScrollTopButton();
});

/* ==========================================
   OPTIMIZACIÓN DE RENDIMIENTO
   ========================================== */
// Debounce para eventos que se disparan frecuentemente
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Aplicar debounce a eventos de scroll
const debouncedScrollHeader = debounce(scrollHeader);
const debouncedHighlightActiveLink = debounce(highlightActiveLink);
const debouncedToggleScrollTopButton = debounce(toggleScrollTopButton);

window.addEventListener('scroll', debouncedScrollHeader);
window.addEventListener('scroll', debouncedHighlightActiveLink);
window.addEventListener('scroll', debouncedToggleScrollTopButton);

/* ==========================================
   ANALYTICS (OPCIONAL)
   ========================================== */
function trackEvent(category, action, label) {
    // Aquí puedes integrar Google Analytics o similar
    console.log(`Event tracked: ${category} - ${action} - ${label}`);

}

// Trackear clicks en botones importantes
document.querySelectorAll('.btn--primary, .btn--course').forEach(btn => {
    btn.addEventListener('click', (e) => {
        trackEvent('Button', 'Click', e.target.textContent);
    });
});

/* ==========================================
   FINAL DEL ARCHIVO
   ========================================== */
console.log('🎉 JavaScript cargado completamente');