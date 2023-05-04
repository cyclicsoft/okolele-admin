import { getToken } from "services/token/getToken";

export function apiHeader(callback) {
  let config;

  getToken((token) => {
    console.log("%capi-header.js line:8 token", "color: #007acc;", token);
    config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    callback(config);
  });
}
