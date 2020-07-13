<template>
  <div>
    <img src="../assets/ansible-hexagon.png" class="spin d-inline-block" />
    <br />
    <h1>Finding a match for {{ username }}...</h1>
    <b-button to="/"> Cancel Queue</b-button>
  </div>
</template>
<style scoped lang="css">
* {
  font-family: "Source Sans Pro", Arial, sans-serif;
  margin: 0;
}

.spin {
  animation: rotation 6s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
<script>
import axios from "axios";
export default {
  data() {
    return {
      username: ""
    };
  },
  methods: {
    cancel() {
      location.replace("http://localhost:8080/#/dashboard");
    },
    load() {
      const message = localStorage.username + " has joined the room.";
      axios
        .post(`http://localhost:3000/api/chat`, {
          room: "everyone",
          message: message
        })
        .then(response => {
          this.$router.push({
            name: "ChatRoom",
            params: {
              id: this.$route.params.id,
              nickname: response.data.nickname
            }
          });
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  mounted() {
    this.username = this.$route.params.username;
    setTimeout(
      () => this.$router.push({ path: `/chat/everyone/${this.username}` }),
      5000
    );
  }
};
</script>
