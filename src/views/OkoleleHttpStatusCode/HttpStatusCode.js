/*eslint-disable*/
import React, { useEffect } from "react";

// Importing toastify module
import { toast } from "react-toastify";
// Import toastify css file
import "react-toastify/dist/ReactToastify.css";
// toast-configuration method,
// it is compulsory method.
toast.configure();

export default function HttpStatusCode(props) {
  console.log("HttpStatusCode method called with code: ", props.responseCode);
  useEffect(() => {
    if (props.responseCode === 200) {
      toast.success(
        "Successful!",
        { position: toast.POSITION.TOP_CENTER },
        { autoClose: 1000 }
      );
    } else if (props.responseCode === 201) {
      toast.success(
        "Data Saved Successfully!",
        { position: toast.POSITION.TOP_CENTER },
        { autoClose: 1000 }
      );
    } else if (props.responseCode === 400) {
      toast.error(
        "Invalid Request!",
        { position: toast.POSITION.TOP_CENTER },
        { autoClose: 2000 }
      );
    } else if (props.responseCode === 401) {
      toast.error(
        "Unauthorization Detected! Please contact Super Admin.",
        { position: toast.POSITION.TOP_CENTER },
        { autoClose: 2000 }
      );
    } else if (props.responseCode === 409) {
      toast.error(
        "Data already exist! Please try something different.",
        { position: toast.POSITION.TOP_CENTER },
        { autoClose: 2000 }
      );
    }
  }, []);

  return <></>;
}
