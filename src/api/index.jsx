export const fetchData = fetch(
  // query param / path param
  // "https://jsonplaceholder.typicode.com/todos?completed=true"
  "https://jsonplaceholder.typicode.com/todos"
).then((response) => response.json());

// let todo = {
//   title: "myItem-1",
//   completed: false,
// };

// export const postNewItem = fetch("https://jsonplaceholder.typicode.com/todos", {
//   method: "POST",
//   headers: {
//     "Content-type": "application/json; charset=UTF-8",
//   },
//   body: JSON.stringify(todo),
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json));
