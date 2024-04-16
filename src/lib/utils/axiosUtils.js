const axios = require("axios");
const jwt = require("jsonwebtoken");

/**
 * @param {string} baseURL - Base URL.
 * @param {string} secretKey - Secret key for JWT signing.
 * @param {string} merchantID - Merchant ID.
 * @param {string} endpoint - API endpoint
 * @param {object} payload - Payload
 * @returns {Promise} - A Promise that resolves with the response data or rejects with an error.
 */

function post(baseURL, secretKey, merchantID, endpoint, payload) {
  return new Promise((resolve, reject) => {
    try {
      payload.merchantID = merchantID;
      const singPayload = jwt.sign(payload, secretKey);
      axios
        .post(`${baseURL}/${endpoint}`, { payload: singPayload })
        .then((response) => {
          resolve(jwt.decode(response.data.payload));
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { post };
