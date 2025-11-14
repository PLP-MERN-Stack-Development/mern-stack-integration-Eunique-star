# Blog App (MERN)

This repository contains a full-stack blog application built with the MERN stack (MongoDB, Express, React, Node). The app includes user authentication, post CRUD, image upload support, and a React front-end with a Vite dev setup.

**Quick Links**

- **Project root**: `./`
- **Client**: `./client`
- **Server**: `./server`

**Screenshots**

![Login screen](./screenshots/login.png)
![Post list](./screenshots/postlist.png)
![Create post](./screenshots/createpost.png)

**Features**

- **CRUD posts**: Create, read, update, and delete blog posts.
- **Authentication**: User registration and login with protected routes.
- **Image uploads**: Upload images for posts (stored in `uploads/`).
- **REST API**: Express + MongoDB (Mongoose) back-end.
- **React + Vite**: Fast front-end development with Vite.

**Project Structure**

- **`client/`**: React front-end (Vite)
- **`server/`**: Express back-end, routes, controllers, models
- **`uploads/`**: Uploaded images (server-side static files)

**Tech Stack**

- **Front-end**: React, Vite, Tailwind CSS (optional), React Router
- **Back-end**: Node.js, Express, MongoDB, Mongoose
- **Auth**: JSON Web Tokens (JWT) and middleware for protected routes
- **File upload**: `multer`

**Local Setup**

1. Clone the repository and open the project root.

2. Install dependencies for both server and client.

   - Server (from `server/`):

     ```powershell
     cd server
     npm install
     ```

   - Client (from `client/`):
     ```powershell
     cd client
     npm install
     ```

3. Environment variables

- Create a `.env` file in `server/` (example variables below):

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Run the apps locally

- Start the server (from `server/`):

  ```powershell
  cd server
  npm run dev
  ```

- Start the client (from `client/`):
  ```powershell
  cd client
  npm run dev
  ```

By default the client runs on `http://localhost:5173` (Vite) and the server runs on `http://localhost:5000` (adjust ports via `.env` or scripts).

**Available Scripts**

- Server: `npm run dev` (nodemon), `npm start` (node)
- Client: `npm run dev` (vite), `npm run build`, `npm run preview`

**How to Add Screenshots**

- Create a `screenshots/` folder at the repo root (already included placeholder). Add images with these example filenames:
  - `screenshots/login.png`
  - `screenshots/post-list.png`
  - `screenshots/create-post.png`
- After adding images, they will render in this README automatically.

**Deployment Notes**

- For deployment, build the client (`cd client && npm run build`) and serve the static `dist/` from the server (or host the client separately). Ensure `MONGO_URI` and `JWT_SECRET` are set in production environment variables.

**Troubleshooting**

- If images don't display, verify file names and relative paths: `./screenshots/<name>.png`.
- If the server cannot connect to MongoDB, validate `MONGO_URI` and network access (Atlas IP whitelist).

**Useful Files**

- Server entry: `server/src/server.js`
- Client entry: `client/src/main.jsx`
- API helper: `client/src/services/api.js`

**Contributing**

- Feel free to open issues or create PRs. For major changes, open an issue first to discuss the change.

**License**

- This project does not include a license file. Add one if you plan to share or publish.

---

If you want, I can:

- Add example screenshots into `screenshots/` as placeholders, or
- Update this README with additional sections (API reference, Post model schema, or deployment steps).
