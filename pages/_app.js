import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";
import GovukFooter from "../components/Govuk/Footer";
import GovukHeader from "../components/Govuk/Header";
import GovukPhaseBanner from "../components/Govuk/PhaseBanner";
import GovukSkipLink from "../components/Govuk/SkipLink";
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
