import OrganisationsShow from "../../components/pages/OrganisationsShow";

OrganisationsShow.getInitialProps = ({ query: { providerCode } }) => ({
  providerCode
});

export default OrganisationsShow;
