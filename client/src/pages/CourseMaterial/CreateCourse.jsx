import React from "react";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import { CreateCourseMaterial } from "../../components/CourseMaterial/CreateCourseMaterial";
import { useParams } from "react-router-dom";

export const CreateMaterialPage = () => {
  const { courseId } = useParams();

  return (
    <div className="wrapper">
      {/* Header Start */}
      <header className="header-container">
        <Header />
      </header>
      {/* Header End */}

      {/* Main Start */}
      <main className="main-container"></main>
      {/* Main End */}

      <CreateCourseMaterial courseId={courseId} />

      {/* Footer Start */}
      <footer className="footer-container">
        <Footer />
      </footer>
      {/* Footer End */}
    </div>
  );
};
