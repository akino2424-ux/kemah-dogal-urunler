#!/usr/bin/env python3
"""
PythonAnywhere deployment script
"""
import os
import sys

# Add the current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Import the Flask app
from app import app

# This is the WSGI application for PythonAnywhere
application = app

if __name__ == "__main__":
    app.run()
