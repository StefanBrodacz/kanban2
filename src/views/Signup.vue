<template>
  <v-card class="mx-auto mt-5" width="400">
    <v-card-title>
      <h1>Signup</h1>
    </v-card-title>

    <v-form ref="signUpForm" v-model="formValidity">
      <v-card-text>
        <v-text-field
          label="Email"
          type="email"
          v-model="email"
          :rules="emailRules"
          required
        ></v-text-field>
        <v-checkbox
          label="Agree to terms & conditions"
          v-model="agreeToTerms"
          :rules="agreeToTermsRules"
          required
        ></v-checkbox>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
          type="submit"
          color="primary"
          class="mr-4"
          :disabled="!formValidity"
          >Submit</v-btn
        >
        <!--        <v-btn color="success" class="mr-4" @click="validateForm"-->
        <!--          >Validate Form</v-btn-->
        <!--        >-->
        <!--        <v-btn color="warning" class="mr-4" @click="resetValidation"-->
        <!--          >Reset Validation</v-btn-->
        <!--        >-->
        <!--        <v-btn color="error" @click="resetForm">Reset</v-btn>-->
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    agreeToTerms: false,
    agreeToTermsRules: [
      value =>
        !!value ||
        "You must agree to the terms and conditions to sign up for an account."
    ],
    birthday: "",
    browsers: ["Chrome", "Firefox", "Safari", "Edge", "Brave"],
    email: "",
    emailRules: [
      value => !!value || "Email is required.",
      value => value.indexOf("@") !== 0 || "Email should have a username.",
      value => value.includes("@") || "Email should include an @ symbol.",
      value =>
        value.indexOf(".") - value.indexOf("@") > 1 ||
        "Email should contain a valid domain.",
      value => value.includes(".") || "Email should include a period symbol.",
      value =>
        value.indexOf(".") <= value.length - 3 ||
        "Email should contain a valid domain extension."
    ],
    formValidity: false
  }),
  methods: {
    resetForm() {
      this.$refs.signUpForm.reset();
    },
    resetValidation() {
      this.$refs.signUpForm.resetValidation();
    },
    validateForm() {
      this.$refs.signUpForm.validate();
    }
  }
};
</script>
