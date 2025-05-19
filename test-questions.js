// Test questions array with 20 questions
const testQuestions = [
    {
        id: 'name',
        text: 'What is your full name?',
        type: 'text',
        placeholder: 'John Doe',
        validation: { required: true, minLength: 2 },
        isMilestone: true
    },
    {
        id: 'email',
        text: 'What is your email address?',
        type: 'email',
        placeholder: 'john.doe@example.com',
        validation: { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
        videoId: 'dQw4w9WgXcQ' // Rickroll video
    },
    {
        id: 'phone',
        text: 'What is your phone number?',
        type: 'tel',
        placeholder: '+1 555-0123',
        validation: { required: true, pattern: /^\+?[1-9]\d{1,14}$/ }
    },
    {
        id: 'age',
        text: 'What is your age?',
        type: 'number',
        validation: { required: true, min: 18, max: 100 }
    },
    {
        id: 'interests',
        text: 'What are your interests?',
        type: 'textarea',
        placeholder: 'Please describe your interests...',
        validation: { required: true, minLength: 20 }
    },
    {
        id: 'gender',
        text: 'What is your gender?',
        type: 'select',
        options: [
            { value: 'male', text: 'Male' },
            { value: 'female', text: 'Female' },
            { value: 'other', text: 'Other' },
            { value: 'prefer_not_to_say', text: 'Prefer not to say' }
        ]
    },
    {
        id: 'education',
        text: 'What is your highest level of education?',
        type: 'select',
        options: [
            { value: 'high_school', text: 'High School' },
            { value: 'bachelor', text: 'Bachelor\'s Degree' },
            { value: 'master', text: 'Master\'s Degree' },
            { value: 'doctorate', text: 'Doctorate' }
        ]
    },
    {
        id: 'income',
        text: 'What is your annual income range?',
        type: 'select',
        options: [
            { value: '0_30k', text: '$0 - $30,000' },
            { value: '30k_60k', text: '$30,000 - $60,000' },
            { value: '60k_90k', text: '$60,000 - $90,000' },
            { value: '90k_plus', text: 'Over $90,000' }
        ]
    },
    {
        id: 'feedback',
        text: 'Please share any feedback you have:',
        type: 'textarea',
        validation: { required: true, minLength: 10 },
        isMilestone: true
    },
    {
        id: 'preferred_contact',
        text: 'How would you prefer to be contacted?',
        type: 'select',
        options: [
            { value: 'email', text: 'Email' },
            { value: 'phone', text: 'Phone' },
            { value: 'mail', text: 'Mail' }
        ]
    },
    {
        id: 'newsletter',
        text: 'Would you like to subscribe to our newsletter?',
        type: 'select',
        options: [
            { value: 'yes', text: 'Yes' },
            { value: 'no', text: 'No' }
        ]
    },
    {
        id: 'referral',
        text: 'How did you hear about us?',
        type: 'select',
        options: [
            { value: 'social_media', text: 'Social Media' },
            { value: 'friend', text: 'Friend/Colleague' },
            { value: 'search', text: 'Search Engine' },
            { value: 'other', text: 'Other' }
        ]
    },
    {
        id: 'satisfaction',
        text: 'How satisfied are you with our service?',
        type: 'select',
        options: [
            { value: '1', text: 'Very Dissatisfied' },
            { value: '2', text: 'Dissatisfied' },
            { value: '3', text: 'Neutral' },
            { value: '4', text: 'Satisfied' },
            { value: '5', text: 'Very Satisfied' }
        ]
    },
    {
        id: 'improvement',
        text: 'How can we improve our service?',
        type: 'textarea',
        validation: { required: true, minLength: 20 }
    },
    {
        id: 'likelihood',
        text: 'How likely are you to recommend us to others?',
        type: 'select',
        options: [
            { value: '1', text: 'Very Unlikely' },
            { value: '2', text: 'Unlikely' },
            { value: '3', text: 'Neutral' },
            { value: '4', text: 'Likely' },
            { value: '5', text: 'Very Likely' }
        ]
    },
    {
        id: 'additional_info',
        text: 'Is there anything else you would like to add?',
        type: 'textarea',
        validation: { minLength: 10 }
    },
    {
        id: 'final_feedback',
        text: 'Final thoughts or comments:',
        type: 'textarea',
        validation: { required: true, minLength: 50 },
        isMilestone: true
    },
    {
        id: 'consent',
        text: 'I agree to the terms and conditions',
        type: 'select',
        options: [
            { value: 'agree', text: 'I Agree' }
        ],
        validation: { required: true }
    }
];

export default testQuestions;
