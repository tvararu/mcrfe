import renderer from "react-test-renderer";
import GovukFooter from "./GovukFooter";

describe("GovukFooter", () => {
  it("renders correctly", () => {
    const component = renderer.create(<GovukFooter />);
    const tree = component.toJSON();

    expect(tree).toMatchInlineSnapshot(`
      <footer
        className="govuk-footer"
        role="contentinfo"
      >
        <div
          className="govuk-width-container"
        >
          <div
            className="govuk-grid-row"
          >
            <div
              className="govuk-grid-column-two-thirds govuk-footer__content-container"
            >
              <p
                className="govuk-footer__content"
              >
                <a
                  className="govuk-footer__link"
                  href="mailto:becomingateacher@digital.education.gov.uk?subject=Publish%20teacher%20training%20courses%20support"
                >
                  Contact the Becoming a Teacher team
                </a>
                 
                for support.
              </p>
            </div>
          </div>
          <div
            className="govuk-footer__meta"
          >
            <div
              className="govuk-footer__meta-item govuk-footer__meta-item--grow"
            >
              <h2
                className="govuk-visually-hidden"
              >
                Support links
              </h2>
              <ul
                className="govuk-footer__inline-list govuk-!-margin-bottom-0"
              >
                <li
                  className="govuk-footer__inline-list-item"
                >
                  <a
                    className="govuk-footer__link"
                    href="mailto:becomingateacher@digital.education.gov.uk?subject=Publish%20teacher%20training%20courses%20feedback"
                  >
                    Give feedback
                  </a>
                </li>
                <li
                  className="govuk-footer__inline-list-item"
                >
                  <a
                    className="govuk-footer__link"
                    href="/guidance"
                  >
                    Publishing guidance
                  </a>
                </li>
                <li
                  className="govuk-footer__inline-list-item"
                >
                  <a
                    className="govuk-footer__link"
                    href="/cookies"
                  >
                    Cookies
                  </a>
                </li>
                <li
                  className="govuk-footer__inline-list-item"
                >
                  <a
                    className="govuk-footer__link"
                    href="/privacy-policy"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li
                  className="govuk-footer__inline-list-item"
                >
                  <a
                    className="govuk-footer__link"
                    href="/terms-conditions"
                  >
                    Terms and conditions
                  </a>
                </li>
              </ul>
            </div>
            <div
              className="govuk-footer__meta-item"
            >
              <a
                className="govuk-footer__link govuk-footer__copyright-logo"
                href="https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/"
              >
                © Crown copyright
              </a>
            </div>
          </div>
        </div>
      </footer>
    `);
  });
});
