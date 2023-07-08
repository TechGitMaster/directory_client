import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header1, Header2 } from './Components/Header';


const App: React.FC = () => {   
    const [search, setSearch] = useState(false);
    const [accessAlert, setAccessAlert] = useState('');

    return (
        <>    
        <Header2 searchs={ search } setSearch={ setSearch } accessAlert={ accessAlert } setAccessAlert={ setAccessAlert }  />
        <Outlet context={{ setSearch, setAccessAlert }}/>
        </>
    );
}


export default App;