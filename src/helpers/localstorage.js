const CREDENTIALS = "credentials";

/**
 * Append a credential to the local storage
 * @param {String} credId the credential ID
 * @param {String} userId the user ID
 */
const addCredential = (credId, userId = null) => {
  window.localStorage.setItem(
    CREDENTIALS,
    JSON.stringify([...getCredentials(), { id: credId, userId }])
  );
};

/**
 * Removes a credential ID from the local storage
 * @param {String} cred the credential ID
 */
const removeCredential = (cred) => {
  window.localStorage.setItem(
    CREDENTIALS,
    JSON.stringify(getCredentials().filter((c) => c.id !== cred))
  );
};

/**
 * Checks if the local storage contains a specific credential ID
 * @param {String} cred the credential ID
 * @returns true if the credentials is stored, false otherwise
 */
const hasCredential = (cred) => {
  return getCredentials()
    .map((c) => c.id)
    .includes(cred);
};

const getUserId = (cred) => {
  return getCredentials().find((c) => c.id === cred).userId;
};

const getCredId = (userId) => {
  return getCredentials().find((c) => c.userId === userId).id;
};

/**
 * Gets all credentials stored in the localstorage
 * @returns list of credential IDs or empty array if there are none
 */
const getCredentials = () => {
  const val = window.localStorage.getItem(CREDENTIALS);

  if (val === null) {
    return [];
  }

  const json = JSON.parse(val);

  if (!Array.isArray(json)) {
    return [];
  }

  return json;
};

export default {
  addCredential,
  removeCredential,
  hasCredential,
  getUserId,
  getCredId,
};
