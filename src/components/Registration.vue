<template>
  <div class="registration">
    <h2>Registration</h2>
    <div v-if="registered">
      <p>
        That's it. If you want to register in the future, you'll only need your
        email address and the hardware key you just registered.
      </p>
      <Button class="button" label="Take me home" @click="backHome()" />
    </div>
    <div v-else>
      <div class="p-fluid">
        <InputText
          id="firstname"
          type="text"
          v-model="firstname"
          :class="{
            'p-invalid': validationErrors.firstname && submitted,
          }"
          class="p-m-2 input"
          placeholder="First name"
        />
        <small v-show="validationErrors.firstname && submitted" class="p-error">
          You have to provide a first name.
        </small>
        <InputText
          id="lastname"
          type="text"
          v-model="lastname"
          :class="{
            'p-invalid': validationErrors.lastname && submitted,
          }"
          class="p-m-2 input"
          placeholder="Last name"
        />
        <small v-show="validationErrors.lastname && submitted" class="p-error">
          You have to provide a last name.
        </small>
        <InputText
          id="email"
          type="email"
          v-model="email"
          :class="{ 'p-invalid': validationErrors.email && submitted }"
          class="p-m-2 input"
          placeholder="Email address"
        />
        <small v-show="validationErrors.email && submitted" class="p-error">
          You have to provide an email address.
        </small>
        <div class="p-field element">
          <Button class="button" label="Register" @click="register()" />
        </div>
      </div>
      <p>
        We support passwordless authentication. This means that you do not have
        to create a password. Instead, we will ask you to register your hardware
        key in the next step.
      </p>
    </div>
  </div>
</template>

<script>
import webauthn from "@/helpers/webauthn.js";
import credentialStore from "@/helpers/localstorage.js";

import Button from "primevue/button";
import InputText from "primevue/inputtext";

export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      submitted: false,
      registered: false,
      validationErrors: {},
    };
  },
  methods: {
    async register() {
      if (!this.validateForm()) {
        return;
      }

      if (!webauthn.webAuthnSupport()) {
        this.$toast.add({
          severity: "error",
          summary: "No WebAuthn support",
          detail:
            "Your browser does not support WebAuthn. Unfortunately, this website requires WebAuthn.",
        });
        return;
      }
      let res;
      let cred;
      let chall;
      let fullname = this.firstname + " " + this.lastname;

      try {
        res = await webauthn.createCredential(this.email, fullname);
      } catch (e) {
        console.log("ERROR", e);
      }
      cred = res.credential;
      chall = res.challenge;

      if (cred === null) {
        console.log("Credential has not been created - timout or cancelled.");
        return;
      }

      if (!webauthn.validate(cred, chall)) {
        console.log("Verification failed");
        return;
      }

      console.log(
        "Created credential for " +
          fullname +
          " with the email address " +
          this.email
      );

      credentialStore.addCredential(cred.id, this.email);
      let credString = Buffer.from(cred.id, "base64").toString("base64");
      console.log("Registered credential", credString);

      this.registered = true;
    },
    validateForm() {
      if (!this.firstname.trim()) this.validationErrors["firstname"] = true;
      else delete this.validationErrors["firstname"];
      if (!this.lastname.trim()) this.validationErrors["lastname"] = true;
      else delete this.validationErrors["lastname"];
      if (!this.email.trim()) this.validationErrors["email"] = true;
      else delete this.validationErrors["email"];
      return !Object.keys(this.validationErrors).length;
    },
    backHome() {
      this.$router.push({ path: "/" });
    },
  },
  components: {
    Button,
    InputText,
  },
  name: "Registration",
  props: {},
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
