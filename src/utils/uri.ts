export const clearQueryString = () => {
  const uri = window.location.toString();
  if (uri.indexOf('?') > 0) {
    const clean_uri = uri.substring(0, uri.indexOf('?'));
    window.history.replaceState({}, document.title, clean_uri);
  }
  if (uri.indexOf('#') > 0) {
    const clean_uri = uri.substring(0, uri.indexOf('#'));
    window.history.replaceState({}, '', clean_uri);
  }
};
