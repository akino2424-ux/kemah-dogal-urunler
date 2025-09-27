// Kemah Doğal Ürünler Pazarı - Ana JavaScript - Cross-Platform Compatible

// Cross-Platform Event Listeners
function addEventListeners() {
    // Touch and mouse events for cross-platform compatibility
    const touchEvents = ['touchstart', 'touchend', 'touchmove'];
    const mouseEvents = ['mousedown', 'mouseup', 'mousemove'];
    
    // Add event listeners for both touch and mouse
    touchEvents.forEach(event => {
        document.addEventListener(event, handleTouchEvent, { passive: true });
    });
    
    mouseEvents.forEach(event => {
        document.addEventListener(event, handleMouseEvent, { passive: true });
    });
}

function handleTouchEvent(e) {
    // Handle touch events
    if (e.type === 'touchstart') {
        e.target.classList.add('touched');
    } else if (e.type === 'touchend') {
        setTimeout(() => {
            e.target.classList.remove('touched');
        }, 150);
    }
}

function handleMouseEvent(e) {
    // Handle mouse events
    if (e.type === 'mousedown') {
        e.target.classList.add('clicked');
    } else if (e.type === 'mouseup') {
        setTimeout(() => {
            e.target.classList.remove('clicked');
        }, 150);
    }
}

// Cross-Platform DOM Ready
function domReady(fn) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fn);
    } else {
        fn();
    }
}

domReady(function() {
    console.log('Kemah Doğal Ürünler Pazarı yüklendi - Cross-Platform Compatible');
    addEventListeners();
    
    // Initialize all components
    initializeComponents();
    
    // Add smooth scrolling
    addSmoothScrolling();
    
    // Initialize tooltips
    initializeTooltips();
    
    // Initialize cart functionality
    initializeCart();
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize cookie banner
    initializeCookieBanner();
});

// Initialize all components
function initializeComponents() {
    console.log('Kemah Doğal Ürünler Pazarı yüklendi');
    
    // Loading states kaldırıldı
    
    // Initialize form validations
    initializeFormValidations();
    
    // Initialize image lazy loading
    initializeLazyLoading();
}

// Add smooth scrolling to anchor links
function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize Bootstrap tooltips
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Initialize cart functionality
function initializeCart() {
    // Update cart count on page load
    updateCartCount();
    
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('[data-product-id]');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productId = this.getAttribute('data-product-id');
            const quantity = this.getAttribute('data-quantity') || 1;
            
            addToCart(productId, quantity);
        });
    });
}

// Add to cart function
function addToCart(productId, quantity = 1) {
    const button = document.querySelector(`[data-product-id="${productId}"]`);
    const originalText = button.innerHTML;
    
    // Loading state kaldırıldı
    
    fetch('/sepet/ekle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `product_id=${productId}&quantity=${quantity}`
    })
    .then(response => response.text())
    .then(data => {
        // Show success message
        showNotification('Ürün sepete eklendi!', 'success');
        
        // Update cart count
        updateCartCount();
        
        // Reset button
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('Ürün sepete eklenirken bir hata oluştu!', 'error');
    });
}

// Update cart count
function updateCartCount() {
    fetch('/api/cart/count')
        .then(response => response.json())
        .then(data => {
            const cartCountElement = document.getElementById('cart-count');
            if (cartCountElement) {
                cartCountElement.textContent = data.count;
            }
        })
        .catch(error => {
            console.log('Cart count update failed:', error);
            // Hata durumunda cart count'u 0 yap
            const cartCountElement = document.getElementById('cartCount');
            if (cartCountElement) {
                cartCountElement.textContent = '0';
            }
        });
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(this.value);
            }, 300);
        });
    }
}

// Perform search
function performSearch(query) {
    if (query.length < 2) return;
    
    // This would typically make an AJAX request to search endpoint
    console.log('Searching for:', query);
}

// Initialize animations
function initializeAnimations() {
    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Loading states kaldırıldı - gereksiz karmaşıklık

// Initialize form validations
function initializeFormValidations() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!this.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            this.classList.add('was-validated');
        });
    });
}

// Initialize lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
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

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY'
    }).format(amount);
}

// Utility function to format date
function formatDate(date) {
    return new Intl.DateTimeFormat('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// Utility function to debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Utility function to throttle
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
    };
}

// Initialize quantity selectors
function initializeQuantitySelectors() {
    const quantityInputs = document.querySelectorAll('.quantity-input');
    
    quantityInputs.forEach(input => {
        const minusBtn = input.parentNode.querySelector('.quantity-minus');
        const plusBtn = input.parentNode.querySelector('.quantity-plus');
        
        if (minusBtn) {
            minusBtn.addEventListener('click', function() {
                const currentValue = parseInt(input.value);
                const minValue = parseInt(input.min) || 1;
                
                if (currentValue > minValue) {
                    input.value = currentValue - 1;
                    input.dispatchEvent(new Event('change'));
                }
            });
        }
        
        if (plusBtn) {
            plusBtn.addEventListener('click', function() {
                const currentValue = parseInt(input.value);
                const maxValue = parseInt(input.max) || 999;
                
                if (currentValue < maxValue) {
                    input.value = currentValue + 1;
                    input.dispatchEvent(new Event('change'));
                }
            });
        }
    });
}

// Initialize product image gallery
function initializeProductGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image img');
    
    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                mainImage.src = imgSrc;
                
                // Update active thumbnail
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
}

