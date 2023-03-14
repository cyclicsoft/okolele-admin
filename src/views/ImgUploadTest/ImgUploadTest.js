import React, { useState, useEffect } from "react";
import axios from "axios";
import Add from "@material-ui/icons/Add";
import GridItem from "components/Grid/GridItem";
import { toast } from "react-toastify";
// Global State
import { useGlobalState } from "state-pool";

const ImgUploadTest = () => {
  // Root Path URL
  const rootPath = useGlobalState("rootPathVariable");
  // accessToken
  const [userToken, setUserToken, updateUserToken] = useGlobalState(
    "accessToken"
  );
  var accessTknValidity = new Date(userToken.tokenValidity);
  var refreshTknValidity = new Date(userToken.refreshTokenValidity);
  const refreshTkn = {
    refreshToken: userToken.refreshToken,
  };
  // API Header
  let config = {
    headers: {
      Authorization: "Bearer " + userToken.token,
    },
  };

  const [files, setFiles] = useState(null);
  const [name, setName] = useState();

  const fileButtonClickHandler = (file, text) => {
    document.getElementById("imgupload").click();
  };
  const setUploadedFile = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      var filesize = (file?.size / 1024 / 1024).toFixed(4); // MB

      fileSetter(file, filesize);
    }

    e.target.value = null;
  };

  const fileSetter = (file, filesize) => {
    if (
      file?.type === "image/jpg" ||
      file?.type === "image/jpeg" ||
      file?.type === "image/png"
    ) {
      if (filesize <= 2) {
        setFiles(file);
      } else {
        toast.warning("Image size limit exceeds");
      }
    } else {
      toast.warning("Invalid format");
    }
  };

  const uploadToDB = () => {
    var currentLocalDateTime = new Date();
    if (accessTknValidity.getTime() > currentLocalDateTime.getTime()) {
      saveNewProd();
    } else {
      // If access token validity expires, call refresh token api
      refreshTokenHandler((isRefreshed) => {
        saveNewProd();
      });
    }
  };

  const prodDetails = {
    embeded: {
      name: name,
      file: files,
    },
  };

  const saveNewProd = () => {
    const createAPI = rootPath[0] + "/file/example";
    axios
      .post(createAPI, prodDetails, config)
      .then(function (response) {
        alert("Success");
      })
      .catch(function (error) {
        alert("Failed");
      });
  };

  const refreshTokenHandler = () => {
    var currentLocalDateTime = new Date();

    if (refreshTknValidity.getTime() > currentLocalDateTime.getTime()) {
      const refreshTokenAPI = rootPath[0] + "/auth/token";

      axios
        .post(refreshTokenAPI, refreshTkn)
        .then(function (response) {
          if (response.data.code == 403) {
            alert(response.data.message);
            return false;
            // Logout forcefully from here
          } else {
            updateUserToken(function (accessToken) {
              accessToken.token = response.data.token;
              accessToken.tokenValidity = response.data.tokenValidity;
              accessToken.refreshToken = response.data.refreshToken;
              accessToken.refreshTokenValidity =
                response.data.refreshTokenValidity;
            });
            return true;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      // Logout forcefully from here
      try {
        localStorage.clear();
        window.location.href = "/";
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  return (
    <div>
      <GridItem xs={12} sm={12} md={12} lg={4} xl={4}>
        <input
          type="text"
          value={name}
          placeholder="product name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="file"
          id="imgupload"
          style={{ display: "none" }}
          accept=".jpg,.jpeg,.png"
          onChange={(e) => setUploadedFile(e)}
        />
        <button onClick={(file, text) => fileButtonClickHandler(file, text)}>
          <Add /> Add
        </button>
      </GridItem>

      <button onClick={uploadToDB}>Upload to DB</button>

      {/* {files.map((igmFile, index) => (
        <GridItem xs={12} sm={12} md={12} lg={4} xl={4} key={index}>
          <img
            style={{ height: "100px", width: "100px" }}
            src={URL.createObjectURL(igmFile)}
            alt="img"
          />
        </GridItem>
      ))} */}

      {files && (
        <GridItem xs={12} sm={12} md={12} lg={4} xl={4}>
          <img
            style={{ height: "100px", width: "100px" }}
            src={URL.createObjectURL(files)}
            alt="img"
          />
        </GridItem>
      )}
    </div>
  );
};

export default ImgUploadTest;
