import App from "./App";
import Auth from "./Auth";
import Toast from "./Toast";

// This is what allows the front end to talk to the backend user collection
class UserAPI {
  async updateUser(userId, userData, dataType = "form") {
    // validate
    if (!userId || !userData) return;

    let responseHeader;

    // form data
    if (dataType == "form") {
      // fetch response header normal (form data)
      responseHeader = {
        method: "PUT",
        headers: { Authorization: `Bearer ${localStorage.accessToken}` },
        body: userData,
      };

      // json data
    } else if (dataType == "json") {
      responseHeader = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      };
    }

    // make fetch request to backend
    const response = await fetch(
      `${App.apiBase}/user/${userId}`,
      responseHeader
    );

    // if response not ok
    if (!response.ok) {
      // console log error
      const err = await response.json();
      if (err) console.log(err);
      // throw error (exit this function)
      throw new Error("Problem updating user");
    }

    // convert response payload into json - store as data
    const data = await response.json();

    // return data
    return data;
  }

  async getUser(userId) {
    // validate
    if (!userId) return;

    // fetch the json data
    const response = await fetch(`${App.apiBase}/user/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.accessToken}` },
    });

    // if response not ok
    if (!response.ok) {
      // console log error
      const err = await response.json();
      if (err) console.log(err);
      // throw error (exit this function)
      throw new Error("Problem getting user");
    }

    // convert response payload into json - store as data
    const data = await response.json();

    // return data
    return data;
  }

  // manages the interaction between the front and back end for adding a favorite
  async addFavHaircut(haircutId) {
    // exit function if haircut id not provided
    if (!haircutId) return;

    // fetch the json data
    const response = await fetch(`${App.apiBase}/user/addFavHaircut`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ haircutId: haircutId }),
    });

    // if response not ok
    if (!response.ok) {
      // console log error
      const err = await response.json();
      if (err) console.log(err);
      // throw error (exit this function)
      throw new Error("Problem adding haircut to favourites");
    }

    // convert response payload into json - store as data
    const data = await response.json();

    // return data
    return data;
  }
}

export default new UserAPI();