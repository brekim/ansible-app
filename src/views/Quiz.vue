<template>
  <div class="container-app">
      <div class="container-quiz">
          <div class="quiz-header">
              <h1>Political Compass Test</h1>
          </div>

          <div class="quiz-main" v-for="(element, index) in questions.slice(beginIndex, endIndex)" :key="index" v-show="quiz">
              <div class="box-question">
                  <h2>Question {{endIndex}}/{{questions.length}}</h2>
                  <p>{{element.question}}</p>
              </div>
              
              <div class="box-suggestions">
                <ul>
                    <li v-for="(item, index) in element.suggestions" :key="index">{{item.suggestion}}</li> <!-- :class="select ? check(item) : ''" @click="selectResponse(item)" -->
                </ul>
              </div>
          </div>

          <div class="box-score" v-if="score_show">
              <h2>Economic:</h2>
              <h2>{{economic}}</h2>
              
              <div class="btn-retake">
                  <button @click="restartQuiz">
                      Retake
                  </button>
              </div>
          </div>

          <div class="quiz-footer">
              <div class="box-button">
                  <button @click="skipQuestion" :style="next ? 'background-color: gray' : ''">No Opinion</button>
                  <button @click="nextQuestion" :style="!next ? 'background-color: gray' : ''">Next</button>
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
                question: 'Freedom of big business is the best practical way a society can prosper', suggestions: [
                    {suggestion: 'Strongly agree', stat:1},
                    {suggestion: 'Slightly agree', stat:2},
                    {suggestion: 'Slightly disagree', stat:3},
                    {suggestion: 'Strongly disagree', stat:4},
                ]
            },

            {
                question: 'The current welfare system should be expanded to further combat inequality.', suggestions: [
                    {suggestion: 'Strongly agree'},
                    {suggestion: 'Slightly agree'},
                    {suggestion: 'Slightly disagree'},
                    {suggestion: 'Strongly disagree', correct:true},
                ]
            },

            {
                question: 'A government that provides for everyone is an inherently good idea.', suggestions: [
                    {suggestion: 'Strongly agree'},
                    {suggestion: 'Slightly agree'},
                    {suggestion: 'Slightly disagree'},
                    {suggestion: 'Strongly disagree', correct:true},
                ]
            },

            {
                question: 'The harder you work, the more you progress up the social ladder.', suggestions: [
                    {suggestion: 'Strongly agree'},
                    {suggestion: 'Slightly agree'},
                    {suggestion: 'Slightly disagree'},
                    {suggestion: 'Strongly disagree', correct:true},
                ]
            },

            {
                question: 'Class is the primary division of society.', suggestions: [
                    {suggestion: 'Strongly agree'},
                    {suggestion: 'Slightly agree'},
                    {suggestion: 'Slightly disagree'},
                    {suggestion: 'Strongly disagree', correct:true},
                ]
            },
          ],

          beginIndex: 0,
          endIndex: 1,
          select: false,
          economic: 0,
          quiz: true,
          score_show: false,
          next: false,
      }
  },

  methods: {
      selectResponse(item) {
          this.select = true;
          this.next = true;

          switch (item.stat) {
              case 1:
                  this.economic += 2;
                  console.log(this.economic);
                  break;
              case 2:
                  this.economic += 1;
                  console.log(this.economic);
                  break;
              case 3:
                  this.economic -= 1;
                  console.log(this.economic);
                  break;
              case 4:
                  this.economic -= 2;
                  console.log(this.economic);
                  break;
          }
      },

      /*
      check(status) {
          if (status.correct) {
              return 'correct';
          } else {
              return 'incorrect';
          }
      },
      */

      nextQuestion() {
          if(!this.next) {
              return;
          }

          if (this.questions.length - 1 == this.a) {
              this.score_show = true;
              this.quiz = false;
          } else {
              this.beginIndex++;
              this.endIndex++;
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
              this.beginIndex++;
              this.endIndex++;
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

    /* Get rid of this later
    li.correct {
        border: 1px solid greenyellow;
        background-color: greenyellow;
        font-weight: 600;
        color: #e2e8dd;
    }

    li.incorrect {
        border: 1px solid orangered;
        background-color: orangered;
        font-weight: 600;
        color: #e2e8dd;
    }
    */

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
</style>