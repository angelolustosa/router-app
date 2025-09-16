import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import { Login } from './pages/Login.jsx';
import { Cadastro } from './pages/Cadastro.jsx';
import { NotFound } from './pages/NotFound.jsx';
import './index.css'
import { Home } from './pages/Home.jsx';
import { Contato } from './pages/Contato.jsx';
import { Layout } from './components/Layout.jsx';
import { Usuarios } from './pages/Usuarios.jsx';

const router = createBrowserRouter([
  /* O único path que vai ficar de fora do layout (navbar + footer) */
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/contato',
        element: <Contato />
      },
      {
        path: '/cadastro',
        element: <Cadastro />
      },
      {
        path: '/usuarios',
        element: <Usuarios />
      },
    ]
  },
  /* Página não encontrada - 404 */
  {
    path: '*',
    element: <NotFound />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
