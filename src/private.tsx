import React from "react";
import { Admin } from './components/Layouts/Admin';
import Students from './features/students/pages/Students';
import Dashboard from './features/dashboard/Dashboard';

const privateRole = [
    {
        path: '/admin',
        element: <Admin />,
        role: ['admin'],
        children: [
            {
                index: true,
                path: '',
                element: <Dashboard />,
                role: ['admin'],
            },
            {
                index: false,
                path: 'dashboard',
                element: <Dashboard />,
                role: ['admin'],
            },
            {
                index: false,
                path: 'students',
                element: <Students />,
                role: ['admin'],
                children: [
                    {
                        index: false,
                        path: 'add',
                        element: <Students />,
                        role: ['admin'],
                    },
                    {
                        index: false,
                        path: ':studentId',
                        element: <Students />,
                        role: ['admin'],
                    },
                ]
            }
        ]
    },
];

export default privateRole;