<template>
  <div class="min-h-screen bg-black relative overflow-hidden">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
      <div class="floating-shape shape-4"></div>
    </div>

    <div class="relative z-10 py-4 px-4">
      <div class="max-w-4xl mx-auto">
        <div
          class="flex items-center justify-between bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
        >
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 flex items-center justify-center">
              <img
                src="@/assets/logo_untag.png"
                alt="Logo"
                class="w-10 h-10 object-contain rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h1 class="text-white font-bold text-lg">UNTAG Quiz</h1>
              <p class="text-white/80 text-sm">Universitas 17 Agustus 1945</p>
            </div>
          </div>

          <div class="text-center">
            <div class="text-white/80 text-sm mb-1">Total Waktu</div>
            <div class="text-2xl font-bold text-white">
              {{ formatTime(timeRemaining) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative z-10 px-4 pb-8">
      <div class="max-w-4xl mx-auto">
        <div v-if="!showResult" class="space-y-6">
          <div
            class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
          >
            <div class="flex items-center justify-between mb-4">
              <span class="text-white font-semibold">
                Soal {{ currentQuestion + 1 }} dari {{ questions.length }}
              </span>
              <div class="flex space-x-2">
                <div
                  v-for="(q, index) in questions"
                  :key="index"
                  class="w-3 h-3 rounded-full transition-all duration-300"
                  :class="[
                    index === currentQuestion
                      ? 'bg-yellow-400 scale-125'
                      : userAnswers[index]
                      ? 'bg-green-400'
                      : 'bg-white/30',
                  ]"
                ></div>
              </div>
            </div>

            <div class="w-full bg-white/20 rounded-full h-2 overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500 ease-out"
                :style="{ width: progressPercentage + '%' }"
              ></div>
            </div>
          </div>

          <div
            class="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="text-white/80 text-sm">Waktu per soal</span>
              <span class="text-white font-bold">{{
                formatTime(questionTimeRemaining)
              }}</span>
            </div>
            <div class="w-full bg-white/20 rounded-full h-3 overflow-hidden">
              <div
                class="h-full transition-all duration-1000 ease-linear"
                :class="[
                  questionTimeRemaining > 20
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                    : questionTimeRemaining > 10
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                    : 'bg-gradient-to-r from-red-400 to-red-600',
                ]"
                :style="{ width: (questionTimeRemaining / 60) * 100 + '%' }"
              ></div>
            </div>
          </div>

          <transition name="slide-fade" mode="out-in">
            <div
              :key="currentQuestion"
              class="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500"
            >
              <div class="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
                <h2 v-if="questions[currentQuestion]">
                  {{ questions[currentQuestion].question }}
                </h2>
              </div>

              <div v-if="questions.length && questions[currentQuestion]">
                <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    v-for="(choice, index) in questions[currentQuestion].choices"
                    :key="index"
                    class="answer-choice cursor-pointer transform transition-all duration-300 hover:scale-105"
                    :class="[
                      getChoiceColor(index),
                      userAnswers[currentQuestion] === choice
                        ? 'ring-4 ring-white shadow-2xl scale-105'
                        : 'hover:shadow-xl',
                    ]"
                    @click="selectAnswer(choice)"
                  >
                    <div
                      class="p-6 rounded-2xl text-white font-semibold text-lg flex items-center justify-center min-h-[80px] text-center"
                    >
                      <div>
                        <div class="text-sm opacity-80 mb-1">
                          {{ ["A", "B", "C", "D"][index] }}
                        </div>
                        <div>{{ choice }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-else>
                <p class="text-white">Loading soal...</p>
              </div>

              <div class="p-6 bg-gray-50 flex justify-end items-center">
                <div class="flex space-x-3">
                  <button
                    v-if="currentQuestion < questions.length - 1"
                    @click="nextQuestion"
                    :disabled="!userAnswers[currentQuestion]"
                    class="px-8 py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50"
                    :class="
                      userAnswers[currentQuestion]
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                        : 'bg-gray-200 text-gray-400'
                    "
                  >
                    Selanjutnya →
                  </button>

                  <button
                    v-else
                    @click="submitQuiz"
                    :disabled="!userAnswers[currentQuestion]"
                    class="px-8 py-3 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50"
                    :class="
                      userAnswers[currentQuestion]
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 pulse'
                        : 'bg-gray-200 text-gray-400'
                    "
                  >
                    🎯 Selesai
                  </button>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <div v-else class="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div class="bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-center">
            <div class="text-8xl mb-4">{{ score >= 5 ? "🎉" : "😔" }}</div>
            <h2 class="text-3xl font-bold text-white mb-2">Quiz Selesai!</h2>
            <p class="text-white/90">Hasil seleksi quiz UNTAG Surabaya</p>
          </div>

          <div class="p-8 text-center">
            <div class="mb-8">
              <div
                class="inline-block bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-8 mb-6"
              >
                <div
                  class="text-6xl font-bold mb-2"
                  :class="score >= 5 ? 'text-green-600' : 'text-red-600'"
                >
                  {{ score }}
                </div>
                <div class="text-gray-600 text-lg">
                  dari {{ questions.length }} soal benar
                </div>
                <div class="text-gray-500 mt-2">
                  Akurasi: {{ Math.round((score / questions.length) * 100) }}%
                </div>
              </div>
            </div>

            <div class="mb-8">
              <div class="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                <h3 class="text-2xl font-bold text-blue-800 mb-2">
                  ✅ Quiz Telah Selesai
                </h3>
                <p class="text-blue-700 text-lg">
                  Terima kasih telah mengikuti seleksi quiz UNTAG Surabaya.
                </p>
                <p class="text-blue-600 mt-2">
                  Hasil kelulusan akan diumumkan oleh panitia secara terpisah.
                </p>
              </div>
            </div>

            <div class="mb-8">
              <h4 class="text-xl font-bold text-gray-800 mb-4">Detail Jawaban</h4>
              <div class="space-y-3">
                <div
                  v-for="(question, index) in questions"
                  :key="index"
                  class="flex items-center justify-between p-4 rounded-xl"
                  :class="
                    userAnswers[index] === question.correct
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-red-50 border border-red-200'
                  "
                >
                  <div class="text-left">
                    <div class="font-medium text-gray-800">Soal {{ index + 1 }}</div>
                    <div class="text-sm text-gray-600">
                      {{ question.question.substring(0, 50) }}...
                    </div>
                  </div>
                  <div class="text-2xl">
                    {{ userAnswers[index] === question.correct ? "✅" : "❌" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative z-10 text-center py-6 text-white/80">
      <p>&copy; 2025 Universitas 17 Agustus 1945 Surabaya</p>
    </div>
  </div>
</template>

<script>
import treasureService from "@/service/treasureService";

export default {
  name: "UntagQuiz",
  data() {
    return {
      currentQuestion: 0,
      userAnswers: [],
      showResult: false,
      score: 0,
      timeRemaining: 1800,
      questionTimeRemaining: 60,
      globalTimer: null,
      questionTimer: null,
      questions: [],
      settings: {},
    };
  },
  computed: {
    progressPercentage() {
      return ((this.currentQuestion + 1) / this.questions.length) * 100;
    },
  },
  async mounted() {
    await this.fetchQuizData();
    this.startTimers();
  },
  beforeUnmount() {
    this.clearTimers();
  },
  methods: {
    async fetchQuizData() {
      try {
        const questionsRes = await treasureService.getQuizQuestions();
        const settingsRes = await treasureService.getQuizSettings();

        this.questions = questionsRes.data || [];
        this.settings = settingsRes.data || {};

        // Atur timer dari settings jika ada
        if (this.settings.time_remaining) {
          this.timeRemaining = this.settings.time_remaining;
        }
        if (this.settings.question_time) {
          this.questionTimeRemaining = this.settings.question_time;
        }

        // Jika randomize_questions true, acak soal
        if (this.settings.randomize_questions) {
          this.questions = this.shuffleArray(this.questions);
        }
      } catch (error) {
        console.error("Failed to load quiz data:", error);
      }
    },

    startTimers() {
      this.globalTimer = setInterval(() => {
        if (this.timeRemaining > 0) {
          this.timeRemaining--;
        } else {
          this.submitQuiz();
        }
      }, 1000);

      this.startQuestionTimer();
    },

    startQuestionTimer() {
      if (this.questionTimer) clearInterval(this.questionTimer);
      this.questionTimeRemaining = this.settings.question_time || 60;

      this.questionTimer = setInterval(() => {
        if (this.questionTimeRemaining > 0) {
          this.questionTimeRemaining--;
        } else {
          this.autoNextQuestion();
        }
      }, 1000);
    },

    clearTimers() {
      if (this.globalTimer) clearInterval(this.globalTimer);
      if (this.questionTimer) clearInterval(this.questionTimer);
    },

    autoNextQuestion() {
      if (this.currentQuestion < this.questions.length - 1) {
        this.nextQuestion();
      } else {
        this.submitQuiz();
      }
    },

    shuffleArray(array) {
      let arr = array.slice();
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    },

    formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    },

    getChoiceColor(index) {
      const colors = [
        "bg-gradient-to-r from-red-400 to-red-500",
        "bg-gradient-to-r from-blue-400 to-blue-500",
        "bg-gradient-to-r from-green-400 to-green-500",
        "bg-gradient-to-r from-yellow-400 to-yellow-500",
      ];
      return colors[index];
    },

    selectAnswer(choice) {
      this.userAnswers[this.currentQuestion] = choice;
    },

    nextQuestion() {
      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion++;
        this.startQuestionTimer();
      }
    },

    async submitQuiz() {
      this.clearTimers();

      const payload = this.questions.map((q, i) => ({
        question_id: q.id,
        selected: this.userAnswers[i] || "",
      }));

      try {
        const res = await treasureService.submitQuizAnswers(payload); 
        this.score = res.data.score;
        this.showResult = true;
      } catch (error) {
        console.error("Failed to submit answers:", error.response?.data || error);
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap");

* {
  font-family: "Inter", sans-serif;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 100px;
  height: 100px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 10%;
  animation-delay: -2s;
}

.shape-3 {
  width: 80px;
  height: 80px;
  bottom: 20%;
  left: 15%;
  animation-delay: -4s;
}

.shape-4 {
  width: 120px;
  height: 120px;
  top: 30%;
  right: 20%;
  animation-delay: -1s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

.answer-choice {
  position: relative;
  overflow: hidden;
}

.answer-choice::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.answer-choice:hover::before {
  left: 100%;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  transform: translateX(30px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .floating-shape {
    display: none;
  }

  .answer-choice {
    margin-bottom: 0.5rem;
  }
}
</style>
