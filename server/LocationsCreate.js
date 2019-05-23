const gql = require("graphql-tag");
const { promisify } = require("util");
const querystringParse = require("querystring").parse;
const initApollo = require("../lib/init-apollo").default;

const providerQuery = gql`
  query allProviders($providerCode: String!) {
    allProviders(condition: { providerCode: $providerCode }) {
      nodes {
        id
        sitesByProviderId {
          nodes {
            code
          }
        }
      }
    }
  }
`;

const createSiteMutation = gql`
  mutation createSite(
    $address1: String!
    $address2: String
    $address3: String!
    $address4: String
    $code: String!
    $location_name: String!
    $postcode: String!
    $providerId: Int!
    $region_code: Int!
    $createdAt: Datetime!
    $updatedAt: Datetime!
  ) {
    createSite(
      input: {
        site: {
          address1: $address1
          address2: $address2
          address3: $address3
          address4: $address4
          code: $code
          locationName: $location_name
          postcode: $postcode
          providerId: $providerId
          regionCode: $region_code
          createdAt: $createdAt
          updatedAt: $updatedAt
        }
      }
    ) {
      site {
        id
      }
    }
  }
`;

const formBody = promisify((req, cb) => {
  const body = [];
  req
    .on("data", chunk => body.push(chunk))
    .on("end", () => {
      cb(null, querystringParse(Buffer.concat(body).toString()));
    });
});

module.exports = async (req, res) => {
  const client = initApollo();
  try {
    const providerCode = "2AT";

    const queryResult = await client.query({
      query: providerQuery,
      variables: { providerCode }
    });
    const provider = queryResult.data.allProviders.nodes[0];
    const providerId = provider.id;
    const usedCodes = provider.sitesByProviderId.nodes
      .map(({ code }) => code)
      .join("");
    const alphabet = Array(26)
      .fill(0)
      .map((_, idx) => String.fromCharCode(idx + 65));

    const unusedCodes = alphabet.filter(letter => !usedCodes.includes(letter));

    const code = unusedCodes.shift();
    const now = new Date();

    const formContent = await formBody(req);
    formContent.region_code = parseInt(formContent.region_code, 10);

    const variables = {
      ...formContent,
      code,
      providerId,
      createdAt: now,
      updatedAt: now
    };
    const mutationResult = await client.mutate({
      mutation: createSiteMutation,
      variables
    });

    res.writeHead(301, { Location: req.headers.referer.replace("/new", "") });
    res.end();
  } catch (error) {
    console.error(error);
    res.end(error);
  }
};
