import * as React from "react";

/**
 * Custom hook to check if a given media query matches.
 * @param {string} query - CSS media query string (e.g., "(min-width: 768px)")
 * @returns {boolean} - `true` if the media query matches, otherwise `false`
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = React.useState();

  React.useEffect(() => {
    const mql = window.matchMedia(query);

    const onChange = () => {
      setMatches(mql.matches);
    };

    // Initial check
    setMatches(mql.matches);

    // Listen for changes
    mql.addEventListener("change", onChange);

    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return !!matches;
}
