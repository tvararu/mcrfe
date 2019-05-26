import { useState, useEffect } from "react";

export default () => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const $interval = setInterval(() => {
      setDots((dots + 1) % 4);
    }, 300);

    return () => {
      clearTimeout($interval);
    };
  }, [dots]);

  return (
    <p className="govuk-body">
      Loading
      {Array(dots)
        .fill(".")
        .join("")}
    </p>
  );
};