// Initialize product filters
function initializeProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            productItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Initialize sort functionality
function initializeSort() {
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            const productsGrid = document.getElementById('productsGrid');
            const products = Array.from(productsGrid.children);
            
            products.sort((a, b) => {
                switch(sortBy) {
                    case 'name':
                        return a.dataset.name.localeCompare(b.dataset.name);
                    case 'price_asc':
                        return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
                    case 'price_desc':
                        return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
                    case 'newest':
                        return new Date(b.dataset.date) - new Date(a.dataset.date);
                    default:
                        return 0;
                }
            });
            
            products.forEach(product => productsGrid.appendChild(product));
        });
    }
}

// Initialize cookie banner - Always Visible
function initializeCookieBanner() {
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    console.log('Cookie banner element:', cookieBanner);
    console.log('Cookie consent:', cookieConsent);
    
    if (cookieBanner) {
        // Always show banner initially
        cookieBanner.style.display = 'block !important';
        cookieBanner.classList.remove('hidden');
        
        // Ensure fixed positioning
        cookieBanner.style.position = 'fixed';
        cookieBanner.style.bottom = '0';
        cookieBanner.style.left = '0';
        cookieBanner.style.right = '0';
        cookieBanner.style.zIndex = '9999';
        cookieBanner.style.width = '100%';
        cookieBanner.style.visibility = 'visible';
        cookieBanner.style.opacity = '1';
        
        // Add event listeners to buttons
        const acceptBtn = document.getElementById('acceptCookiesBtn');
        const rejectBtn = document.getElementById('rejectCookiesBtn');
        
        if (acceptBtn) {
            acceptBtn.addEventListener('click', function() {
                console.log('Accept button clicked via event listener');
                acceptAllCookies();
            });
        }
        
        if (rejectBtn) {
            rejectBtn.addEventListener('click', function() {
                console.log('Reject button clicked via event listener');
                rejectCookies();
            });
        }
        
        // Hide banner only if consent has been given
        if (cookieConsent === 'accepted' || cookieConsent === 'rejected') {
            hideCookieBanner();
        } else {
            // Banner will be visible and fixed at bottom
            console.log('Cookie banner is visible and fixed at bottom');
            
            // Add smooth scroll behavior
            cookieBanner.style.transition = 'all 0.4s ease';
        }
    } else {
        console.error('Cookie banner element not found!');
    }
}

// Accept all cookies - Global function
window.acceptAllCookies = function() {
    console.log('Accept all cookies clicked');
    
    try {
        // Save consent to localStorage
        localStorage.setItem('cookieConsent', 'accepted');
        
        // Hide banner immediately
        const cookieBanner = document.getElementById('cookieBanner');
        if (cookieBanner) {
            cookieBanner.style.display = 'none';
            cookieBanner.classList.add('hidden');
            console.log('Banner hidden successfully');
        }
        
        // Remove body padding
        document.body.style.paddingBottom = '0';
        
        // Show success notification
        alert('Çerezler kabul edildi!');
        
        console.log('Cookies accepted and banner hidden');
    } catch (error) {
        console.error('Error in acceptAllCookies:', error);
        alert('Bir hata oluştu!');
    }
}

// Reject cookies - Global function
window.rejectCookies = function() {
    console.log('Reject cookies clicked');
    
    try {
        // Save consent to localStorage
        localStorage.setItem('cookieConsent', 'rejected');
        
        // Hide banner immediately
        const cookieBanner = document.getElementById('cookieBanner');
        if (cookieBanner) {
            cookieBanner.style.display = 'none';
            cookieBanner.classList.add('hidden');
            console.log('Banner hidden successfully');
        }
        
        // Remove body padding
        document.body.style.paddingBottom = '0';
        
        // Show info notification
        alert('Çerezler reddedildi!');
        
        console.log('Cookies rejected and banner hidden');
    } catch (error) {
        console.error('Error in rejectCookies:', error);
        alert('Bir hata oluştu!');
    }
}

// Show cookie settings - Global function
window.showCookieSettings = function() {
    console.log('Show cookie settings clicked');
    showNotification('Çerez ayarları yakında eklenecek!', 'info');
}



// Hide cookie banner - Smooth Animation
function hideCookieBanner() {
    const cookieBanner = document.getElementById('cookieBanner');
    console.log('Hiding cookie banner:', cookieBanner);
    
    if (cookieBanner) {
        // Add smooth animation before hiding
        cookieBanner.style.transition = 'all 0.4s ease';
        cookieBanner.classList.add('hidden');
        
        // Remove padding from body
        document.body.style.paddingBottom = '0';
        
        // Remove from DOM after animation
        setTimeout(() => {
            if (cookieBanner.classList.contains('hidden')) {
                cookieBanner.style.display = 'none';
                console.log('Cookie banner completely hidden');
            }
        }, 400);
        
        console.log('Cookie banner hidden after user consent');
    } else {
        console.error('Cookie banner not found for hiding');
    }
}

// Newsletter form submission
function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                // Here you would typically send the email to your backend
                showNotification('E-posta adresiniz kaydedildi!', 'success');
                this.reset();
            }
        });
    }
}

// Initialize newsletter form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNewsletterForm();
});

// Export functions for global use
window.KemahApp = {
    addToCart,
    updateCartCount,
    showNotification,
    formatCurrency,
    formatDate,
    debounce,
    throttle,
    acceptAllCookies,
    rejectCookies,
    showCookieSettings
};
