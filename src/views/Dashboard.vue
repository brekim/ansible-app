<template>
  <div>
    <h1>Dashboard</h1>

    <div class="cols">
      <div>
        <h1>1</h1>
        <h4 style="margin: 0"># of kudos</h4>
      </div>

      <div>
        <h1>Moderate</h1>
        <p>Auth/Lib</p>

        <h1>Moderate</h1>
        <p>Left/Right</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
* {
  font-family: "Source Sans Pro", Arial, sans-serif;
}

#cols {
  margin-top: 50px;
  display: flex;
}

#cols div {
  width: 33.333%;
}

.quadrant {
  height: 127px;
  width: 127px;
  background: url("../assets/libleft.png") no-repeat;
  margin: auto;
  margin-top: 0;
  margin-bottom: 0;
}
</style>
