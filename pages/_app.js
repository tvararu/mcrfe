import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";
import GovukFooter from "../components/govuk/Footer";
import GovukHeader from "../components/govuk/Header";
import GovukPhaseBanner from "../components/govuk/PhaseBanner";
import GovukSkipLink from "../components/govuk/SkipLink";
import withApolloClient from "../lib/with-apollo-client";
import "../lib/govuk-frontend.scss";

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <GovukSkipLink />
        <GovukHeader />
        <div className="govuk-width-container">
          <GovukPhaseBanner />
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </div>
        <GovukFooter />
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
