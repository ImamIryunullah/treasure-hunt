<template>
  <div class="flex min-h-screen">
    <SidebarAdmin />
    <div class="flex-1 bg-black relative overflow-hidden">
      <div class="relative z-10 py-4 px-4">
        <div class="max-w-6xl mx-auto">
          <div
            class="flex items-center justify-between bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
          >
            <div class="flex items-center space-x-4">
              <div
                class="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
              >
                <img
                  src="@/assets/logo_untag.png"
                  alt="Logo"
                  class="w-10 h-10 object-contain rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h1 class="text-white font-bold text-lg">UNTAG Quiz Admin</h1>
                <p class="text-white/80 text-sm">Panel Administrasi Quiz</p>
              </div>
            </div>

            <div class="hidden md:flex items-center space-x-6">
              <div class="text-center">
                <div class="text-white/80 text-sm">Total Soal</div>
                <div class="text-2xl font-bold text-white">{{ questions.length }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="relative z-10 px-4 pb-8">
        <div class="max-w-6xl mx-auto">
          <div class="mb-6">
            <div
              class="bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20 inline-flex"
            >
              <button
                @click="currentView = 'list'"
                :class="
                  currentView === 'list'
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white'
                "
                class="px-6 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2"
              >
                <i class="fa-solid fa-list"></i> Daftar Soal
              </button>

              <button
                @click="currentView = 'add'"
                :class="
                  currentView === 'add'
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white'
                "
                class="px-6 py-2 rounded-xl font-medium transition-all duration-200 flex items-center gap-2"
              >
                <i class="fa-solid fa-plus"></i> Tambah Soal
              </button>

              <button
                @click="currentView = 'settings'"
                :class="
                  currentView === 'settings'
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:text-white'
                "
                class="px-6 py-2 rounded-xl font-medium transition-all duration-200"
              >
                <i class="fas fa-cog mr-2"></i> Pengaturan
              </button>
            </div>
          </div>

          <div v-if="currentView === 'list'" class="space-y-4">
            <div class="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div class="bg-yellow-400 p-6">
                <h2 class="text-2xl font-bold text-white">Daftar Soal Quiz</h2>
                <p class="text-white/90">Kelola semua soal quiz UNTAG</p>
              </div>

              <div class="p-6">
                <div class="space-y-4">
                  <div
                    v-for="(question, index) in questions"
                    :key="index"
                    class="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-200"
                  >
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <div class="flex items-center mb-3">
                          <span
                            class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            Soal {{ index + 1 }}
                          </span>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-800 mb-3">
                          {{ question.question }}
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div
                            v-for="(choice, choiceIndex) in question.choices"
                            :key="choiceIndex"
                            :class="
                              choice === question.correct
                                ? 'bg-green-100 text-green-800 border-green-300'
                                : 'bg-white text-gray-700 border-gray-200'
                            "
                            class="p-3 rounded-xl border-2 text-sm font-medium flex items-center"
                          >
                            <span class="mr-2 font-bold">{{
                              ["A", "B", "C", "D"][choiceIndex]
                            }}</span>
                            <span>{{ choice }}</span>
                            <span
                              v-if="choice === question.correct"
                              class="ml-auto text-green-600"
                              >✓</span
                            >
                          </div>
                        </div>
                      </div>
                      <div class="ml-4 flex flex-col space-y-2">
                        <button
                          @click="editQuestion(index)"
                          class="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
                          title="Edit Soal"
                        >
                          <i class="fa-solid fa-pen"></i>
                        </button>
                        <button
                          @click="deleteQuestion(index)"
                          class="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
                          title="Hapus Soal"
                        >
                          <i class="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="currentView === 'add' || currentView === 'edit'"
            class="bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div class="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
              <h2 class="text-2xl font-bold text-white flex items-center gap-2">
                <i
                  :class="currentView === 'add' ? 'fa-solid fa-plus' : 'fa-solid fa-pen'"
                  class="text-lg"
                ></i>
                {{ currentView === "add" ? "Tambah Soal Baru" : "Edit Soal" }}
              </h2>

              <p class="text-white/90">
                {{
                  currentView === "add"
                    ? "Buat soal quiz baru untuk UNTAG"
                    : "Ubah soal quiz yang ada"
                }}
              </p>
            </div>

            <div class="p-6">
              <form @submit.prevent="saveQuestion" class="space-y-6">
                <div>
                  <label class="block text-gray-700 font-semibold mb-2">Pertanyaan</label>
                  <textarea
                    v-model="formData.question"
                    rows="3"
                    class="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-200 resize-none"
                    placeholder="Masukkan pertanyaan quiz..."
                    required
                  ></textarea>
                </div>

                <div>
                  <label class="block text-gray-700 font-semibold mb-4"
                    >Pilihan Jawaban</label
                  >
                  <div class="space-y-3">
                    <div
                      v-for="(choice, index) in formData.choices"
                      :key="index"
                      class="flex items-center space-x-3"
                    >
                      <span
                        class="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center font-bold"
                      >
                        {{ ["A", "B", "C", "D"][index] }}
                      </span>
                      <input
                        v-model="formData.choices[index]"
                        type="text"
                        class="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all duration-200"
                        :placeholder="`Pilihan ${['A', 'B', 'C', 'D'][index]}`"
                        required
                      />
                      <button
                        type="button"
                        @click="setCorrectAnswer(index)"
                        :class="
                          formData.correctIndex === index
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                        "
                        class="px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
                      >
                        {{ formData.correctIndex === index ? "✓ Benar" : "Pilih" }}
                      </button>
                    </div>
                  </div>
                  <p class="text-sm text-gray-600 mt-3">
                    Klik "Pilih" untuk menentukan jawaban yang benar
                  </p>
                </div>

                <div class="flex justify-between pt-6">
                  <button
                    type="button"
                    @click="cancelForm"
                    class="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-300 transition-all duration-200"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    :disabled="!isFormValid"
                    class="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span class="flex items-center gap-2">
                      <i
                        :class="
                          currentView === 'add'
                            ? 'fa-solid fa-floppy-disk'
                            : 'fa-solid fa-pen-to-square'
                        "
                      ></i>
                      {{ currentView === "add" ? "Simpan Soal" : "Update Soal" }}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div
            v-if="currentView === 'settings'"
            class="bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <div class="bg-gradient-to-r from-orange-500 to-red-500 p-6">
              <h2 class="text-2xl font-bold text-white">⚙️ Pengaturan Quiz</h2>
              <p class="text-white/90">Atur waktu dan konfigurasi quiz</p>
            </div>

            <div class="p-6">
              <div class="space-y-6">
                <div class="bg-gray-50 rounded-2xl p-6">
                  <h3 class="text-xl font-semibold text-gray-800 mb-4">
                    ⏰ Pengaturan Waktu
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-gray-700 font-medium mb-2"
                        >Waktu per Soal (detik)</label
                      >
                      <input
                        v-model.number="settings.questionTime"
                        type="number"
                        class="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>

                <div class="bg-gray-50 rounded-2xl p-6">
                  <h3 class="text-xl font-semibold text-gray-800 mb-4">
                    🎯 Pengaturan Quiz
                  </h3>
                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div>
                        <label class="text-gray-700 font-medium"
                          >Nilai Minimum Lulus</label
                        >
                        <p class="text-gray-600 text-sm">
                          Nilai minimum untuk dinyatakan lulus
                        </p>
                      </div>
                      <input
                        v-model.number="settings.passingScore"
                        type="number"
                        min="1"
                        :max="questions.length"
                        class="w-20 p-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-all duration-200"
                      />
                    </div>

                    <div class="flex items-center justify-between">
                      <div>
                        <label class="text-gray-700 font-medium">Acak Soal</label>
                        <p class="text-gray-600 text-sm">
                          Acak urutan soal untuk setiap siswa
                        </p>
                      </div>
                      <button
                        @click="
                          settings.randomizeQuestions = !settings.randomizeQuestions
                        "
                        :class="
                          settings.randomizeQuestions ? 'bg-green-500' : 'bg-gray-300'
                        "
                        class="w-12 h-6 rounded-full relative transition-all duration-200"
                      >
                        <div
                          :class="
                            settings.randomizeQuestions
                              ? 'translate-x-6'
                              : 'translate-x-1'
                          "
                          class="w-4 h-4 bg-white rounded-full transition-all duration-200"
                        ></div>
                      </button>
                    </div>

                    <div class="flex items-center justify-between">
                      <div>
                        <label class="text-gray-700 font-medium"
                          >Tampilkan Hasil Detail</label
                        >
                        <p class="text-gray-600 text-sm">
                          Tampilkan jawaban benar/salah di hasil
                        </p>
                      </div>
                      <button
                        @click="
                          settings.showDetailedResults = !settings.showDetailedResults
                        "
                        :class="
                          settings.showDetailedResults ? 'bg-green-500' : 'bg-gray-300'
                        "
                        class="w-12 h-6 rounded-full relative transition-all duration-200"
                      >
                        <div
                          :class="
                            settings.showDetailedResults
                              ? 'translate-x-6'
                              : 'translate-x-1'
                          "
                          class="w-4 h-4 bg-white rounded-full transition-all duration-200"
                        ></div>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="flex justify-end">
                  <button
                    @click="saveSettings"
                    class="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 pulse"
                  >
                    💾 Simpan Pengaturan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="relative z-10 text-center py-6 text-white/80">
        <p>&copy; 2025 Universitas 17 Agustus 1945 Surabaya - Admin Panel</p>
      </div>

      <div
        v-if="showToast"
        class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 transform transition-all duration-300"
        :class="showToast ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'"
      >
        <div class="flex items-center space-x-2">
          <span>✅</span>
          <span>{{ toastMessage }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import treasureService from "@/service/treasureService";
import Swal from "sweetalert2";

export default {
  components: { SidebarAdmin },
  data() {
    return {
      currentView: "list",
      showToast: false,
      toastMessage: "",
      editingIndex: -1,
      questions: [],
      settings: {
        questionTime: 60,
        passingScore: 5,
        randomizeQuestions: false,
        showDetailedResults: true,
      },
      formData: {
        id: null,
        question: "",
        choices: ["", "", "", ""],
        correctIndex: -1,
      },
    };
  },
  computed: {
    isFormValid() {
      return (
        this.formData.question.trim() !== "" &&
        this.formData.choices.every((choice) => choice.trim() !== "") &&
        this.formData.correctIndex >= 0
      );
    },
  },
  created() {
    this.fetchQuestions();
    this.fetchSettings();
  },
  methods: {
    async fetchQuestions() {
      try {
        const response = await treasureService.getQuizQuestions();
        this.questions = response.data;
      } catch (error) {
        console.error("Gagal load questions:", error);
        this.showToastMessage("Gagal memuat soal kuis.");
      }
    },
    async fetchSettings() {
      try {
        const response = await treasureService.getQuizSettings();
        if (response.data) {
          // Misal response.data = { question_time: 60, passing_score: 5, ... }
          this.settings.questionTime = response.data.question_time;
          this.settings.passingScore = response.data.passing_score;
          this.settings.randomizeQuestions = response.data.randomize_questions;
          this.settings.showDetailedResults = response.data.show_detailed_result;
        }
      } catch (error) {
        console.error("Gagal load settings:", error);
        this.showToastMessage("Gagal memuat pengaturan kuis.");
      }
    },

    setCorrectAnswer(index) {
      this.formData.correctIndex = index;
    },
    async saveQuestion() {
      if (!this.isFormValid) return;

      const questionData = {
        question: this.formData.question.trim(),
        choices: this.formData.choices.map((c) => c.trim()),
        correct: this.formData.choices[this.formData.correctIndex].trim(),
      };

      try {
        if (this.currentView === "edit" && this.formData.id !== null) {
          await treasureService.updateQuizQuestion(this.formData.id, questionData);
          this.showToastMessage("Soal berhasil diperbarui!");
          // update local questions array
          this.questions.splice(this.editingIndex, 1, {
            id: this.formData.id,
            ...questionData,
          });
        } else {
          const response = await treasureService.createQuizQuestion(questionData);
          this.showToastMessage("Soal baru berhasil ditambahkan!");
          this.questions.push(response.data);
        }
        this.resetForm();
        this.currentView = "list";
      } catch (error) {
        console.error("Gagal simpan soal:", error);
        this.showToastMessage("Gagal menyimpan soal.");
      }
    },
    editQuestion(index) {
      this.editingIndex = index;
      const question = this.questions[index];

      this.formData = {
        id: question.id,
        question: question.question,
        choices: [...question.choices],
        correctIndex: question.choices.indexOf(question.correct),
      };
      this.currentView = "edit";
    },
    async deleteQuestion(index) {
      const result = await Swal.fire({
        title: "Apakah Anda yakin ingin menghapus soal ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      });

      if (!result.isConfirmed) return;

      try {
        await treasureService.deleteQuizQuestion(this.questions[index].id);
        this.questions.splice(index, 1);
        this.showToastMessage("Soal berhasil dihapus!");
      } catch (error) {
        console.error("Gagal hapus soal:", error);
        this.showToastMessage("Gagal menghapus soal.");
      }
    },
    cancelForm() {
      this.resetForm();
      this.currentView = "list";
    },
    resetForm() {
      this.formData = {
        id: null,
        question: "",
        choices: ["", "", "", ""],
        correctIndex: -1,
      };
      this.editingIndex = -1;
    },
    async saveSettings() {
      try {
        const payload = {
          question_time: this.settings.questionTime,
          passing_score: this.settings.passingScore,
          randomize_questions: this.settings.randomizeQuestions,
          show_detailed_result: this.settings.showDetailedResult,
        };
        console.log("Kirim payload:", payload);
        await treasureService.saveQuizSettings(payload);

        // Fetch ulang settings biar update tampil di UI
        await this.fetchSettings();

        this.showToastMessage("Pengaturan berhasil disimpan!");
      } catch (error) {
        console.error("Gagal simpan pengaturan:", error);
        this.showToastMessage("Gagal menyimpan pengaturan.");
      }
    },

    showToastMessage(message) {
      this.toastMessage = message;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    },
  },
};
</script>

<style>
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

@media (max-width: 768px) {
  .floating-shape {
    display: none;
  }
}
</style>
