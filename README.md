# 🚀 Squarespace Multi-Step Form

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python Version](https://img.shields.io/badge/python-3.7%2B-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/flask-3.0.0-000000.svg?logo=flask)](https://flask.palletsprojects.com/)

A responsive, dynamic multi-step form implementation for Squarespace websites using Custom Code Block. This solution allows you to create engaging, multi-step forms with progress tracking, form validation, and seamless integration with your Squarespace site.

## ✨ Features

- **Multi-step Interface**: Break long forms into manageable steps
- **Progress Tracking**: Visual progress indicator for better UX
- **Responsive Design**: Works on all device sizes
- **Form Validation**: Client-side validation with helpful error messages
- **Progress Saving**: Auto-saves form progress using localStorage
- **Customizable**: Easily modify form questions and steps
- **Backend Integration**: Python/Flask backend for form processing
- **Security First**: Secure data handling and CORS protection

## 🛠️ Prerequisites

- Squarespace Business or Commerce plan
- Python 3.7+
- Node.js and npm (for development)
- Basic understanding of HTML/CSS/JavaScript

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/RShuken/squarespace-multi-step-form.git
cd squarespace-multi-step-form
```

### 2. Set Up Environment

1. Copy the example environment file:
   ```bash
   cp .env.local.sample .env.local
   ```
2. Update `.env.local` with your configuration

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the Development Server

```bash
python app.py
```

The server will start at `http://localhost:5001`

## 📦 Deployment

### Backend Deployment

Deploy the Flask application to your preferred hosting provider (e.g., Heroku, PythonAnywhere, or AWS).

### Frontend Integration

1. In your Squarespace admin, add a new **Code Block** to your page
2. Copy the contents of `index.html`, `style.css`, and `script.js` into the code block
3. Update the API endpoint in `script.js` to point to your deployed backend
4. Ensure "Display Source" is unchecked in the Code Block settings

## 🛠 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
FLASK_APP=app.py
FLASK_ENV=development
PORT=5001
# OPENAI_API_KEY=your_openai_api_key_here  # If using AI features
```

### Form Customization

Edit the `formQuestions` array in `script.js` to customize your form steps and questions.

## 📚 Project Structure

```
.
├── app.py                 # Flask backend server
├── requirements.txt       # Python dependencies
├── static/               # Static files
│   ├── css/              # CSS files
│   └── js/               # JavaScript files
├── templates/            # HTML templates
├── .env.local            # Local environment variables (gitignored)
├── .env.local.sample     # Example environment variables
└── README.md             # This file
```

## 🔒 Security

- All sensitive operations are handled on the backend
- CORS is configured to only allow requests from your Squarespace domain
- Environment variables are used for sensitive configuration
- Form data is encrypted during transmission (HTTPS)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Flask](https://flask.palletsprojects.com/)
- Inspired by the need for better form experiences on Squarespace
