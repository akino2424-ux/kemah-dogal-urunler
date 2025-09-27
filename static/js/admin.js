// Admin Panel JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize admin components
    initializeAdminComponents();
    
    // Initialize data tables
    initializeDataTables();
    
    // Initialize form validations
    initializeAdminFormValidations();
    
    // Initialize image uploads
    initializeImageUploads();
    
    // Initialize modals
    initializeModals();
});

// Initialize admin components
function initializeAdminComponents() {
    console.log('Admin Panel yüklendi');
    
    // Add loading states to admin buttons
    addAdminLoadingStates();
    
    // Initialize tooltips
    initializeAdminTooltips();
    
    // Initialize confirmations
    initializeConfirmations();
}

// Initialize data tables functionality
function initializeDataTables() {
    // Add search functionality to tables
    const searchInputs = document.querySelectorAll('.table-search');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const table = this.closest('.card').querySelector('table');
            const rows = table.querySelectorAll('tbody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });
    
    // Add sort functionality
    const sortableHeaders = document.querySelectorAll('.sortable');
    sortableHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const table = this.closest('table');
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));
            const columnIndex = Array.from(this.parentNode.children).indexOf(this);
            const isAscending = this.classList.contains('sort-asc');
            
            // Remove sort classes from all headers
            sortableHeaders.forEach(h => {
                h.classList.remove('sort-asc', 'sort-desc');
            });
            
            // Add sort class to current header
            this.classList.add(isAscending ? 'sort-desc' : 'sort-asc');
            
            // Sort rows
            rows.sort((a, b) => {
                const aText = a.children[columnIndex].textContent.trim();
                const bText = b.children[columnIndex].textContent.trim();
                
                if (isAscending) {
                    return bText.localeCompare(aText);
                } else {
                    return aText.localeCompare(bText);
                }
            });
            
            // Reorder rows
            rows.forEach(row => tbody.appendChild(row));
        });
    });
}

// Initialize admin form validations - DEVRE DIŞI
function initializeAdminFormValidations() {
    // Bu fonksiyon devre dışı bırakıldı - form gönderimini engelliyordu
    console.log('Form validations devre dışı bırakıldı');
}

// Validate individual field
function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    
    // Remove existing validation classes
    field.classList.remove('is-valid', 'is-invalid');
    
    // Check if field is required and empty
    if (required && !value) {
        field.classList.add('is-invalid');
        return false;
    }
    
    // Type-specific validation
    if (value) {
        switch (type) {
            case 'email':
                if (!isValidEmail(value)) {
                    field.classList.add('is-invalid');
                    return false;
                }
                break;
            case 'url':
                if (!isValidUrl(value)) {
                    field.classList.add('is-invalid');
                    return false;
                }
                break;
            case 'number':
                if (isNaN(value) || parseFloat(value) < 0) {
                    field.classList.add('is-invalid');
                    return false;
                }
                break;
        }
    }
    
    field.classList.add('is-valid');
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// URL validation
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Initialize image uploads
function initializeImageUploads() {
    const imageInputs = document.querySelectorAll('input[type="file"][accept*="image"]');
    
    imageInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // Validate file size (2MB max)
                if (file.size > 2 * 1024 * 1024) {
                    showAdminNotification('Dosya boyutu 2MB\'dan büyük olamaz!', 'error');
                    this.value = '';
                    return;
                }
                
                // Validate file type
                if (!file.type.startsWith('image/')) {
                    showAdminNotification('Sadece resim dosyaları yüklenebilir!', 'error');
                    this.value = '';
                    return;
                }
                
                // Show preview
                showImagePreview(file, this);
            }
        });
    });
}

// Show image preview
function showImagePreview(file, input) {
    const reader = new FileReader();
    reader.onload = function(e) {
        let previewContainer = input.parentNode.querySelector('.image-preview');
        
        if (!previewContainer) {
            previewContainer = document.createElement('div');
            previewContainer.className = 'image-preview mt-2';
            input.parentNode.appendChild(previewContainer);
        }
        
        previewContainer.innerHTML = `
            <img src="${e.target.result}" class="img-fluid rounded" style="max-height: 200px;">
            <div class="mt-2">
                <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeImagePreview(this)">
                    <i class="fas fa-trash"></i> Kaldır
                </button>
            </div>
        `;
    };
    reader.readAsDataURL(file);
}

