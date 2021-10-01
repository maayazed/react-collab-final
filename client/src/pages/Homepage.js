import React from "react";

function Homepage() {

  const homeStyle = {
    fontSize: "1.2rem",
  };

  return (
    <div className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto ">
          <p style={homeStyle}>
            Welcome to our online library database. Sign in to your account to
            see what books are available. You can take a book to read, or add
            one of your own.
          </p>
          <div>
            {/*Could add something else here for when the libraries are loading if we want.*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
