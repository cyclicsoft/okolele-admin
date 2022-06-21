// import { Router } from 'react-router';
import axios from "axios";
// import { browserHistory } from "react-router-dom";
// import UserLogin from "views/UserManagement/UserLogin";
// Global State
import { store, useGlobalState } from "state-pool";

export function RefreshTokenGenerator(callback) {
  // let userToken = JSON.parse(localStorage.getItem("userToken"));
  // accessToken
  const [userToken, setUserToken, updateUserToken] = useGlobalState(
    "accessToken"
  );
  // console.log("RefreshTokenGenerator/userToken: ", userToken);
  var refreshTokenTime = new Date(userToken.refreshTokenValidity);
  var now = new Date();

  if (refreshTokenTime.getTime() > now.getTime()) {
    const refreshTokenAPI = "http://localhost:8080/auth/token";
    console.log("RefreshTokenGenerator/refreshToken: ", userToken.refreshToken);
    axios
      .post(refreshTokenAPI, {
        refreshToken: userToken.refreshToken,
      })
      .then(function (response) {
        if (response.status == 403) {
          alert(response.data.message);
          // localStorage.setItem("userToken", JSON.stringify(""));
          window.location.href = "/user-login";
        } else {
          // let userToken = {
          //   token: response.data.token,
          //   tokenValidity: response.data.tokenValidity,
          //   refreshToken: response.data.refreshToken,
          //   refreshTokenValidity: response.data.refreshTokenValidity,
          // };
          // localStorage.setItem("userToken", JSON.stringify(userToken));

          // console.log("RefreshTokenGenerator/userToken: ", userToken);F

          console.log("RefreshTokenGenerator/response.data: ", response.data);
          callback(response.data.token);
        }
      })
      .catch(function (error) {
        console.log("RefreshTokenGenerator / error: ", error);
        localStorage.setItem("userToken", JSON.stringify(""));
        window.location.href = "/user-login";
      });
  } else {
    // console.log(
    //   "RefreshTokenGenerator / refreshTokenTime.getTime() < now.getTime()"
    // );
    localStorage.setItem("userToken", JSON.stringify(""));
    window.location.href = "/user-login";
  }
}
