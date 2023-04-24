import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header1, Header2 } from './Components/Header';


const App: React.FC = () => {
    return (
        <>    
        <Header2 />
        <Outlet />
        </>
    );
}

export default App;