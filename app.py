from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})  # In production, restrict to your Squarespace domain

@app.route('/api/submit-form', methods=['POST'])
def handle_form_submission():
    try:
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400

        data = request.get_json()
        
        # Process the form data
        print("Received form data:")
        for key, value in data.items():
            print(f"  {key}: {value}")

        # Here you would typically:
        # 1. Save the data to a database
        # 2. Process with OpenAI if needed
        # 3. Send notifications/emails
        # 4. Perform any other business logic

        return jsonify({
            "message": "Form data received successfully!",
            "status": "success"
        }), 200

    except Exception as e:
        print(f"Error processing form submission: {str(e)}")
        return jsonify({
            "error": "An error occurred while processing your submission",
            "details": str(e)
        }), 500

if __name__ == '__main__':
    # For development only
    app.run(host='0.0.0.0', port=5001, debug=True)
