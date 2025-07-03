<template>
  <div class="flex min-h-screen bg-gray-50">
    <SidebarAdmin
      :is-collapsed="isCollapsed"
      :menu-items="menuItems"
      @toggle="toggleSidebar"
      @set-active="setActiveMenu"
    />

    <div class="flex-1 p-8">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Manajemen Soal</h1>
          <p class="text-gray-600">Kelola pertanyaan untuk seleksi</p>
        </div>
        <button
          @click="showAddModal = true"
          class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <span>+</span>
          <span>Tambah Soal</span>
        </button>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          v-for="stat in stats"
          :key="stat.title"
          class="bg-white rounded-xl p-6 shadow-sm border border-black"
        >
          <div class="border-l-4 border-purple-500 pl-4">
            <h3 class="text-lg font-semibold text-gray-800">{{ stat.title }}</h3>
            <p class="text-3xl font-bold text-gray-900 mt-2">{{ stat.value }}</p>
            <p class="text-sm text-gray-500 mt-1">{{ stat.subtitle }}</p>
          </div>
        </div>
      </div>

      <!-- Questions List -->
      <div class="space-y-4">
        <div
          v-for="question in questions"
          :key="question.id"
          class="bg-white rounded-xl p-6 shadow-sm border border-black"
        >
          <div class="flex justify-between items-start mb-4">
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-800 mb-2">
                {{ question.text }}
              </h3>
              <div class="flex space-x-4 text-sm text-gray-500">
                <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded">{{
                  question.type
                }}</span>
                <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">{{
                  question.difficulty
                }}</span>
              </div>
            </div>
          </div>

          <p class="text-sm text-gray-600 mb-4">Pilihan jawaban</p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div
              v-for="(option, index) in question.options"
              :key="index"
              :class="[
                'p-3 border-2 text-sm rounded-lg',
                option.isCorrect
                  ? 'bg-green-100 border-green-300 text-green-800'
                  : 'bg-gray-50 border-gray-200 text-gray-700',
              ]"
            >
              {{ option.label }}. {{ option.text }}
            </div>
          </div>

          <div class="flex space-x-3">
            <button
              @click="previewQuestion(question)"
              class="flex items-center space-x-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
              </svg>
              <span>Preview</span>
            </button>

            <button
              @click="editQuestion(question)"
              class="flex items-center space-x-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
              <span>Edit</span>
            </button>

            <button
              @click="confirmDelete(question)"
              class="flex items-center space-x-2 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
              <span>Hapus</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Add/Edit Question Modal -->
      <div
        v-if="showAddModal || showEditModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">
              {{ showEditModal ? "Edit Soal" : "Tambah Soal Baru" }}
            </h2>
            <p class="text-gray-600 mb-6">
              {{
                showEditModal
                  ? "Ubah pertanyaan untuk seleksi"
                  : "Buat pertanyaan untuk seleksi"
              }}
            </p>
            <form @submit.prevent="saveQuestion">
              <!-- Question Text -->
              <div class="mb-6">
                <label class="block text-lg font-medium text-gray-700 mb-2"
                  >Pertanyaan</label
                >
                <textarea
                  v-model="newQuestion.text"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  rows="3"
                  placeholder="Tulis pertanyaan di sini..."
                  required
                ></textarea>
              </div>

              <!-- Answer Options -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Pilihan jawaban</label
                >
                <div class="space-y-3">
                  <div
                    v-for="(option, index) in newQuestion.options"
                    :key="index"
                    class="flex items-center space-x-3"
                  >
                    <span class="font-medium text-gray-700 w-6">{{ option.label }}.</span>
                    <input
                      v-model="option.text"
                      type="text"
                      class="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      :placeholder="`Jawaban ${option.label}`"
                      required
                    />
                  </div>
                </div>
              </div>

              <!-- Correct Answer -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Jawaban benar</label
                >
                <select
                  v-model="newQuestion.correctAnswer"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                >
                  <option value="">Pilih jawaban benar</option>
                  <option
                    v-for="option in newQuestion.options"
                    :key="option.label"
                    :value="option.label"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>

              <!-- Difficulty Level -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Tingkat kesulitan</label
                >
                <select
                  v-model="newQuestion.difficulty"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                >
                  <option value="">Pilih tingkat kesulitan</option>
                  <option value="mudah">Mudah</option>
                  <option value="sedang">Sedang</option>
                  <option value="sulit">Sulit</option>
                </select>
              </div>

              <!-- Question Type -->
              <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Jenis Pertanyaan</label
                >
                <select
                  v-model="newQuestion.type"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  required
                >
                  <option value="">Pilih Jenis pertanyaan</option>
                  <option value="multiple-choice">Pilihan Ganda</option>
                  <option value="essay">Essay</option>
                  <option value="true-false">Benar/Salah</option>
                </select>
              </div>

              <!-- Action Buttons -->
              <div class="flex space-x-3">
                <button
                  type="submit"
                  class="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  {{ showEditModal ? "Update Soal" : "Simpan Soal" }}
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

      <!-- Preview Modal -->
      <div
        v-if="showPreviewModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold text-gray-800">Preview Soal</h2>
              <button
                @click="showPreviewModal = false"
                class="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <div v-if="previewData" class="space-y-6">
              <!-- Question Info -->
              <div class="flex space-x-4 text-sm">
                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">{{
                  previewData.type
                }}</span>
                <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">{{
                  previewData.difficulty
                }}</span>
              </div>

              <!-- Question Text -->
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">
                  {{ previewData.text }}
                </h3>
              </div>

              <!-- Answer Options -->
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
                    <span class="font-medium">{{ option.label }}.</span>
                    <span>{{ option.text }}</span>
                    <span
                      v-if="option.isCorrect"
                      class="ml-auto text-green-600 font-medium"
                      >✓ Benar</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <div class="bg-white rounded-xl max-w-md w-full p-6">
          <div class="text-center">
            <div
              class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4"
            >
              <svg
                class="h-6 w-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                ></path>
              </svg>
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
                Hapus
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
          'fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 transition-all duration-300',
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white',
        ]"
      >
        <div class="flex items-center space-x-2">
          <svg
            v-if="toast.type === 'success'"
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <svg
            v-else
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
          <span>{{ toast.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import { ref, reactive } from "vue";

export default {
  components: {
    SidebarAdmin,
  },
  name: "BankSoal",
  setup() {
    const showAddModal = ref(false);
    const showEditModal = ref(false);
    const showPreviewModal = ref(false);
    const showDeleteModal = ref(false);
    const isCollapsed = ref(false);
    const editingQuestionId = ref(null);
    const questionToDelete = ref(null);
    const previewData = ref(null);

    const toast = reactive({
      show: false,
      type: "success",
      message: "",
    });

    const stats = reactive([
      { title: "Total Soal", value: "90", subtitle: "Total Mahasiswa 300" },
      { title: "Soal Mudah", value: "30", subtitle: "33% dari total soal" },
      { title: "Soal Sedang", value: "40", subtitle: "44% dari total soal" },
      { title: "Soal Sulit", value: "20", subtitle: "23% dari total soal" },
    ]);

    const menuItems = reactive([
      { name: "Dashboard", icon: "navbar-1.png", route: "/", active: false },
      { name: "Bank Soal", icon: "navbar-2.png", route: "/bank-soal", active: true },
      {
        name: "Monitoring Progress",
        icon: "navbar-3.png",
        route: "/monitoring-progress",
        active: false,
      },
      { name: "Leaderboard", icon: "navbar-4.png", route: "/leaderboard", active: false },
      { name: "Treasure Hint", icon: "navbar-5.png", route: "/treasure", active: false },
      { name: "Sponsorship", icon: "navbar-6.png", route: "/sponsorship", active: false },
      {
        name: "Manajemen Kelompok",
        icon: "navbar-7.png",
        route: "/manajemen-kelompok",
        active: false,
      },
      {
        name: "Manajemen Event",
        icon: "navbar.png",
        route: "/manajemen-event",
        active: false,
      },
    ]);

    const questions = reactive([
      {
        id: 1,
        text: "Siapa pendiri Universitas 17 Agustus 1945 Surabaya?",
        options: [
          { label: "A", text: "Dr Soetomo", isCorrect: false },
          { label: "B", text: "Bung Tomo", isCorrect: false },
          { label: "C", text: "Prof. Dr. Moestopo", isCorrect: true },
          { label: "D", text: "K.H. Mas Mansur", isCorrect: false },
        ],
        difficulty: "mudah",
        type: "multiple-choice",
      },
      {
        id: 2,
        text: "Apa singkatan dari HTML dalam konteks web development?",
        options: [
          { label: "A", text: "Hypertext Markup Language", isCorrect: true },
          { label: "B", text: "High Tech Modern Language", isCorrect: false },
          { label: "C", text: "Home Tool Markup Language", isCorrect: false },
          { label: "D", text: "Hyperlink and Text Markup Language", isCorrect: false },
        ],
        difficulty: "sedang",
        type: "multiple-choice",
      },
    ]);

    const newQuestion = reactive({
      text: "",
      options: [
        { label: "A", text: "" },
        { label: "B", text: "" },
        { label: "C", text: "" },
        { label: "D", text: "" },
      ],
      correctAnswer: "",
      difficulty: "",
      type: "",
    });

    const showToast = (message, type = "success") => {
      toast.message = message;
      toast.type = type;
      toast.show = true;

      setTimeout(() => {
        toast.show = false;
      }, 3000);
    };

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const setActiveMenu = (menuName) => {
      menuItems.forEach((item) => {
        item.active = item.name === menuName;
      });
    };

    const previewQuestion = (question) => {
      previewData.value = { ...question };
      showPreviewModal.value = true;
    };

    const editQuestion = (question) => {
      editingQuestionId.value = question.id;
      newQuestion.text = question.text;
      newQuestion.options = [...question.options];
      newQuestion.correctAnswer =
        question.options.find((opt) => opt.isCorrect)?.label || "";
      newQuestion.difficulty = question.difficulty;
      newQuestion.type = question.type;
      showEditModal.value = true;
    };

    const confirmDelete = (question) => {
      questionToDelete.value = question;
      showDeleteModal.value = true;
    };

    const deleteQuestion = () => {
      if (questionToDelete.value) {
        const index = questions.findIndex((q) => q.id === questionToDelete.value.id);
        if (index > -1) {
          questions.splice(index, 1);
          showToast("Soal berhasil dihapus", "success");
          updateStats();
        }
      }
      showDeleteModal.value = false;
      questionToDelete.value = null;
    };

    const saveQuestion = () => {
      if (showEditModal.value) {
        // Update existing question
        const index = questions.findIndex((q) => q.id === editingQuestionId.value);
        if (index > -1) {
          questions[index] = {
            id: editingQuestionId.value,
            text: newQuestion.text,
            options: newQuestion.options.map((option) => ({
              ...option,
              isCorrect: option.label === newQuestion.correctAnswer,
            })),
            difficulty: newQuestion.difficulty,
            type: newQuestion.type,
          };
          showToast("Soal berhasil diupdate", "success");
        }
      } else {
        // Create new question
        const question = {
          id: Date.now(),
          text: newQuestion.text,
          options: newQuestion.options.map((option) => ({
            ...option,
            isCorrect: option.label === newQuestion.correctAnswer,
          })),
          difficulty: newQuestion.difficulty,
          type: newQuestion.type,
        };
        questions.push(question);
        showToast("Soal berhasil ditambahkan", "success");
      }

      updateStats();
      cancelModal();
    };

    const cancelModal = () => {
      resetForm();
      showAddModal.value = false;
      showEditModal.value = false;
      editingQuestionId.value = null;
    };

    const resetForm = () => {
      newQuestion.text = "";
      newQuestion.options.forEach((option) => (option.text = ""));
      newQuestion.correctAnswer = "";
      newQuestion.difficulty = "";
      newQuestion.type = "";
    };

    const updateStats = () => {
      const total = questions.length;
      const mudah = questions.filter((q) => q.difficulty === "mudah").length;
      const sedang = questions.filter((q) => q.difficulty === "sedang").length;
      const sulit = questions.filter((q) => q.difficulty === "sulit").length;

      stats[0].value = total.toString();
      stats[1].value = mudah.toString();
      stats[2].value = sedang.toString();
      stats[3].value = sulit.toString();

      if (total > 0) {
        stats[1].subtitle = `${Math.round((mudah / total) * 100)}% dari total soal`; 
        stats[2].subtitle = `${Math.round((sedang / total) * 100)}% dari total soal`;
        stats[3].subtitle = `${Math.round((sulit / total) * 100)}% dari total soal`;
      }
    };

    // Initialize stats
    updateStats();

    return {
      showAddModal,
      showEditModal,
      showPreviewModal,
      showDeleteModal,
      stats,
      questions,
      newQuestion,
      previewData,
      toast,
      previewQuestion,
      editQuestion,
      confirmDelete,
      deleteQuestion,
      saveQuestion,
      cancelModal,
      menuItems,
      toggleSidebar,
      setActiveMenu,
      isCollapsed,
    };
  },
};
</script>
