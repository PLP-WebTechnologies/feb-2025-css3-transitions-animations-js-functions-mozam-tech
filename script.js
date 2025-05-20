document.addEventListener("DOMContentLoaded", () => {
    // Load saved theme preference
    loadTheme();
    
    // Theme selector functionality
    const themeButtons = document.querySelectorAll('.theme-btn');
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.dataset.theme;
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('preferredTheme', theme);
            
            // Add click animation
            button.classList.add('pulse');
            setTimeout(() => button.classList.remove('pulse'), 1000);
        });
    });
    
    // Animated Button with click counter
    const magicBtn = document.getElementById('magic-btn');
    let clickCount = parseInt(localStorage.getItem('buttonClicks')) || 0;
    
    magicBtn.addEventListener('click', () => {
        clickCount++;
        localStorage.setItem('buttonClicks', clickCount.toString());
        
        magicBtn.textContent = `Clicked ${clickCount}x`;
        magicBtn.style.backgroundColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--secondary-color');
        
        // Add animation
        magicBtn.classList.add('bounce');
        setTimeout(() => magicBtn.classList.remove('bounce'), 1000);
    });
    
    // Image Gallery with localStorage for favorites
    const images = document.querySelectorAll('.gallery-img');
    images.forEach(img => {
        // Check if this image was previously favorited
        const imgSrc = img.getAttribute('src');
        if (localStorage.getItem(`favorite_${imgSrc}`)) {
            img.classList.add('favorite');
        }
        
        img.addEventListener('click', () => {
            img.classList.toggle('favorite');
            
            // Store favorite status
            if (img.classList.contains('favorite')) {
                localStorage.setItem(`favorite_${imgSrc}`, 'true');
                img.style.boxShadow = '0 0 15px gold';
            } else {
                localStorage.removeItem(`favorite_${imgSrc}`);
                img.style.boxShadow = '';
            }
            
            // Add animation
            img.classList.add('pulse');
            setTimeout(() => img.classList.remove('pulse'), 1000);
        });
        
        img.addEventListener('mouseover', () => {
            img.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        img.addEventListener('mouseout', () => {
            img.style.transform = '';
        });
    });
    
    // Accordion with animation
    const accBtn = document.querySelector('.accordion-btn');
    const accContent = document.querySelector('.accordion-content');
    
    accBtn.addEventListener('click', () => {
        accContent.classList.toggle('show');
        accBtn.textContent = accContent.classList.contains('show') 
            ? 'Hide Content' 
            : 'Show Content';
        
        // Save accordion state
        localStorage.setItem('accordionState', accContent.classList.contains('show') ? 'open' : 'closed');
    });
    
    // Restore accordion state
    if (localStorage.getItem('accordionState') === 'open') {
        accContent.classList.add('show');
        accBtn.textContent = 'Hide Content';
    }
    
    // Form Validation with animation
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    const emailFeedback = document.getElementById('email-feedback');
    const passwordFeedback = document.getElementById('password-feedback');
    
    // Load saved form data if exists
    if (localStorage.getItem('savedEmail')) {
        emailField.value = localStorage.getItem('savedEmail');
        validateEmail();
    }
    
    if (localStorage.getItem('savedPassword')) {
        passwordField.value = localStorage.getItem('savedPassword');
        validatePassword();
    }
    
    emailField.addEventListener('input', validateEmail);
    passwordField.addEventListener('input', validatePassword);
    
    function validateEmail() {
        localStorage.setItem('savedEmail', emailField.value);
        
        if (emailField.validity.valid) {
            emailField.style.borderColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--success-color');
            emailFeedback.textContent = '✓ Valid email format';
            emailFeedback.className = 'feedback success';
        } else {
            emailField.style.borderColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--error-color');
            emailFeedback.textContent = '✗ Please enter a valid email';
            emailFeedback.className = 'feedback error';
        }
    }
    
    function validatePassword() {
        localStorage.setItem('savedPassword', passwordField.value);
        
        if (passwordField.value.length >= 8) {
            passwordField.style.borderColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--success-color');
            passwordFeedback.textContent = '✓ Strong password';
            passwordFeedback.className = 'feedback success';
        } else {
            passwordField.style.borderColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--error-color');
            passwordFeedback.textContent = `✗ Weak password (${passwordField.value.length}/8 characters)`;
            passwordFeedback.className = 'feedback error';
        }
    }
    
    document.getElementById('user-form').addEventListener('submit', (event) => {
        let isValid = true;
        
        if (!emailField.validity.valid) {
            emailField.classList.add('shake');
            setTimeout(() => emailField.classList.remove('shake'), 500);
            isValid = false;
        }
        
        if (passwordField.value.length < 8) {
            passwordField.classList.add('shake');
            setTimeout(() => passwordField.classList.remove('shake'), 500);
            isValid = false;
        }
        
        if (!isValid) {
            event.preventDefault();
        } else {
            // Save successful submission
            localStorage.setItem('lastSuccessfulSubmit', new Date().toISOString());
            
            // Show success animation
            const form = event.target;
            form.classList.add('success-animation');
            setTimeout(() => form.classList.remove('success-animation'), 2000);
            
            // For demo purposes, we'll prevent actual submission
            event.preventDefault();
            alert('Form submitted successfully! (Demo - no actual submission)');
        }
    });
    
    // Animation Controls
    const startAnimationBtn = document.getElementById('start-animation');
    const animatedBox = document.getElementById('animated-box');
    
    startAnimationBtn.addEventListener('click', () => {
        animatedBox.classList.toggle('animated');
        startAnimationBtn.textContent = animatedBox.classList.contains('animated') 
            ? 'Stop Animation' 
            : 'Start Animation';
        
        // Save animation state
        localStorage.setItem('boxAnimation', animatedBox.classList.contains('animated') ? 'on' : 'off');
    });
    
    // Restore animation state
    if (localStorage.getItem('boxAnimation') === 'on') {
        animatedBox.classList.add('animated');
        startAnimationBtn.textContent = 'Stop Animation';
    }
});

function loadTheme() {
    const savedTheme = localStorage.getItem('preferredTheme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}