import { ApolloError } from "@apollo/client";
import { get } from "lodash";

export const mapFieldErrorsApollo = (error: ApolloError, fields: string[]) => {
  const message: string | string[] =
    get(error, "graphQLErrors.0.extensions.originalError.message") || [];

  console.log("-------------", message);

  if (typeof message == "string")
    return {
      common: message,
    };

  const errorObj = message.reduce((acc, m) => {
    const field = fields.find((f) => m.includes(f));
    return {
      ...acc,
      ...(acc[field] ? { [field]: acc[field] + " - " + m } : { [field]: m }),
    };
  }, {});
  return errorObj;
};
