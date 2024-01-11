
import React from "react";
import {Header} from "../../components/header/Header"
import {Footer} from '../../components/footer/Footer';
import {CourseList } from '../../components/CourseMaterial/CourseList'


export const CreateCourseListPage = () =>{

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

                <CourseList/>

            {/* Footer Start */}
            <footer className="footer-container">
                     <Footer/>
            </footer>
            {/* Footer End */}


        </div>

    )
}