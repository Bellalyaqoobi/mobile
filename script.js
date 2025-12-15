// Complete JavaScript code for the phone registration system


    // Supabase Configuration
    const SUPABASE_URL = 'https://jwbduvwjkpluxtyawxve.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3YmR1dndqa3BsdXh0eWF3eHZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3OTMxMTEsImV4cCI6MjA4MTM2OTExMX0.a2aOmXh1-rLAWbrN9aTmsKGL0W7MtitVm2S0bcw1H-8';
    
    // Initialize Supabase client
    const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    
    // Language texts
    const texts = {
        pashto: {
            formTitle: "تلفون جدید ثبت کړئ",
            brandLabel: "برانډ (مارک)",
            modelLabel: "مودل",
            priceLabel: "قیمت (افغانی)",
            partsLabel: "قطعات (پرزه‌جاتی)",
            descriptionLabel: "اضافی معلومات",
            submitBtnText: "ثبت کړئ",
            resetBtnText: "پاک کړئ",
            resetDbBtnText: "بازنشانی دیتابیس",
            tableTitle: "ثبت شوي تلفون‌ها",
            totalPhonesText: "تعداد تلفون‌ها",
            avgPriceText: "میانگین قیمت",
            totalPartsText: "قطعات ثبت شده",
            emptyTableText: "تر اوسه هیڅ تلفون ثبت نه دی شوی.",
            parts: ["باتری", "چارجر", "هندزفری", "کابل", "کاور", "سکرین پروتکتور", "میموری کارت"],
            toastSaved: "تلفون په بریالیتوب سره ثبت شو!",
            toastUpdated: "تلفون معلومات تازه شول!",
            toastDeleted: "تلفون له لیست څخه ړنگ شو!",
            toastError: "لطفاً ټول اړین معلومات ډک کړئ!",
            toastLoginSuccess: "په بریالیتوب سره سیستم ته ننوتل!",
            toastRegisterSuccess: "حساب په بریالیتوب سره جوړ شو!",
            toastResetDb: "دیتابیس په بریالیتوب سره بازنشانی شو!",
            languageText: "پښتو",
            connected: "متصل به دیتابیس",
            disconnected: "دیتابیس سره وصل نه دی",
            syncSuccess: "دیتابیس سره همغږي شو!",
            confirmDelete: "آیا مطمئن هستید؟",
            confirmReset: "آیا مطمئن هستید که می‌خواهید تمام داده‌ها را پاک کنید؟",
            accessDenied: "شما دسترسی لازم برای این عملیات را ندارید"
        },
        dari: {
            formTitle: "تلفون جدید ثبت کنید",
            brandLabel: "برند (مارک)",
            modelLabel: "مدل",
            priceLabel: "قیمت (افغانی)",
            partsLabel: "قطعات (پرزه‌جات)",
            descriptionLabel: "اطلاعات اضافی",
            submitBtnText: "ثبت کنید",
            resetBtnText: "پاک کنید",
            resetDbBtnText: "بازنشانی دیتابیس",
            tableTitle: "تلفون‌های ثبت شده",
            totalPhonesText: "تعداد تلفون‌ها",
            avgPriceText: "میانگین قیمت",
            totalPartsText: "قطعات ثبت شده",
            emptyTableText: "تا اکنون هیچ تلفونی ثبت نشده است.",
            parts: ["باتری", "شارژر", "هندزفری", "کابل", "کاور", "محافظ صفحه", "کارت حافظه"],
            toastSaved: "تلفون با موفقیت ثبت شد!",
            toastUpdated: "اطلاعات تلفون به‌روز شد!",
            toastDeleted: "تلفون از لیست حذف شد!",
            toastError: "لطفاً تمام اطلاعات ضروری را پر کنید!",
            toastLoginSuccess: "ورود به سیستم موفقیت‌آمیز بود!",
            toastRegisterSuccess: "ثبت‌نام با موفقیت انجام شد!",
            toastResetDb: "دیتابیس با موفقیت بازنشانی شد!",
            languageText: "دری",
            connected: "متصل به دیتابیس",
            disconnected: "عدم اتصال به دیتابیس",
            syncSuccess: "همگام‌سازی با دیتابیس انجام شد!",
            confirmDelete: "آیا مطمئن هستید؟",
            confirmReset: "آیا مطمئن هستید که می‌خواهید تمام داده‌ها را پاک کنید؟",
            accessDenied: "شما دسترسی لازم برای این عملیات را ندارید"
        }
    };

    // Current language
    let currentLang = 'pashto';
    
    // Current user
    let currentUser = null;
    
    // Database (local fallback)
    let phonesDB = JSON.parse(localStorage.getItem('phonesDB')) || [];
    let usersDB = JSON.parse(localStorage.getItem('usersDB')) || [];
    
    // Connection status
    let isOnline = true;
    
    // DOM Elements
    const authContainer = document.getElementById('authContainer');
    const appContainer = document.getElementById('appContainer');
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const phoneForm = document.getElementById('phoneForm');
    const partsContainer = document.getElementById('partsContainer');
    const phoneTableBody = document.getElementById('phoneTableBody');
    const emptyRow = document.getElementById('emptyRow');
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');
    const toastClose = document.getElementById('toastClose');
    const logoutBtn = document.getElementById('logoutBtn');
    const logoutBtnMobile = document.getElementById('logoutBtnMobile');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const userInfoMobile = document.getElementById('userInfoMobile');
    const formSection = document.getElementById('formSection');
    const actionsHeader = document.getElementById('actionsHeader');
    const languageToggle = document.getElementById('languageToggle');
    const languageText = document.getElementById('languageText');
    const resetDbBtn = document.getElementById('resetDbBtn');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    // Initialize default admin user
    async function initializeDefaultAdmin() {
        try {
            // Check if admin exists in Supabase
            const { data: adminUser, error } = await supabase
                .from('users')
                .select('*')
                .eq('email', 'admin@gmail.com')
                .single();
            
            if (error && error.code === 'PGRST116') {
                // Admin doesn't exist, create it
                const newAdmin = {
                    name: 'مدیر سیستم',
                    email: 'admin@gmail.com',
                    password: 'admin123',
                    role: 'admin',
                    avatar_text: 'م',
                    language: 'pashto'
                };
                
                const { data, error: insertError } = await supabase
                    .from('users')
                    .insert([newAdmin]);
                
                if (insertError) {
                    console.error('Error creating admin:', insertError);
                    createAdminInLocalStorage();
                }
            } else if (error) {
                console.error('Error checking admin:', error);
                createAdminInLocalStorage();
            }
        } catch (error) {
            console.error('Error initializing admin:', error);
            createAdminInLocalStorage();
        }
    }
    
    // Create admin in localStorage as fallback
    function createAdminInLocalStorage() {
        const adminUser = {
            id: 'admin001',
            name: 'مدیر سیستم',
            email: 'admin@gmail.com',
            password: 'admin123',
            role: 'admin',
            avatar_text: 'م',
            language: 'pashto',
            created_at: new Date().toISOString()
        };
        
        const adminExists = usersDB.find(u => u.email === 'admin@gmail.com');
        
        if (!adminExists) {
            usersDB.push(adminUser);
            localStorage.setItem('usersDB', JSON.stringify(usersDB));
        }
    }
    
    // Check connection status
    async function checkConnection() {
        try {
            const connectionStatus = document.getElementById('connectionStatus');
            const statusText = document.getElementById('statusText');
            
            const { data, error } = await supabase.from('users').select('count').limit(1);
            
            isOnline = !error;
            connectionStatus.className = isOnline ? 'connection-status online' : 'connection-status offline';
            statusText.textContent = isOnline ? texts[currentLang].connected : texts[currentLang].disconnected;
            
        } catch (error) {
            isOnline = false;
            const connectionStatus = document.getElementById('connectionStatus');
            const statusText = document.getElementById('statusText');
            
            connectionStatus.className = 'connection-status offline';
            statusText.textContent = texts[currentLang].disconnected;
        }
    }
    
    // Show loading indicator
    function showLoading() {
        loadingIndicator.classList.add('active');
    }
    
    // Hide loading indicator
    function hideLoading() {
        loadingIndicator.classList.remove('active');
    }
    
    // Show authentication screen
    function showAuth() {
        authContainer.style.display = 'flex';
        appContainer.style.display = 'none';
        showLoginForm();
    }
    
    // Show main application
    async function showApp() {
        authContainer.style.display = 'none';
        appContainer.style.display = 'block';
        
        updateUserInfo();
        setLanguage(currentUser?.language || 'pashto');
        loadParts();
        await loadTableData();
        updateStats();
        toggleAdminFeatures();
        
        if (currentUser.role === 'admin') {
            resetDbBtn.style.display = 'block';
        } else {
            resetDbBtn.style.display = 'none';
        }
    }
    
    // Show login form
    function showLoginForm() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    }
    
    // Show register form
    function showRegisterForm() {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
    }
    
    // Update user info in header
    function updateUserInfo() {
        if (!currentUser) return;
        
        const avatarText = currentUser.avatar_text || currentUser.name.charAt(0);
        const roleText = currentUser.role === 'admin' ? 'مدیر سیستم' : 'کاربر عادی';
        const headerRoleText = currentUser.role === 'admin' ? 'مدیریت کامل سیستم' : 'مشاهده اطلاعات';
        
        document.getElementById('avatarText').textContent = avatarText;
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('userRole').textContent = roleText;
        document.getElementById('headerRoleText').textContent = headerRoleText;
        
        document.getElementById('avatarTextMobile').textContent = avatarText;
        document.getElementById('userNameMobile').textContent = currentUser.name;
        document.getElementById('userRoleMobile').textContent = roleText;
        
        const avatars = document.querySelectorAll('.user-avatar');
        avatars.forEach(avatar => {
            avatar.className = 'user-avatar ' + currentUser.role;
        });
    }
    
    // Set language
    function setLanguage(lang) {
        currentLang = lang;
        if (currentUser) {
            currentUser.language = lang;
            localStorage.setItem('loggedInUser', JSON.stringify(currentUser));
        }
        
        // Update UI text
        document.getElementById('formTitle').textContent = texts[lang].formTitle;
        document.getElementById('brandLabel').textContent = texts[lang].brandLabel;
        document.getElementById('modelLabel').textContent = texts[lang].modelLabel;
        document.getElementById('priceLabel').textContent = texts[lang].priceLabel;
        document.getElementById('partsLabel').textContent = texts[lang].partsLabel;
        document.getElementById('descriptionLabel').textContent = texts[lang].descriptionLabel;
        document.getElementById('submitBtnText').textContent = texts[lang].submitBtnText;
        document.getElementById('resetBtnText').textContent = texts[lang].resetBtnText;
        document.getElementById('resetDbBtnText').textContent = texts[lang].resetDbBtnText;
        document.getElementById('tableTitle').textContent = texts[lang].tableTitle;
        document.getElementById('totalPhonesText').textContent = texts[lang].totalPhonesText;
        document.getElementById('avgPriceText').textContent = texts[lang].avgPriceText;
        document.getElementById('totalPartsText').textContent = texts[lang].totalPartsText;
        document.getElementById('emptyTableText').textContent = texts[lang].emptyTableText;
        document.getElementById('languageText').textContent = texts[lang].languageText;
        
        const statusText = document.getElementById('statusText');
        if (isOnline) {
            statusText.textContent = texts[lang].connected;
        } else {
            statusText.textContent = texts[lang].disconnected;
        }
        
        loadParts();
        loadTableData();
    }
    
    // Toggle language
    function toggleLanguage() {
        const newLang = currentLang === 'pashto' ? 'dari' : 'pashto';
        setLanguage(newLang);
    }
    
    // Toggle admin features
    function toggleAdminFeatures() {
        if (currentUser.role === 'admin') {
            formSection.style.display = 'block';
            actionsHeader.style.display = 'table-cell';
        } else {
            formSection.style.display = 'none';
            actionsHeader.style.display = 'none';
        }
    }
    
    // Load parts checkboxes
    function loadParts() {
        partsContainer.innerHTML = '';
        
        texts[currentLang].parts.forEach(part => {
            const checkboxId = `part_${part.replace(/\s+/g, '_')}`;
            
            const checkboxItem = document.createElement('div');
            checkboxItem.className = 'checkbox-item';
            
            checkboxItem.innerHTML = `
                <input type="checkbox" id="${checkboxId}" name="parts" value="${part}">
                <label for="${checkboxId}">${part}</label>
            `;
            
            partsContainer.appendChild(checkboxItem);
        });
    }
    
    // Toggle password visibility
    function togglePasswordVisibility(inputId, toggleButtonId) {
        const input = document.getElementById(inputId);
        const toggleButton = document.getElementById(toggleButtonId);
        const icon = toggleButton.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.className = 'fas fa-eye-slash';
        } else {
            input.type = 'password';
            icon.className = 'fas fa-eye';
        }
    }
    
    // Initialize the application
    async function initApp() {
        showLoading();
        
        try {
            await initializeDefaultAdmin();
            await checkConnection();
            
            setInterval(checkConnection, 30000);
            
            const loggedInUser = localStorage.getItem('loggedInUser');
            if (loggedInUser) {
                try {
                    currentUser = JSON.parse(loggedInUser);
                    await showApp();
                } catch (e) {
                    localStorage.removeItem('loggedInUser');
                    showAuth();
                }
            } else {
                showAuth();
            }
            
            setupEventListeners();
        } catch (error) {
            console.error('Error initializing app:', error);
            showAuth();
        } finally {
            hideLoading();
        }
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Auth tabs
        loginTab.addEventListener('click', showLoginForm);
        registerTab.addEventListener('click', showRegisterForm);
        
        // Auth links
        document.getElementById('loginLink').addEventListener('click', (e) => {
            e.preventDefault();
            showLoginForm();
        });
        
        // Password toggles
        document.getElementById('loginPasswordToggle').addEventListener('click', () => 
            togglePasswordVisibility('loginPassword', 'loginPasswordToggle'));
        document.getElementById('registerPasswordToggle').addEventListener('click', () => 
            togglePasswordVisibility('registerPassword', 'registerPasswordToggle'));
        document.getElementById('registerConfirmPasswordToggle').addEventListener('click', () => 
            togglePasswordVisibility('registerConfirmPassword', 'registerConfirmPasswordToggle'));
        
        // Forms
        loginForm.addEventListener('submit', handleLogin);
        registerForm.addEventListener('submit', handleRegister);
        phoneForm.addEventListener('submit', handlePhoneFormSubmit);
        
        // Buttons
        document.getElementById('resetBtn').addEventListener('click', resetPhoneForm);
        resetDbBtn.addEventListener('click', resetDatabase);
        logoutBtn.addEventListener('click', handleLogout);
        logoutBtnMobile.addEventListener('click', handleLogout);
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        toastClose.addEventListener('click', hideToast);
        languageToggle.addEventListener('click', toggleLanguage);
    }
    
    // Handle login
    async function handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        
        if (!email || !password) {
            showToast('خطا', 'لطفاً اطلاعات ورود را تکمیل کنید', 'error');
            return;
        }
        
        const loginBtn = document.getElementById('loginBtn');
        const loginBtnText = document.getElementById('loginBtnText');
        const loginLoading = document.getElementById('loginLoading');
        
        loginBtn.disabled = true;
        loginBtnText.classList.add('hidden');
        loginLoading.classList.remove('hidden');
        
        try {
            let user = null;
            let loginSuccessful = false;
            
            // Try Supabase login first if online
            if (isOnline) {
                try {
                    const { data: supabaseUser, error } = await supabase
                        .from('users')
                        .select('*')
                        .eq('email', email)
                        .eq('password', password)
                        .single();
                    
                    if (!error && supabaseUser) {
                        user = supabaseUser;
                        loginSuccessful = true;
                        console.log('Logged in via Supabase:', user.email);
                    }
                } catch (supabaseError) {
                    console.log('Supabase login failed, trying local storage');
                }
            }
            
            // If not found in Supabase or offline, check localStorage
            if (!user) {
                user = usersDB.find(u => u.email === email && u.password === password);
                if (user) {
                    loginSuccessful = true;
                    console.log('Logged in via localStorage:', user.email);
                }
            }
            
            if (loginSuccessful && user) {
                currentUser = user;
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                await showApp();
                showToast('موفقیت', texts[currentLang].toastLoginSuccess, 'success');
            } else {
                showToast('خطا', 'ایمیل یا رمز عبور اشتباه است', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            showToast('خطا', 'خطا در ورود به سیستم', 'error');
        } finally {
            loginBtn.disabled = false;
            loginBtnText.classList.remove('hidden');
            loginLoading.classList.add('hidden');
        }
    }
    
    // Handle registration
    async function handleRegister(e) {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        if (!name || !email || !password || !confirmPassword) {
            showToast('خطا', 'لطفاً تمام فیلدها را پر کنید', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showToast('خطا', 'رمز عبور و تکرار آن مطابقت ندارند', 'error');
            return;
        }
        
        if (password.length < 6) {
            showToast('خطا', 'رمز عبور باید حداقل ۶ کاراکتر باشد', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('خطا', 'فرمت ایمیل معتبر نیست', 'error');
            return;
        }
        
        if (email === 'admin@gmail.com') {
            showToast('خطا', 'این ایمیل برای مدیر سیستم رزرو شده است', 'error');
            return;
        }
        
        const registerBtn = document.getElementById('registerBtn');
        const registerBtnText = document.getElementById('registerBtnText');
        const registerLoading = document.getElementById('registerLoading');
        
        registerBtn.disabled = true;
        registerBtnText.classList.add('hidden');
        registerLoading.classList.remove('hidden');
        
        try {
            // Check if email already exists
            let emailExists = false;
            
            if (isOnline) {
                try {
                    const { data: existingUser, error } = await supabase
                        .from('users')
                        .select('email')
                        .eq('email', email)
                        .single();
                    
                    emailExists = !error && existingUser;
                } catch (supabaseError) {
                    console.log('Supabase check failed, checking localStorage');
                }
            }
            
            // Check in localStorage
            if (!emailExists) {
                emailExists = usersDB.some(u => u.email === email);
            }
            
            if (emailExists) {
                showToast('خطا', 'این ایمیل قبلاً ثبت شده است', 'error');
                return;
            }
            
            const newUser = {
                name,
                email,
                password,
                role: 'user',
                avatar_text: name.charAt(0),
                language: 'pashto'
            };
            
            let userCreated = false;
            
            if (isOnline) {
                try {
                    const { data, error } = await supabase
                        .from('users')
                        .insert([newUser])
                        .select()
                        .single();
                    
                    if (!error) {
                        userCreated = true;
                        newUser.id = data.id;
                        newUser.created_at = data.created_at;
                        console.log('User created in Supabase:', newUser.email);
                    }
                } catch (supabaseError) {
                    console.log('Supabase registration failed, saving locally');
                }
            }
            
            // Save to localStorage as fallback
            if (!userCreated) {
                newUser.id = 'user_' + Date.now();
                newUser.created_at = new Date().toISOString();
                usersDB.push(newUser);
                localStorage.setItem('usersDB', JSON.stringify(usersDB));
                console.log('User created in localStorage:', newUser.email);
            }
            
            currentUser = newUser;
            localStorage.setItem('loggedInUser', JSON.stringify(newUser));
            
            await showApp();
            showToast('موفقیت', texts[currentLang].toastRegisterSuccess, 'success');
        } catch (error) {
            console.error('Registration error:', error);
            showToast('خطا', 'خطا در ثبت‌نام. لطفاً دوباره تلاش کنید', 'error');
        } finally {
            registerBtn.disabled = false;
            registerBtnText.classList.remove('hidden');
            registerLoading.classList.add('hidden');
        }
    }
    
    // Handle phone form submission
    async function handlePhoneFormSubmit(e) {
        e.preventDefault();
        
        if (currentUser.role !== 'admin') {
            showToast('خطا', texts[currentLang].accessDenied, 'error');
            return;
        }
        
        const brand = document.getElementById('brand').value.trim();
        const model = document.getElementById('model').value.trim();
        const price = document.getElementById('price').value;
        const description = document.getElementById('description').value.trim();
        const recordId = document.getElementById('recordId').value;
        
        if (!brand || !model || !price) {
            showToast('خطا', texts[currentLang].toastError, 'error');
            return;
        }
        
        const selectedParts = [];
        document.querySelectorAll('input[name="parts"]:checked').forEach(checkbox => {
            selectedParts.push(checkbox.value);
        });
        
        const phone = {
            brand,
            model,
            price: parseInt(price),
            parts: selectedParts,
            description,
            date: new Date().toLocaleDateString('fa-IR'),
            added_by: currentUser.name,
            added_by_id: currentUser.id
        };
        
        showLoading();
        
        try {
            if (isOnline) {
                if (recordId) {
                    const { data, error } = await supabase
                        .from('phones')
                        .update(phone)
                        .eq('id', recordId);
                    
                    if (error) throw error;
                    phone.id = recordId;
                    showToast('موفقیت', texts[currentLang].toastUpdated, 'success');
                } else {
                    const { data, error } = await supabase
                        .from('phones')
                        .insert([phone])
                        .select()
                        .single();
                    
                    if (error) throw error;
                    phone.id = data.id;
                    showToast('موفقیت', texts[currentLang].toastSaved, 'success');
                }
            } else {
                if (recordId) {
                    const index = phonesDB.findIndex(p => p.id === recordId);
                    if (index !== -1) {
                        phone.id = recordId;
                        phonesDB[index] = phone;
                    }
                    showToast('موفقیت', texts[currentLang].toastUpdated + ' (آفلاین)', 'success');
                } else {
                    phone.id = 'phone_' + Date.now();
                    phonesDB.push(phone);
                    showToast('موفقیت', texts[currentLang].toastSaved + ' (آفلاین)', 'success');
                }
            }
            
            localStorage.setItem('phonesDB', JSON.stringify(phonesDB));
            resetPhoneForm();
            await loadTableData();
            updateStats();
        } catch (error) {
            console.error('Error saving phone:', error);
            showToast('خطا', 'خطا در ذخیره اطلاعات', 'error');
        } finally {
            hideLoading();
        }
    }
    
    // Load table data
    async function loadTableData() {
        showLoading();
        
        try {
            if (isOnline) {
                try {
                    const { data: supabasePhones, error } = await supabase
                        .from('phones')
                        .select('*')
                        .order('created_at', { ascending: false });
                    
                    if (!error && supabasePhones) {
                        phonesDB = supabasePhones;
                        localStorage.setItem('phonesDB', JSON.stringify(phonesDB));
                    }
                } catch (supabaseError) {
                    console.log('Could not load from Supabase, using localStorage');
                }
            }
            
            phoneTableBody.innerHTML = '';
            
            if (phonesDB.length === 0) {
                phoneTableBody.appendChild(emptyRow);
                return;
            }
            
            phonesDB.forEach(phone => {
                const row = document.createElement('tr');
                
                const formattedPrice = phone.price.toLocaleString('fa-IR') + ' افغانی';
                
                let partsHTML = '';
                if (phone.parts && phone.parts.length > 0) {
                    partsHTML = '<div class="parts-list">';
                    phone.parts.forEach(part => {
                        partsHTML += `<span class="part-tag">${part}</span>`;
                    });
                    partsHTML += '</div>';
                } else {
                    partsHTML = '<span style="color: var(--gray-dark);">---</span>';
                }
                
                let actionsHTML = '';
                if (currentUser.role === 'admin') {
                    actionsHTML = `
                        <div class="action-buttons">
                            <button class="action-btn edit-btn" data-id="${phone.id}">
                                <i class="fas fa-edit"></i> ویرایش
                            </button>
                            <button class="action-btn delete-btn" data-id="${phone.id}">
                                <i class="fas fa-trash"></i> حذف
                            </button>
                        </div>
                    `;
                } else {
                    actionsHTML = '<span style="color: var(--gray-dark);">فقط مشاهده</span>';
                }
                
                row.innerHTML = `
                    <td><strong>${phone.brand}</strong></td>
                    <td>${phone.model}</td>
                    <td><strong style="color: #059669;">${formattedPrice}</strong></td>
                    <td>${partsHTML}</td>
                    <td>${actionsHTML}</td>
                `;
                
                phoneTableBody.appendChild(row);
            });
            
            if (currentUser.role === 'admin') {
                document.querySelectorAll('.edit-btn').forEach(btn => {
                    btn.addEventListener('click', () => editPhone(btn.dataset.id));
                });
                
                document.querySelectorAll('.delete-btn').forEach(btn => {
                    btn.addEventListener('click', () => deletePhone(btn.dataset.id));
                });
            }
        } catch (error) {
            console.error('Error loading table data:', error);
            showToast('خطا', 'خطا در بارگذاری اطلاعات', 'error');
        } finally {
            hideLoading();
        }
    }
    
    // Edit phone
    function editPhone(id) {
        const phone = phonesDB.find(p => p.id === id);
        if (!phone) return;
        
        document.getElementById('brand').value = phone.brand;
        document.getElementById('model').value = phone.model;
        document.getElementById('price').value = phone.price;
        document.getElementById('description').value = phone.description || '';
        document.getElementById('recordId').value = phone.id;
        
        document.querySelectorAll('input[name="parts"]').forEach(checkbox => {
            checkbox.checked = phone.parts ? phone.parts.includes(checkbox.value) : false;
        });
        
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Delete phone
    async function deletePhone(id) {
        if (!confirm(texts[currentLang].confirmDelete)) return;
        
        showLoading();
        
        try {
            if (isOnline) {
                try {
                    const { error } = await supabase
                        .from('phones')
                        .delete()
                        .eq('id', id);
                    
                    if (error) throw error;
                } catch (supabaseError) {
                    console.log('Could not delete from Supabase, deleting locally');
                }
            }
            
            phonesDB = phonesDB.filter(p => p.id !== id);
            localStorage.setItem('phonesDB', JSON.stringify(phonesDB));
            
            showToast('موفقیت', texts[currentLang].toastDeleted, 'warning');
            await loadTableData();
            updateStats();
        } catch (error) {
            console.error('Error deleting phone:', error);
            showToast('خطا', 'خطا در حذف اطلاعات', 'error');
        } finally {
            hideLoading();
        }
    }
    
    // Reset phone form
    function resetPhoneForm() {
        phoneForm.reset();
        document.getElementById('recordId').value = '';
    }
    
    // Update statistics
    function updateStats() {
        const totalPhones = phonesDB.length;
        document.getElementById('totalPhones').textContent = totalPhones.toLocaleString('fa-IR');
        
        if (totalPhones > 0) {
            const totalPrice = phonesDB.reduce((sum, phone) => sum + phone.price, 0);
            const avgPrice = Math.round(totalPrice / totalPhones);
            document.getElementById('avgPrice').textContent = avgPrice.toLocaleString('fa-IR') + ' افغانی';
            
            const totalParts = phonesDB.reduce((sum, phone) => sum + (phone.parts ? phone.parts.length : 0), 0);
            document.getElementById('totalParts').textContent = totalParts.toLocaleString('fa-IR');
        } else {
            document.getElementById('avgPrice').textContent = '0 افغانی';
            document.getElementById('totalParts').textContent = '0';
        }
    }
    
    // Reset database
    async function resetDatabase() {
        if (!confirm(texts[currentLang].confirmReset)) return;
        
        showLoading();
        
        try {
            if (isOnline) {
                try {
                    const { error } = await supabase
                        .from('phones')
                        .delete()
                        .neq('id', '');
                    
                    if (error) throw error;
                } catch (supabaseError) {
                    console.log('Could not reset Supabase database');
                }
            }
            
            phonesDB = [];
            localStorage.setItem('phonesDB', JSON.stringify(phonesDB));
            
            const adminUser = usersDB.find(u => u.email === 'admin@gmail.com');
            usersDB = adminUser ? [adminUser] : [];
            localStorage.setItem('usersDB', JSON.stringify(usersDB));
            
            if (currentUser.role !== 'admin') {
                handleLogout();
            }
            
            showToast('موفقیت', texts[currentLang].toastResetDb, 'success');
            resetPhoneForm();
            await loadTableData();
            updateStats();
        } catch (error) {
            console.error('Error resetting database:', error);
            showToast('خطا', 'خطا در بازنشانی دیتابیس', 'error');
        } finally {
            hideLoading();
        }
    }
    
    // Handle logout
    function handleLogout() {
        currentUser = null;
        localStorage.removeItem('loggedInUser');
        showAuth();
    }
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        userInfoMobile.classList.toggle('hidden');
    }
    
    // Show toast notification
    function showToast(title, message, type = 'success') {
        toastTitle.textContent = title;
        toastMessage.textContent = message;
        
        toast.className = 'toast ' + type;
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(hideToast, 4000);
    }
    
    // Hide toast
    function hideToast() {
        toast.classList.remove('show');
    }
    
    // Initialize the app when DOM is loaded
    document.addEventListener('DOMContentLoaded', initApp);
