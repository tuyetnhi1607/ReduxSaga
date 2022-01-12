import React, {useEffect} from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import LoginPage from 'features/auth/pages/LoginPage';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import routers from "./routers";
import privateRole from "./private";
import cityApi from 'api/cityApi';
import { RoleBaseRouting } from 'components/Common/CheckRole';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        {
          routers.map((item, index)=>(
            <Route key={index} path={item.path} element={item.element} />
          ))
        }
        {
          privateRole.map((item, index)=>(
            <Route key={index} path={item.path} element={<RoleBaseRouting role={item.role} element={item.element}/>}>
              {
                item.children?.map((item, index)=>(
                  <Route index={item.index} key={index} path={item.path} element={<RoleBaseRouting role={item.role} element={item.element}/>}>
                    {
                      item.children?.map((item, index)=>(
                        <Route index={item.index} key={index} path={item.path} element={<RoleBaseRouting role={item.role} element={item.element}/>}/>
                      ))
                    }
                  </Route>
                ))
              }
            </Route>
          ))
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
