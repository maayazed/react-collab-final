import React from "react";
import { Link } from "react-router-dom";

import libOne from "../img/LFL1.png";
import libTwo from "../img/LFL2.png";
import libThree from "../img/LFL3.png";

const libbg = [libOne, libTwo, libThree];

const LibraryList = ({ libraries }) => {
  if (!libraries.length) {
    return <h3>No Libraries Yet</h3>;
  }

  const imgStyle = {
    height: "12rem",
  };

  return (
    <div>
      {libraries &&
        libraries.map((library) => (
          <div>
            <img
              src={libbg[Math.floor(Math.random() * libbg.length)]}
              alt="Little Lending Library"
              style={imgStyle}
            />
            <p>
              <Link to={`/library/${library._id}`} className="hovering">
                {library.location}
              </Link>
            </p>
          </div>
        ))}
    </div>
  );
};

export default LibraryList;
