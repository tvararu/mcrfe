const PhaseBanner = () => (
  <div className="govuk-phase-banner">
    <p className="govuk-phase-banner__content">
      <strong className="govuk-tag govuk-phase-banner__content__tag ">
        BETA
      </strong>
      <span className="govuk-phase-banner__text">
        This is a new service – your{" "}
        <a
          className="govuk-link"
          href="mailto:becomingateacher@digital.education.gov.uk?subject=Publish%20teacher%20training%20courses%20feedback"
        >
          feedback
        </a>{" "}
        will help us to improve it.
      </span>
    </p>
  </div>
);

export default PhaseBanner;