import React from "react";
import { render } from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Router from "./router.js";
import './styles.css';

const client = new ApolloClient({
  uri: "https://api-uswest.graphcms.com/v1/cjjyp75qg035v01gmm81qwjhd/master"
});

const App = function App() {
  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  );
};

render(<App />, document.getElementById("app"));
