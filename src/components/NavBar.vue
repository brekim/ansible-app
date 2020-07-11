<template>
  <div>
    <b-navbar type="light" variant="light">
      <b-navbar-brand href="#">
        <img src="@/assets/logo.png" style="width: 80px" class = "d-inline-block align-top" alt="Ansible">
      </b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item to="/" right>Home</b-nav-item>
        <b-nav-item to="/about" right>About</b-nav-item>
        <b-nav-item to="/help" right>Help</b-nav-item>
        <b-nav-item to="/quiz" right>Quiz</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-button v-b-modal.login-modal variant="outline-success">Login</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>
    <LoginModal />
  </div>
</template>

<script>
import LoginModal from "./LoginModal.vue"
export default {
  name: "NavBar",
  components: {
    LoginModal,
  }
};
</script>