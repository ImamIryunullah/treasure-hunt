<template>
  <div class="flex min-h-screen bg-purple-50">
    <SidebarAdmin />

    <div class="flex-1 p-8">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Manajemen Kuis</h1>
          <p class="text-gray-600 mt-1">
            Kelola pertanyaan untuk setiap lokasi treasure hunt
          </p>
        </div>
        <div class="flex space-x-3">
          <button
            @click="showAddModal = true"
            class="bg-purple-500 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2"
          >
            <i class="fas fa-plus"></i>
            <span>Tambah Soal</span>
          </button>
          <button
            @click="showImportModal = true"
            class="bg-blue-500 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2"
          >
            <i class="fas fa-upload"></i>
            <span>Import Soal</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          v-for="stat in stats"
          :key="stat.title"
          class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover: transition-shadow"
        >
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-gray-500">{{ stat.title }}</h3>
              <p class="text-2xl font-bold text-gray-900 mt-1">{{ stat.value }}</p>
              <p class="text-xs text-gray-400 mt-1">{{ stat.subtitle }}</p>
            </div>
            <div class="p-3 bg-purple-100 rounded-full">
              <i :class="stat.icon + ' text-purple-600'"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div
          v-for="question in questions"
          :key="question.id"
          class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover: transition-shadow"
        >
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-2">
                <i class="fas fa-question-circle text-purple-500"></i>
                <h3 class="text-lg font-semibold text-gray-800">
                  {{ question.text }}
                </h3>
              </div>
            </div>
          </div>
          <div class="flex space-x-2 text-sm">
            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
              {{ getQuestionTypeLabel(question.type) }}
            </span>
            <span :class="getDifficultyClass(question.difficulty)">
              {{ getDifficultyLabel(question.difficulty) }}
            </span>
            <span
              v-if="question.duration"
              class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-medium"
            >
              <i class="fas fa-clock mr-1"></i>
              {{ Math.ceil(question.duration / 60) }} menit
            </span>
          </div>

          <div class="mb-4">
            <p class="text-sm font-medium text-gray-700 mb-3">Pilihan Jawaban:</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div
                v-for="(option, index) in question.options"
                :key="index"
                :class="[
                  'p-3 border-2 text-sm rounded-lg transition-colors',
                  option.isCorrect
                    ? 'bg-green-50 border-green-300 text-green-800'
                    : 'bg-gray-50 border-gray-200 text-gray-700',
                ]"
              >
                <div class="flex items-center space-x-2">
                  <span class="font-bold">{{ option.label }}.</span>
                  <span>{{ option.text }}</span>
                  <span v-if="option.isCorrect" class="ml-auto text-green-600 font-bold">
                    <i class="fas fa-check-circle"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap gap-2">
            <button
              @click="previewQuestion(question)"
              class="flex items-center space-x-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <i class="fas fa-eye"></i>
              <span>Preview</span>
            </button>

            <button
              @click="editQuestion(question)"
              class="flex items-center space-x-2 px-4 py-2 text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <i class="fas fa-edit"></i>
              <span>Edit</span>
            </button>

            <button
              @click="duplicateQuestion(question)"
              class="flex items-center space-x-2 px-4 py-2 text-green-600 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
            >
              <i class="fas fa-copy"></i>
              <span>Duplikat</span>
            </button>

            <button
              @click="confirmDelete(question)"
              class="flex items-center space-x-2 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
            >
              <i class="fas fa-trash"></i>
              <span>Hapus</span>
            </button>
          </div>
        </div>
      </div>

      <div class="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">
          <i class="fas fa-bolt text-yellow-500 mr-2"></i>
          Aksi Cepat
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            @click="importFromFile"
            class="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 font-medium transition-colors"
          >
            <i class="fas fa-file-import block mb-2 text-xl"></i>
            Import Soal dari File
          </button>
          <button
            @click="exportToFile"
            class="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 font-medium transition-colors"
          >
            <i class="fas fa-file-export block mb-2 text-xl"></i>
            Export Bank Soal
          </button>
          <button
            @click="validateAllQuestions"
            class="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-orange-700 font-medium transition-colors"
          >
            <i class="fas fa-check-double block mb-2 text-xl"></i>
            Validasi Semua Soal
          </button>
          <button
            @click="showPreviewMode = true"
            class="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 font-medium transition-colors"
          >
            <i class="fas fa-eye block mb-2 text-xl"></i>
            Preview Mode Mahasiswa
          </button>
        </div>
      </div>

      <div
        v-if="showAddModal || showEditModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <div class="bg-white rounded-xl max-w-3xl w-full max-h-[95vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold text-gray-800">
                <i class="fas fa-plus-circle text-purple-500 mr-2"></i>
                {{ showEditModal ? "Edit Soal" : "Tambah Soal Baru" }}
              </h2>
              <button
                @click="cancelModal"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <i class="fas fa-times text-xl"></i>
              </button>
            </div>

            <form @submit.prevent="saveQuestion" class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <i class="fas fa-question-circle text-purple-500 mr-1"></i>
                  Pertanyaan
                </label>
                <textarea
                  v-model="newQuestion.text"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  rows="3"
                  placeholder="Tulis pertanyaan di sini..."
                  required
                ></textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <i class="fas fa-clock text-yellow-500 mr-1"></i>
                  Lama Pengerjaan (menit)
                </label>
                <input  
                  v-model="newQuestion.durationInMinutes"
                  type="number"
                  min="0"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Contoh: 1"
                  required
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <i class="fas fa-list text-blue-500 mr-1"></i>
                  Pilihan Jawaban
                </label>
                <div class="space-y-3">
                  <div
                    v-for="(option, index) in newQuestion.options"
                    :key="index"
                    class="flex items-center space-x-3"
                  >
                    <span class="font-bold text-gray-700 w-8">{{ option.label }}.</span>
                    <input
                      v-model="option.text"
                      type="text"
                      class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      :placeholder="`Jawaban ${option.label}`"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  <i class="fas fa-check-circle text-green-500 mr-1"></i>
                  Jawaban Benar
                </label>
                <select
                  v-model="newQuestion.correctAnswer"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  required
                >
                  <option value="">Pilih jawaban benar</option>
                  <option
                    v-for="option in newQuestion.options"
                    :key="option.label"
                    :value="option.label"
                  >
                    {{ option.label }} - {{ option.text }}
                  </option>
                </select>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    <i class="fas fa-layer-group text-orange-500 mr-1"></i>
                    Tingkat Kesulitan
                  </label>
                  <select
                    v-model="newQuestion.difficulty"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  >
                    <option value="">Pilih tingkat kesulitan</option>
                    <option value="mudah">Mudah</option>
                    <option value="sedang">Sedang</option>
                    <option value="sulit">Sulit</option>
                  </select>
                </div>
              </div>

              <div class="flex space-x-3 pt-4">
                <button
                  type="submit"
                  class="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 rounded-lg font-medium flex items-center justify-center space-x-2"
                >
                  <i class="fas fa-save"></i>
                  <span>{{ showEditModal ? "Update Soal" : "Simpan Soal" }}</span>
                </button>
                <button
                  type="button"
                  @click="cancelModal"
                  class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        v-if="showImportModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <div class="bg-white rounded-xl max-w-md w-full p-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">
            <i class="fas fa-upload text-blue-500 mr-2"></i>
            Import Soal
          </h2>
          <div class="space-y-4">
            <div
              class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
            >
              <i class="fas fa-file-upload text-4xl text-gray-400 mb-4"></i>
              <p class="text-gray-600 mb-2">Drag & drop file atau klik untuk browse</p>
              <input
                ref="fileInput"
                type="file"
                accept=".csv,.json,.xlsx"
                @change="handleFileUpload"
                class="hidden"
              />
              <button
                @click="$refs.fileInput.click()"
                class="text-blue-600 hover:text-blue-700 font-medium"
              >
                Pilih File
              </button>
            </div>
            <div class="flex space-x-3">
              <button
                @click="processImport"
                class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition-colors"
              >
                Import
              </button>
              <button
                @click="showImportModal = false"
                class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="showPreviewModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold text-gray-800">
                <i class="fas fa-eye text-purple-500 mr-2"></i>
                Preview Soal
              </h2>
              <button
                @click="showPreviewModal = false"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <i class="fas fa-times text-xl"></i>
              </button>
            </div>

            <div v-if="previewData" class="space-y-6">
              <div class="flex flex-wrap gap-2 text-sm">
                <span
                  class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium"
                >
                  {{ getQuestionTypeLabel(previewData.type) }}
                </span>
                <span :class="getDifficultyClass(previewData.difficulty)">
                  {{ getDifficultyLabel(previewData.difficulty) }}
                </span>
                <span
                  v-if="previewData.duration"
                  class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-medium"
                >
                  <i class="fas fa-clock mr-1"></i>
                  {{ Math.ceil(previewData.duration / 60) }} menit
                </span>
              </div>

              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">
                  <i class="fas fa-question-circle text-purple-500 mr-2"></i>
                  {{ previewData.text }}
                </h3>
              </div>

              <div class="space-y-3">
                <h4 class="font-medium text-gray-700">Pilihan Jawaban:</h4>
                <div
                  v-for="(option, index) in previewData.options"
                  :key="index"
                  :class="[
                    'p-3 border-2 rounded-lg cursor-pointer transition-colors',
                    option.isCorrect
                      ? 'bg-green-50 border-green-300 text-green-800'
                      : 'bg-white border-gray-200 hover:border-gray-300',
                  ]"
                >
                  <div class="flex items-center space-x-3">
                    <span class="font-bold">{{ option.label }}.</span>
                    <span>{{ option.text }}</span>
                    <span
                      v-if="option.isCorrect"
                      class="ml-auto text-green-600 font-bold"
                    >
                      <i class="fas fa-check-circle"></i>
                      Benar
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="showDeleteModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <div class="bg-white rounded-xl max-w-md w-full p-6">
          <div class="text-center">
            <div
              class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4"
            >
              <i class="fas fa-exclamation-triangle text-red-600 text-xl"></i>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Hapus Soal</h3>
            <p class="text-sm text-gray-500 mb-6">
              Apakah Anda yakin ingin menghapus soal ini? Tindakan ini tidak dapat
              dibatalkan.
            </p>
            <div class="flex space-x-3">
              <button
                @click="deleteQuestion"
                class="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Ya, Hapus
              </button>
              <button
                @click="showDeleteModal = false"
                class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="toast.show"
        :class="[
          'fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 transition-all duration-300 transform',
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white',
          toast.show ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0',
        ]"
      >
        <div class="flex items-center space-x-2">
          <i
            :class="
              toast.type === 'success'
                ? 'fas fa-check-circle'
                : 'fas fa-exclamation-circle'
            "
          ></i>
          <span>{{ toast.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import treasureService from "@/service/treasureService";

export default {
  components: {
    SidebarAdmin,
  },
  name: "BankSoal",
  data() {
    return {
      showAddModal: false,
      showEditModal: false,
      showPreviewModal: false,
      showDeleteModal: false,
      showImportModal: false,
      showPreviewMode: false,
      editingQuestionId: null,
      questionToDelete: null,
      previewData: null,
      uploadedFile: null,
      isLoading: false,
      toast: {
        show: false,
        type: "success",
        message: "",
      },
      questions: [],
      stats: [
        {
          title: "Total Soal",
          value: "0",
          subtitle: "Dari berbagai lokasi",
          icon: "fas fa-question-circle",
        },
        {
          title: "Soal Mudah",
          value: "0",
          subtitle: "Tingkat mudah",
          icon: "fas fa-smile",
        },
        {
          title: "Soal Sedang",
          value: "0",
          subtitle: "Tingkat sedang",
          icon: "fas fa-meh",
        },
        {
          title: "Soal Sulit",
          value: "0",
          subtitle: "Tingkat sulit",
          icon: "fas fa-frown",
        },
      ],
      newQuestion: {
        text: "",
        options: [
          { label: "A", text: "" },
          { label: "B", text: "" },
          { label: "C", text: "" },
          { label: "D", text: "" },
        ],
        correctAnswer: "",
        difficulty: "",
        duration: "",
        durationInMinutes: "",
      },
    };
  },
  mounted() {
    this.fetchQuestions();
  },
  methods: {
    async fetchQuestions() {
      this.isLoading = true;
      try {
        const res = await treasureService.getQuestions();
        this.questions = res.data.data;
        this.updateStats();
      } catch (err) {
        this.showToast("Gagal memuat soal", "error");
        console.error(err);
      }
      this.isLoading = false;
    },
    watch: {
      "newQuestion.durationInMinutes"(val) {
        this.newQuestion.duration = Number(val) * 60;
      },
    },

    async saveQuestion() {
      const payload = {
        text: this.newQuestion.text,
        type: "multiple-choice",
        difficulty: this.newQuestion.difficulty,
        created_by: 1,
        duration: Number(this.newQuestion.durationInMinutes) * 60,

        options: this.newQuestion.options.map((opt) => ({
          label: opt.label,
          text: opt.text,
          is_correct: opt.label === this.newQuestion.correctAnswer,
        })),
      };

      try {
        if (this.showEditModal && this.editingQuestionId) {
          await treasureService.updateQuestion(this.editingQuestionId, payload);
          this.showToast("Soal berhasil diupdate");
        } else {
          await treasureService.createQuestion(payload);
          this.showToast("Soal berhasil ditambahkan");
        }

        this.cancelModal();
        this.fetchQuestions();
      } catch (err) {
        this.showToast("Gagal menyimpan soal", "error");
        console.error(err);
      }
    },
    async deleteQuestion() {
      if (this.questionToDelete) {
        try {
          await treasureService.deleteQuestion(this.questionToDelete.id);
          this.showToast("Soal berhasil dihapus");
          this.fetchQuestions();
        } catch (err) {
          this.showToast("Gagal menghapus soal", "error");
        }
      }
      this.showDeleteModal = false;
      this.questionToDelete = null;
    },
    editQuestion(question) {
      this.editingQuestionId = question.id;
      this.newQuestion.text = question.text;
      this.newQuestion.options = [...question.options];
      this.newQuestion.correctAnswer =
        question.options.find((opt) => opt.is_correct)?.label || "";
      this.newQuestion.difficulty = question.difficulty;
      this.newQuestion.duration = question.duration;
      this.newQuestion.durationInMinutes = Math.floor(question.duration / 60); // ← ini ditambah
      this.showEditModal = true;
    },

    cancelModal() {
      this.resetForm();
      this.showAddModal = false;
      this.showEditModal = false;
      this.editingQuestionId = null;
    },
    resetForm() {
      this.newQuestion.text = "";
      this.newQuestion.options.forEach((option) => (option.text = ""));
      this.newQuestion.correctAnswer = "";
      this.newQuestion.difficulty = "";
      this.newQuestion.duration = "";
      this.newQuestion.durationInMinutes = "";
    },

    updateStats() {
      const total = this.questions.length;
      const mudah = this.questions.filter((q) => q.difficulty === "mudah").length;
      const sedang = this.questions.filter((q) => q.difficulty === "sedang").length;
      const sulit = this.questions.filter((q) => q.difficulty === "sulit").length;

      this.stats[0].value = total.toString();
      this.stats[1].value = mudah.toString();
      this.stats[2].value = sedang.toString();
      this.stats[3].value = sulit.toString();

      if (total > 0) {
        this.stats[1].subtitle = `${Math.round((mudah / total) * 100)}% dari total soal`;
        this.stats[2].subtitle = `${Math.round((sedang / total) * 100)}% dari total soal`;
        this.stats[3].subtitle = `${Math.round((sulit / total) * 100)}% dari total soal`;
      }
    },
    showToast(message, type = "success") {
      this.toast.message = message;
      this.toast.type = type;
      this.toast.show = true;
      setTimeout(() => {
        this.toast.show = false;
      }, 3000);
    },
    getQuestionTypeLabel(type) {
      const labels = {
        "multiple-choice": "Pilihan Ganda",
        "true-false": "Benar/Salah",
        essay: "Essay",
      };
      return labels[type] || type;
    },
    getDifficultyLabel(difficulty) {
      const labels = {
        mudah: "Mudah",
        sedang: "Sedang",
        sulit: "Sulit",
      };
      return labels[difficulty] || difficulty;
    },
    getDifficultyClass(difficulty) {
      const classes = {
        mudah: "bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium",
        sedang: "bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium",
        sulit: "bg-red-100 text-red-800 px-3 py-1 rounded-full font-medium",
      };
      return (
        classes[difficulty] ||
        "bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-medium"
      );
    },
    previewQuestion(question) {
      this.previewData = { ...question };
      this.showPreviewModal = true;
    },
    duplicateQuestion(question) {
      const duplicatedQuestion = {
        ...question,
        id: Date.now(),
        text: question.text + " (Copy)",
      };
      this.questions.push(duplicatedQuestion);
      this.showToast("Soal berhasil diduplikat", "success");
      this.updateStats();
    },
    confirmDelete(question) {
      this.questionToDelete = question;
      this.showDeleteModal = true;
    },
    importFromFile() {
      this.showImportModal = true;
    },
    exportToFile() {
      const dataStr = JSON.stringify(this.questions, null, 2);
      const dataUri =
        "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
      const exportFileDefaultName = "bank_soal.json";

      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();

      this.showToast("Bank soal berhasil diekspor", "success");
    },
    validateAllQuestions() {
      let validationErrors = [];

      this.questions.forEach((question, index) => {
        if (!question.text.trim()) {
          validationErrors.push(`Soal ${index + 1}: Teks pertanyaan kosong`);
        }

        if (!question.options.some((opt) => opt.is_correct)) {
          validationErrors.push(`Soal ${index + 1}: Tidak ada jawaban benar`);
        }

        if (question.options.some((opt) => !opt.text.trim())) {
          validationErrors.push(`Soal ${index + 1}: Ada pilihan jawaban kosong`);
        }
      });

      if (validationErrors.length > 0) {
        this.showToast(
          `Ditemukan ${validationErrors.length} error dalam validasi`,
          "error"
        );
        console.log("Validation errors:", validationErrors);
      } else {
        this.showToast("Semua soal valid!", "success");
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.uploadedFile = file;
        this.showToast(`File ${file.name} siap diimport`, "success");
      }
    },
    processImport() {
      if (!this.uploadedFile) {
        this.showToast("Pilih file terlebih dahulu", "error");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          if (Array.isArray(importedData)) {
            importedData.forEach((question) => {
              if (question.text && question.options) {
                this.questions.push({
                  ...question,
                  id: Date.now() + Math.random(),
                });
              }
            });
            this.updateStats();
            this.showToast(`Berhasil mengimport ${importedData.length} soal`, "success");
          } else {
            this.showToast("Format file tidak valid", "error");
          }
        } catch (error) {
          this.showToast("Error saat memproses file", "error");
        }
      };

      reader.readAsText(this.uploadedFile);
      this.showImportModal = false;
      this.uploadedFile = null;
    },
  },
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

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(-100%);
}
</style>
