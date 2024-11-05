// The purpose for creating this API file is to prevent the duplication of
// the same logic to communicate with the backend duplicated across
// multiple views

import App from "./App";
import Auth from "./Auth";
import Toast from "./Toast";

class ServiceAPI {
  async newHaircut(formData) {
    // send fetch request
    const response = await fetch(`${App.apiBase}/haircut`, {
      method: "POST",
      // sending along the JSON web token along with the request
      headers: { Authorization: `Bearer ${localStorage.accessToken}` },
      body: formData,
    });

    // if response not ok
    if (!response.ok) {
      let message = "Problem adding haircut";
      if (response.status == 400) {
        const err = await response.json();
        message = err.message;
      }
      // throw error (exit this function)
      throw new Error(message);
    }

    // convert response payload into json - store as data
    const data = await response.json();

    // return data - sends back the newly created haircut
    return data;
  }

  async getServices() {
    // fetch the json data
    const response = await fetch(`${App.apiBase}/service`, {
      headers: { Authorization: `Bearer ${localStorage.accessToken}` },
    });

    // if response not ok
    if (!response.ok) {
      // console log error
      const err = await response.json();
      if (err) console.log(err);
      // throw error (exit this function)
      throw new Error("Problem getting services");
    }

    // convert response payload into json - store as data
    const data = await response.json();

    // return data
    return data;
  }

  async getServiceTypes() {
    // fetch the json data
    const response = await fetch(`${App.apiBase}/serviceType`, {
      headers: { Authorization: `Bearer ${localStorage.accessToken}` },
    });

    // if response not ok
    if (!response.ok) {
      // console log error
      const err = await response.json();
      if (err) console.log(err);
      // throw error (exit this function)
      throw new Error("Problem getting services");
    }

    // convert response payload into json - store as data
    const data = await response.json();

    // return data
    return data;
  }
}

export default new ServiceAPI();
