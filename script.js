// Configuration
const API_ENDPOINT = 'http://localhost:5001/api/submit-form'; // Update this for production

// Global variables
let currentStep = 1;
let totalSteps = 0;
let formData = {};
let formQuestions = [];

// Import test questions
import testQuestions from './test-questions.js';

// Question definitions
formQuestions = testQuestions;

totalSteps = formQuestions.length;

// DOM Elements
const formContainer = document.getElementById('multiStepFormContainer');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const progressPercentage = document.getElementById('progressPercentage');
const formElement = document.getElementById('multiStepForm');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const thankYouScreen = document.getElementById('thankYouScreen');
const celebrationCanvas = document.getElementById('celebrationCanvas');

// Initialize app
function initApp() {
    loadProgress();
    generateFormStepsHTML();
    updateProgressBar();
    updateNavigationButtons();
    
    // Event listeners
    prevBtn.addEventListener('click', prevStep);
    nextBtn.addEventListener('click', nextStep);
    formElement.addEventListener('submit', handleSubmit);
}

// Generate form steps HTML
function generateFormStepsHTML() {
    formElement.innerHTML = ''; // Clear existing content
    
    formQuestions.forEach((question, index) => {
        const stepHtml = createStepHTML(question, index + 1);
        formElement.insertAdjacentHTML('beforeend', stepHtml);
    });
    
    // Show initial step
    showStep(currentStep);
}

// Create HTML for a single step
function createStepHTML(question, stepNumber) {
    let stepHtml = `<div class="form-step" data-step="${stepNumber}">`;
    
    // Add video container if videoId exists
    if (question.videoId) {
        stepHtml += `
            <div class="youtube-video-container mb-4" id="videoContainer_${question.id}">
                <iframe src="https://www.youtube-nocookie.com/embed/${question.videoId}"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen></iframe>
            </div>
        `;
    }
    
    // Add question text
    stepHtml += `<h3 class="text-xl font-semibold mb-3">${question.text}</h3>`;
    
    // Add form group
    stepHtml += `<div class="form-group" id="group_${question.id}">`;
    
    // Add input based on type
    switch(question.type) {
        case 'text':
        case 'email':
        case 'tel':
        case 'number':
            stepHtml += `
                <input type="${question.type}" 
                       id="${question.id}" 
                       name="${question.id}" 
                       placeholder="${question.placeholder || ''}" 
                       class="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            `;
            break;
            
        case 'textarea':
            stepHtml += `
                <textarea id="${question.id}" 
                          name="${question.id}" 
                          placeholder="${question.placeholder || ''}" 
                          class="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          rows="4"></textarea>
            `;
            break;
            
        case 'select':
            stepHtml += `
                <select id="${question.id}" 
                        name="${question.id}" 
                        class="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            `;
            question.options.forEach(option => {
                stepHtml += `<option value="${option.value}">${option.text}</option>`;
            });
            stepHtml += `</select>`;
            break;
    }
    
    stepHtml += '</div></div>';
    
    // Add event listener for input changes
    const inputElement = document.getElementById(question.id);
    if (inputElement) {
        inputElement.addEventListener('input', (e) => handleInputChange(e, question));
    }
    
    return stepHtml;
}

// Handle input changes
function handleInputChange(event, question) {
    formData[question.id] = event.target.value;
    saveProgress();
}

