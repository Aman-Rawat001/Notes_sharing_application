import React, { useState } from "react";
import "./UploadNotes.css";
import backgroundWall from "../../../images/backgroundWall.png";
import firebase, { storage, analytics } from "../../../firebase";
import emailjs from "emailjs-com";
import apiKeys from "../SendEmail/apiKey.js";

const UploadNotes = () => {
  const db = firebase.firestore();
  const [progressBar, setProgressBar] = useState("0");
  const [PDF, setPDF] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  const [uploadDetail, setUploadDetails] = useState({
    name: "",
    email: "",
    chapter: "",
  });

  let name, value;
  const handleUpload = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUploadDetails({ ...uploadDetail, [name]: value });
  };
  const handleSubject = () => {
    const e = document.getElementById("select_sub");
    var selectedSub = e.options[e.selectedIndex].text;
    setSelectedSubject(selectedSub);
  };
  const handleSemester = () => {
    const val = document.getElementById("select_sem");
    var selectedSem = val.options[val.selectedIndex].text;
    setSelectedSemester(selectedSem);
  };

  const UploadPDF = (e) => {
    e.preventDefault();
    if (
      !uploadDetail.name ||
      !uploadDetail.email ||
      !uploadDetail.chapter ||
      !selectedSemester ||
      !selectedSubject
    ) {
      alert("Please fill all the fields");

      analytics.logEvent("Unsuccessfull_uploads");
    } else {
      if (PDF === null) {
        alert("Please select your notes.");

        // return;
      }
      if (PDF !== null) {
        // checking size validation.
        const oFile = document.getElementById("exampleFormControlFile1")
          .files[0];
        if (oFile.size > 7340032) {
          // console.log("more than 7mb")
          document.getElementById("fileMoreThan7MB").style.display = "block";
        } else {
          document.getElementById("fileMoreThan7MB").style.display = "none";
          document.getElementById("uploadingBar").style.display = "block";
          // store file in storage.
          storage
            .ref(`/images/${PDF.name}`)
            .put(PDF)
            .on("state_changed", (snapshot) => {
              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgressBar(progress);
              // console.log(progress);
              if (progress === 100) {
                analytics.logEvent("Successfull_uploads");
                setTimeout(() => {
                  sendDataInDB();
                }, 2000);
              }
            });
        }
      }
    }
    const sendDataInDB = () => {
      // Getting Download Link

      storage
        .ref("images")
        .child(PDF.name)
        .getDownloadURL()
        .then((url) => {
          // console.log("file url: " + url);
          // getting file name.
          var httpsReference = storage.refFromURL(url);
          console.log("file name: " + httpsReference.name);

          db.collection("Notes_Data")
            .add({
              name: uploadDetail.name,
              email: uploadDetail.email,
              chapter: uploadDetail.chapter,
              subject: selectedSubject,
              semester: selectedSemester,
              file_name: httpsReference.name,
              pdfLink: url,
            })
            .then(() => {
              alert("File has been successfully uploaded");
              document.getElementById("uploadingBar").style.display = "none";
              // sending email through emailjs.
              emailjs
                .sendForm(
                  apiKeys.SERVICE_ID,
                  apiKeys.TEMPLATE_ID_UPLOAD,
                  e.target,
                  apiKeys.USER_ID
                )
                .then((result) => {
                  console.log(result.text);
                })
                .catch((err) => {
                  console.log(err.text);
                });
              // clear inputs
              setUploadDetails({
                name: "",
                email: "",
                chapter: "",
              });
              setProgressBar("0");
              document.getElementById("select_sem").selectedIndex = "0";
              document.getElementById("select_sub").selectedIndex = "0";
              // let input = document.querySelector('input[type="file"]');
              // input.outerHTML = input.outerHTML;
              window.location.reload();
            })
            .catch((err) => {
              console.log(err);
            });
        });
    };
  };

  return (
    <>
      <div className="container-fluid uploadNotesBG">
        <img className="bgImg" src={backgroundWall} alt="bgimage" />
        <div className="container form_box layer">
          <div className="content1">
            <h3>Upload Notes</h3>
            <p>
              Please fill all the information carefully so that we can give you
              your credit.
            </p>
            <p style={{ color: "green" }}>File should be less than 7MB</p>
          </div>
          <form onSubmit={UploadPDF}>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Your Name</label>
              <div className="col-sm-10">
                <input
                  name="name"
                  value={uploadDetail.name}
                  onChange={handleUpload}
                  type="text"
                  className="form-control"
                  placeholder="Your Name"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Your Email</label>
              <div className="col-sm-10">
                <input
                  name="email"
                  value={uploadDetail.email}
                  onChange={handleUpload}
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Chapter Name</label>
              <div className="col-sm-10">
                <input
                  name="chapter"
                  value={uploadDetail.chapter}
                  onChange={handleUpload}
                  type="text"
                  className="form-control"
                  placeholder="Chapter Name"
                />
              </div>
            </div>
            <div className="form-group row">
              {/* <label>Select Fields</label> */}
              <div className="dropdownTwo">
                <div className="dropdown_menu my-2 ">
                  <label>Select SUB</label>
                  <select
                    required
                    onChange={handleSubject}
                    name="subject"
                    id="select_sub"
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option>Select Subject</option>
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
                    <option value="19">
                      Introduction to Internet-Of-Things
                    </option>
                    <option value="20">Machine Learning</option>
                    <option value="21">Cyber Security</option>
                    <option value="22">Compiler Design</option>
                  </select>
                </div>
                <div className="dropdown_menu my-2 mt-3 ">
                  <label>Select SEM</label>
                  <select
                    required
                    onChange={handleSemester}
                    name="semester"
                    id="select_sem"
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option>Select Semester</option>
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
              </div>
            </div>
            <div className="form-group mt-2">
              <label className="me-2">Upload Note/file</label>
              <input
                id="uploadFileInput"
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  setPDF(e.target.files[0]);
                }}
                className="form-control-file chooseFileInput"
                id="exampleFormControlFile1"
              />
            </div>
            <hr
              className="w-80 mx-auto"
              style={{ color: "white", opacity: "1" }}
            />
            <button className="btn btn-outline-success upload_notes_btn mt-3">
              Upload Notes
            </button>
            {/* morethan 7mb file div popup */}
            <div
              style={{ display: "none" }}
              className="text-center"
              id="fileMoreThan7MB"
            >
              <p style={{ color: "red" }}>Oops! Your file is more than 7MB.</p>
              <p>
                <a
                  href="https://pdfcompressor.com/"
                  target="_blank"
                  rel="norefferer"
                >
                  Compress File Now
                </a>
              </p>
            </div>
            {/* uploading percentage */}
            <div
              style={{ display: "none" }}
              className="text-center"
              id="uploadingBar"
            >
              Uploading: {parseInt(progressBar)}%
            </div>

            {/* progressbar */}
            <progress
              className="uploadProgress"
              value={progressBar}
              max="100"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadNotes;
