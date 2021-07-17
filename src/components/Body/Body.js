import React, { lazy, Suspense } from "react";
import "./Body.css";
import { Switch, Route } from "react-router-dom";
//importing components.
import SearchNotes from "./SearchNotes/SearchNotes.js";
import UploadNotes from "./UploadNotes/UploadNotes.js";
import ContactAdmin from "./ContactAdmin/ContactAdmin.js";
import Navbar from "./Navbar/Navbar";
// import HomePage from "./HomePage/Homepage.js";
import Footer from "./Footer/Footer.js";
const HomePage = lazy(() => import("./HomePage/Homepage.js"));
const ShowPdf = lazy(() => import("./ShowPdf/ShowPdf.js"));

const Body = () => {
  return (
    <>
      <Suspense fallback={<div>Please Wait...</div>}>
        <Route path="/search_notes/:pdfId" component={ShowPdf} />
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/search_notes" component={SearchNotes} />
          <Route exact path="/upload_notes" component={UploadNotes} />
          <Route exact path="/contact" component={ContactAdmin} />
        </Switch>
        <Footer />
      </Suspense>
    </>
  );
};

export default Body;
