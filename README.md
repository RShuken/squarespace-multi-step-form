# Dynamic Multi-Step Form for Squarespace

A responsive multi-step form implementation for Squarespace websites using Custom Code Block.

## Project Structure

- `index.html` - Main HTML file with form structure
- `style.css` - Custom styles for the form
- `script.js` - Main JavaScript logic
- `requirements.txt` - Python dependencies
- `app.py` - Python backend server

## Setup Instructions

### Frontend
1. Copy the contents of `index.html`, `style.css`, and `script.js` into a Squarespace Code Block
2. Ensure "Display Source" is unchecked in the Code Block settings
3. Adjust the form questions in the `formQuestions` array in `script.js` as needed

### Backend
1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Run the Python server:
   ```bash
   python app.py
   ```
3. Update the API endpoint URL in `script.js` to point to your deployed Python server

## Features
- Dynamic multi-step form
- Local storage for progress saving
- Progress bar
- Conditional YouTube video embedding
- Celebration effects
- Responsive design
- Form validation
- Data submission to Python backend

## Requirements
- Squarespace Business or Commerce plan (for full script functionality)
- Python 3.7+
- Flask web framework
- OpenAI API key (for AI processing)

## Security Notes
- All sensitive operations are handled on the Python backend
- Client-side code runs securely within Squarespace's environment
- Form data is encrypted during transmission
