<template>
  <div>
    <b-navbar type="light" variant="light">
      <b-navbar-brand href="#">
        <img
          src="@/assets/logo.png"
          style="width: 100px"
          class="d-inline-block align-top"
          alt="Ansible"
        />
      </b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item to="/" right>Home</b-nav-item>
        <b-nav-item to="/about" right>About</b-nav-item>
        <b-nav-item to="/help" right>Help</b-nav-item>
        <b-nav-item to="/quiz" right>Quiz</b-nav-item>
        <b-nav-item v-if="loggedIn" to="/dashboard" right>Dashboard</b-nav-item>
        <b-nav-item v-if="loggedIn" @click="loadUser" right>Chat</b-nav-item>
        <b-nav-item to="/register" right v-else>Register</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-button
            variant="outline-success"
            v-if="loggedIn"
            @click="clearLocalStorage"
            >Logout</b-button
          >
          <b-button
            variant="outline-success"
            @click="$bvModal.show('login-modal')"
            v-else
            >Login</b-button
          >
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>
    <LoginModal v-on:user-event="setUserLogin" />
  </div>
</template>

<script>
import LoginModal from "./LoginModal.vue";
export default {
  data: function() {
    return {
      loggedIn: false,
      username: ""
    };
  },
  name: "NavBar",
  methods: {
    setUserLogin: function(loggedIn, username) {
      this.loggedIn = loggedIn;
      this.username = username;
    },
    clearLocalStorage: function() {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("username");
      this.loggedIn = false;
      this.$router.push("/");
    },
    loadUser: function() {
      this.$router.push({
        path: `/loading/${this.username}`
      });
    }
  },
  mounted() {
    if (localStorage.jwtToken) {
      this.loggedIn = true;
    }
    if (localStorage.username) {
      this.username = localStorage.username;
    }
  },
  components: {
    LoginModal
  }
};
</script>
