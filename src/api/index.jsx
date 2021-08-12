export const fetchData = fetch(
  // query param / path param
  // "https://jsonplaceholder.typicode.com/todos?completed=true"
  "https://jsonplaceholder.typicode.com/todos"
).then((response) => response.json());
