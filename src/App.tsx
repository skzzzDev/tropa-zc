import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home/";
import { Login } from "./pages/login";
import { Error } from "./pages/error";
import { Cadastro } from "./pages/cadastro";
import { Private } from './routes';

// Função para verificar se é um dispositivo móvel
const isMobileDevice = () => {
    return window.matchMedia("only screen and (max-width: 767px)").matches;
}

// Define as rotas com base na detecção de dispositivo móvel
const getRoutes = () => {
    if (isMobileDevice()) {
        return [
            {
                path: "/",
                element: <div>Desculpe, este site é projetado para desktops.</div>,
            },
        ];
    } else {
        return [
            {
                path: "/",
                element: <Private><Home /></Private>,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: '/cadastro',
                element: <Private><Cadastro/></Private>,
            },
            {
                path: "*",
                element: <Error />,
            },
        ];
    }
};

const router = createBrowserRouter(getRoutes());

export { router };
