import axios from "axios";
// universal-cookie
import Cookies from "universal-cookie";

export function RefreshTokenGenerator(callback) {
  // universal-cookie
  const cookies = new Cookies();
  // Root Path URL
  const rootPath = process.env.REACT_APP_BASE_URL;

  const userToken = cookies.get("ACCESS_TOKEN");
  // console.log(
  //   "%cRefreshTokenGenerator.js line:12 tkn",
  //   "color: #007acc;",
  //   userToken
  // );

  var refreshTokenTime = new Date(userToken.refreshTokenValidity);
  var now = new Date();

  if (refreshTokenTime.getTime() > now.getTime()) {
    const refreshTokenAPI = rootPath + "/auth/token";
    axios
      .post(refreshTokenAPI, {
        refreshToken: userToken.refreshToken,
      })
      .then(function (response) {
        if (response.status == 403) {
          alert(response.data.message);
          // localStorage.setItem("userToken", JSON.stringify(""));
          cookies.remove("ACCESS_TOKEN", { path: "/" });

          window.location.href = "/user-login";
        } else {
          let userToken = {
            token: response.data.token,
            tokenValidity: response.data.tokenValidity,
            refreshToken: response.data.refreshToken,
            refreshTokenValidity: response.data.refreshTokenValidity,
          };
          cookies.set("ACCESS_TOKEN", JSON.stringify(userToken), { path: "/" });

          callback(response.data.token);
        }
      })
      .catch(function (error) {
        console.log("RefreshTokenGenerator / error: ", error);
        cookies.remove("ACCESS_TOKEN", { path: "/" });

        window.location.href = "/user-login";
      });
  } else {
    cookies.remove("ACCESS_TOKEN", { path: "/" });
    window.location.href = "/user-login";
  }
}
