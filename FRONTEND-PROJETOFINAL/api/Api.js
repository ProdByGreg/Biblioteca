

const BASE_URL = 'http://localhost:5174/api';

const BOOKS_API_URL = `${BASE_URL}/Livros`;
const USERS_API_URL = `${BASE_URL}/Usuarios`;






export const getBooks = async () => {
  try {
      const response = await fetch(BOOKS_API_URL, {
          method: "GET",
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (!response.ok) {
          throw new Error(`Erro ao buscar dados dos livros: ${response.status}`);
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error(`Erro na requisição: ${error.message}`);
      throw error;
  }
};






export const postBook = async (title, desc) => {
  try {
      let myBody = {
          id: 0,
          title: title,
          description: desc
      };

      const response = await fetch(BASE_URL, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(myBody),
      });

      console.log(response)

      if (!response.ok) {
          throw new Error("Post request failed.")
      }

      const textData = await response.text();
      return JSON.parse(textData);

  } catch (error) {
      console.error(error);
      throw error;
  }

};







export const deleteBook = async (id) => {
  const response = await fetch(`${BOOKS_API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erro ao remover livro.');
};







export const getUsers = async () => {
  const response = await fetch(USERS_API_URL);
  if (!response.ok) throw new Error('Erro ao buscar dados dos usuários.');
  return await response.json();
};






export const postUser = async (user) => {
  const response = await fetch(USERS_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error('Erro ao adicionar usuário.');
  return await response.json();
};







export const deleteUser = async (id) => {
  const response = await fetch(`${USERS_API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Erro ao remover usuário.');
};
