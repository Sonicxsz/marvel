import AppHeader from "../appHeader/AppHeader";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import {lazy, Suspense} from 'react';
import CharPage from "../pages/charPage";
import SingleComic from "../singleComic/SingleComic";
import SingleChar from "../singleComic/SingleChar";
import SinglePage from "../pages/singlePage";
import './app.css'
import AppBanner from "../appBanner/AppBanner";
const ComicsPage = lazy (() => import("../pages/comicsPage"))

const NotFound = lazy(() => import("../pages/404")); 

function App () {
   

    return (
       <Suspense fallback={<div>Loading...pls wait</div>}>
           <BrowserRouter>
        <div className="app">
            <AppHeader/>
            <main>
            <Routes>

                <Route path="/" element={<CharPage />}/>
                <Route path="/comics" element={ <ComicsPage /> } />
                <Route path="/comics/:comicId" 
                    element={<SinglePage 
                    action={'comic'}
                    Component={SingleComic}
                    />} />
                <Route path="/characters/:charId" 
                    element={<SinglePage 
                    action={'char'}
                    Component={SingleChar}
                    />} />    
              
                
                <Route path="*" element={<NotFound />}/>
            </Routes>
            </main>
        </div>
       </BrowserRouter>
       </Suspense>
    )
   
}

export default App;