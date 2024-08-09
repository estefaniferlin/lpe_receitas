// fontes do MUI
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MenuPrincipal from './componentes/MenuPrincipal';
import Sobre from './componentes/Sobre';
import NotFound from './componentes/NotFound';
import Home from './componentes/telas/home/Home';
import Login from './componentes/telas/login/Login';
import Receitas from './componentes/telas/receitas/Receitas';
import DetalhesReceita from './componentes/telas/receitas/DetalhesReceita';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuPrincipal />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "sobre",
        element: <Sobre />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "receitas",
        element: <Receitas />,
      },
      {
        path: "detalhes-receita",
        element: <DetalhesReceita />,
      },
      {
        path: "*",
        element: <NotFound />,
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
