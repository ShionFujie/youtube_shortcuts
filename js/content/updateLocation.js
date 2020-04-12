function updateLocation(url, { pathname, search }) {
  if (pathname != null) url.pathname = pathname;
  if (search != null) url.search = search;

  location.href = url.toString();
}