// Remove image preview
function removeImagePreview(button) {
    const previewContainer = button.closest('.image-preview');
    const input = previewContainer.parentNode.querySelector('input[type="file"]');
    
    previewContainer.remove();
    input.value = '';
}

// Initialize modals
function initializeModals() {
    // Auto-focus first input in modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('shown.bs.modal', function() {
            const firstInput = this.querySelector('input, select, textarea');
            if (firstInput) {
                firstInput.focus();
            }
        });
    });
}

// Add loading states to admin buttons - DEVRE DIŞI
function addAdminLoadingStates() {
    // Bu fonksiyon devre dışı bırakıldı - form gönderimini engelliyordu
    console.log('Loading states devre dışı bırakıldı');
}

// Initialize admin tooltips
function initializeAdminTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Initialize confirmations
function initializeConfirmations() {
    const deleteButtons = document.querySelectorAll('.btn-danger[onclick*="delete"]');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!confirm('Bu işlemi geri alamazsınız. Devam etmek istediğinizden emin misiniz?')) {
                e.preventDefault();
                return false;
            }
        });
    });
}

// Show admin notification
function showAdminNotification(message, type = 'info') {
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

// Update order status
function updateOrderStatus(orderId, newStatus) {
    const button = event.target;
    const originalValue = button.value;
    
    // Loading state kaldırıldı
    
    fetch('/admin/siparisler/durum-guncelle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `order_id=${orderId}&status=${newStatus}`
    })
    .then(response => {
        if (response.ok) {
            showAdminNotification('Sipariş durumu güncellendi!', 'success');
        } else {
            showAdminNotification('Sipariş durumu güncellenirken bir hata oluştu!', 'error');
            button.value = originalValue;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showAdminNotification('Sipariş durumu güncellenirken bir hata oluştu!', 'error');
        button.value = originalValue;
    });
}

// Delete product - BASİT VERSİYON
function deleteProduct(productId) {
    if (confirm('Bu ürünü silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!')) {
        // Form oluştur ve gönder
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `/admin/urunler/sil/${productId}`;
        document.body.appendChild(form);
        form.submit();
    }
}

// Delete category - BASİT VERSİYON
function deleteCategory(categoryId) {
    if (confirm('Bu kategoriyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!')) {
        // Form oluştur ve gönder
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = `/admin/kategoriler/sil/${categoryId}`;
        document.body.appendChild(form);
        form.submit();
    }
}

// Edit category - KALDIRILDI (artık doğrudan link kullanılıyor)

// View order details
function viewOrderDetails(orderId) {
    fetch(`/admin/siparisler/detay/${orderId}`)
        .then(response => response.text())
        .then(html => {
            document.getElementById('orderDetailsContent').innerHTML = html;
            new bootstrap.Modal(document.getElementById('orderDetailsModal')).show();
        })
        .catch(error => {
            console.error('Error:', error);
            showAdminNotification('Sipariş detayları yüklenirken bir hata oluştu!', 'error');
        });
}

// Print order
function printOrder(orderId) {
    if (orderId) {
        window.open(`/admin/siparisler/yazdir/${orderId}`, '_blank');
    } else {
        window.print();
    }
}

// Generate slug from name
function generateSlug(name) {
    return name
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
}

// Auto-generate slug from name input
function initializeSlugGeneration() {
    const nameInputs = document.querySelectorAll('input[name="name"]');
    const slugInputs = document.querySelectorAll('input[name="slug"]');
    
    nameInputs.forEach((nameInput, index) => {
        if (slugInputs[index]) {
            nameInput.addEventListener('input', function() {
                slugInputs[index].value = generateSlug(this.value);
            });
        }
    });
}

// Initialize slug generation on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeSlugGeneration();
});

// Export functions for global use
window.AdminApp = {
    showAdminNotification,
    updateOrderStatus,
    deleteProduct,
    deleteCategory,
    editCategory,
    viewOrderDetails,
    printOrder,
    generateSlug,
    validateField,
    isValidEmail,
    isValidUrl
};
