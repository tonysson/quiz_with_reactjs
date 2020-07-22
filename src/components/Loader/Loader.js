import React from "react";

const Loader = () => {
    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-danger" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            
        </>
    );
}

export default Loader;