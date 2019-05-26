import { Query } from "react-apollo";
import Loading from "./Loading";

export default ({ query, variables, children }) => (
  <Query query={query} variables={variables}>
    {({ loading, error, data }) => {
      if (error) return <pre>Error: {JSON.stringify(error, null, 2)}</pre>;
      if (loading) return <Loading />;

      return children({ data });
    }}
  </Query>
);
