import React from "react";
import LibraryList from "../components/LibraryList";

import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";

function Homepage() {
  const { data } = useQuery(QUERY_USERS);
  const users = data?.users || [];

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
            <LibraryList users={users} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
