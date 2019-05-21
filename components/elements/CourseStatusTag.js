const enrichmentHasUnpublishedChanges = enrichment => {
  return (
    enrichment &&
    enrichment.status === 0 &&
    enrichment.lastPublishedTimestampUtc
  );
};

const enrichmentContentStatusContent = enrichment => {
  if (!enrichment) return "Empty";
  if (enrichment.status === 1) return "Published";
  if (enrichmentHasUnpublishedChanges(enrichment)) return <>Published&nbsp;*</>;
  return "Draft";
};

const enrichmentContentStatusCss = enrichment => {
  if (!enrichment) return "empty";
  if (enrichment.status === 1 || enrichment.lastPublishedTimestampUtc)
    return "published";
  return "draft";
};

export default ({ enrichment }) => (
  <>
    <style jsx>{`
      .div {
        padding: 4px 8px 1px;
      }

      .empty {
        background: #ffffff;
        color: #6f777b;
        border: 2px solid #899094;
        margin-top: -1px;
        margin-bottom: -1px;
      }

      .draft {
        background: #f47738;
      }

      .published {
        background: #00823b;
      }
    `}</style>
    <div
      className={`govuk-tag tag--small ${enrichmentContentStatusCss(
        enrichment
      )}`}
    >
      {enrichmentContentStatusContent(enrichment)}
    </div>
    {enrichmentHasUnpublishedChanges(enrichment) && (
      <div className="govuk-body govuk-body-s govuk-!-margin-bottom-0 govuk-!-margin-top-1">
        *&nbsp;Unpublished&nbsp;changes
      </div>
    )}
  </>
);
