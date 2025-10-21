import config from "../config";

export const getNotes = async (archived = false) => {
  try {
    const response = await fetch(
      `${config.BASE_URL}/api/notes?archived=${archived}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};

export const editNote = async (id, data) => {
  try {
    const response = await fetch(`${config.BASE_URL}/api/notes/${archived}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await fetch(`${config.BASE_URL}/api/notes/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const createNote = async (payload) => {
  try {
    const response = await fetch(`${config.BASE_URL}/api/notes`, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error.message);
  }
};
