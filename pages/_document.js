import Document, { Head, Main, NextScript } from "next/document";

const authValid = headers =>
  (headers["Authorization"] || headers["authorization"]) ===
  `Basic ${process.env.AUTH}`;

const accessDenied = res => {
  res.writeHead(401, { "WWW-Authenticate": 'Basic realm="Access to mcrfe"' });
  res.end(JSON.stringify({ error: "Access denied" }));
  return {};
};

const Script = ({ children }) => (
  <script dangerouslySetInnerHTML={{ __html: `(${children.toString()})();` }} />
);

const addJsEnabled = () => {
  document.body.classList.add("js-enabled");
};

const govukInit = () => {
  GOVUKFrontend.initAll();
};

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    if (!authValid(ctx.req.headers)) return accessDenied(ctx.res);

    const cookie = ctx.req.headers["cookie"];
    const spaMode = cookie && cookie.includes("spaMode=true");

    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, spaMode };
  }

  render() {
    const { spaMode } = this.props;
    return (
      <html className="govuk-template">
        <Head />
        <body className="govuk-template__body">
          <Script>{addJsEnabled}</Script>
          <Main />

          {spaMode ? (
            <NextScript />
          ) : (
            <>
              <script src="/static/govuk-frontend/scripts/all.js" />
              <Script>{govukInit}</Script>
            </>
          )}
        </body>
      </html>
    );
  }
}

export default MyDocument;
