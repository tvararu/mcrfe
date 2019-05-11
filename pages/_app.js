import App, { Container } from "next/app";
import { ApolloProvider } from "react-apollo";
import GovukFooter from "../components/GovukFooter";
import GovukHeader from "../components/GovukHeader";
import GovukPhaseBanner from "../components/GovukPhaseBanner";
import GovukSkipLink from "../components/GovukSkipLink";
import withApolloClient from "../lib/with-apollo-client";
import "../lib/main.scss";

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <GovukSkipLink />
        <GovukHeader />
        <div className="govuk-width-container">
          <GovukPhaseBanner />
          <main className="govuk-main-wrapper" id="main-content" role="main">
            <ApolloProvider client={apolloClient}>
              <Component {...pageProps} />
            </ApolloProvider>
          </main>
        </div>
        <GovukFooter />
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
