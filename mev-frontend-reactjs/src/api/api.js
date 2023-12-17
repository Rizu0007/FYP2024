import { request } from "./api.handler";

//export const base_url = "http://localhost:8000/api/";
export const base_url = "https://api.aiweb3labs.com/api/";

export const API = {
  generateNonce: (body) => request.post(base_url + "users/get-nonce", body),
  signSingature: (body) => request.post(base_url + "users/sign-user", body),
  updateUserBalance: (body) =>
    request.post(base_url + "users/update-user-balance", body),
  getUserFreeTimer: () =>
    request.post(base_url + "users/get-user-freetier-time"),
  getUserBalance: (body) =>
    request.post(base_url + "users/get-user-balance", body),
  getUserActivity: (body) => request.post(base_url + "activity/get-user-activity", body),
  getUserBotActivity: (body) =>
    request.post(base_url + "bot-activity/get-user-bot-activity", body),
  createActivity: (body) =>
    request.post(base_url + "activity/generate-activity", body),
  stopBot: (body) => request.post(base_url + "bot-session/stop-bot", body),
  startbot: (body) => request.post(base_url + "bot-session/start-bot", body),
  buyLicense: (body) =>
    request.post(base_url + "license/generate-license", body),
  userBotLicenseStatus: () => request.get(base_url + "users/get-bot-status"),
  userWithDrawMoney: (body) =>
    request.post(base_url + "users/withdraw-balance", body),
  userBotSession: () => request.get(base_url + "users/user-bot-session"),
  userBotLicense: () => request.get(base_url + "users/user-license-status"),
};
