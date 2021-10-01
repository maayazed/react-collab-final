import React from 'react';
import { Link } from "react-router-dom";


const styles = {
    overlayLinks: {
        color: "Brown",
        textDecoration: "none",
    }
    
}

const LibraryList = ({libraries}) => {
    if (!libraries.length) {
        return <h3>No Libraries Yet</h3>
    }

return (
    
    <div>
    {libraries && libraries.map((library)=>(
        <p>
        <Link style = {styles.overlayLinks} to={`/library/${library._id}`}>
            {library.location}
            </Link>
            </p>
    ))}
    </div>
);
};

export default LibraryList;
