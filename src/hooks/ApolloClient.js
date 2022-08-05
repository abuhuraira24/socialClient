import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { createUploadLink } from "apollo-upload-client";

const uploadLink = createUploadLink({
  uri: "https://myserver222.herokuapp.com/",
  "Apollo-Require-Preflight": "true",
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("jwtToken");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
});

export default client;
