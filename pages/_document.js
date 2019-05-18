import Document, { Head, Main, NextScript } from "next/document";

const authValid = headers =>
  (headers["Authorization"] || headers["authorization"]) ===
  `Basic ${process.env.AUTH}`;

const accessDenied = res => {
  res.writeHead(401, { "WWW-Authenticate": 'Basic realm="Access to mcrfe"' });
  res.end(JSON.stringify({ error: "Access denied" }));
  return {};
};

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    if (!authValid(ctx.req.headers)) return accessDenied(ctx.res);

    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

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
