// Tạo navigation component
function createNav() {
    const navHTML = `
        <nav class="museum-nav">
            <div class="nav-container">
                <div class="nav-logo">
                    <a href="index.html">SA BÀN ĐỊA ĐẠO CỦ CHI</a>
                </div>
                <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="nav-links">
                    <a href="index.html" ${window.location.pathname.includes('index.html') ? 'class="active"' : ''}>Trang chủ</a>
                    <a href="about.html" ${window.location.pathname.includes('about.html') ? 'class="active"' : ''}>Giới thiệu</a>
                    <a href="exhibition.html" ${window.location.pathname.includes('exhibition.html') ? 'class="active"' : ''}>Triển lãm</a>
                    <a href="simulation.html" ${window.location.pathname.includes('simulation.html') ? 'class="active"' : ''}>Mô phỏng</a>
                    <a href="#">###</a>
                </div>
            </div>
        </nav>
    `;

    // Chèn navigation vào đầu body
    document.body.insertAdjacentHTML('afterbegin', navHTML);
}

// Xử lý navigation
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation(); // Ngăn sự kiện click lan ra document
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            console.log('Hamburger clicked'); // Debug
        });

        // Đóng menu khi click vào link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Đóng menu khi click ra ngoài
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
}

// Hàm đóng menu
window.closeMenu = function() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    navLinks.classList.remove('active');
    hamburger.style.display = 'block';
}

// Xử lý filter cho trang thiết bị
function handleEquipmentFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const equipmentItems = document.querySelectorAll('.equipment-item');

    if (!filterButtons.length || !equipmentItems.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Cập nhật active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');

            // Lọc và hiển thị items
            equipmentItems.forEach(item => {
                const shouldShow = filterValue === 'all' || 
                                 item.getAttribute('data-category') === filterValue;
                
                item.style.display = shouldShow ? 'block' : 'none';
                
                if (shouldShow) {
                    // Reset và thêm animation
                    item.style.animation = 'none';
                    item.offsetHeight; // Trigger reflow
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                }
            });
        });
    });
}

// Animation cho số liệu thống kê
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const step = target / duration * 10;
        let current = 0;
        
        const updateNumber = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target;
            }
        };
        
        updateNumber();
    });
}

// Khởi tạo khi DOM load xong
document.addEventListener('DOMContentLoaded', () => {
    createNav();
    initNavigation();
    handleEquipmentFilter();

    // Xử lý animation số liệu thống kê
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver(
            entries => entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            })
        );
        observer.observe(statsSection);
    }
});

// Thêm keyframes animation
const fadeIn = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const style = document.createElement('style');
style.textContent = fadeIn;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
    // Đảm bảo các elements đã tồn tại
    const filterButtons = document.querySelectorAll('.filter-btn');
    const vehicles = document.querySelectorAll('.vehicle-item');

    if (filterButtons && vehicles) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Xóa active class từ tất cả buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                // Thêm active class cho button được click
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                console.log('Filter value:', filterValue); // Debug

                vehicles.forEach(vehicle => {
                    const category = vehicle.getAttribute('data-category');
                    console.log('Vehicle category:', category); // Debug
                    
                    if (filterValue === 'all' || category === filterValue) {
                        vehicle.classList.remove('hide');
                    } else {
                        vehicle.classList.add('hide');
                    }
                });
            });
        });
    } else {
        console.error('Filter buttons or vehicles not found'); // Debug
    }
});
