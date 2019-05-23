import LocationsNew from "../../../components/pages/LocationsNew";

LocationsNew.getInitialProps = ({ query: { providerCode } }) => ({
  providerCode
});

export default LocationsNew;
