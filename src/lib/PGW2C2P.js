const axios = require("axios");
const setupLogger = require("./utils/logger");
const request = require("./utils/axiosUtils");

/**
 * @constructor
 * @param {object} secretKey - Secret key for JWT signing.
 * @param {string} merchantID - Merchant ID.
 * @param {string} environment - Environment (sandbox/live).
 * @param {string} apiVersion - API version.
 * @param {boolean} debug - Enable debug mode for log.
 */
class PGW2C2P {
  constructor(config) {
    if (!config || typeof config !== "object") {
      throw new Error("Config object is required");
    }

    if (!config.secretKey) {
      throw new Error("Secret Key key is required");
    }

    if (!config.merchantID) {
      throw new Error("Merchant ID is required");
    }

    this.secretKey = config.secretKey;
    this.merchantID = config.merchantID;
    this.environment = config.environment || "sandbox";
    this.apiVersion = config.apiVersion || "v4.3";
    this.debug = config.debug || "true";
    this.baseURL = this.getBaseURL();
    this.logger = setupLogger(this.debug);

    axios.interceptors.request.use(
      (request) => {
        this.logger.info("Request:", {
          method: request.method,
          url: request.url,
          headers: request.headers,
          data: request.data,
        });
        return request;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => {
        this.logger.info("Response:", {
          status: response.status,
          headers: response.headers,
          data: response.data,
        });
        return response;
      },
      (error) => {
        this.logger.error("Response Error:", error);
        return Promise.reject(error);
      }
    );
  }

  getBaseURL() {
    switch (this.environment) {
      case "live":
        return `https://pgw.2c2p.com/payment/${this.apiVersion}`;
      case "sandbox":
        return `https://sandbox-pgw.2c2p.com/payment/${this.apiVersion}`;
      default:
        throw new Error("Invalid environment");
    }
  }

  // https://developer.2c2p.com/docs/api-payment-token-request-parameter
  async paymentToken(body) {
    try {
      const data = await request.post(
        this.baseURL,
        this.secretKey,
        this.merchantID,
        "PaymentToken",
        body
      );
      return data;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async paymentInquiry(invoice) {
    try {
      const data = await request.post(
        this.baseURL,
        this.secretKey,
        this.merchantID,
        "paymentInquiry",
        invoice
      );
      return data;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}

module.exports = PGW2C2P;
