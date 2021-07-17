import React from "react";
import "./SearchCard.css";
import img from "../../../../images/notesImage.png";
import { NavLink } from "react-router-dom";
const SearchCard = (props) => {
  return (
    <>
      <div className="searchCard my-2">
        <div className="card" style={{ maxWidth: "100%" }}>
          <p className="noteNum">Note no: {props.num}</p>
          <img
            className="notes_image"
            id="noteImg"
            src={img}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <hr />
            <div
              className="card_content px-2 py-1"
              style={{ backgroundColor: "rgb(218 229 246)" }}
            >
              {" "}
              <p className="ch_name">{props.chName}</p>
              <p className="course">B.Tech cse {props.semName} . 2021</p>
              {/* <p>fileName: {props.file_name}</p> */}
              <p>
                <span style={{ fontWeight: "500" }}>Subject:</span>{" "}
                {props.subName}
              </p>
              <p className="credit">
                Uploded by: <span>{props.name}</span>
              </p>
            </div>
            <NavLink to={`/search_notes/${props.id}`}>
              <button className="accessBtn btn btn-success">Access Note</button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchCard;
