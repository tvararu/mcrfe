import LocationsIndex from "../../../components/pages/LocationsIndex";

LocationsIndex.getInitialProps = ({ query: { providerCode } }) => ({
  providerCode
});

export default LocationsIndex;
