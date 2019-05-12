import Link from "next/link";

export default ({ crumbs }) => (
  <nav className="govuk-breadcrumbs">
    <ol className="govuk-breadcrumbs__list">
      {crumbs.map(({ as, href, text }) => (
        <li
          key={href}
          className="govuk-breadcrumbs__list-item"
          {...(href ? {} : { "aria-current": "page" })}
        >
          {href ? (
            <Link prefetch as={as} href={href}>
              <a className="govuk-breadcrumbs__link">{text}</a>
            </Link>
          ) : (
            text
          )}
        </li>
      ))}
    </ol>
  </nav>
);
