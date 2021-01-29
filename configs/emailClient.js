const SibApiV3Sdk = require('sib-api-v3-sdk');

// email client settings
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

const partnerKey = defaultClient.authentications['partner-key'];
partnerKey.apiKey = process.env.SENDINBLUE_API_KEY;
exports.apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
exports.sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
