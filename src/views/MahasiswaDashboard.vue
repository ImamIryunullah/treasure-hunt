<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-20 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-bounce"></div>
      <div class="absolute top-40 right-20 w-16 h-16 bg-pink-400 rounded-full opacity-20 animate-pulse"></div>
      <div class="absolute bottom-40 left-20 w-24 h-24 bg-green-400 rounded-full opacity-20 animate-bounce delay-1000"></div>
      <div class="absolute bottom-20 right-10 w-18 h-18 bg-orange-400 rounded-full opacity-20 animate-pulse delay-500"></div>
    </div>

    <!-- Header -->
    <div class="relative z-10 text-center py-8">
      <div class="flex justify-center items-center gap-3 mb-4">
        <div class="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
          <font-awesome-icon :icon="['fas', 'university']" class="text-white text-xl" />
        </div>
        <h1 class="text-4xl font-bold text-white">UNTAG QUEST</h1>
        <div class="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
          <font-awesome-icon :icon="['fas', 'gem']" class="text-white text-xl" />
        </div>
      </div>
      <p class="text-blue-200 text-lg font-medium">Kuis Seleksi Mahasiswa Baru</p>
    </div>

    <!-- Main Content -->
    <div class="relative z-10 max-w-4xl mx-auto px-4 pb-8">
      <!-- Pre-Quiz Screen -->
      <div v-if="!quizStarted && !quizCompleted" class="text-center">
        <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 border border-white/20">
          <div class="mb-8">
            <div class="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto flex items-center justify-center mb-6">
              <font-awesome-icon :icon="['fas', 'trophy']" class="text-white text-3xl" />
            </div>
            <h2 class="text-3xl font-bold text-white mb-4">Selamat Datang, Mahasiswa Baru!</h2>
            <p class="text-blue-200 text-lg leading-relaxed">
              Bersiaplah untuk petualangan seru di UNTAG Surabaya! <br>
              Jawab 7 pertanyaan seputar kampus dengan cepat dan tepat.
            </p>
          </div>

          <!-- Player Info Form -->
          <div class="bg-white/10 rounded-2xl p-6 mb-8">
            <h3 class="text-xl font-bold text-white mb-4">Identitas Pemain</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-blue-200 text-sm font-medium mb-2">Nama Lengkap</label>
                <input 
                  v-model="playerInfo.nama" 
                  type="text" 
                  class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
              <div>
                <label class="block text-blue-200 text-sm font-medium mb-2">NIM</label>
                <input 
                  v-model="playerInfo.nim" 
                  type="text" 
                  class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Masukkan NIM"
                />
              </div>
              <div>
                <label class="block text-blue-200 text-sm font-medium mb-2">Program Studi</label>
                <select 
                  v-model="playerInfo.prodi" 
                  class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="" disabled>Pilih Program Studi</option>
                  <option value="Teknik Informatika">Teknik Informatika</option>
                  <option value="Sistem Informasi">Sistem Informasi</option>
                  <option value="Manajemen">Manajemen</option>
                  <option value="Akuntansi">Akuntansi</option>
                  <option value="Hukum">Hukum</option>
                  <option value="Psikologi">Psikologi</option>
                </select>
              </div>
              <div>
                <label class="block text-blue-200 text-sm font-medium mb-2">Angkatan</label>
                <input 
                  v-model="playerInfo.angkatan" 
                  type="number" 
                  class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="2024"
                />
              </div>
            </div>
          </div>

          <!-- Rules -->
          <div class="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl p-6 mb-8">
            <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <font-awesome-icon :icon="['fas', 'list-check']" class="text-yellow-400" />
              Aturan Permainan
            </h3>
            <ul class="text-blue-200 space-y-2 text-left">
              <li class="flex items-start gap-2">
                <font-awesome-icon :icon="['fas', 'star']" class="text-yellow-400 mt-1" />
                <span>7 pertanyaan multiple choice seputar UNTAG Surabaya</span>
              </li>
              <li class="flex items-start gap-2">
                <font-awesome-icon :icon="['fas', 'clock']" class="text-yellow-400 mt-1" />
                <span>Waktu terbatas 60 detik per pertanyaan</span>
              </li>
              <li class="flex items-start gap-2">
                <font-awesome-icon :icon="['fas', 'rocket']" class="text-yellow-400 mt-1" />
                <span>Jawaban tercepat dan tertepat akan mendapat nilai terbaik</span>
              </li>
              <li class="flex items-start gap-2">
                <font-awesome-icon :icon="['fas', 'users']" class="text-yellow-400 mt-1" />
                <span>Pembentukan kelompok berdasarkan ranking per prodi</span>
              </li>
            </ul>
          </div>

          <button 
            @click="startQuiz" 
            :disabled="!isPlayerInfoValid"
            class="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <font-awesome-icon :icon="['fas', 'play']" class="mr-2" />
            Mulai Kuis Sekarang!
          </button>
        </div>
      </div>

      <!-- Quiz Screen -->
      <div v-if="quizStarted && !quizCompleted">
        <!-- Progress Bar -->
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-white font-bold">Pertanyaan {{ currentQuestion + 1 }} dari {{ questions.length }}</h3>
            <div class="flex items-center gap-2 text-white">
              <font-awesome-icon :icon="['fas', 'clock']" class="text-yellow-400" />
              <span class="text-2xl font-bold" :class="timeLeft <= 10 ? 'text-red-400' : 'text-white'">{{ timeLeft }}s</span>
            </div>
          </div>
          <div class="w-full bg-white/20 rounded-full h-3">
            <div 
              class="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-300"
              :style="{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- Question Card -->
        <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-6 border border-white/20">
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mx-auto flex items-center justify-center mb-4">
              <font-awesome-icon :icon="['fas', 'question']" class="text-white text-2xl" />
            </div>
            <h2 class="text-2xl font-bold text-white leading-relaxed">
              {{ questions[currentQuestion].question }}
            </h2>
          </div>

          <!-- Answer Options -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              v-for="(option, index) in questions[currentQuestion].options"
              :key="index"
              @click="selectAnswer(index)"
              :disabled="selectedAnswer !== null"
              class="bg-white/20 hover:bg-white/30 border border-white/30 rounded-2xl p-6 text-left transition-all duration-200 transform hover:scale-102"
              :class="{
                'bg-green-500/50 border-green-400': selectedAnswer === index && questions[currentQuestion].correct === index,
                'bg-red-500/50 border-red-400': selectedAnswer === index && questions[currentQuestion].correct !== index,
                'bg-green-500/30 border-green-400': selectedAnswer !== null && questions[currentQuestion].correct === index
              }"
            >
              <div class="flex items-center gap-4">
                <div class="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {{ String.fromCharCode(65 + index) }}
                </div>
                <span class="text-white font-medium">{{ option }}</span>
              </div>
            </button>
          </div>
        </div>

        <!-- Next Button -->
        <div class="text-center" v-if="selectedAnswer !== null">
          <button 
            @click="nextQuestion" 
            class="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-green-500 hover:to-blue-600 transform hover:scale-105 transition-all duration-200 shadow-xl"
          >
            <font-awesome-icon :icon="['fas', 'arrow-right']" class="mr-2" />
            {{ currentQuestion === questions.length - 1 ? 'Selesai' : 'Lanjut' }}
          </button>
        </div>
      </div>

      <!-- Results Screen -->
      <div v-if="quizCompleted" class="text-center">
        <div class="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <div class="mb-8">
            <div class="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto flex items-center justify-center mb-6">
              <font-awesome-icon :icon="['fas', 'check-circle']" class="text-white text-3xl" />
            </div>
            <h2 class="text-3xl font-bold text-white mb-4">Kuis Selesai!</h2>
            <p class="text-blue-200 text-lg">Terima kasih telah mengikuti kuis seleksi UNTAG Quest</p>
          </div>

          <!-- Results -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl p-6">
              <div class="text-3xl font-bold text-yellow-400 mb-2">{{ score }}</div>
              <div class="text-white">Skor Akhir</div>
            </div>
            <div class="bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-2xl p-6">
              <div class="text-3xl font-bold text-green-400 mb-2">{{ correctAnswers }}/{{ questions.length }}</div>
              <div class="text-white">Benar</div>
            </div>
            <div class="bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-2xl p-6">
              <div class="text-3xl font-bold text-purple-400 mb-2">{{ totalTime }}s</div>
              <div class="text-white">Total Waktu</div>
            </div>
          </div>

          <!-- Performance Message -->
          <div class="bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-2xl p-6 mb-8">
            <h3 class="text-xl font-bold text-white mb-4">{{ getPerformanceMessage() }}</h3>
            <p class="text-blue-200">
              Hasil kuis Anda sudah tercatat. Silakan tunggu pengumuman pembentukan kelompok pada hari kedua.
            </p>
          </div>

          <div class="space-y-4">
            <button 
              @click="resetQuiz" 
              class="bg-gradient-to-r from-purple-400 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-purple-500 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-xl"
            >
              <font-awesome-icon :icon="['fas', 'redo']" class="mr-2" />
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onUnmounted } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { 
  faUniversity, 
  faGem, 
  faTrophy, 
  faListCheck, 
  faStar, 
  faClock, 
  faRocket, 
  faUsers, 
  faPlay,
  faQuestion,
  faArrowRight,
  faCheckCircle,
  faRedo
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUniversity, 
  faGem, 
  faTrophy, 
  faListCheck, 
  faStar, 
  faClock, 
  faRocket, 
  faUsers, 
  faPlay,
  faQuestion,
  faArrowRight,
  faCheckCircle,
  faRedo
)

