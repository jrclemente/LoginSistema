import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./../Paginas/Login/login";
import Cadastro from './../Paginas/Cadastro/Cadastro';
import './../App.css';
import Perfil from "../Paginas/Perfil/Perfil";
import ErrorNotFound from "../Components/ErrorNotFound";
import Error from './../Components/Error';

const router = createBrowserRouter([  
  {
    path: '/',
    element: <Login />,
    errorElement: <Error />
  },
  {
    path: 'cadastro',
    element: <Cadastro />,
    errorElement: <Error />,
  },
  {
    path: 'perfil',
    element: <Perfil />,
    errorElement: <Error />
  },
  /* add 404 page */
  // {
  //   path: "*",
  //   // element: <ErrorNotFound />
  //   errorElement: <Error />
  // }
])

const Rotas = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default Rotas