import Head from "next/head";
import gql from "graphql-tag";
import Link from "next/link";
import Query from "../elements/Query";
import GovukMain from "../govuk/Main";
import GovukBreadcrumbs from "../govuk/Breadcrumbs";

const allProvidersQuery = gql`
  query allProviders($providerCode: String!) {
    allProviders(condition: { providerCode: $providerCode }) {
      nodes {
        providerName
      }
    }
  }
`;

const Content = ({ providerCode }) => (
  <div className="govuk-grid-row">
    <div className="govuk-grid-column-two-thirds">
      <h2 className="govuk-heading-m">
        <a
          className="govuk-link"
          href={`/organisations/details?providerCode=${providerCode}`}
        >
          About your organisation
        </a>
      </h2>
      <p className="govuk-body">Use this section to:</p>
      <ul className="govuk-list govuk-list--bullet govuk-!-margin-bottom-8">
        <li>write about your organisation</li>
        <li>set your contact details</li>
        <li>publish this information on all course pages</li>
      </ul>

      <h2 className="govuk-heading-m">
        <Link
          prefetch
          as={`/organisations/${providerCode}/locations`}
          href={`/organisations/locations?providerCode=${providerCode}`}
        >
          <a className="govuk-link">Locations</a>
        </Link>
      </h2>
      <p className="govuk-body">Use this section to:</p>
      <ul className="govuk-list govuk-list--bullet govuk-!-margin-bottom-8">
        <li>edit location names and addresses</li>
        <li>add locations</li>
      </ul>

      <h2 className="govuk-heading-m">
        <Link
          prefetch
          as={`/organisations/${providerCode}/courses`}
          href={`/organisations/courses?providerCode=${providerCode}`}
        >
          <a className="govuk-link">Courses</a>
        </Link>
      </h2>
      <p className="govuk-body">Use this section to:</p>
      <ul className="govuk-list govuk-list--bullet govuk-!-margin-bottom-8">
        <li>write about each course</li>
        <li>preview and publish courses</li>
        <li>copy content between courses</li>
      </ul>

      <h2 className="govuk-heading-m">
        <a
          className="govuk-link"
          href={`/organisations/request-access?providerCode=${providerCode}`}
        >
          Request access for someone else
        </a>
      </h2>
      <p className="govuk-body govuk-!-margin-bottom-8">
        You can request a DfE Sign-in account for others who manage your
        courses.
      </p>
    </div>
    <div className="govuk-grid-column-one-third">
      <style jsx>{`
        .related {
          border-top: 5px solid #005ea5;
          background-color: #f8f8f8;
          padding: 20px;
        }
      `}</style>
      <div className="related">
        <h2 className="govuk-heading-m">Support and guidance</h2>
        <p className="govuk-body govuk-!-margin-bottom-0">
          If you have a question, or you’ve had a problem using Publish, you can{" "}
          <a
            className="govuk-link"
            href="mailto:becomingateacher@digital.education.gov.uk?subject=Support%20and%20guidance"
          >
            email the Becoming a Teacher team
          </a>
          .
        </p>
      </div>
    </div>
  </div>
);

export default ({ providerCode }) => (
  <Query query={allProvidersQuery} variables={{ providerCode }}>
    {({ data }) => {
      const { providerName } = data.allProviders.nodes[0];
      return (
        <>
          <GovukBreadcrumbs
            crumbs={[
              { href: "/", text: "Organisations" },
              { href: null, text: providerName }
            ]}
          />
          <GovukMain>
            <Head>
              <title>
                {providerName} - Publish teacher training courses - GOV.UK
              </title>
            </Head>
            <h1 className="govuk-heading-xl">{providerName}</h1>
            <Content providerCode={providerCode} />
          </GovukMain>
        </>
      );
    }}
  </Query>
);
