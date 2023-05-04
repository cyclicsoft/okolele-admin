import { RefreshTokenGenerator } from "./RefreshTokenGenerator.js";

// universal-cookie
import Cookies from "universal-cookie";
// get Token
export function getToken(callback) {
  // universal-cookie
  const cookies = new Cookies();

  const userToken = cookies.get("ACCESS_TOKEN");
  // console.log("%cgetToken.js line:12 tkn", "color: #007acc;", userToken);

  // token
  let token;
  // tokenValidity
  let tokenTime;

  if (userToken) {
    // token
    token = userToken.token;
    // tokenValidity
    tokenTime = new Date(userToken.tokenValidity);
  }

  // current time
  var now = new Date();

  if (!userToken) {
    window.location.href = "/user-login";
  } else {
    if (tokenTime.getTime() > now.getTime()) {
      callback(token);
    } else {
      RefreshTokenGenerator((newToken) => {
        if (newToken !== null && newToken.length > 0) {
          token = newToken;
          callback(token);
        }
      });
    }
  }
}
