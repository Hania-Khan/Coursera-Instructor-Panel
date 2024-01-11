
import React from "react";
import {Header} from "../../components/header/Header"
import {Footer} from '../../components/footer/Footer';
import { ViewQuiz } from '../../components/quiz/ViewQuiz'


export const ViewQuizPage = () =>{

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

                <ViewQuiz/>

            {/* Footer Start */}
            <footer className="footer-container">
                     <Footer/>
            </footer>
            {/* Footer End */}


        </div>

    )
}