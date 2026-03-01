# API Endpoint Validator 🔍

A comprehensive full-stack web application for validating and testing string-sorting API endpoints. Built with a modern dark-themed frontend and a high-performance ASP.NET Core backend, this tool helps developers verify their API implementations against standard string-sorting requirements.

> 🌐 **Live Demo**: [https://oneeleven-beta.vercel.app](https://oneeleven-beta.vercel.app)

---

## ✨ Features

- **🛡️ Endpoint Validation** — Submit your API endpoint URL and email to validate it against the official server
- **🧪 Direct API Testing** — Test any endpoint directly with custom input strings in real time
- **📊 Real-time Response Display** �� View formatted, syntax-highlighted API responses with status indicators
- **📋 Copy Response** — One-click copy of API responses for easy debugging
- **📖 Expected Format Reference** — Built-in documentation showing the required API request/response format
- **🎨 Modern Dark UI** — Sleek, responsive dark theme with smooth animations and a sidebar layout
- **🔌 System Status Indicator** — Live system online/offline status shown in the sidebar

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| HTML5 | Semantic markup |
| [Tailwind CSS](https://tailwindcss.com/) (CDN) | Utility-first styling |
| Vanilla JavaScript (ES6+) | Interactive functionality |
| [Iconify](https://iconify.design/) | Icon library |
| [Inter Font](https://fonts.google.com/specimen/Inter) | Modern typography |

### Backend
| Technology | Purpose |
|---|---|
| C# / .NET 8.0 | Runtime & language |
| ASP.NET Core Minimal API | High-performance REST API |
| [Docker](https://www.docker.com/) | Containerized deployment |

---

## 📋 API Specification

### `POST /api/sort-string`

Accepts a string and returns its characters sorted alphabetically (case-insensitive).

**Request Body:**
```json
{
  "data": "example"
}
```

**Response:**
```json
{
  "word": ["a", "e", "e", "l", "m", "p", "x"]
}
```

**Error Response** (invalid input):
```json
{
  "error": "Invalid input. Please provide a 'data' field with a string value."
}
```

### `GET /`

Health check — returns `"String Sort API is running!"`.

---

## 📁 Project Structure

```
oneeleven/
├── backend/
│   └── StringSortApi/
│       ├── Program.cs          # ASP.NET Core Minimal API entry point
│       ├── StringSortApi.csproj
│       └── Dockerfile          # Docker container configuration
│
├── frontend/
│   └── index.html              # Single-page frontend app
│
├── oneeleven.sln               # Visual Studio solution file
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) (for running the backend locally)
- [Docker](https://www.docker.com/) (optional, for containerized deployment)
- Any modern web browser (for the frontend)

---

### Running the Backend

#### Option A — .NET CLI

```bash
cd backend/StringSortApi
dotnet restore
dotnet run
```

The API will be available at `http://localhost:5152`.

#### Option B — Docker

```bash
cd backend/StringSortApi

# Build the image
docker build -t string-sort-api .

# Run the container
docker run -p 8080:8080 string-sort-api
```

The API will be available at `http://localhost:8080`.

---

### Running the Frontend

The frontend is a single HTML file with no build step required. Simply open it in your browser:

```bash
open frontend/index.html
```

Or serve it with any static file server:

```bash
# Using Python
python -m http.server 3000 --directory frontend

# Using Node.js (npx)
npx serve frontend
```

Then navigate to `http://localhost:3000`.

> **Note:** By default, the frontend points to `https://string-sort-api.onrender.com/api/sort-string`. Update the endpoint URL fields in the UI to point to your local backend (`http://localhost:5152/api/sort-string` or `http://localhost:8080/api/sort-string`).

---

## 🐳 Deployment

The backend is Docker-ready for easy deployment to any container platform (Render, Railway, Fly.io, etc.).

The frontend can be deployed as a static site to platforms like [Vercel](https://vercel.com/), [Netlify](https://netlify.com/), or [GitHub Pages](https://pages.github.com/).

**Environment Variables (Backend):**

| Variable | Description | Default |
|---|---|---|
| `PORT` | Port the API listens on | `5152` |
| `ASPNETCORE_URLS` | ASP.NET Core binding URL | `http://+:8080` |

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source. Feel free to use and modify it.

---

<p align="center">Made with ❤️ by <a href="https://github.com/bandilleee">bandilleee</a></p>
