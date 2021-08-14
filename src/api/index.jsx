// fetch-then method:
// export const getData = fetch(
//   "https://jsonplaceholder.typicode.com/todos"
// ).then((response) => response.json());

// async-await method:
export const getData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");

  return await res.json();
};

export const deleteData = async (deleteId) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${deleteId}`,
    {
      method: "DELETE",
    }
  );
  return await res.json();
};

export const filterData = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos?completed=true`,
    {
      method: "GET",
    }
  );
  return await res.json();
};

export const postData = async (todo) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(todo),
  });
  return await res.json();
};

export const updateData = async (editId, trimmedValue) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${editId}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        title: trimmedValue,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
  return await res.json();
};
