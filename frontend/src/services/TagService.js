import config from "../config";
const headers = {
  "Accept": "*/*",
  "Content-Type": "application/json", 
}

export const getTags = async () => {
  try {
    const response = await fetch(
      `${config.BASE_URL}/api/tags`,
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

export const deleteTag = async (id) => {
  try {
    const response = await fetch(`${config.BASE_URL}/api/tags/${id}`, {
      method: "DELETE",
      headers
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const createTag = async (name) => {
  try {
    const response = await fetch(`${config.BASE_URL}/api/tags`, {
      method: "POST",
      body: JSON.stringify({ name }),
      headers,
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error.message);
  }
};
