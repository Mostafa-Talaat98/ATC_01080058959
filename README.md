# AreebEvents 

AreebEvents is a full-stack event management platform that allows users to discover, book, and manage events. The project is built with a React frontend and a Node.js + Express backend using local JSON files for data storage (local storage on the server).

---

## 🚀 Project Overview
- **Frontend:** Modern React app with authentication, event browsing, booking, and admin management.
- **Backend:** Node.js + Express REST API, storing users and events in local JSON files (no database required).

---

## ✨ Features
- User registration and login
- Browse, search, and filter events
- Book events and manage your bookings
- Admin can create, edit, and delete events
- Responsive design with light/dark mode
- Local storage backend (no DB setup needed)

---

## 🛠️ Tech Stack
- **Frontend:** React, React Router, Context API, TailwindCSS, React Testing Library, Jest
- **Backend:** Node.js, Express, CORS, body-parser
- **Storage:** JSON files (`users.json`, `events.json`)

---

## 📁 Folder Structure
```
AreebEvents/
├── backend/
│   ├── server.js
│   ├── users.json
│   └── events.json
├── src/
│   ├── components/
│   ├── contexts/
│   ├── pages/
│   ├── App.tsx
│   └── ...
├── public/
├── package.json
└── README.md
```

---

## ⚡ Getting Started

### 1. Backend Setup
```bash
cd backend
npm install
node server.js
```
- The backend will run on `http://localhost:5000`
- Data is stored in `users.json` and `events.json` in the backend folder.

### 2. Frontend Setup
```bash
npm install
npm start
```
- The frontend will run on `http://localhost:3000`
- Make sure API calls in the frontend point to `http://localhost:5000/api/...`
- Admin role :- User :- admin@example.com ,  Pass:- password 
---

## 🔗 API Endpoints (Backend)
- `POST   /api/register`   — Register a new user
- `POST   /api/login`      — Login user
- `GET    /api/events`     — Get all events
- `POST   /api/events`     — Add new event
- `PUT    /api/events/:id` — Update event
- `DELETE /api/events/:id` — Delete event

---

## 👤 User Roles
- **User:** Can register, login, browse, and book events
- **Admin:** Can create, edit, and delete events (use `admin@example.com` / `password` by default)

---

## 🧪 Testing
- Unit tests are written using React Testing Library and Jest
- To run tests:
```bash
npm test
```

---

## 🤝 Contribution
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📞 Contact
- Email: mtlt278@gmail.com
- WhatsApp: 01080058959

---
