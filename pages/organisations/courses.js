const CoursesPage = ({ providerCode }) => <h1>providerCode {providerCode}</h1>;

CoursesPage.getInitialProps = ({ query: { providerCode } }) => ({
  providerCode
});

export default CoursesPage;
