// Research Hub - Professional Minimal JavaScript

class ResearchHub {
    constructor() {
        this.currentPage = 'dashboard';
        this.charts = {};
        this.isLoggedIn = false;
        this.currentUser = null;
        this.init();
    }

    init() {
        this.checkLoginStatus();
        this.setupLogin();
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupInteractiveEffects();
    }

    checkLoginStatus() {
        const loginStatus = localStorage.getItem('isLoggedIn');
        const username = localStorage.getItem('currentUser');
        
        if (loginStatus === 'true' && username) {
            this.isLoggedIn = true;
            this.currentUser = username;
            this.showDashboard();
        } else {
            this.showLandingPage();
        }
    }

    setupLogin() {
        const loginForm = document.getElementById('loginForm');
        
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }
    }

    setupLogout() {
        const logoutBtn = document.getElementById('logoutBtn');
        
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.handleLogout();
            });
        }
    }

    handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Basic validation - accept any email and password
        if (username && password) {
            // Validate email format if it contains @
            if (username.includes('@')) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(username)) {
                    this.showLoginError('Please enter a valid email address');
                    return;
                }
            }
            
            this.isLoggedIn = true;
            this.currentUser = username;
            
            // Store login status
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', username);
            
            // Show dashboard
            this.showDashboard();
        } else {
            this.showLoginError('Please enter both email and password');
        }
    }

    handleLogout() {
        console.log('Logout clicked');
        this.isLoggedIn = false;
        this.currentUser = null;
        
        // Clear login status
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        
        // Show landing page
        this.showLandingPage();
    }

    showLandingPage() {
        document.getElementById('landingPage').style.display = 'block';
        document.getElementById('loginModal').style.display = 'none';
        document.getElementById('mainDashboard').style.display = 'none';
        this.setupLandingPageEvents();
    }

    showLoginPage() {
        document.getElementById('landingPage').style.display = 'block';
        document.getElementById('loginModal').style.display = 'none';
        document.getElementById('mainDashboard').style.display = 'none';
    }

    showLoginModal() {
        document.getElementById('loginModal').style.display = 'flex';
        this.setupModalEvents();
    }

    hideLoginModal() {
        document.getElementById('loginModal').style.display = 'none';
    }

    setupLandingPageEvents() {
        // Login buttons
        const loginBtn = document.getElementById('loginBtn');
        const heroLoginBtn = document.getElementById('heroLoginBtn');
        const signupBtn = document.getElementById('signupBtn');
        
        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.showLoginModal());
        }
        
        if (heroLoginBtn) {
            heroLoginBtn.addEventListener('click', () => this.showLoginModal());
        }
        
        if (signupBtn) {
            signupBtn.addEventListener('click', () => this.showLoginModal());
        }
        
        // Explore cards
        const exploreCards = document.querySelectorAll('.explore-card');
        exploreCards.forEach(card => {
            card.addEventListener('click', () => {
                this.showLoginModal();
            });
        });
    }

    setupModalEvents() {
        const modalClose = document.getElementById('modalClose');
        const modalOverlay = document.getElementById('modalOverlay');
        const loginForm = document.getElementById('loginForm');
        
        if (modalClose) {
            modalClose.addEventListener('click', () => this.hideLoginModal());
        }
        
        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => this.hideLoginModal());
        }
        
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }
        
        // Social login buttons
        const socialBtns = document.querySelectorAll('.social-btn');
        socialBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.handleSocialLogin(btn.classList[1]); // google, github, microsoft
            });
        });
    }

    handleSocialLogin(provider) {
        console.log(`Social login with ${provider}`);
        // For demo purposes, we'll just log in with the provider name
        this.isLoggedIn = true;
        this.currentUser = `${provider}_user`;
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', this.currentUser);
        
        this.showDashboard();
    }

    showDashboard() {
        document.getElementById('landingPage').style.display = 'none';
        document.getElementById('loginModal').style.display = 'none';
        document.getElementById('mainDashboard').style.display = 'block';
        
        // Update user info
        const currentUserSpan = document.getElementById('currentUser');
        if (currentUserSpan) {
            currentUserSpan.textContent = this.currentUser;
        }
        
        // Setup logout button (now that dashboard is visible)
        this.setupLogout();
        
        // Setup navigation (now that dashboard is visible)
        this.setupNavigation();
        
        // Setup paper submission functionality
        this.setupPaperSubmission();
        
        // Initialize dashboard
        this.loadDashboard();
        this.initializeCharts();
    }

    showLoginError(message = 'Invalid credentials - try again') {
        const passwordInput = document.getElementById('password');
        const usernameInput = document.getElementById('username');
        
        passwordInput.style.borderColor = 'var(--danger-color)';
        usernameInput.style.borderColor = 'var(--danger-color)';
        passwordInput.placeholder = message;
        passwordInput.value = '';
        passwordInput.focus();
        
        setTimeout(() => {
            passwordInput.style.borderColor = '';
            usernameInput.style.borderColor = '';
            passwordInput.placeholder = 'Enter your password';
        }, 3000);
    }

    setupScrollAnimations() {
        // Header scroll effect
        const header = document.querySelector('.landing-header');
        if (header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
        }

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.stat-card, .explore-card, .feature-highlight');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    }

    setupInteractiveEffects() {
        // Simple fade-in animations for cards
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 + index * 100);
        });

        const exploreCards = document.querySelectorAll('.explore-card');
        exploreCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 600 + index * 100);
        });
    }

    setupPaperSubmission() {
        const submitPaperBtn = document.getElementById('submitPaperBtn');
        const submitPaperModal = document.getElementById('submitPaperModal');
        const submitModalClose = document.getElementById('submitModalClose');
        const submitModalOverlay = document.getElementById('submitModalOverlay');
        const cancelSubmitBtn = document.getElementById('cancelSubmitBtn');
        const submitPaperForm = document.getElementById('submitPaperForm');

        // Open modal
        if (submitPaperBtn) {
            submitPaperBtn.addEventListener('click', () => {
                submitPaperModal.style.display = 'flex';
                this.setupPaperFormEvents();
            });
        }

        // Close modal
        const closeModal = () => {
            submitPaperModal.style.display = 'none';
            submitPaperForm.reset();
            this.resetFileUpload();
            this.resetCoauthors();
        };

        if (submitModalClose) submitModalClose.addEventListener('click', closeModal);
        if (submitModalOverlay) submitModalOverlay.addEventListener('click', closeModal);
        if (cancelSubmitBtn) cancelSubmitBtn.addEventListener('click', closeModal);

        // Form submission
        if (submitPaperForm) {
            submitPaperForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handlePaperSubmission();
            });
        }
    }

    setupPaperFormEvents() {
        const fileUploadArea = document.getElementById('fileUploadArea');
        const paperFile = document.getElementById('paperFile');
        const browseBtn = document.getElementById('browseBtn');
        const removeFileBtn = document.getElementById('removeFileBtn');
        const fileInfo = document.getElementById('fileInfo');
        const fileUploadContent = fileUploadArea.querySelector('.file-upload-content');
        const addCoauthorBtn = document.getElementById('addCoauthorBtn');

        // File upload
        if (browseBtn) {
            browseBtn.addEventListener('click', () => paperFile.click());
        }

        if (fileUploadArea) {
            fileUploadArea.addEventListener('click', () => paperFile.click());
            
            fileUploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                fileUploadArea.classList.add('drag-over');
            });
            
            fileUploadArea.addEventListener('dragleave', () => {
                fileUploadArea.classList.remove('drag-over');
            });
            
            fileUploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                fileUploadArea.classList.remove('drag-over');
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.handleFileSelect(files[0]);
                }
            });
        }

        if (paperFile) {
            paperFile.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.handleFileSelect(e.target.files[0]);
                }
            });
        }

        if (removeFileBtn) {
            removeFileBtn.addEventListener('click', () => {
                this.resetFileUpload();
            });
        }

        // Co-authors
        if (addCoauthorBtn) {
            addCoauthorBtn.addEventListener('click', () => {
                this.addCoauthorRow();
            });
        }
    }

    handleFileSelect(file) {
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const maxSize = 10 * 1024 * 1024; // 10MB

        if (!validTypes.includes(file.type)) {
            this.showNotification('Please upload a PDF, DOC, or DOCX file', 'error');
            return;
        }

        if (file.size > maxSize) {
            this.showNotification('File size must be less than 10MB', 'error');
            return;
        }

        const fileInfo = document.getElementById('fileInfo');
        const fileUploadContent = document.querySelector('.file-upload-content');
        const fileName = document.getElementById('fileName');
        const fileSize = document.getElementById('fileSize');

        fileName.textContent = file.name;
        fileSize.textContent = this.formatFileSize(file.size);
        
        fileUploadContent.style.display = 'none';
        fileInfo.style.display = 'block';
    }

    resetFileUpload() {
        const paperFile = document.getElementById('paperFile');
        const fileInfo = document.getElementById('fileInfo');
        const fileUploadContent = document.querySelector('.file-upload-content');
        
        paperFile.value = '';
        fileInfo.style.display = 'none';
        fileUploadContent.style.display = 'block';
    }

    addCoauthorRow() {
        const container = document.getElementById('coauthorsContainer');
        const coauthorRow = document.createElement('div');
        coauthorRow.className = 'coauthor-row';
        coauthorRow.innerHTML = `
            <div class="form-row">
                <div class="form-group">
                    <input type="text" placeholder="Co-author Name" class="coauthor-name">
                </div>
                <div class="form-group">
                    <input type="email" placeholder="Co-author Email" class="coauthor-email">
                </div>
                <div class="form-group">
                    <input type="text" placeholder="Institution" class="coauthor-institution">
                </div>
                <button type="button" class="remove-coauthor-btn">&times;</button>
            </div>
        `;
        
        container.appendChild(coauthorRow);
        
        // Add remove functionality
        const removeBtn = coauthorRow.querySelector('.remove-coauthor-btn');
        removeBtn.style.display = 'block';
        removeBtn.addEventListener('click', () => {
            coauthorRow.remove();
        });
    }

    resetCoauthors() {
        const container = document.getElementById('coauthorsContainer');
        container.innerHTML = `
            <div class="coauthor-row">
                <div class="form-row">
                    <div class="form-group">
                        <input type="text" placeholder="Co-author Name" class="coauthor-name">
                    </div>
                    <div class="form-group">
                        <input type="email" placeholder="Co-author Email" class="coauthor-email">
                    </div>
                    <div class="form-group">
                        <input type="text" placeholder="Institution" class="coauthor-institution">
                    </div>
                    <button type="button" class="remove-coauthor-btn" style="display: none;">&times;</button>
                </div>
            </div>
        `;
    }

    handlePaperSubmission() {
        const form = document.getElementById('submitPaperForm');
        const formData = new FormData(form);
        
        // Collect co-authors
        const coauthors = [];
        const coauthorRows = document.querySelectorAll('.coauthor-row');
        coauthorRows.forEach(row => {
            const name = row.querySelector('.coauthor-name').value.trim();
            const email = row.querySelector('.coauthor-email').value.trim();
            const institution = row.querySelector('.coauthor-institution').value.trim();
            
            if (name || email || institution) {
                coauthors.push({ name, email, institution });
            }
        });

        // Validate form
        if (!this.validatePaperForm(formData, coauthors)) {
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        // Simulate submission (in real app, this would be an API call)
        setTimeout(() => {
            this.showNotification('Research paper submitted successfully! We will review it and contact you soon.', 'success');
            
            // Store submission data (in real app, this would be sent to server)
            const submissionData = {
                title: formData.get('paperTitle'),
                abstract: formData.get('paperAbstract'),
                author: {
                    name: formData.get('authorName'),
                    email: formData.get('authorEmail'),
                    institution: formData.get('authorInstitution'),
                    country: formData.get('authorCountry')
                },
                paperDetails: {
                    year: formData.get('publicationYear'),
                    journal: formData.get('journalName'),
                    field: formData.get('researchField'),
                    type: formData.get('paperType'),
                    keywords: formData.get('keywords')
                },
                coauthors: coauthors,
                submittedAt: new Date().toISOString(),
                submittedBy: this.currentUser
            };

            // Save to localStorage for demo purposes
            const submissions = JSON.parse(localStorage.getItem('paperSubmissions') || '[]');
            submissions.push(submissionData);
            localStorage.setItem('paperSubmissions', JSON.stringify(submissions));

            // Reset and close modal
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Paper';
            document.getElementById('submitPaperModal').style.display = 'none';
            form.reset();
            this.resetFileUpload();
            this.resetCoauthors();
        }, 2000);
    }

    validatePaperForm(formData, coauthors) {
        const requiredFields = ['paperTitle', 'paperAbstract', 'authorName', 'authorEmail', 
                              'authorInstitution', 'authorCountry', 'publicationYear', 
                              'journalName', 'researchField', 'paperType', 'keywords'];

        for (const field of requiredFields) {
            if (!formData.get(field) || formData.get(field).trim() === '') {
                this.showNotification(`Please fill in all required fields`, 'error');
                return false;
            }
        }

        // Validate email
        const email = formData.get('authorEmail');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return false;
        }

        // Validate abstract length
        const abstract = formData.get('paperAbstract');
        if (abstract.length < 200 || abstract.length > 500) {
            this.showNotification('Abstract must be between 200 and 500 words', 'error');
            return false;
        }

        // Validate co-author emails
        for (const coauthor of coauthors) {
            if (coauthor.email && !emailRegex.test(coauthor.email)) {
                this.showNotification(`Invalid email for co-author: ${coauthor.name}`, 'error');
                return false;
            }
        }

        // Check if file is uploaded
        const fileInput = document.getElementById('paperFile');
        if (!fileInput.files || fileInput.files.length === 0) {
            this.showNotification('Please upload your research paper file', 'error');
            return false;
        }

        // Check terms acceptance
        if (!formData.get('termsAccepted')) {
            this.showNotification('Please accept the terms and conditions', 'error');
            return false;
        }

        return true;
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--danger-color)' : 'var(--primary-color)'};
                color: white;
                padding: 16px 20px;
                border-radius: var(--border-radius-lg);
                box-shadow: var(--shadow-xl);
                z-index: 3000;
                animation: slideIn 0.3s ease-out;
                max-width: 400px;
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .notification i {
                font-size: 1.2rem;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => {
                notification.remove();
                style.remove();
            }, 300);
        }, 5000);
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        console.log('Setting up navigation, found nav links:', navLinks.length);
        
        // Remove existing event listeners to prevent duplicates
        navLinks.forEach(link => {
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
        });
        
        // Add new event listeners
        const freshNavLinks = document.querySelectorAll('.nav-link');
        freshNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                console.log('Navigation clicked:', page);
                this.navigateToPage(page);
            });
        });
    }

    navigateToPage(page) {
        console.log('Navigating to:', page);
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-page="${page}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Hide all sections
        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        setTimeout(() => {
            const targetSection = document.getElementById(page);
            if (targetSection) {
                targetSection.classList.add('active');
                console.log('Section activated:', page);
            } else {
                console.log('Section not found:', page);
            }
        }, 100);

        // Load page content
        this.loadPageContent(page);
        this.currentPage = page;
    }

    loadPageContent(page) {
        switch(page) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'authors':
                this.loadAuthors();
                break;
            case 'institutions':
                this.loadInstitutions();
                break;
            case 'papers':
                this.loadPapers();
                break;
            case 'collaborations':
                this.loadCollaborations();
                break;
            case 'trends':
                this.loadTrends();
                break;
        }
    }

    loadDashboard() {
        this.initializeDashboardCharts();
    }

    initializeDashboardCharts() {
        this.createPublicationsChart();
        this.createTopicsChart();
    }

    createPublicationsChart() {
        const ctx = document.getElementById('publicationsChart');
        if (!ctx) return;

        const data = {
            labels: ['2019', '2020', '2021', '2022', '2023'],
            datasets: [{
                label: 'Publications',
                data: [450, 520, 680, 890, 1200],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.3,
                fill: true,
                borderWidth: 2
            }]
        };

        new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: '#f1f5f9',
                            font: { size: 12 }
                        }
                    },
                    tooltip: {
                        backgroundColor: '#1e293b',
                        titleColor: '#f1f5f9',
                        bodyColor: '#cbd5e1',
                        borderColor: '#475569',
                        borderWidth: 1,
                        padding: 8
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#334155' },
                        ticks: { color: '#94a3b8' }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#94a3b8' }
                    }
                }
            }
        });
    }

    createTopicsChart() {
        const ctx = document.getElementById('topicsChart');
        if (!ctx) return;

        const data = {
            labels: ['Machine Learning', 'AI', 'Blockchain', 'IoT', 'Quantum Computing'],
            datasets: [{
                data: [35, 28, 18, 12, 7],
                backgroundColor: [
                    '#3b82f6',
                    '#94a3b8',
                    '#1e40af',
                    '#10b981',
                    '#f59e0b'
                ],
                borderWidth: 0,
                borderRadius: 4
            }]
        };

        new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: '#f1f5f9',
                            padding: 10,
                            font: { size: 11 }
                        }
                    }
                }
            }
        });
    }

    setupEventListeners() {
        // Filter functionality
        const institutionFilter = document.getElementById('institutionFilter');
        if (institutionFilter) {
            institutionFilter.addEventListener('change', (e) => {
                this.filterAuthorsByInstitution(e.target.value);
            });
        }

        const yearFilter = document.getElementById('yearFilter');
        if (yearFilter) {
            yearFilter.addEventListener('change', (e) => {
                this.filterPapersByYear(e.target.value);
            });
        }

        // Period selector
        const periodSelector = document.querySelector('.period-selector');
        if (periodSelector) {
            periodSelector.addEventListener('change', (e) => {
                this.updatePublicationsChart(e.target.value);
            });
        }
    }

    loadAuthors() {
        const authorsGrid = document.getElementById('authorsGrid');
        if (!authorsGrid) return;

        authorsGrid.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

        setTimeout(() => {
            const authors = window.ResearchData.authors;
            this.displayAuthors(authors);
        }, 500);
    }

    displayAuthors(authors) {
        const authorsGrid = document.getElementById('authorsGrid');
        if (!authorsGrid) return;

        const authorsHTML = authors.map(author => {
            const institution = window.ResearchData.institutions.find(inst => inst.id === author.institution_id);
            return `
                <div class="author-card">
                    <div class="author-header">
                        <div class="author-avatar">${author.name.split(' ').map(n => n[0]).join('')}</div>
                        <div class="author-info">
                            <h3>${author.name}</h3>
                            <p>${author.email}</p>
                        </div>
                    </div>
                    <div class="author-details">
                        <p><i class="fas fa-university"></i> ${institution.name}</p>
                        <p><i class="fas fa-globe"></i> ${author.country}</p>
                    </div>
                    <div class="author-stats">
                        <div class="author-stat">
                            <div class="author-stat-value">${author.papers}</div>
                            <div class="author-stat-label">Papers</div>
                        </div>
                        <div class="author-stat">
                            <div class="author-stat-value">${author.citations}</div>
                            <div class="author-stat-label">Citations</div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        authorsGrid.innerHTML = authorsHTML;
    }

    loadInstitutions() {
        const institutionsGrid = document.getElementById('institutionsGrid');
        if (!institutionsGrid) return;

        institutionsGrid.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

        setTimeout(() => {
            const institutions = window.ResearchData.institutions;
            this.displayInstitutions(institutions);
        }, 500);
    }

    displayInstitutions(institutions) {
        const institutionsGrid = document.getElementById('institutionsGrid');
        if (!institutionsGrid) return;

        const institutionsHTML = institutions.map(institution => {
            return `
                <div class="institution-card">
                    <div class="institution-header">
                        <div class="institution-icon">
                            <i class="fas fa-university"></i>
                        </div>
                        <div class="institution-info">
                            <h3>${institution.name}</h3>
                            <p>${institution.country} - Est. ${institution.established}</p>
                        </div>
                    </div>
                    <div class="institution-stats">
                        <div class="institution-stat">
                            <div class="institution-stat-value">${institution.researchers}</div>
                            <div class="institution-stat-label">Researchers</div>
                        </div>
                        <div class="institution-stat">
                            <div class="institution-stat-value">${institution.papers}</div>
                            <div class="institution-stat-label">Papers</div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        institutionsGrid.innerHTML = institutionsHTML;
    }

    loadPapers() {
        const papersGrid = document.getElementById('papersGrid');
        if (!papersGrid) return;

        papersGrid.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

        setTimeout(() => {
            const papers = window.ResearchData.papers;
            this.displayPapers(papers);
        }, 500);
    }

    displayPapers(papers) {
        const papersGrid = document.getElementById('papersGrid');
        if (!papersGrid) return;

        const papersHTML = papers.map(paper => {
            const authors = window.ResearchData.authors.filter(author => 
                paper.authors.includes(author.id));
            const authorNames = authors.map(author => author.name).join(', ');
            const topics = window.ResearchData.topics.filter(topic => 
                paper.topics.includes(topic.id));
            const topicNames = topics.map(topic => topic.name).join(', ');
            
            return `
                <div class="paper-card">
                    <div class="paper-header">
                        <h3>${paper.title}</h3>
                        <div class="paper-meta">
                            <span class="paper-year">${paper.year}</span>
                            <span class="paper-citations">${paper.citations} citations</span>
                        </div>
                    </div>
                    <div class="paper-content">
                        <p class="paper-authors"><strong>Authors:</strong> ${authorNames}</p>
                        <p class="paper-topics"><strong>Topics:</strong> ${topicNames}</p>
                    </div>
                </div>
            `;
        }).join('');

        papersGrid.innerHTML = papersHTML;
    }

    loadCollaborations() {
        setTimeout(() => {
            this.initializeCollaborationDashboard();
        }, 500);
    }

    loadTrends() {
        setTimeout(() => {
            this.createTrendsAnalysis();
        }, 500);
    }

    performSearch(query) {
        if (query.length < 2) return;

        const results = {
            authors: this.searchAuthors(query),
            papers: this.searchPapers(query),
            institutions: this.searchInstitutions(query)
        };

        console.log('Search results:', results);
    }

    searchAuthors(query) {
        return window.ResearchData.authors.filter(author =>
            author.name.toLowerCase().includes(query.toLowerCase()) ||
            author.email.toLowerCase().includes(query.toLowerCase())
        );
    }

    searchPapers(query) {
        return window.ResearchData.papers.filter(paper =>
            paper.title.toLowerCase().includes(query.toLowerCase())
        );
    }

    searchInstitutions(query) {
        return window.ResearchData.institutions.filter(institution =>
            institution.name.toLowerCase().includes(query.toLowerCase())
        );
    }

    filterAuthorsByInstitution(institutionName) {
        const authors = window.ResearchData.authors;
        const institutions = window.ResearchData.institutions;
        
        if (!institutionName) {
            this.displayAuthors(authors);
            return;
        }
        
        const institution = institutions.find(inst => inst.name === institutionName);
        if (institution) {
            const filtered = authors.filter(author => author.institution_id === institution.id);
            this.displayAuthors(filtered);
        }
    }

    filterPapersByYear(year) {
        const papers = window.ResearchData.papers;
        const filtered = year ? papers.filter(paper => paper.year === parseInt(year)) : papers;
        this.displayPapers(filtered);
    }

    updatePublicationsChart(period) {
        console.log('Updating publications chart for period:', period);
    }

    initializeCollaborationDashboard() {
        this.createCollaborationChart();
        this.createCollaborationNetwork();
    }

    createCollaborationChart() {
        const ctx = document.getElementById('collaborationChart');
        if (!ctx) return;

        const data = {
            labels: ['USA', 'China', 'UK', 'Canada', 'Germany', 'Japan', 'India', 'Australia'],
            datasets: [{
                label: 'Collaborations',
                data: [156, 189, 134, 98, 112, 87, 76, 65],
                backgroundColor: (context) => {
                    const value = context.parsed.x;
                    if (value > 100) return 'rgba(16, 185, 129, 0.8)';
                    if (value > 50) return 'rgba(245, 158, 11, 0.8)';
                    return 'rgba(239, 68, 68, 0.8)';
                },
                borderWidth: 0,
                borderRadius: 4
            }]
        };

        new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#1e293b',
                        titleColor: '#f1f5f9',
                        bodyColor: '#cbd5e1',
                        borderColor: '#475569',
                        borderWidth: 1,
                        padding: 8
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: { color: '#334155' },
                        ticks: { color: '#94a3b8' },
                        title: {
                            display: true,
                            text: 'Number of Collaborations',
                            color: '#cbd5e1'
                        }
                    },
                    y: {
                        grid: { display: false },
                        ticks: { color: '#94a3b8' },
                        title: {
                            display: true,
                            text: 'Country',
                            color: '#cbd5e1'
                        }
                    }
                }
            }
        });
    }

    createCollaborationNetwork() {
        const container = document.querySelector('.collaboration-network');
        if (!container) return;

        const networkHTML = `
            <div class="network-stats">
                <div class="network-stat">
                    <div class="network-stat-value">892</div>
                    <div class="network-stat-label">Total Collaborations</div>
                </div>
                <div class="network-stat">
                    <div class="network-stat-value">156</div>
                    <div class="network-stat-label">Active Partners</div>
                </div>
                <div class="network-stat">
                    <div class="network-stat-value">42</div>
                    <div class="network-stat-label">Countries</div>
                </div>
                <div class="network-stat">
                    <div class="network-stat-value">1,234</div>
                    <div class="network-stat-label">Joint Publications</div>
                </div>
            </div>
            <canvas id="collaborationChart"></canvas>
        `;

        container.innerHTML = networkHTML;
        
        // Create chart after adding HTML
        setTimeout(() => {
            this.createCollaborationChart();
        }, 100);
    }

    createTrendsChart() {
        const ctx = document.getElementById('trendsChart');
        if (!ctx) return;

        const data = {
            labels: ['Machine Learning', 'AI', 'Blockchain', 'IoT', 'Quantum Computing'],
            datasets: [
                {
                    label: '2021',
                    data: [120, 95, 45, 78, 32],
                    backgroundColor: 'rgba(59, 130, 246, 0.8)',
                    borderColor: '#3b82f6',
                    borderWidth: 1
                },
                {
                    label: '2022',
                    data: [180, 140, 68, 95, 48],
                    backgroundColor: 'rgba(148, 163, 184, 0.8)',
                    borderColor: '#94a3b8',
                    borderWidth: 1
                },
                {
                    label: '2023',
                    data: [250, 210, 95, 120, 65],
                    backgroundColor: 'rgba(16, 185, 129, 0.8)',
                    borderColor: '#10b981',
                    borderWidth: 1
                }
            ]
        };

        new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: '#f1f5f9',
                            font: { size: 11 },
                            padding: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: '#1e293b',
                        titleColor: '#f1f5f9',
                        bodyColor: '#cbd5e1',
                        borderColor: '#475569',
                        borderWidth: 1,
                        padding: 8
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: { color: '#334155' },
                        ticks: { color: '#94a3b8' },
                        title: {
                            display: true,
                            text: 'Number of Publications',
                            color: '#cbd5e1'
                        }
                    },
                    y: {
                        grid: { display: false },
                        ticks: { color: '#94a3b8' },
                        title: {
                            display: true,
                            text: 'Research Topic',
                            color: '#cbd5e1'
                        }
                    }
                }
            }
        });
    }

    createTrendsAnalysis() {
        const container = document.querySelector('.trends-analysis');
        if (!container) return;

        const trendsHTML = `
            <h3>Research Trends Analysis</h3>
            <div class="trend-cards">
                <div class="trend-card">
                    <h4>Machine Learning</h4>
                    <div class="trend-growth positive">+45.2%</div>
                    <div class="trend-description">Rapid growth in ML applications</div>
                </div>
                <div class="trend-card">
                    <h4>Artificial Intelligence</h4>
                    <div class="trend-growth positive">+38.7%</div>
                    <div class="trend-description">Strong AI research expansion</div>
                </div>
                <div class="trend-card">
                    <h4>Blockchain</h4>
                    <div class="trend-growth positive">+28.3%</div>
                    <div class="trend-description">Growing blockchain adoption</div>
                </div>
                <div class="trend-card">
                    <h4>IoT</h4>
                    <div class="trend-growth positive">+22.1%</div>
                    <div class="trend-description">IoT ecosystem development</div>
                </div>
                <div class="trend-card">
                    <h4>Quantum Computing</h4>
                    <div class="trend-growth positive">+15.6%</div>
                    <div class="trend-description">Emerging quantum research</div>
                </div>
            </div>
            <canvas id="trendsChart"></canvas>
        `;

        container.innerHTML = trendsHTML;
        
        // Create chart after adding HTML
        setTimeout(() => {
            this.createTrendsChart();
        }, 100);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.ResearchHub = new ResearchHub();
});
