# repo_xyz

Create a professional production-ready React frontend inside a main folder named `frontend`.

Main folder structure must be:

frontend/
 ├── public/
 ├── src/
 │    ├── assets/
 │    ├── components/
 │    │    ├── common/
 │    │    ├── ui/
 │    │    └── layout/
 │    ├── pages/
 │    ├── routes/
 │    ├── services/
 │    ├── hooks/
 │    ├── context/
 │    ├── utils/
 │    ├── constants/
 │    ├── styles/
 │    ├── App.jsx
 │    └── main.jsx
 ├── .env
 ├── .env.example
 ├── .gitignore
 ├── index.html
 ├── package.json
 ├── vite.config.js
 ├── tailwind.config.js
 └── postcss.config.js

Requirements:

- React 19
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Framer Motion
- Lucide React Icons
- React Hot Toast
- React Hook Form
- Date-fns

Install all required dependencies using npm.

Configure:

- React Router
- Axios instance
- Tailwind CSS
- Environment variable support
- Protected Route structure
- API service layer
- Loading and error handling structure

Create these reusable components:

- Button component
- Input component
- Navbar component
- Footer component
- Loader component
- ErrorMessage component

Create basic pages:

- Home
- Login
- Register
- Dashboard
- NotFound

Rules:

- Follow industry-standard naming conventions
- Use modern React functional components and hooks
- Keep code modular and scalable
- Do not put all code in App.jsx
- Keep routing inside routes folder
- Keep API calls inside services folder
- Keep reusable UI inside components/ui
- Keep layout components inside components/layout
- Keep global constants inside constants folder
- Keep helper functions inside utils folder

Output format:

1. First provide all terminal commands to create the project.
2. Then show the complete folder structure.
3. Then generate every required file one by one with correct path.
4. Make sure the project runs successfully using:

npm run dev