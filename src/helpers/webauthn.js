const crypto = require("crypto");

/**
 * Heavily inspired by the code used at webauthn.io
 */
function webAuthnSupport() {
  if (
    window.PublicKeyCredential === undefined ||
    typeof window.PublicKeyCredential !== "function"
  ) {
    console.log("This browser does not support WebAuthn.");
    return false;
  }
  if (
    window.location.protocol === "http:" &&
    window.location.hostname !== "localhost" &&
    window.location.hostname !== "127.0.0.1"
  ) {
    console.log("Webauthn only supports secure connections");
    return false;
  }
  return true;
}

/**
 * Request creation of a new set of credentials using Webauthn.
 * See also: https://www.w3.org/TR/webauthn-1/#createCredential
 */
async function createCredential(username, fullname) {
  let challenge = generateRandomBytes(16);
  let credential = null;

  try {
    credential = await navigator.credentials.create(
      createPublicKeyCredentialCreationOptions(username, fullname, challenge)
    );
  } catch (e) {
    console.error(e);
    credential = null;
  }
  return { credential, challenge };
}

function createPublicKeyCredentialCreationOptions(
  username,
  fullname,
  challenge
) {
  return {
    publicKey: {
      /**
       * Information about the relying party.
       * name and id are required.
       */
      rp: {
        name: "KUUGEL",
        id: "kuugel.com",
      },

      /**
       * Information about the user.
       * name, displayName and id are required.
       */
      user: {
        name: username,
        displayName: fullname,
        id: generateRandomBytes(16),
      },

      /**
       * should be at least 16 bytes long
       */
      challenge: challenge,

      /**
       * Information about the desired properties of the credential to be
       * created.
       * type is the type of credential to be created
       * alg is the cryptographic signature algorithm
       */
      pubKeyCredParams: [{ type: "public-key", alg: -7 }],

      /**
       * Allow credentials.
       */
      //allowCredentials: [
      //  { type: "public-key", id: '', transports: ["internal"] },
      //  { type: "public-key", id: '', transports: ["nfc"] },
      //],

      /**
       *  time, in milliseconds, that the caller is willing to wait for the call to complete.
       */
      //timeout: 60000,

      /**
       * Used to select the appropriate authenticators to participate in the create() operation.
       */
      authenticatorSelection: {
        /**
         * "platform" for platform authenticator
         * "cross-platform" for roaming authenticator
         */
        //authenticatorAttachment: "cross-platform",

        /**
         * require a client-side discoverable credential
         */
        residentKey: "required",

        /**
         * if set to "true", the authenticator must create a client-side
         * public key credential source.
         */
        requireResidentKey: true,

        /**
         * - "required": require user verification, otherwise fail
         * - "preferred": prefer user verification but do not fail
         * - "discouraged": no user verification wanted
         */
        userVerification: "discouraged",
      },

      /**
       * - "none": no interest in authenticator attestation
       * - "indirect": prefer attestation
       * - "direct":  requires attestation
       */
      attestation: "none",
    },
  };
}

async function getAssertion() {
  const challenge = generateRandomBytes(16);

  let credential = null;
  try {
    credential = await navigator.credentials.get(
      createPublicKeyCredentialRequestOptions(challenge)
    );
  } catch (e) {
    console.error(e);
    credential = null;
  }

  return { credential, challenge };
}

function createPublicKeyCredentialRequestOptions(challenge) {
  return {
    publicKey: {
      /**
       * should be at least 16 bytes long
       */
      challenge: challenge,

      /**
       * relying party identifier
       */
      rpId: "kuugel.com",

      /**
       * - "required": require user verification, otherwise fail
       * - "preferred": prefer user verification but do not fail
       * - "discouraged": no user verification wanted
       */
      userVerification: "discouraged",
    },
  };
}

function validate(credential, challenge) {
  const clientDataJSON = parseClientDataJson(credential);

  const receivedChallenge = Buffer.from(
    clientDataJSON.challenge,
    "base64"
  ).toString("base64");

  if (receivedChallenge !== challenge.toString("base64")) {
    console.log("Expected challenge", challenge.toString("base64"));
    console.log("Got challenge", receivedChallenge);
    console.error("Invalid clientDataJSON", clientDataJSON);
    return false;
  }
  return true;
}

function parseClientDataJson(credential) {
  const utf8Decoder = new TextDecoder("utf-8");
  const decoded = utf8Decoder.decode(credential.response.clientDataJSON);
  return JSON.parse(decoded);
}

/**
 * Generates cryptographic random bytes
 */
function generateRandomBytes(len) {
  return crypto.randomBytes(len);
}

export default {
  webAuthnSupport,
  generateRandomBytes,
  createCredential,
  parseClientDataJson,
  validate,
  getAssertion,
};
