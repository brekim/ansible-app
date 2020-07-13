<template>
  <div class="container-app">
    <div v-if="errors && errors.length">
      <div v-for="error of errors" v-bind:key="error">
        <b-alert show>{{ error.message }}</b-alert>
      </div>
    </div>
    <div class="container-quiz">
      <div class="quiz-header">
        <h1>Political Compass Test</h1>
      </div>

      <div
        class="quiz-main"
        v-for="(element, index) in questions.slice(beginIndex, endIndex)"
        :key="index"
        v-show="quiz"
      >
        <div class="box-question">
          <h2>Question {{ endIndex }}/{{ questions.length }}</h2>
          <h2>{{ element.question }}</h2>
        </div>

        <div class="box-suggestions">
          <ul>
            <li
              v-for="(item, index) in element.suggestions"
              :key="index"
              :class="select ? check(item) : ''"
              @click="selectResponse(item)"
            >
              {{ item.suggestion }}
            </li>
          </ul>
        </div>
      </div>

      <div class="box-score" v-if="score_show">
        <h2>Economic Scale:</h2>
        <h2>{{ economic }}</h2>

        <h2>Auth/Lib Scale:</h2>
        <h2>{{ authlib }}</h2>

        <h2>Quadrant:</h2>
        <div :class="quadrant"></div>
        <h4 style="margin: 0">{{ quadrant }}</h4>

        <div class="btn-retake">
          <button @click="restartQuiz">
            Retake
          </button>
        </div>

        <div class="btn-save">
          <button @click="submitResults">
            Save Results
          </button>
        </div>
      </div>

      <div class="quiz-footer" v-show="quiz">
        <div class="box-button">
          <button @click="noOpinion">
            No Opinion
          </button>
          <button @click="noOpinion">
            Undecided
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "quiz",
  data() {
    return {
      questions: [
        {
          question:
            "Freedom of business is the best practical way a society can prosper.",
          suggestions: [
            { suggestion: "Strongly agree", stat: 1 },
            { suggestion: "Slightly agree", stat: 2 },
            { suggestion: "Slightly disagree", stat: 3 },
            { suggestion: "Strongly disagree", stat: 4 }
          ]
        },
        {
          question:
            "The current welfare system should be expanded to further combat inequality.",
          suggestions: [
            { suggestion: "Strongly agree", stat: 4 },
            { suggestion: "Slightly agree", stat: 3 },
            { suggestion: "Slightly disagree", stat: 2 },
            { suggestion: "Strongly disagree", stat: 1 }
          ]
        },
        {
          question:
            "A government that provides for everyone is an inherently good idea.",
          suggestions: [
            { suggestion: "Strongly agree", stat: 4 },
            { suggestion: "Slightly agree", stat: 3 },
            { suggestion: "Slightly disagree", stat: 2 },
            { suggestion: "Strongly disagree", stat: 1 }
          ]
        },
        {
          question:
            "The harder you work, the more you progress up the socioeconomic ladder.",
          suggestions: [
            { suggestion: "Strongly agree", stat: 1 },
            { suggestion: "Slightly agree", stat: 2 },
            { suggestion: "Slightly disagree", stat: 3 },
            { suggestion: "Strongly disagree", stat: 4 }
          ]
        },
        {
          question: "Class is the biggest divider of society.",
          suggestions: [
            { suggestion: "Strongly agree", stat: 4 },
            { suggestion: "Slightly agree", stat: 3 },
            { suggestion: "Slightly disagree", stat: 2 },
            { suggestion: "Strongly disagree", stat: 1 }
          ]
        },
        {
          question:
            "In times of crisis, safety becomes more important than civil liberties.",
          suggestions: [
            { suggestion: "Strongly agree", stat: 5 },
            { suggestion: "Slightly agree", stat: 6 },
            { suggestion: "Slightly disagree", stat: 7 },
            { suggestion: "Strongly disagree", stat: 8 }
          ]
        },
        {
          question: "The smaller the government, the freer the people.",
          suggestions: [
            { suggestion: "Strongly agree", stat: 8 },
            { suggestion: "Slightly agree", stat: 7 },
            { suggestion: "Slightly disagree", stat: 6 },
            { suggestion: "Strongly disagree", stat: 5 }
          ]
        },
        {
          question:
            "The government should be less involved in the day to day life of its citizens.",
          suggestions: [
            { suggestion: "Strongly agree", stat: 8 },
            { suggestion: "Slightly agree", stat: 7 },
            { suggestion: "Slightly disagree", stat: 6 },
            { suggestion: "Strongly disagree", stat: 5 }
          ]
        },
        {
          question:
            "Only the government can fairly and effectively regulate organizations.",
          suggestions: [
            { suggestion: "Strongly agree", stat: 5 },
            { suggestion: "Slightly agree", stat: 6 },
            { suggestion: "Slightly disagree", stat: 7 },
            { suggestion: "Strongly disagree", stat: 8 }
          ]
        },
        {
          question:
            "A government should focus on domestic markets versus foreign trade first.",
          suggestions: [
            { suggestion: "Strongly agree", stat: 5 },
            { suggestion: "Slightly agree", stat: 6 },
            { suggestion: "Slightly disagree", stat: 7 },
            { suggestion: "Strongly disagree", stat: 8 }
          ]
        }
      ],
      beginIndex: 0,
      endIndex: 1,
      select: false,
      economic: 0,
      authlib: 0,
      quiz: true,
      score_show: false,
      errors: []
    };
  },
  methods: {
    noOpinion() {
      if (this.questions.length - 1 == this.beginIndex) {
        this.score_show = true;
        this.quiz = false;
        this.select = false;
      } else {
        this.beginIndex++;
        this.endIndex++;
        this.select = false;
      }
    },

    restartQuiz() {
      //Resets the data
      Object.assign(this.$data, this.$options.data());
    },

    submitResults() {
      // localStorage.economic = this.economic;
      // localStorage.authlib = this.authlib;
      // localStorage.quadrant = this.quadrant;
      if (localStorage.username) {
        axios
          .post(`http://localhost:3000/api/auth/quiz`, {
            username: localStorage.username,
            economic: this.economic,
            authlib: this.authlib,
            quadrant: this.quadrant
          })
          .then(response => {
            console.log(response);
            this.$router.push({ path: "/dashboard" });
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        this.errors.push({
          message: "Please login or register to save your quiz data."
        });
      }
    },

    /*
     * This switch statement can be cut down, but due to time ended up picking the messier solution
     */
    selectResponse(item) {
      this.select = true;
      switch (item.stat) {
        case 1:
          this.economic += 2;
          console.log(this.economic);
          if (this.questions.length - 1 == this.beginIndex) {
            this.score_show = true;
            this.select = false;
            this.quiz = false;

            if (this.economic <= 0 && this.authlib <= 0) {
              this.quadrant = "libleft";
            } else if (this.economic >= 0 && this.authlib <= 0) {
              this.quadrant = "libright";
            } else if (this.economic <= 0 && this.authlib >= 0) {
              this.quadrant = "authleft";
            } else {
              this.quadrant = "authright";
            }
          } else {
            this.beginIndex++;
            this.endIndex++;
            this.select = false;
          }
          break;
        case 2:
          this.economic += 1;
          console.log(this.economic);
          if (this.questions.length - 1 == this.beginIndex) {
            this.score_show = true;
            this.select = false;
            this.quiz = false;

            if (this.economic <= 0 && this.authlib <= 0) {
              this.quadrant = "libleft";
            } else if (this.economic >= 0 && this.authlib <= 0) {
              this.quadrant = "libright";
            } else if (this.economic <= 0 && this.authlib >= 0) {
              this.quadrant = "authleft";
            } else {
              this.quadrant = "authright";
            }
          } else {
            this.beginIndex++;
            this.endIndex++;
            this.select = false;
          }
          break;
        case 3:
          this.economic += -1;
          console.log(this.economic);
          if (this.questions.length - 1 == this.beginIndex) {
            this.score_show = true;
            this.select = false;
            this.quiz = false;

            if (this.economic <= 0 && this.authlib <= 0) {
              this.quadrant = "libleft";
            } else if (this.economic >= 0 && this.authlib <= 0) {
              this.quadrant = "libright";
            } else if (this.economic <= 0 && this.authlib >= 0) {
              this.quadrant = "authleft";
            } else {
              this.quadrant = "authright";
            }
          } else {
            this.beginIndex++;
            this.endIndex++;
            this.select = false;
          }
          break;
        case 4:
          this.economic += -2;
          console.log(this.economic);
          if (this.questions.length - 1 == this.beginIndex) {
            this.score_show = true;
            this.select = false;
            this.quiz = false;

            if (this.economic <= 0 && this.authlib <= 0) {
              this.quadrant = "libleft";
            } else if (this.economic >= 0 && this.authlib <= 0) {
              this.quadrant = "libright";
            } else if (this.economic <= 0 && this.authlib >= 0) {
              this.quadrant = "authleft";
            } else {
              this.quadrant = "authright";
            }
          } else {
            this.beginIndex++;
            this.endIndex++;
            this.select = false;
          }
          break;
        case 5:
          this.authlib += 2;
          console.log(this.economic);
          if (this.questions.length - 1 == this.beginIndex) {
            this.score_show = true;
            this.select = false;
            this.quiz = false;

            if (this.economic <= 0 && this.authlib <= 0) {
              this.quadrant = "libleft";
            } else if (this.economic >= 0 && this.authlib <= 0) {
              this.quadrant = "libright";
            } else if (this.economic <= 0 && this.authlib >= 0) {
              this.quadrant = "authleft";
            } else {
              this.quadrant = "authright";
            }
          } else {
            this.beginIndex++;
            this.endIndex++;
            this.select = false;
          }
          break;
        case 6:
          this.authlib += 1;
          console.log(this.economic);
          if (this.questions.length - 1 == this.beginIndex) {
            this.score_show = true;
            this.select = false;
            this.quiz = false;

            if (this.economic <= 0 && this.authlib <= 0) {
              this.quadrant = "libleft";
            } else if (this.economic >= 0 && this.authlib <= 0) {
              this.quadrant = "libright";
            } else if (this.economic <= 0 && this.authlib >= 0) {
              this.quadrant = "authleft";
            } else {
              this.quadrant = "authright";
            }
          } else {
            this.beginIndex++;
            this.endIndex++;
            this.select = false;
          }
          break;
        case 7:
          this.authlib += -1;
          console.log(this.economic);
          if (this.questions.length - 1 == this.beginIndex) {
            this.score_show = true;
            this.select = false;
            this.quiz = false;

            if (this.economic <= 0 && this.authlib <= 0) {
              this.quadrant = "libleft";
            } else if (this.economic >= 0 && this.authlib <= 0) {
              this.quadrant = "libright";
            } else if (this.economic <= 0 && this.authlib >= 0) {
              this.quadrant = "authleft";
            } else {
              this.quadrant = "authright";
            }
          } else {
            this.beginIndex++;
            this.endIndex++;
            this.select = false;
          }
          break;
        case 8:
          this.authlib += -2;
          console.log(this.economic);
          if (this.questions.length - 1 == this.beginIndex) {
            this.score_show = true;
            this.select = false;
            this.quiz = false;

            if (this.economic <= 0 && this.authlib <= 0) {
              this.quadrant = "libleft";
            } else if (this.economic >= 0 && this.authlib <= 0) {
              this.quadrant = "libright";
            } else if (this.economic <= 0 && this.authlib >= 0) {
              this.quadrant = "authleft";
            } else {
              this.quadrant = "authright";
            }
          } else {
            this.beginIndex++;
            this.endIndex++;
            this.select = false;
          }
          break;
      }
    }
  }
};
</script>

<style scoped>
* {
  font-family: "Source Sans Pro", Arial, sans-serif;
  margin: 0;
}

#app {
  text-align: center;
  color: black;
  margin-top: 80px;
}
.container-app {
  display: flex;
  width: 60%;
  height: 20%;
  margin-left: 20%;
  margin-right: 20%;
  justify-content: center;
}
.container-quiz {
  display: flex;
  width: 50%;
  height: 80%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  flex-flow: column;
  background-color: #e2e8dd;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
}
.quiz-header {
  display: flex;
  width: 100%;
  height: 20%;
  border-bottom: 1px solid #020202;
  justify-content: center;
  align-items: center;
  background-color: #e2e8dd;
  border-radius: 20px 20px 0px 0px;
}
.quiz-main {
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: column;
  margin: auto;
}
.quiz-footer {
  display: flex;
  width: 100%;
  height: 10%;
  justify-content: center;
  border-top: 1px solid #020202;
  background-color: #e2e8dd;
  border-radius: 0px 0px 10px 10px;
}
.box-question {
  margin-top: 20px;
}
.box-suggestions {
  display: flex;
  width: 100%;
  justify-content: center;
  margin: auto;
}
ul {
  display: flex;
  width: 80%;
  margin: 0;
  padding: 0;
  flex-flow: column;
}
li {
  list-style: none;
  line-height: 2;
  border: 1px solid #020202;
  margin-bottom: 20px;
  border-radius: 15px;
  font-size: 1.6em;
  cursor: pointer;
}
li:hover {
  background-color: #6f6866;
  color: #e2e8dd;
}
.box-button {
  display: flex;
  width: 100%;
}
.box-button button {
  width: 150px;
  height: 75%;
  outline: none;
  border: 0;
  color: #e2e8dd;
  font-size: 1.2em;
  cursor: pointer;
  border-radius: 20px;
  margin: auto;
  background-color: #4392f1;
}
.box-score {
  display: flex;
  width: 100%;
  height: 70%;
  flex-flow: column;
}
.box-score h2 {
  margin-top: 40px;
}
.btn-retake {
  display: flex;
  width: 100%;
  height: auto;
  justify-content: center;
  margin-top: 50px;
}
.btn-retake button {
  width: 150px;
  height: 35px;
  outline: none;
  border: 0;
  color: turquoise;
  font-size: 1.2em;
  cursor: pointer;
  border-radius: 20px;
  margin: auto;
  background-color: coral;
}
.btn-save {
  display: flex;
  width: 100%;
  height: auto;
  justify-content: center;
  margin-top: 50px;
}
.btn-save button {
  width: 150px;
  height: 35px;
  outline: none;
  border: 0;
  color: turquoise;
  font-size: 1.2em;
  cursor: pointer;
  border-radius: 20px;
  margin: auto;
  background-color: coral;
}
li > div {
  float: right;
  margin-top: 7px;
  margin-right: 7px;
  color: #e2e8dd;
}
@media (max-width: 1280px) {
  .container-quiz {
    display: flex;
    width: 80%;
    height: 80%;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    flex-flow: column;
    background-color: #e2e8dd;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.15);
    border-radius: 20px;
  }
}

.libleft {
  height: 127px;
  width: 127px;
  background: url("../assets/libleft.png") no-repeat;
  margin: auto;
  margin-top: 0;
  margin-bottom: 0;
  display: inline-block;
  position: fixed;
}

.libright {
  height: 127px;
  width: 127px;
  background: url("../assets/libright.png") no-repeat;
  margin: auto;
  margin-top: 0;
  margin-bottom: 0;
}

.authleft {
  height: 127px;
  width: 127px;
  background: url("../assets/authleft.png") no-repeat;
  margin: auto;
  margin-top: 0;
  margin-bottom: 0;
}

.authright {
  height: 127px;
  width: 127px;
  background: url("../assets/authright.png") no-repeat;
  margin: auto;
  margin-top: 0;
  margin-bottom: 0;
}

h1 {
  font-weight: 600;
}

/* H2 */
.box-score h2 {
  padding: 0;
  margin: 0;
}

button {
  padding: 0;
  margin: 0;
}
</style>