// Show a specific step
function showStep(stepNumber) {
    currentStep = stepNumber;
    updateProgressBar();
    updateNavigationButtons();
    
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.style.display = 'none';
    });
    
    // Show current step
    const currentStepElement = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
    if (currentStepElement) {
        currentStepElement.style.display = 'block';
        
        // Scroll to top of form
        formContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

// Update progress bar
function updateProgressBar() {
    const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `Step ${currentStep} of ${totalSteps}`;
    progressPercentage.textContent = `${Math.round(percentage)}%`;
}

// Update navigation buttons
function updateNavigationButtons() {
    prevBtn.style.display = currentStep > 1 ? 'block' : 'none';
    nextBtn.style.display = currentStep < totalSteps ? 'block' : 'none';
    submitBtn.style.display = currentStep === totalSteps ? 'block' : 'none';
}

// Previous step
function prevStep() {
    if (currentStep > 1) {
        showStep(currentStep - 1);
    }
}

// Next step
function nextStep() {
    if (currentStep < totalSteps) {
        const currentQuestion = formQuestions[currentStep - 1];
        
        // Validate current step
        if (!validateStep(currentQuestion)) {
            return;
        }
        
        showStep(currentStep + 1);
        
        // Trigger celebration if this is a milestone step
        if (currentQuestion.isMilestone) {
            triggerCelebration('milestone');
        }
    }
}

// Validate current step
function validateStep(question) {
    const value = formData[question.id];
    let isValid = true;
    let errorElement = document.getElementById(`group_${question.id}`).querySelector('.error-message');
    
    // Remove existing error if any
    if (errorElement) {
        errorElement.remove();
    }
    
    if (question.validation) {
        if (question.validation.required && (!value || value.trim() === '')) {
            isValid = false;
            addError(question.id, 'This field is required');
        }
        
        if (isValid && question.validation.minLength && value.length < question.validation.minLength) {
            isValid = false;
            addError(question.id, `Minimum length is ${question.validation.minLength} characters`);
        }
        
        if (isValid && question.validation.pattern && !new RegExp(question.validation.pattern).test(value)) {
            isValid = false;
            addError(question.id, 'Invalid format');
        }
    }
    
    return isValid;
}

// Add error message
function addError(fieldId, message) {
    const group = document.getElementById(`group_${fieldId}`);
    group.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    group.appendChild(errorDiv);
}

// Handle form submission
async function handleSubmit(event) {
    event.preventDefault();
    
    // Validate final step
    const currentQuestion = formQuestions[currentStep - 1];
    if (!validateStep(currentQuestion)) {
        return;
    }
    
    // Show loading state
    nextBtn.disabled = true;
    submitBtn.disabled = true;
    
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        // Handle successful submission
        formElement.style.display = 'none';
        document.getElementById('navigationContainer').style.display = 'none';
        document.getElementById('progressBarContainer').style.display = 'none';
        thankYouScreen.classList.remove('hidden');
        triggerCelebration('final');
        
        // Clear local storage
        localStorage.removeItem('multiStepFormData');
        localStorage.removeItem('multiStepFormCurrentStep');
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your form. Please try again.');
    } finally {
        nextBtn.disabled = false;
        submitBtn.disabled = false;
    }
}

// Trigger celebration effects
function triggerCelebration(type) {
    if (typeof confetti === 'function') {
        celebrationCanvas.style.display = 'block';
        
        let config = {
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        };
        
        if (type === 'final') {
            config = {
                particleCount: 200,
                spread: 160,
                origin: { y: 0.5 },
                angle: 90,
                drift: 0,
                gravity: 0.5,
                ticks: 400
            };
        }
        
        confetti(config);
        
        // Hide canvas after effects
        setTimeout(() => {
            celebrationCanvas.style.display = 'none';
        }, 3000);
    }
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem('multiStepFormData', JSON.stringify(formData));
    localStorage.setItem('multiStepFormCurrentStep', currentStep);
}

// Load progress from localStorage
function loadProgress() {
    const savedData = localStorage.getItem('multiStepFormData');
    const savedStep = localStorage.getItem('multiStepFormCurrentStep');
    
    if (savedData && savedStep) {
        formData = JSON.parse(savedData);
        currentStep = parseInt(savedStep, 10);
        
        // Populate form fields with saved data
        Object.entries(formData).forEach(([key, value]) => {
            const input = document.getElementById(key);
            if (input) {
                input.value = value;
            }
        });
    } else {
        // Initialize empty form data
        formQuestions.forEach(question => {
            formData[question.id] = '';
        });
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
