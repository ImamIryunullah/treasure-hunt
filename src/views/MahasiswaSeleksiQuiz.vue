<template>
  <div class="flex min-h-screen bg-gray-100">
    <SidebarMahasiswa />

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <i class="fas fa-clock text-red-600 text-lg"></i>
              </div>
              <div>
                <p class="text-sm text-gray-500">Waktu Tersisa</p>
                <p class="text-lg font-bold" :class="timeRemaining <= 60 ? 'text-red-600' : 'text-gray-900'">
                  {{ formatTime(timeRemaining) }}
                </p>
              </div>
            </div>
          </div>

          
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <p class="text-sm text-gray-500">Progress</p>
              <p class="text-lg font-bold text-blue-600">
                {{ currentQuestionIndex + 1 }} / {{ questions.length }}
              </p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <i class="fas fa-chart-line text-blue-600 text-lg"></i>
            </div>
          </div>
        </div>

        
        <div class="mt-6">
          <div class="flex justify-between text-sm text-gray-500 mb-2">
            <span>Soal {{ currentQuestionIndex + 1 }}</span>
            <span>{{ Math.round(((currentQuestionIndex + 1) / questions.length) * 100) }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              :style="{ width: ((currentQuestionIndex + 1) / questions.length) * 100 + '%' }"
            ></div>
          </div>
        </div>
      </div>

      
      <div v-if="currentQuestion" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div class="mb-6">
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {{ getQuestionTypeLabel(currentQuestion.type) }}
            </span>
            <span :class="getDifficultyClass(currentQuestion.difficulty)">
              {{ getDifficultyLabel(currentQuestion.difficulty) }}
            </span>
            <span class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
              <i class="fas fa-clock mr-1"></i>
              {{ Math.ceil(currentQuestion.duration / 60) }} menit
            </span>
          </div>

          <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
            <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              <i class="fas fa-question-circle text-blue-600 mr-2"></i>
              Soal {{ currentQuestionIndex + 1 }}
            </h2>
            <p class="text-base sm:text-lg text-gray-800 leading-relaxed">
              {{ currentQuestion.text }}
            </p>
          </div>
        </div>

        
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            <i class="fas fa-list-ul text-purple-600 mr-2"></i>
            Pilihan Jawaban:
          </h3>
          <div
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            class="relative"
          >
            <input
              :id="`option-${index}`"
              v-model="selectedAnswers[currentQuestionIndex]"
              :value="option.label"
              type="radio"
              class="sr-only"
              @change="handleAnswerChange"
            />
            <label
              :for="`option-${index}`"
              :class="[
                'block p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md',
                selectedAnswers[currentQuestionIndex] === option.label
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              ]"
            >
              <div class="flex items-center space-x-3">
                <div
                  :class="[
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0',
                    selectedAnswers[currentQuestionIndex] === option.label
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  ]"
                >
                  <i
                    v-if="selectedAnswers[currentQuestionIndex] === option.label"
                    class="fas fa-check text-white text-xs"
                  ></i>
                </div>
                <div class="flex-1">
                  <div class="flex items-center space-x-2">
                    <span class="font-bold text-gray-900">{{ option.label }}.</span>
                    <span class="text-gray-800">{{ option.text }}</span>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div class="flex items-center space-x-4">
            <button
              @click="previousQuestion"
              :disabled="currentQuestionIndex === 0"
              :class="[
                'flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors',
                currentQuestionIndex === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              ]"
            >
              <i class="fas fa-chevron-left"></i>
              <span>Sebelumnya</span>
            </button>

            <div class="text-sm text-gray-500">
              {{ answeredCount }} dari {{ questions.length }} soal terjawab
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <button
              v-if="currentQuestionIndex < questions.length - 1"
              @click="nextQuestion"
              class="flex items-center space-x-2 px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              <span>Selanjutnya</span>
              <i class="fas fa-chevron-right"></i>
            </button>

            <button
              v-if="currentQuestionIndex === questions.length - 1"
              @click="showSubmitModal = true"
              :disabled="!canSubmit"
              :class="[
                'flex items-center space-x-2 px-6 py-2 rounded-lg font-medium transition-colors',
                canSubmit
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              ]"
            >
              <i class="fas fa-paper-plane"></i>
              <span>Selesai</span>
            </button>
          </div>
        </div>
      </div>

      
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          <i class="fas fa-th-large text-purple-600 mr-2"></i>
          Navigasi Soal
        </h3>
        <div class="grid grid-cols-5 sm:grid-cols-10 gap-2">
          <button
            v-for="(question, index) in questions"
            :key="index"
            @click="goToQuestion(index)"
            :class="[
              'w-10 h-10 rounded-lg font-medium text-sm transition-all duration-200',
              index === currentQuestionIndex
                ? 'bg-blue-500 text-white shadow-lg'
                : selectedAnswers[index]
                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
          >
            {{ index + 1 }}
          </button>
        </div>
      </div>
    </div>

    
    <div
      v-if="showSubmitModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-xl max-w-md w-full p-6">
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
            <i class="fas fa-exclamation-triangle text-yellow-600 text-xl"></i>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Selesai Mengerjakan?</h3>
          <p class="text-sm text-gray-500 mb-6">
            Pastikan semua jawaban sudah benar. Setelah submit, Anda tidak dapat mengubah jawaban.
          </p>
          
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <div class="text-sm text-gray-600">
              <p><strong>Total Soal:</strong> {{ questions.length }}</p>
              <p><strong>Terjawab:</strong> {{ answeredCount }}</p>
              <p><strong>Belum Terjawab:</strong> {{ questions.length - answeredCount }}</p>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <button
              @click="submitQuiz"
              class="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Ya, Submit
            </button>
            <button
              @click="showSubmitModal = false"
              class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>

    
    <div
      v-if="isLoading"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl p-8 text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p class="text-gray-600">Memuat soal...</p>
      </div>
    </div>

    
    <div
      v-if="toast.show"
      :class="[
        'fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 transition-all duration-300 transform max-w-sm',
        toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white',
        toast.show ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
      ]"
    >
      <div class="flex items-center space-x-2">
        <i
          :class="toast.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"
          class="flex-shrink-0"
        ></i>
        <span class="text-sm">{{ toast.message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarMahasiswa from "@/components/SidebarMahasiswa.vue";
import treasureService from "@/service/treasureService";

export default {
  components:{
    SidebarMahasiswa
  },
  name: "StudentQuiz",
  data() {
    return {
      studentName: "John Doe", // Bisa diambil dari auth atau props
      questions: [],
      currentQuestionIndex: 0,
      selectedAnswers: [],
      timeRemaining: 0,
      timerInterval: null,
      showSubmitModal: false,
      isLoading: false,
      toast: {
        show: false,
        type: "success",
        message: ""
      }
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
    answeredCount() {
      return this.selectedAnswers.filter(answer => answer !== null && answer !== undefined).length;
    },
    canSubmit() {
      return this.answeredCount === this.questions.length;
    }
  },
  mounted() {
    this.fetchQuestions();
  },
  beforeUnmount() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  },
  methods: {
    async fetchQuestions() {
      this.isLoading = true;
      try {
        const response = await treasureService.getQuestions();
        this.questions = response.data.data;
        this.selectedAnswers = new Array(this.questions.length).fill(null);
        this.calculateTotalTime();
        this.startTimer();
      } catch (error) {
        this.showToast("Gagal memuat soal", "error");
        console.error(error);
      }
      this.isLoading = false;
    },
    calculateTotalTime() {
      // Hitung total waktu dari semua soal
      const totalSeconds = this.questions.reduce((total, question) => {
        return total + (question.duration || 300); // default 5 menit jika tidak ada duration
      }, 0);
      this.timeRemaining = totalSeconds;
    },
    startTimer() {
      this.timerInterval = setInterval(() => {
        if (this.timeRemaining > 0) {
          this.timeRemaining--;
        } else {
          this.autoSubmit();
        }
      }, 1000);
    },
    formatTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      
      if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
      }
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    },
    handleAnswerChange() {
      // Auto save jawaban (bisa ditambahkan API call untuk menyimpan progress)
      this.showToast("Jawaban tersimpan", "success");
    },
    previousQuestion() {
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
      }
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      }
    },
    goToQuestion(index) {
      this.currentQuestionIndex = index;
    },
    async submitQuiz() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }
      
      this.isLoading = true;
      try {
        const submissionData = {
          student_name: this.studentName,
          answers: this.questions.map((question, index) => ({
            question_id: question.id,
            selected_answer: this.selectedAnswers[index],
            is_correct: this.checkAnswer(question, this.selectedAnswers[index])
          })),
          total_time: this.calculateUsedTime(),
          submitted_at: new Date().toISOString()
        };
        
        await treasureService.submitQuiz(submissionData);
        
        this.showToast("Quiz berhasil diselesaikan!", "success");
        this.showSubmitModal = false;
        
        // Redirect ke halaman hasil atau dashboard
        setTimeout(() => {
          this.$router.push('/student/results');
        }, 2000);
        
      } catch (error) {
        this.showToast("Gagal mengirim jawaban", "error");
        console.error(error);
      }
      this.isLoading = false;
    },
    autoSubmit() {
      this.showToast("Waktu habis! Quiz otomatis disubmit.", "error");
      this.submitQuiz();
    },
    checkAnswer(question, selectedAnswer) {
      const correctOption = question.options.find(option => option.is_correct);
      return correctOption && correctOption.label === selectedAnswer;
    },
    calculateUsedTime() {
      const totalDuration = this.questions.reduce((total, question) => {
        return total + (question.duration || 300);
      }, 0);
      return totalDuration - this.timeRemaining;
    },
    getQuestionTypeLabel(type) {
      const labels = {
        "multiple-choice": "Pilihan Ganda",
        "true-false": "Benar/Salah",
        "essay": "Essay"
      };
      return labels[type] || type;
    },
    getDifficultyLabel(difficulty) {
      const labels = {
        "mudah": "Mudah",
        "sedang": "Sedang",
        "sulit": "Sulit"
      };
      return labels[difficulty] || difficulty;
    },
    getDifficultyClass(difficulty) {
      const classes = {
        "mudah": "bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium",
        "sedang": "bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium",
        "sulit": "bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
      };
      return classes[difficulty] || "bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium";
    },
    showToast(message, type = "success") {
      this.toast.message = message;
      this.toast.type = type;
      this.toast.show = true;
      setTimeout(() => {
        this.toast.show = false;
      }, 3000);
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>