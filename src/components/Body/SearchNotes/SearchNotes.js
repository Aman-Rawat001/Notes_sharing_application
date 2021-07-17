import React, { useState, Suspense, lazy, useEffect } from "react";
import "./SearchNotes.css";
// import SearchCard from "./SearchCard/SearchCard.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ChaperListJSON from "./ChapterList.json";

const SearchCard = lazy(() => import("./SearchCard/SearchCard.js"));

import firebase, { analytics } from "../../../firebase";

const SearchNotes = () => {
  const db = firebase.firestore();
  const [fetchedSem, setFetchedSem] = useState("");
  const [fetchedSub, setFetchedSub] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchNotes, setFetchNotes] = useState([]);

  const handleNotesSearch = () => {
    const e = document.getElementById("selectSem");
    var selectedSem = e.options[e.selectedIndex].text;
    setFetchedSem(selectedSem);
  };
  const handleFetchedSub = () => {
    const e = document.getElementById("selectSub");
    var selectedSub = e.options[e.selectedIndex].text;
    setFetchedSub(selectedSub);
    setSearchTerm("");
  };

  const usersArray = [];
  const handleSearch = async (e) => {
    e.preventDefault();
    // removing before screen.
    document.getElementById("beforeScreen").style.display = "none";

    // getting data from firebase database.
    const response = db.collection("Notes_Data");
    // upgrading search engine.
    var filter;
    if (fetchedSub === "") {
      filter = await response.where("semester", "==", fetchedSem);
    } else if (fetchedSem == "") {
      filter = await response.where("subject", "==", fetchedSub);
    } else if (fetchedSub !== "" && fetchedSem !== "") {
      filter = await response
        .where("semester", "==", fetchedSem)
        .where("subject", "==", fetchedSub);
    }
    const data = await filter.get();
    data.docs.forEach((item) => {
      var tempUsers = {
        id: item.id,
        pdfLink: item.data().pdfLink,
        name: item.data().name,
        chapter: item.data().chapter,
        semester: item.data().semester,
        subject: item.data().subject,
        fileName: item.data().file_name,
      };
      usersArray.push(tempUsers);
    });
    // console.log(usersArray);
    if (usersArray.length === 0) {
      document.getElementById("nothingFound").style.display = "block";
      setFetchNotes([]);
      analytics.logEvent("Unsuccessfull_searches");
    } else {
      document.getElementById("nothingFound").style.display = "none";
      setFetchNotes(usersArray);
      analytics.logEvent("Successfull_searches");
    }
  };

  const handleSearchItem = (e) => {
    setSearchTerm(e.target.value);
    setFetchedSub(e.target.value);
    document.getElementById("searchEngineBox").style.display = "none";
    // subject select will automatically select which is in searchBar.
    var textToFind = e.target.value;
    var dd = document.getElementById("selectSub");
    for (var i = 0; i < dd.options.length; i++) {
      if (dd.options[i].text === textToFind) {
        dd.selectedIndex = i;
        break;
      }
    }
  };

  return (
    <>
      <div
        className="container-fluid"
        style={{ backgroundColor: "rgb(230 228 228 / 73%)" }}
      >
        <div className="notes_searchBar container">
          <div className="">
            {/* //SearchBar */}
            <form className="d-flex my-4">
              <div className="faSearchIcon">
                <FontAwesomeIcon icon={faSearch} />
              </div>
              <input
                style={{
                  backgroundColor: "white",
                  outline: "none",
                  borderLeft: "none",
                  borderTopLeftRadius: "0",
                  borderBottomLeftRadius: "0",
                }}
                className="form-control me-2"
                type="search"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  document.getElementById("searchEngineBox").style.display =
                    "block";
                }}
                value={searchTerm}
                placeholder="Search subject name..."
                aria-label="Search"
              />
              <button
                onClick={handleSearch}
                className="btn btn-outline-success searchBar_btn"
                style={{
                  backgroundColor: "rgb(41 98 184)",
                  color: "white",
                  border: "1px solid transparent",
                }}
                type="submit"
              >
                Search
              </button>
            </form>
            {/* search engine code */}
            <div id="searchEngineBox">
              <div className="innerSearchDiv">
                {ChaperListJSON.filter((item) => {
                  if (searchTerm === "") {
                    return null;
                  } else if (
                    item.chapterName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return item;
                  }
                }).map((item, index) => {
                  if (index < 5) {
                    return (
                      <div
                        className="searchItems"
                        key={index}
                        id={`searchItem${index}`}
                      >
                        <input
                          type="text"
                          value={item.chapterName}
                          onClick={handleSearchItem}
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            {/* dropdowns */}
            <div className="dropdown_menu row">
              <div className="dropdown col-md-3 col-sm-6 col-6 search_dropdown">
                <select
                  name="subject"
                  id="select_sub"
                  className="form-select select_dropdown"
                  aria-label="Default select example"
                >
                  <option value="">Institution</option>
                  <option value="1">Graphic era university</option>
                </select>
              </div>
              <div className="dropdown col-md-3 col-sm-6 col-6 search_dropdown">
                <select
                  name="subject"
                  id="select_sub"
                  className="form-select select_dropdown"
                  aria-label="Default select example"
                >
                  <option value="">Course</option>
                  <option value="1">B.tech c.s.e</option>
                </select>
              </div>
              <div className="dropdown col-md-3 col-sm-6 col-6 search_dropdown">
                <select
                  onChange={handleNotesSearch}
                  name="semester"
                  id="selectSem"
                  className="form-select select_dropdown"
                  aria-label="Default select example"
                >
                  <option value="defaultSem" disabled selected>
                    Semester
                  </option>
                  <option value="1">Semester-1</option>
                  <option value="2">Semester-2</option>
                  <option value="3">Semester-3</option>
                  <option value="4">Semester-4</option>
                  <option value="5">Semester-5</option>
                  <option value="6">Semester-6</option>
                  <option value="7">Semester-7</option>
                  <option value="8">Semester-8</option>
                </select>
              </div>
              <div className="dropdown col-md-3 col-sm-6 col-6 search_dropdown">
                <select
                  onChange={handleFetchedSub}
                  name="subject"
                  id="selectSub"
                  className="form-select select_dropdown"
                  aria-label="Default select example"
                >
                  <option value="" disabled selected>
                    Subject
                  </option>
                  <option
                    disabled
                    style={{ backgroundColor: "gray", color: "white" }}
                  >
                    Professional Core Subjects
                  </option>
                  <option value="1">
                    Fundamentals of computer programming
                  </option>
                  <option value="2">Data Structures</option>
                  <option value="3">Computer Networks</option>
                  <option value="4">Object Oriented Programming</option>
                  <option value="5">Design and Analysis of Algorithms</option>
                  <option value="6">
                    Computer Architecture and Organisation
                  </option>
                  <option value="7">Discrete Mathematics</option>
                  <option value="8">Database Management Systems</option>
                  <option value="9">Operating Systems</option>
                  <option value="10">Software Engineering</option>
                  <option value="11">Theory of Computation</option>
                  <option value="12">
                    Introduction to Communication Systems
                  </option>
                  <option value="13">Multi-device Programming</option>
                  <option value="14">Java Programming</option>
                  <option value="15">Advanced Java Programming</option>
                  <option value="16">CBNST</option>
                  <option value="17">Microprocessor</option>
                  <option
                    disabled
                    style={{ backgroundColor: "gray", color: "white" }}
                  >
                    Professional Elective Subjects
                  </option>
                  <option value="18">Artificial Intelligence</option>
                  <option value="19">Introduction to Internet-Of-Things</option>
                  <option value="20">Machine Learning</option>
                  <option value="21">Cyber Security</option>
                  <option value="22">Compiler Design</option>
                </select>
              </div>
            </div>
            <hr className="my-5" />

            {/* search result container */}
            <div className="row">
              <div
                className="row col-md-10 col-sm-12 col-12 paper_row"
                style={{
                  backgroundColor: "white",
                  borderRadius: "4px",
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                  margin: "0",
                  marginBottom: "1rem",
                }}
              >
                {/* before screen */}
                <div id="beforeScreen">
                  <p className="ms-3">
                    Search by search bar.
                    <p className="mt-2">
                      ----------------or---------------------
                    </p>
                    <p>Select dropdown fields and search.</p>
                  </p>
                </div>

                {/* nothing found */}
                <div id="nothingFound" style={{ display: "none" }}>
                  <p className="ms-3">Nothing Found</p>
                  <p className="ms-3">
                    Try again by selecting different parameters.
                  </p>
                </div>

                {/* data from firebase */}
                <Suspense fallback={<div>Searching...</div>}>
                  {fetchNotes.map((user, index) => {
                    return (
                      <div className="col-md-4 col-sm-6 col-12 search_card_box">
                        <SearchCard
                          num={index + 1}
                          chName={user.chapter}
                          semName={user.semester}
                          subName={user.subject}
                          name={user.name}
                          pdfLink={user.pdfLink}
                          file_name={user.fileName}
                          id={user.id}
                        />
                      </div>
                    );
                  })}
                </Suspense>
              </div>
              {/* RHS Stuff */}
              <div className="col-md-2 col-sm-12 col-12 leftCorner">
                <div className="card ">
                  <div className="card-header rhs_card_header">Highlights</div>
                  <div className="card-body">
                    <blockquote className="mb-0">
                      <p>
                        Right now we have only notes for B.tech c.s.e students.
                      </p>
                      <footer className="blockquote-footer">
                        Expanding phase <cite title="Source Title">Admin</cite>
                      </footer>
                    </blockquote>
                  </div>
                </div>
                <div className="card my-2">
                  <div className="card-header rhs_card_header">Suggestion</div>
                  <div className="card-body">
                    <blockquote className=" mb-0">
                      <p>We will be glad if you have any suggestion for us.</p>
                      <footer className="blockquote-footer">
                        Goto contactAdmin{" "}
                        <cite title="Source Title">Admin</cite>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchNotes;
