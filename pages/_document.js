import Document, { Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <html className="govuk-template js-enabled">
        <Head />
        <body className="govuk-template__body">
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
