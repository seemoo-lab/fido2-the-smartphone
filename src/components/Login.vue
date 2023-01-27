<template>
  <div>
    <h2>Login</h2>
    <div v-if="unknownUser">
      <p>There is no known account for this email address</p>
      <p>
        Would you like to 
        <router-link to="/register">create an account</router-link>?
      </p>
    </div>
    <div v-else>
      <div class="p-fluid">
        <InputText
          id="email"
          type="email"
          v-model="email"
          :class="{ 'p-invalid': validationErrors.email && submitted }"
          class="p-m-2 input"
          placeholder="Email address"
        />
        <small v-show="validationErrors.email && submitted" class="p-error">
          You have to submit an email address.
        </small>
        <div class="p-field element">
          <Button class="button" label="login" @click="login()" />
        </div>
        <p>
          Present the hardware key that you used during registration
          to login.
        </p>
        <p>
          Not registered yet? Here you can
          <router-link to="/register">create an account</router-link>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import webauthn from "@/helpers/webauthn.js";
import credentialStore from "@/helpers/localstorage.js";

import Button from "primevue/button";
import InputText from "primevue/inputtext";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      submitted: false,
      unknownUser: false,
      validationErrors: {},
    };
  },
  components: {
    Button,
    InputText,
  },
  methods: {
    async login() {
      if (!this.validateForm()) {
        return;
      }

      if (!webauthn.webAuthnSupport()) {
        return;
      }

      let credId;

      try {
        credId = credentialStore.getCredId(this.email);
        if (!credId || !credentialStore.hasCredential(credId)) {
          this.unknownUser = true;
          return;
        }
      } catch (e) {
        this.unknownUser = true;
        return;
      }

      let res;
      let cred;
      let chall;

      console.log("Requesting authentication for " + credId);

      try {
        res = await webauthn.getAssertion();
      } catch (e) {
        console.log("ERROR", e);
      }
      cred = res.credential;
      chall = res.challenge;

      if (cred === null) {
        console.log("Returned credential is null.");
        return;
      }

      if (!webauthn.validate(cred, chall)) {
        console.log("Verification failed");
        return;
      }

      let credString = Buffer.from(cred.id, "base64").toString("base64");
      console.log("User authenticated using FIDO2", credString);

      this.$router.push({
        path: "/topsecret",
        params: { userId: this.email, authenticated: true },
      });
    },
    validateForm() {
      if (!this.email.trim()) this.validationErrors["email"] = true;
      else delete this.validationErrors["email"];
      return !Object.keys(this.validationErrors).length;
    },
  },
};
</script>

<style scoped>
.button {
  margin-top: 8pt;
  background-color: #cd6600;
  border-color: #cd6600;
  color: white;
}
</style>
