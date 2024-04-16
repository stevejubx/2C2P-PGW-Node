const PGW2C2P = require("./src/lib/PGW2C2P");

const pgw = new PGW2C2P({
  secretKey: "CD229682D3297390B9F66FF4020B758F4A5E625AF4992E5D75D311D6458B38E2",
  merchantID: "JT04",
  environment: "sandbox", // Environment (sandbox/live).
  apiVersion: "4.3", // default to 4.3.
  debug: true, // default to true.
});

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

  const invoice = {
    invoiceNo: "1711215800197",
    locale: "th",
  };

  const paymentToken = await pgw.paymentToken(detail);
  const paymentInquiry = await pgw.paymentInquiry(invoice);

  console.log("======paymentToken=========");
  console.log(paymentToken);
  console.log("===========================");
  console.log("======paymentInquiry=======");
  console.log(paymentInquiry);
  console.log("===========================");
})();
