export function prefix(location, ...prefixes) {
  return prefixes.some(
    (prefix) => location.href.indexOf(`${location.origin}/${prefix}`) !== -1
  );
}

export function reactDashboard(location) {
  return location.pathname === "/" || location.pathname === "/dashboard";
}

export function vueCareer(location) {
  return prefix(location, "career");
}

export function auth(location) {
  return location.pathname.startsWith("/auth");
}

export function messenger(location) {
  return location.pathname.startsWith("/messenger");
}

export function reactLayout(location) {
  return !location.pathname.startsWith("/auth");
}
