<template>
    <div class="min-h-screen bg-cover bg-center bg-no-repeat relative" 
         style="background-image: url('https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1586&q=80')">
      
      <!-- Background overlay -->
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <!-- Header with Timer and Stats -->
      <div class="relative z-10 p-4">
        <div class="flex justify-between items-center">
          <!-- Timer -->
          <div class="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl px-4 py-2 text-white">
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="font-medium">{{ formatTime(timeRemaining) }}</span>
            </div>
          </div>
  
          <!-- Quiz Stats -->
          <div class="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl px-4 py-2 text-white">
            <div class="flex items-center space-x-4 text-sm">
              <span>Benar: {{ correctAnswers }}</span>
              <span>Salah: {{ incorrectAnswers }}</span>
              <span>Skor: {{ score }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Content -->
      <div class="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div class="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-3xl">
          
          <!-- Logo -->
          <div class="text-center mb-6">
            <div class="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <div class="text-center">
                <div class="text-xs font-bold text-white">UNIVERSITAS</div>
                <div class="text-xs font-bold text-white">17 AGUSTUS 1945</div>
                <div class="text-xs font-bold text-white">SURABAYA</div>
              </div>
            </div>
          </div>
  
          <!-- Question Title -->
          <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">
            Seberapa kenal kamu dengan kampusmu?
          </h1>
  
          <!-- Question Type and Difficulty Badge -->
          <div class="flex justify-center space-x-3 mb-6">
            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {{ questions[currentQuestion].type }}
            </span>
            <span :class="getDifficultyClass(questions[currentQuestion].difficulty)" 
                  class="px-3 py-1 rounded-full text-sm font-medium">
              {{ getDifficultyText(questions[currentQuestion].difficulty) }}
            </span>
          </div>
  
          <!-- Progress Bar -->
          <div class="mb-8">
            <div class="flex justify-between items-center mb-2">
              <div class="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
                <div class="bg-red-500 h-3 rounded-full transition-all duration-500 ease-out"
                     :style="{ width: progressPercentage + '%' }"></div>
              </div>
            </div>
            <div class="flex justify-between text-sm text-gray-600">
              <span>Pertanyaan {{ currentQuestion + 1 }} dari {{ totalQuestions }}</span>
              <span>{{ Math.round(progressPercentage) }}%</span>
            </div>
          </div>
  
          <!-- Question Card -->
          <div class="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-red-500">
            <div class="flex items-start space-x-3 mb-4">
              <div class="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span class="text-white font-bold text-sm">{{ currentQuestion + 1 }}</span>
              </div>
              <h2 class="text-xl font-semibold text-gray-800 leading-relaxed">
                {{ questions[currentQuestion].question }}
              </h2>
            </div>
            
            <div class="space-y-3 ml-11">
              <div v-for="(option, index) in questions[currentQuestion].options" 
                   :key="index"
                   class="flex items-center p-3 border-2 rounded-lg hover:bg-gray-50 transition-colors"
                   :class="getOptionClass(index)">
                <input 
                  :id="'option-' + index"
                  v-model="selectedAnswer"
                  :value="index"
                  type="radio"
                  name="answer"
                  class="w-4 h-4 text-red-500 border-gray-300 focus:ring-red-500 focus:ring-2"
                />
                <label :for="'option-' + index" 
                       class="ml-3 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors flex-1">
                  {{ option }}
                </label>
              </div>
            </div>
          </div>
  

          <!-- Action Buttons -->
          <div class="flex justify-between items-center space-x-4">
            <div class="flex space-x-2">
              <!-- Previous Button -->
              <button 
                @click="previousQuestion"
                :disabled="currentQuestion === 0"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Sebelumnya
              </button>
  
            </div>
  
            <div class="flex space-x-2">
              <!-- Skip Button -->
              <button 
                @click="skipQuestion"
                class="px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200"
              >
                Lewati
              </button>
  
              <!-- Next Button -->
              <button 
                @click="nextQuestion"
                :disabled="selectedAnswer === null"
                class="px-6 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
              >
                {{ currentQuestion === totalQuestions - 1 ? 'Selesai' : 'Selanjutnya' }}
                <svg v-if="currentQuestion !== totalQuestions - 1" class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
  
          <!-- Question Navigation -->
          <div class="mt-6 p-4 bg-gray-50 rounded-lg">
            <p class="text-sm text-gray-600 mb-2">Navigasi Soal:</p>
            <div class="flex flex-wrap gap-2">
              <button 
                v-for="(question, index) in questions"
                :key="index"
                @click="goToQuestion(index)"
                :class="getQuestionNavClass(index)"
                class="w-8 h-8 rounded-full text-xs font-medium transition-colors duration-200"
              >
                {{ index + 1 }}
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Alert Modal -->
      <div v-if="showAlert" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all duration-300 scale-100">
          <div class="text-center">
            <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4"
                 :class="alertType === 'correct' ? 'bg-green-100' : alertType === 'incorrect' ? 'bg-red-100' : alertType === 'skip' ? 'bg-yellow-100' : 'bg-blue-100'">
              <svg v-if="alertType === 'correct'" class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <svg v-else-if="alertType === 'incorrect'" class="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
              <svg v-else-if="alertType === 'skip'" class="h-8 w-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <svg v-else class="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ alertTitle }}</h3>
            <p class="text-gray-600 mb-6">{{ alertMessage }}</p>
            <button 
              @click="closeAlert"
              class="w-full px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors duration-200"
            >
              OK
            </button>
          </div>
        </div>
      </div>
  
      <!-- Final Results Modal -->
      <div v-if="showResults" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full">
          <div class="text-center">
            <div class="mx-auto flex items-center justify-center h-20 w-20 rounded-full mb-6"
                 :class="getResultClass()">
              <svg class="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Quiz Selesai! 🎉</h2>
            
            <div class="space-y-4 mb-6">
              <div class="bg-gray-50 rounded-lg p-4">
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div class="text-center">
                    <div class="text-2xl font-bold text-green-600">{{ correctAnswers }}</div>
                    <div class="text-gray-600">Benar</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-red-600">{{ incorrectAnswers }}</div>
                    <div class="text-gray-600">Salah</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-yellow-600">{{ skippedAnswers }}</div>
                    <div class="text-gray-600">Dilewati</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-blue-600">{{ score }}</div>
                    <div class="text-gray-600">Skor</div>
                  </div>
                </div>
              </div>
              
              <div class="text-center">
                <div class="text-3xl font-bold text-gray-900">{{ Math.round(percentage) }}%</div>
                <div class="text-gray-600">{{ getPerformanceMessage() }}</div>
              </div>
            </div>
  
            <div class="flex space-x-3">
              <button 
                @click="restartQuiz"
                class="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors duration-200"
              >
                Ulangi Quiz
              </button>
              <button 
                @click="reviewAnswers"
                class="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200"
              >
                Review Jawaban
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed, reactive, onMounted, onUnmounted } from 'vue';
  
  export default {
    name: 'UntagQuiz',
    setup() {
      const currentQuestion = ref(0);
      const selectedAnswer = ref(null);
      const showAlert = ref(false);
      const showResults = ref(false);
      const alertType = ref('');
      const alertTitle = ref('');
      const alertMessage = ref('');
      const userAnswers = ref([]);
      const score = ref(0);
      const correctAnswers = ref(0);
      const incorrectAnswers = ref(0);
      const skippedAnswers = ref(0);
      const timeRemaining = ref(1800); // 30 minutes in seconds
      const timerInterval = ref(null);
  
      const questions = reactive([
        {
          question: "Kapan Universitas 17 Agustus 1945 Surabaya didirikan?",
          options: [
            "17 Agustus 1945",
            "17 Agustus 1958",
            "17 Agustus 1962",
            "17 Agustus 1955"
          ],
          correctAnswer: 1,
          type: "Pilihan Ganda",
          difficulty: "mudah",
        
        },
        {
          question: "Siapa pendiri Universitas 17 Agustus 1945 Surabaya?",
          options: [
            "Dr. Soekarno",
            "Prof. Dr. Drs. H. Soedjono Humardani",
            "Bung Tomo",
            "Dr. Soetomo"
          ],
          correctAnswer: 2,
          type: "Pilihan Ganda",
          difficulty: "sedang",
         
        },
        {
          question: "Berapa jumlah fakultas yang ada di UNTAG Surabaya?",
          options: [
            "5 Fakultas",
            "6 Fakultas",
            "7 Fakultas",
            "8 Fakultas"
          ],
          correctAnswer: 1,
          type: "Pilihan Ganda",
          difficulty: "sedang"
        },
        {
          question: "Apa visi UNTAG Surabaya?",
          options: [
            "Menjadi universitas terkemuka di Indonesia",
            "Menjadi universitas bereputasi internasional",
            "Menjadi universitas yang unggul dalam pendidikan dan penelitian",
            "Menjadi universitas yang berkarakter dan bermartabat"
          ],
          correctAnswer: 3,
          type: "Pilihan Ganda",
          difficulty: "sulit"
        },
        {
          question: "Dimana lokasi kampus utama UNTAG Surabaya?",
          options: [
            "Jalan Semolowaru 45",
            "Jalan Arief Rahman Hakim 150",
            "Jalan Dukuh Kupang 17",
            "Jalan Ngagel Jaya Selatan"
          ],
          correctAnswer: 0,
          type: "Pilihan Ganda",
          difficulty: "mudah",
        }
      ]);
  
      const totalQuestions = computed(() => questions.length);
      
      const progressPercentage = computed(() => {
        return ((currentQuestion.value + 1) / totalQuestions.value) * 100;
      });
  
      const percentage = computed(() => {
        return (correctAnswers.value / totalQuestions.value) * 100;
      });
  
      // Timer functions
      const startTimer = () => {
        timerInterval.value = setInterval(() => {
          if (timeRemaining.value > 0) {
            timeRemaining.value--;
          } else {
            finishQuiz();
          }
        }, 1000);
      };
  
      const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
      };
  
      // Question navigation
      const goToQuestion = (index) => {
        if (index >= 0 && index < totalQuestions.value) {
          currentQuestion.value = index;
          selectedAnswer.value = userAnswers.value[index]?.answer || null;
        }
      };
  
      const getQuestionNavClass = (index) => {
        if (index === currentQuestion.value) {
          return 'bg-red-500 text-white';
        } else if (userAnswers.value[index]) {
          const answer = userAnswers.value[index];
          if (answer.status === 'correct') {
            return 'bg-green-500 text-white';
          } else if (answer.status === 'incorrect') {
            return 'bg-red-200 text-red-800';
          } else if (answer.status === 'skipped') {
            return 'bg-yellow-200 text-yellow-800';
          }
        }
        return 'bg-gray-200 text-gray-700 hover:bg-gray-300';
      };
  
      const getOptionClass = (index) => {
        if (selectedAnswer.value === index) {
          return 'border-red-500 bg-red-50';
        }
        return 'border-gray-200 hover:border-gray-300';
      };
  
      const getDifficultyClass = (difficulty) => {
        const classes = {
          'mudah': 'bg-green-100 text-green-800',
          'sedang': 'bg-yellow-100 text-yellow-800',
          'sulit': 'bg-red-100 text-red-800'
        };
        return classes[difficulty] || 'bg-gray-100 text-gray-800';
      };
  
      const getDifficultyText = (difficulty) => {
        const texts = {
          'mudah': 'Mudah',
          'sedang': 'Sedang',
          'sulit': 'Sulit'
        };
        return texts[difficulty] || 'Unknown';
      };
  
      const getResultClass = () => {
        const percent = percentage.value;
        if (percent >= 80) return 'bg-green-100 text-green-600';
        if (percent >= 60) return 'bg-yellow-100 text-yellow-600';
        return 'bg-red-100 text-red-600';
      };
  
      const getPerformanceMessage = () => {
        const percent = percentage.value;
        if (percent >= 90) return 'Luar Biasa! 🌟';
        if (percent >= 80) return 'Sangat Baik! 👏';
        if (percent >= 70) return 'Baik! 👍';
        if (percent >= 60) return 'Cukup Baik 👌';
        return 'Perlu Belajar Lebih Giat 📚';
      };
  
      const showAlertModal = (type, title, message) => {
        alertType.value = type;
        alertTitle.value = title;
        alertMessage.value = message;
        showAlert.value = true;
      };
  
      const closeAlert = () => {
        showAlert.value = false;
        
        if (alertType.value === 'finish') {
          showResults.value = true;
        } else {
          // Move to next question after showing result
          if (currentQuestion.value < totalQuestions.value - 1) {
            currentQuestion.value++;
            selectedAnswer.value = userAnswers.value[currentQuestion.value]?.answer || null;
          } else {
            finishQuiz();
          }
        }
      };
  
      const nextQuestion = () => {
        if (selectedAnswer.value === null) return;
  
        // Save answer
        const isCorrect = selectedAnswer.value === questions[currentQuestion.value].correctAnswer;
        userAnswers.value[currentQuestion.value] = {
          answer: selectedAnswer.value,
          status: isCorrect ? 'correct' : 'incorrect'
        };
  
        if (isCorrect) {
          correctAnswers.value++;
          score.value += getQuestionPoints();
          showAlertModal('correct', 'Jawaban Benar! 🎉', 'Selamat, jawaban Anda benar!');
        } else {
          incorrectAnswers.value++;
          const correctOption = questions[currentQuestion.value].options[questions[currentQuestion.value].correctAnswer];
          showAlertModal('incorrect', 'Jawaban Salah 😞', `Jawaban yang benar adalah: ${correctOption}`);
        }
  
        // If it's the last question, show final result
        if (currentQuestion.value === totalQuestions.value - 1) {
          setTimeout(() => {
            showAlertModal('finish', 'Quiz Selesai! 🏆', 'Terima kasih telah mengikuti quiz!');
          }, 2000);
        }
      };
  
      const skipQuestion = () => {
        userAnswers.value[currentQuestion.value] = {
          answer: null,
          status: 'skipped'
        };
        skippedAnswers.value++;
        showAlertModal('skip', 'Soal Dilewati', 'Anda telah melewati soal ini.');
      };
  
      const previousQuestion = () => {
        if (currentQuestion.value > 0) {
          currentQuestion.value--;
          selectedAnswer.value = userAnswers.value[currentQuestion.value]?.answer || null;
        }
      };
  
      const getQuestionPoints = () => {
        const difficulty = questions[currentQuestion.value].difficulty;
        const points = {
          'mudah': 10,
          'sedang': 15,
          'sulit': 20
        };
        return points[difficulty] || 10;
      };
  
      const finishQuiz = () => {
        clearInterval(timerInterval.value);
        showResults.value = true;
      };
  
      const restartQuiz = () => {
        currentQuestion.value = 0;
        selectedAnswer.value = null;
        userAnswers.value = [];
        score.value = 0;
        correctAnswers.value = 0;
        incorrectAnswers.value = 0;
        skippedAnswers.value = 0;
        showResults.value = false;
        timeRemaining.value = 1800;
        startTimer();
      };
  
      const reviewAnswers = () => {
        showResults.value = false;
        currentQuestion.value = 0;
        selectedAnswer.value = userAnswers.value[0]?.answer || null;
      };
  
      onMounted(() => {
        startTimer();
      });
  
      onUnmounted(() => {
        if (timerInterval.value) {
          clearInterval(timerInterval.value);
        }
      });
  
      return {
        currentQuestion,
        selectedAnswer,
        showAlert,
        showResults,
        alertType,
        alertTitle,
        alertMessage,
        questions,
        totalQuestions,
        progressPercentage,
        score,
        correctAnswers,
        incorrectAnswers,
        skippedAnswers,
        percentage,
        timeRemaining,
        nextQuestion,
        previousQuestion,
        skipQuestion,
        closeAlert,
        goToQuestion,
        getQuestionNavClass,
        getOptionClass,
        getDifficultyClass,
        getDifficultyText,
        getResultClass,
        getPerformanceMessage,
        formatTime,
        restartQuiz,
        reviewAnswers
      };
    }
  };
  </script>
  
  <style scoped>
  /* Custom animations */
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-slide-in {
    animation: slideIn 0.3s ease-out;
  }
  
  /* Custom radio button styles */
  input[type="radio"]:checked {
    background-color: #ef4444;
    border-color: #ef4444;
  }
  
  input[type="radio"]:focus {
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
  }
  
  /* Progress bar animation */
  .progress-bar {
    transition: width 0.5s ease-in-out;
  }
  
  /* Button hover effects */
  button:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  button:active {
    transform: translateY(0);
  }
  
  /* Alert modal animation */
  .modal-enter-active,
  .modal-leave-active {
    transition: all 0.3s ease;
  }
  
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
    transform: scale(0.8);
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: #a1a1a1;
        }

        /* Backdrop blur fallback */
        .backdrop-blur-sm {
            backdrop-filter: blur(4px);
        }

        /* Additional animations */
        @keyframes pulse {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.5;
            }
        }

        .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Glass effect */
        .glass-effect {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Smooth transitions */
        .transition-all {
            transition: all 0.3s ease;
        }
    </style>