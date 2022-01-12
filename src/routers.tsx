import { Login } from "@mui/icons-material";
import { Admin } from "components/Layouts";
import Home from "components/Layouts/Home";
import LoginPage from "features/auth/pages/LoginPage";
import React from "react";
import { NotFound } from './components/Common/NotFound';

const routers = [
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '*',
        element: <NotFound />,
    }
];

export default routers;