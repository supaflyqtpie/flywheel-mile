export function isNullOrBlank(obj) {
  return (typeof obj == 'undefined' || obj === null);
}

export function get(obj, key) {
  return key.split('.').reduce((p, c) => {
    return isNullOrBlank(p) ? p : p[c];
  }, obj);
}
