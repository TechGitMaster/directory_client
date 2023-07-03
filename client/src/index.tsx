import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


//Import________________________________________________________
import { Store, Persistor } from './SagaSetup';
import './App.css';
import App from './App';
import Home from './Pages/Home/index';
import About from './Pages/About';
import Resources from './Pages/Resources';
import NotFound from './Pages/ZNoPage';
import DocResource from './Pages/DocResource';

const root = ReactDOMClient.createRoot(document.querySelector('#root') as HTMLDivElement);

root.render(
    <>
    <Provider store={ Store() }>
        <PersistGate persistor={ Persistor() } >
            <BrowserRouter>
                
                <Routes>
                    <Route element={ <App /> }>
                        <Route index element={<Home />}/>
                        <Route path='/' element={<Home />} /> 
                        <Route path='/document/:id' element={<DocResource />}></Route>
                        <Route path='/About' element={<About />} /> 
                        <Route path='/Resources' element={<Resources />} />
                        <Route path='*' element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </PersistGate>
    </Provider>
    </>
);