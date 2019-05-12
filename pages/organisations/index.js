const OrganisationsPage = ({ providerCode }) => (
  <h1>My blog post: {providerCode}</h1>
);

OrganisationsPage.getInitialProps = ({ query: { providerCode } }) => ({
  providerCode
});

export default OrganisationsPage;
