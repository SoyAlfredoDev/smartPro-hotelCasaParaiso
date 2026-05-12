import {
  WebpayPlus,
  Options,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  Environment,
} from "transbank-sdk";

const apiKey =
  process.env.NODE_ENV === "production"
    ? process.env.TBE_API_KEY
    : IntegrationCommerceCodes.WEBPAY_PLUS;

const commerceCode =
  process.env.NODE_ENV === "production"
    ? process.env.TBE_COMMERCE_CODE
    : IntegrationCommerceCodes.WEBPAY_PLUS;

const environment =
  process.env.NODE_ENV === "production"
    ? Environment.Production
    : Environment.Integration;

const options = new Options(apiKey, IntegrationApiKeys.WEBPAY, environment);

export default new WebpayPlus.Transaction(options);
