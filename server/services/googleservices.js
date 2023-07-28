const axios = require("axios");
const qs = require("qs");
const log = require("loglevel");

async function getGoogleOAuthTokens(code) {
  const url = "https://oauth2.googleapis.com/token";

  const values = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_OATH_REDIRECT_URL,
    grant_type: "authorization_code",
  };

  try {
    const res = await axios.post(
      url,
      qs.stringify(values),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    return res.data;
  } catch (error) {
    console.error(error.response.data.error);
    log.error(error, "Failed to fetch Google Oauth Tokens");
    throw new Error(error.message);
  }
}

async function getGoogleUser(id_token, access_token) {
  const url = "https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=" + access_token + "&id_token=" + id_token;

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${id_token}`,
      }
    })
    return res.data;
  }
  catch (error) {
    console.error(error.response.data.error);
    log.error(error, "Failed to fetch Google User");
    throw new Error(error.message);
  }
}

module.exports = { getGoogleOAuthTokens, getGoogleUser };