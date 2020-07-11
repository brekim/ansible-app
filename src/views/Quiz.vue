<template>
  <div class="container-app">
      <div class="container-quiz">
          <div class="quiz-header">
              <h1>Political Compass Test</h1>
          </div>

          <div class="quiz-main" v-for="(element, index) in questions.slice(a, b)" :key="index" v-show="quiz">
              <div class="box-question">
                  <h2>Question {{b}}/{{questions.length}}</h2>
                  <p>{{element.question}}</p>
              </div>
              
              <div class="box-suggestions">
                <ul>
                    <li v-for="(item, index) in element.suggestions" :key="index" :class="select ? check(item) : ''" @click="selectResponse(item)">{{item.suggestion}}</li>
                </ul>
              </div>
          </div>

          <div class="box-score" v-if="score_show">
              <h2>Score:</h2>
              <h2>{{score}}</h2>
              
              <div class="btn-retake">
                  <button @click="restartQuiz">
                      Retake
                  </button>
              </div>
          </div>

          <div class="quiz-footer">
              <div class="box-button">
                  <button @click="skipQuestion" :style="!next ? 'background-color: gray' : ''">No Opinion</button>
                  <button @click="nextQuestion" :style="next ? 'background-color: gray' : ''">Next</button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "quiz",
  data() {
      return {
          questions: [
            {
                question: 'Example Question', suggestions: [
                    {suggestion: 'Hello'},
                    {suggestion: 'Salt'},
                    {suggestion: 'Rice'},
                    {suggestion: 'Pineapple', correct:true},
                ]
            },

            {
                question: '', suggestions: [
                    {suggestion: ''},
                    {suggestion: ''},
                    {suggestion: ''},
                    {suggestion: ''},
                ]
            },

            {
                question: '', suggestions: [
                    {suggestion: ''},
                    {suggestion: ''},
                    {suggestion: ''},
                    {suggestion: ''},
                ]
            },

            {
                question: '', suggestions: [
                    {suggestion: ''},
                    {suggestion: ''},
                    {suggestion: ''},
                    {suggestion: ''},
                ]
            },

            {
                question: '', suggestions: [
                    {suggestion: ''},
                    {suggestion: ''},
                    {suggestion: ''},
                    {suggestion: ''},
                ]
            },

            {
                question: '', suggestions: [
                    {suggestion: ''},
                    {suggestion: ''},
                    {suggestion: ''},
                    {suggestion: ''},
                ]
            },
          ],

          a: 0,
          b: 1,
          select: false,
          score: 0,
          quiz: true,
          score_show: false,
          next: false,
      }
  },

  methods: {
      selectResponse(item) {
          this.select = true;
          this.next = true;

          if (item.correct) {
              this.score += 2;
          }
      },

      check(status) {
          if (status.correct) {
              return 'correct'
          } else {
              return 'incorrect'
          }
      },

      nextQuestion() {
          if(!this.next) {
              return;
          }

          if (this.questions.length - 1 == this.a) {
              this.score_show = true;
              this.quiz = false;
          } else {
              this.a++;
              this.b++;
              this.select = false;
          }
      },

      skipQuestion() {
          if (this.next) {
              return;
          }

          if (this.questions.length - 1 == this.a) {
              this.score_show = true;
              this.quiz = false;
          } else {
              this.a++;
              this.b++;
          }
      },

      restartQuiz() {
        //Resets the data
          Object.assign(this.$data, this.$options.data());
      }
  }
};
</script>

<style scoped>
* {
    font-family: 'Source Sans Pro', Arial, sans-serif;
    margin: 0;
}

#app {
    text-align: center;
    color: black;
    margin-top: 80px;
}

.container-app {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
}

.container-quiz {
    display: flex;
    width: 40%;
    height: 85%;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    flex-flow: column;
    border: 2px solid blue;
    background-color: red;
    box-shadow: 0 10px 50px rgba(0, 0, 0, 1);
    border-radius: 20px;
}

.quiz-header {
    display: flex;
    width: 100%;
    height: 20%;
    border-bottom: 1px solid yellow;
    justify-content: center;
    align-items: center;
    background-color: green;
    border-radius: 20px 20px 0px 0px;
}

.quiz-main {
    display: flex;
    width: 100%;
    height: 70%;
    flex-flow: column;
    margin: auto;
}

.quiz-footer {
    display: flex;
    width: 100%;
    height: 10%;
    justify-content: center;
    border-top: 1px solid orange;
    background-color: purple;
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
    border: 1px solid pink;
    margin-bottom: 20px;
    border-radius: 15px;
    cursor: pointer;
}

li:hover {
    background-color: orange;
}

.box-button {
    display: flex;
    width: 100%;
}

.box-button button {
    width: 150px;
    height: 35px;
    outline: none;
    border: 0;
    color: purple;
    font-size: 1.2em;
    cursor: pointer;
    border-radius: 20px;
    margin: auto;
    background-color: rgb(98, 7, 7);
}

li.correct {
    border: 1px solid greenyellow;
    background-color: greenyellow;
    font-weight: 600;
    color: white;
}

li.incorrect {
    border: 1px solid orangered;
    background-color: orangered;
    font-weight: 600;
    color: white;
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
</style>