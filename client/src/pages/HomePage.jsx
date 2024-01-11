
import React from "react";
import {Header} from '../components/header/Header'
import {Footer} from '../components/footer/Footer';
import {Home } from '../components/Home';


export const HomePage = () =>{

    return(

        <div className="wrapper">

            {/* Header Start */}
            <header className="header-container">
                     <Header/>
            </header>
            {/* Header End */}


            {/* Main Start */}
            <main className="main-container">



            </main>
            {/* Main End */}

                <Home/>

            {/* Footer Start */}
            <footer className="footer-container">
                     <Footer/>
            </footer>
            {/* Footer End */}


        </div>

    )
}