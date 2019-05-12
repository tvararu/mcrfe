import GovukMain from "../../components/GovukMain";
import GovukBreadcrumbs from "../../components/GovukBreadcrumbs";

const OrganisationsPage = ({ providerCode }) => (
  <>
    <GovukBreadcrumbs
      crumbs={[
        { href: "/", text: "Organisations" },
        { href: null, text: "2Schools Consortium" }
      ]}
    />
    <GovukMain>
      <h1 className="govuk-heading-xl">Organisations</h1>
      My blog post: {providerCode}
    </GovukMain>
  </>
);

OrganisationsPage.getInitialProps = ({ query: { providerCode } }) => ({
  providerCode
});

export default OrganisationsPage;
