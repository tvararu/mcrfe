import CoursesIndex from "../../../components/pages/CoursesIndex";

CoursesIndex.getInitialProps = ({ query: { providerCode } }) => ({
  providerCode
});

export default CoursesIndex;
