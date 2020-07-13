<template>
  <div>
    <img src="../assets/ansible-hexagon.png" class="spin d-inline-block" />
    <br />
    <img
      src="../assets/logo.png"
      style="width: 500px"
      class="d-inline-block align-top"
      alt="Ansible"
    />
    <h2 style="padding-top: 20px; padding-bottom: 40px">
      The partisan-free social network
    </h2>
    <button @click="register">Register an Account</button>
    <br />
    <button @click="aboutUs">About the Devs</button>

    <div id="cols">
      <div>
        <h1>Diversity</h1>
        <p>
          Ansible strives to be a social media platform that emphasizes
          diversity as one of its core tenants. Our matching algorithm will
          ensure you have conversations with people politically different from
          you after you register and take our quiz. Experience a variety of
          viewpoints through civil discussion customized to fit your interests.
        </p>
      </div>

      <div>
        <h1>Learning</h1>
        <p>
          Our political compass quiz is a break from the linear political
          spectrum discussed in most American-centric politics. We graph your
          political standings on two axis, on your social and economic beliefs
          and give you a quadrant. This provides a lot of opportunities to
          address your viewpoint and learn which other sides to learn from as
          well.
        </p>
      </div>

      <div>
        <h1>Everyone</h1>
        <p>
          Ansible is both free and accessible to anyone engaging in civil
          discourse. We aimed to make the quiz simple to understand, yet nuanced
          enough to capture people’s political beliefs. For newcomers to the
          political compass, click on the Help tab to understand your results.
          We look forward to seeing you on the app!
        </p>
      </div>
    </div>
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

button {
  font-weight: 600;
  box-sizing: border-box;
  border-color: #7137c8;
  color: white;
  background-color: #7137c8;
  border-radius: 0.5em;
  cursor: pointer;
  margin: 10px;
  padding: 1% 1%;
}

#cols {
  margin-top: 50px;
  display: flex;
}

#cols div {
  width: 33.333%;
}
</style>

<script>
export default {
  methods: {
    register() {
      location.replace("http://localhost:8080/#/register");
    },
    aboutUs() {
      location.replace("http://localhost:8080/#/about");
    }
  }
};
</script>
