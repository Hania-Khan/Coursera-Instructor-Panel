
import React from "react";
import {Header} from "../../components/header/Header"
import {Footer} from '../../components/footer/Footer';

import { Quiz } from '../../components/quiz/CreateQuiz'


export const QuizPage = () =>{

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

                <Quiz/>

            {/* Footer Start */}
            <footer className="footer-container">
                     <Footer/>
            </footer>
            {/* Footer End */}


        </div>

    )
}