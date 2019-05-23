import { useState, useEffect } from "react";

const spaToggleHref = spaMode =>
  `javascript:document.cookie="spaMode=${
    spaMode ? "false" : "true"
  }";location.reload();`;

export default () => {
  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    setRendered(true);
  }, []);
  return (
    <div className="govuk-phase-banner">
      <p className="govuk-phase-banner__content">
        <strong className="govuk-tag govuk-phase-banner__content__tag ">
          Prototype
        </strong>
        <span className="govuk-phase-banner__text">
          This is a prototype.{" "}
          <a className="govuk-link" href={spaToggleHref(rendered)}>
            Switch {rendered ? "off" : "on"} experimental single-page mode.
          </a>
        </span>
      </p>
    </div>
  );
};
