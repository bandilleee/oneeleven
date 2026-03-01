# API Endpoint Validator 🔍

A comprehensive web application for validating string-sorting API endpoints. This project includes both a frontend validation tool and a backend API implementation, designed to help developers test and verify their string sorting endpoints against standard requirements.

## 🌟 Features

- **Endpoint Validation**: Submit your API endpoint and email to validate against official servers
- **Direct API Testing**: Test endpoints directly with custom input strings
- **Real-time Response Display**: View formatted API responses with status indicators
- **Interactive UI**: Modern dark theme with smooth animations and responsive design
- **Copy Response**: Easily copy API responses for debugging
- **Expected Format Reference**: Built-in documentation for API specification

## 🚀 Live Demo

Visit the live application: [https://oneeleven-beta.vercel.app](https://oneeleven-beta.vercel.app)

## 🛠️ Tech Stack

### Frontend
- **HTML5**: Semantic markup with modern features
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vanilla JavaScript**: ES6+ for interactive functionality
- **Iconify**: Icon library for consistent UI elements
- **Inter Font**: Modern typography from Google Fonts

### Backend
- **C#**: .NET 8.0
- **ASP.NET Core**: Minimal API for high performance
- **Docker**: Containerized deployment
- **RESTful API**: Clean endpoint design

## 📋 API Specification

### Endpoint: `/api/sort-string`
- **Method**: POST
- **Request Body**: 
  ```json
  {
    "data": "string"
  }
