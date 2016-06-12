const APIBaseURL = '/api';

export function query(request) {
  const url = `${APIBaseURL}${request.path}`;
  return fetch(url, {
    method: request.method,
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(request.body),
  });
}
