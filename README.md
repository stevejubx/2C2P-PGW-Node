# 2C2P PGW - Node SDK

[Unofficial] - 2C2P Payment Gateway Node SDK

## Feature

- Create Payment Link
- Payment Inquiry
- Transaction Log

## Usage

### Setup Configuration for My Merchant

```js
const PGW2C2P = require("./src/lib/PGW2C2P");

const pgw = new PGW2C2P({
  secretKey: "DEOVNSPS1KYLIX2J1BC173DRLUIL9O0R",
  merchantID: "764000167",
  environment: "sandbox", // Environment (sandbox/live) default to sandbox.
  apiVersion: "4.3", // default to 4.3.
  debug: false, // default to true.
});
```

### Payment Token (Create Payment Link)

Create Payment Link for my Merchant.

Please ensure that all request parameters are followed according to: https://developer.2c2p.com/docs/api-payment-token-request-parameter

| Parameter         | Description                                                                               |
| ----------------- | ----------------------------------------------------------------------------------------- |
| invoiceNo         | Unique merchant order number.                                                             |
| description       | Payment description.                                                                      |
| amount            | Example: 100.00                                                                           |
| paymentChannel    | Payment Channel ([Reference](https://developer.2c2p.com/docs/reference-payment-channels)) |
| currencyCode      | THB, SDG                                                                                  |
| frontendReturnUrl | Specify the return URL to be redirected to merchant after payment is completed.           |
| backendReturnUrl  | Specify backend URL to be notified after payment is completed.                            |

### Example

```js
(async () => {
  const detail = {
    invoiceNo: Date.now().toString(),
    description: "Coffee",
    amount: 100,
    paymentChannel: ["CC", "PPQR", "LINE", "TRUEMONEY"],
    currencyCode: "THB",
    frontendReturnUrl: "https://example.com/success",
    backendReturnUrl: "https://example.com/notification", // callback payment
  };

  const paymentToken = await pgw.paymentToken(detail);

  console.log(paymentToken);
})();
```

### Payment Inquiry

```js
(async () => {
  const invoice = {
    invoiceNo: "1711215800197",
    locale: "th",
  };

  const paymentInquiry = await pgw.paymentInquiry(invoice);
  console.log(paymentInquiry);
})();
```

## Note

This is an Unofficial SDK. Therefore, if you require more features, please refer to the 2C2P Documents (https://developer.2c2p.com/docs/general).
