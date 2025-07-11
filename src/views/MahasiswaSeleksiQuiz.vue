<template>
    <div class="flex min-h-screen bg-gray-50">
      <SidebarMahasiswa 
      />
  
      
      <div class="flex-1 p-8">
        <div class="max-w-2xl mx-auto">
          
          <div class="bg-white rounded-lg shadow-sm border p-8 text-center mb-6">
            
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
  
            
            <h1 class="text-2xl font-bold text-gray-800 mb-2">Seleksi Cepat Mahasiswa Baru</h1>
            <p class="text-gray-600">Jawab 7 pertanyaan tentang universitas untuk melanjutkan ke tahap berikutnya</p>
          </div>
  
          
          <div class="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">Instruksi:</h2>
            <ul class="space-y-2 text-gray-700">
              <li class="flex items-start">
                <span class="text-blue-600 mr-2">•</span>
                <span>Waktu pengerjaan: 30 menit</span>
              </li>
              <li class="flex items-start">
                <span class="text-blue-600 mr-2">•</span>
                <span>Total 7 pertanyaan pilihan ganda</span>
              </li>
              <li class="flex items-start">
                <span class="text-blue-600 mr-2">•</span>
                <span>Jawab semua pertanyaan sebelum submit</span>
              </li>
              <li class="flex items-start">
                <span class="text-blue-600 mr-2">•</span>
                <span>Tidak bisa mengulang setelah submit</span>
              </li>
            </ul>
          </div>
  
          
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-center">
            <svg class="w-5 h-5 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div class="flex-1">
              <span class="text-yellow-800 font-medium">Waktu Tersedia</span>
              <span class="text-yellow-600 float-right">30 Menit</span>
            </div>
          </div>
  
          <button 
            @click="startQuiz"
            class="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-4 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Mulai Seleksi
          </button>
  
          <div v-if="showQuizModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              
              <div class="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                <h3 class="text-lg font-semibold text-gray-800">
                  Pertanyaan {{ currentQuestion + 1 }} dari {{ questions.length }}
                </h3>
                <div class="flex items-center space-x-4">
                  <div class="text-sm text-gray-600">
                    Waktu: <span class="font-medium text-red-600">{{ formatTime(timeLeft) }}</span>
                  </div>
                  <button @click="closeQuiz" class="text-gray-400 hover:text-gray-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div class="p-6">
                <div class="mb-6">
                  <div class="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{{ Math.round(((currentQuestion + 1) / questions.length) * 100) }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      :style="{ width: ((currentQuestion + 1) / questions.length) * 100 + '%' }"
                    ></div>
                  </div>
                </div>

                <div class="mb-6">
                  <h4 class="text-lg font-medium text-gray-800 mb-4">
                    {{ questions[currentQuestion].question }}
                  </h4>
                  <div class="space-y-3">
                    <div 
                      v-for="(option, index) in questions[currentQuestion].options" 
                      :key="index"
                      class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      :class="{ 'border-blue-500 bg-blue-50': selectedAnswers[currentQuestion] === index }"
                      @click="selectAnswer(index)"
                    >
                      <input 
                        type="radio" 
                        :checked="selectedAnswers[currentQuestion] === index"
                        class="mr-3 text-blue-600"
                        readonly
                      />
                      <span class="text-gray-700">{{ option }}</span>
                    </div>
                  </div>
                </div>
  
                <div class="flex justify-between">
                  <button 
                    @click="previousQuestion"
                    :disabled="currentQuestion === 0"
                    class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Sebelumnya
                  </button>
                  
                  <button 
                    v-if="currentQuestion < questions.length - 1"
                    @click="nextQuestion"
                    :disabled="selectedAnswers[currentQuestion] === undefined"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Selanjutnya
                  </button>
                  
                  <button 
                    v-else
                    @click="submitQuiz"
                    :disabled="!isAllQuestionsAnswered"
                    class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Submit Quiz
                  </button>
                </div>  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import SidebarMahasiswa from '@/components/SidebarMahasiswa.vue';
  import { ref, reactive, computed, onUnmounted } from "vue";
  
  export default {
    components: {
      SidebarMahasiswa
    },
    setup() {
      const showQuizModal = ref(false);
      const currentQuestion = ref(0);
      const selectedAnswers = ref({});
      const timeLeft = ref(30 * 60); // 30 minutes in seconds
      const timer = ref(null);
  
      const questions = reactive([
        {
          question: "Apa singkatan dari universitas tempat Anda mendaftar?",
          options: ["UGM", "UI", "ITB", "UNAIR"]
        },
        {
          question: "Tahun berapa universitas ini didirikan?",
          options: ["1945", "1950", "1955", "1960"]
        },
        {
          question: "Siapa rektor pertama universitas ini?",
          options: ["Prof. Dr. A", "Prof. Dr. B", "Prof. Dr. C", "Prof. Dr. D"]
        },
        {
          question: "Berapa jumlah fakultas yang ada di universitas ini?",
          options: ["10", "12", "15", "18"]
        },
        {
          question: "Apa motto universitas ini?",
          options: ["Motto A", "Motto B", "Motto C", "Motto D"]
        },
        {
          question: "Di kota mana universitas ini berada?",
          options: ["Jakarta", "Bandung", "Yogyakarta", "Surabaya"]
        },
        {
          question: "Apa warna identitas universitas ini?",
          options: ["Biru", "Merah", "Kuning", "Hijau"]
        }
      ]);

  
      const startQuiz = () => {
        showQuizModal.value = true;
        startTimer();
      };
  
      const closeQuiz = () => {
        if (confirm('Apakah Anda yakin ingin menutup quiz? Progress akan hilang.')) {
          showQuizModal.value = false;
          stopTimer();
          resetQuiz();
        }
      };
  
      const selectAnswer = (answerIndex) => {
        selectedAnswers.value[currentQuestion.value] = answerIndex;
      };
  
      const nextQuestion = () => {
        if (currentQuestion.value < questions.length - 1) {
          currentQuestion.value++;
        }
      };
  
      const previousQuestion = () => {
        if (currentQuestion.value > 0) {
          currentQuestion.value--;
        }
      };
  
      const isAllQuestionsAnswered = computed(() => {
        return Object.keys(selectedAnswers.value).length === questions.length;
      });
  
      const submitQuiz = () => {
        if (isAllQuestionsAnswered.value) {
          alert('Quiz berhasil disubmit!');
          showQuizModal.value = false;
          stopTimer();
          resetQuiz();
        } else {
          alert('Silakan jawab semua pertanyaan sebelum submit.');
        }
      };
  
      const startTimer = () => {
        timer.value = setInterval(() => {
          timeLeft.value--;
          if (timeLeft.value <= 0) {
            alert('Waktu habis! Quiz akan disubmit otomatis.');
            submitQuiz();
          }
        }, 1000);
      };
  
      const stopTimer = () => {
        if (timer.value) {
          clearInterval(timer.value);
          timer.value = null;
        }
      };
  
      const resetQuiz = () => {
        currentQuestion.value = 0;
        selectedAnswers.value = {};
        timeLeft.value = 30 * 60;
      };
  
      const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
      };
  
      onUnmounted(() => {
        stopTimer();
      });
  
      return {
        showQuizModal,
        currentQuestion,
        selectedAnswers,
        timeLeft,
        questions,
        isAllQuestionsAnswered,
        startQuiz,
        closeQuiz,
        selectAnswer,
        nextQuestion,
        previousQuestion,
        submitQuiz,
        formatTime
      };
    }
  }
  </script>
  
  <style scoped>
  </style>