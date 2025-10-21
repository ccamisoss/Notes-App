import config from "../config";
const headers = {
  "Accept": "*/*",
  "Content-Type": "application/json", 
}

export const getNotes = async (archived = false) => {
  try {
    const response = await fetch(
      `${config.BASE_URL}/api/notes?archived=${archived}`,
      {
        method: "GET",
        headers
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(JSON.stringify(error));
  }
};

export const getNote = async (id) => {
  try {
    const response = await fetch(
      `${config.BASE_URL}/api/notes/${id}`,
      {
        method: "GET",
        headers
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
  }
};

export const editNote = async (id, payload) => {
  try {
    const response = await fetch(`${config.BASE_URL}/api/notes/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers
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
      headers
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
      headers
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error.message);
  }
};