export default {
  name: 'UntagQuizPage',
  components: {
    FontAwesomeIcon
  },
  setup() {
    const quizStarted = ref(false)
    const quizCompleted = ref(false)
    const currentQuestion = ref(0)
    const selectedAnswer = ref(null)
    const timeLeft = ref(60)
    const score = ref(0)
    const correctAnswers = ref(0)
    const totalTime = ref(0)
    const timer = ref(null)
    const questionStartTime = ref(0)

    const playerInfo = reactive({
      nama: '',
      nim: '',
      prodi: '',
      angkatan: ''
    })

    const questions = reactive([
      {
        question: "Apa kepanjangan dari UNTAG Surabaya?",
        options: [
          "Universitas 17 Agustus 1945 Surabaya",
          "Universitas Tujuh Belas Agustus Surabaya", 
          "Universitas Tanggal 17 Agustus Surabaya",
          "Universitas Tiga Tujuh Agustus Surabaya"
        ],
        correct: 0
      },
      {
        question: "Pada tahun berapa UNTAG Surabaya didirikan?",
        options: [
          "1954",
          "1958", 
          "1962",
          "1965"
        ],
        correct: 1
      },
      {
        question: "Siapa pendiri UNTAG Surabaya?",
        options: [
          "Dr. Moestopo",
          "Prof. Dr. Prawoto Mangkusasmito",
          "Dr. Soetomo", 
          "Prof. Dr. Djokosoetono"
        ],
        correct: 3
      },
      {
        question: "Apa warna utama logo UNTAG Surabaya?",
        options: [
          "Merah dan Putih",
          "Biru dan Kuning",
          "Hijau dan Putih",
          "Merah dan Kuning"
        ],
        correct: 0
      },
      {
        question: "Berapa jumlah fakultas yang ada di UNTAG Surabaya?",
        options: [
          "5 Fakultas",
          "6 Fakultas",
          "7 Fakultas",
          "8 Fakultas"
        ],
        correct: 1
      },
      {
        question: "Apa motto UNTAG Surabaya?",
        options: [
          "Cerdas, Berbudi, Mandiri",
          "Widya Dharma Bakti",
          "Bhinneka Tunggal Ika",
          "Merdeka atau Mati"
        ],
        correct: 0
      },
      {
        question: "Di jalan mana kampus utama UNTAG Surabaya berada?",
        options: [
          "Jalan Semolowaru",
          "Jalan Arief Rahman Hakim",
          "Jalan Dharmawangsa",
          "Jalan Raya Gubeng"
        ],
        correct: 1
      }
    ])

    const isPlayerInfoValid = computed(() => {
      return playerInfo.nama && playerInfo.nim && playerInfo.prodi && playerInfo.angkatan
    })

    const startQuiz = () => {
      if (!isPlayerInfoValid.value) return
      
      quizStarted.value = true
      questionStartTime.value = Date.now()
      startTimer()
    }

    const startTimer = () => {
      timeLeft.value = 60
      timer.value = setInterval(() => {
        timeLeft.value--
        if (timeLeft.value <= 0) {
          selectAnswer(-1) // Auto submit dengan jawaban salah
        }
      }, 1000)
    }

    const selectAnswer = (answerIndex) => {
      if (selectedAnswer.value !== null) return
      
      selectedAnswer.value = answerIndex
      clearInterval(timer.value)
      
      const timeTaken = 60 - timeLeft.value
      totalTime.value += timeTaken
      
      if (answerIndex === questions[currentQuestion.value].correct) {
        correctAnswers.value++
        // Bonus skor untuk jawaban cepat
        const timeBonus = Math.max(0, 60 - timeTaken)
        score.value += 100 + timeBonus
      }
      
      setTimeout(() => {
        if (currentQuestion.value === questions.length - 1) {
          nextQuestion()
        }
      }, 2000)
    }

    const nextQuestion = () => {
      if (currentQuestion.value < questions.length - 1) {
        currentQuestion.value++
        selectedAnswer.value = null
        questionStartTime.value = Date.now()
        startTimer()
      } else {
        quizCompleted.value = true
        clearInterval(timer.value)
      }
    }

    const getPerformanceMessage = () => {
      const percentage = (correctAnswers.value / questions.length) * 100
      
      if (percentage >= 85) {
        return "Luar Biasa! Anda memiliki pemahaman yang sangat baik tentang UNTAG!"
      } else if (percentage >= 70) {
        return "Bagus! Anda cukup mengenal UNTAG Surabaya."
      } else if (percentage >= 50) {
        return "Tidak buruk! Masih ada yang perlu dipelajari tentang UNTAG."
      } else {
        return "Jangan menyerah! Pelajari lebih banyak tentang UNTAG Surabaya."
      }
    }

    const resetQuiz = () => {
      quizStarted.value = false
      quizCompleted.value = false
      currentQuestion.value = 0
      selectedAnswer.value = null
      timeLeft.value = 60
      score.value = 0
      correctAnswers.value = 0
      totalTime.value = 0
      clearInterval(timer.value)
      
      // Reset player info
      playerInfo.nama = ''
      playerInfo.nim = ''
      playerInfo.prodi = ''
      playerInfo.angkatan = ''
    }

    onUnmounted(() => {
      if (timer.value) {
        clearInterval(timer.value)
      }
    })

    return {
      quizStarted,
      quizCompleted,
      currentQuestion,
      selectedAnswer,
      timeLeft,
      score,
      correctAnswers,
      totalTime,
      playerInfo,
      questions,
      isPlayerInfoValid,
      startQuiz,
      selectAnswer,
      nextQuestion,
      getPerformanceMessage,
      resetQuiz
    }
  }
}
</script>

<style scoped>
/* Custom animations */
@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0,0,0);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
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

.animate-bounce {
  animation: bounce 2s infinite;
}

.animate-pulse {
  animation: pulse 2s infinite;
}

.delay-500 {
  animation-delay: 0.5s;
}

.delay-1000 {
  animation-delay: 1s;
}

/* Backdrop blur fallback */
.backdrop-blur-lg {
  backdrop-filter: blur(16px);
}

/* Hover scale */
.hover\:scale-102:hover {
  transform: scale(1.02);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Smooth transitions */
* {
  transition: all 0.2s ease-in-out;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>