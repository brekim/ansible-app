<template>
  <div>
    <b-modal id="login-modal">
      <template v-slot:modal-title>
        User Login
      </template>
      <b-container fluid>
        <div v-if="errors && errors.length">
          <div v-for="error of errors" v-bind:key="error">
            <b-alert show>{{ error.message }}</b-alert>
          </div>
        </div>
        <b-form @submit="login" @reset="cancel" v-if="show_form">
          <b-form-group
            id="username-group"
            label="Username:"
            label-for="username"
          >
            <b-form-input
              id="username"
              v-model="form.username"
              required
              placeholder="Enter name"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="password-group"
            label="Password:"
            label-for="password"
          >
            <b-form-input
              id="password"
              v-model="form.password"
              required
              placeholder="Enter password"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="remember">
            <b-form-checkbox-group v-model="form.checked" id="remember-me">
              <b-form-checkbox value="remember">Remember me</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-form>
      </b-container>
      <template v-slot:modal-footer>
        <div class="w-100">
          <p class="float-left">
            Don't have an account? Register
            <b-link to="/register" @click="$bvModal.hide('login-modal')"
              >here.</b-link
            >
          </p>
          <b-button
            class="float-right"
            variant="success"
            style="margin-left: 10px;"
            @click="login"
          >
            Submit
          </b-button>
          <b-button class="float-right" @click="cancel"> Cancel </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        checked: []
      },
      show_form: true,
      errors: []
    };
  },
  methods: {
    login(evt) {
      evt.preventDefault();
      axios
        .post(`http://localhost:3000/api/auth/login`, {
          username: this.form.username,
          password: this.form.password
        })
        .then(response => {
          localStorage.setItem("jwtToken", response.data.token);
          localStorage.setItem("username", response.data.username);
          this.$bvModal.hide("login-modal");
          this.form.username = "";
          this.form.password = "";
          this.form.checked = [];
          this.show_form = false;
          this.$nextTick(() => {
            this.show_form = true;
          });
          this.$emit("user-event", true, response.data.username);
          this.$router.push("/dashboard");
        })
        .catch(e => {
          console.log(e);
          this.errors.push(e);
        });
    },
    cancel(evt) {
      evt.preventDefault();
      this.$bvModal.hide("login-modal");
    }
  },
  mounted() {
    this.$root.$on("bv::modal::hide", () => {
      this.errors = [];
      this.form.username = "";
      this.form.password = "";
      this.form.checked = [];
      this.show_form = false;
      this.$nextTick(() => {
        this.show_form = true;
      });
    });
  }
};
</script>
