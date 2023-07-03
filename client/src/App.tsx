import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header1, Header2 } from './Components/Header';


const App: React.FC = () => {   
    const [search, setSearch] = useState(false);

    return (
        <>    
        <Header2 searchs={ search } setSearch={ setSearch }/>
        <Outlet context={{ setSearch }}/>
        </>
    );
}


export default App;