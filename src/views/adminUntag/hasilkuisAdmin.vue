<template>
  <div class="flex min-h-screen">
    <SidebarAdmin />
    <div class="flex-1 bg-black text-white p-6">
      <div class="max-w-6xl mx-auto">
        <div
          class="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mb-8"
        >
          <h1 class="text-2xl font-bold mb-2">📋 Daftar Mahasiswa yang Submit Quiz</h1>
          <p class="text-white/80 text-sm">
            Pantau hasil dan skor mahasiswa secara real-time.
          </p>
        </div>
        <div class="bg-white/10 rounded-3xl shadow-2xl overflow-hidden">
          <div class="p-6">
            <table class="min-w-full table-auto">
              <thead>
                <tr class="bg-yellow-500 text-white text-left text-sm">
                  <th class="p-4">#</th>
                  <th class="p-4">NAMA</th>
                  <th class="p-4">NIM</th>
                  <th class="p-4">SKOR</th>
                  <th class="p-4">Tanggal Submit</th>
                  <th class="p-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(submission, index) in submissions"
                  :key="submission.id"
                  class="border-b hover:bg-gray-100/10  transition-all duration-200"
                >
                  <td class="p-4 text-white">{{ index + 1 }}</td>
                  <td class="p-4 text-white">{{ submission.student_name }}</td>
                  <td class="p-4 text-white">{{ submission.nim }}</td>
                  <td class="p-4 font-semibold text-green-400">{{ submission.score }}</td>
                  <td class="p-4 text-white">
                    {{ formatDate(submission.submitted_at) }}
                  </td>
                  <td class="p-4 text-white">
                    <button
                      @click="viewDetail(submission)"
                      class="px-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 flex items-center gap-2"
                    >
                      <i class="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
                <tr v-if="submissions.length === 0">
                  <td colspan="6" class="p-4 text-center text-white/70">
                    Belum ada data submission
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          v-if="showDetailModal"
          class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-lg border border-white/20"
        >
          <div
            class="bg-white text-black w-full max-w-xl p-6 rounded-2xl shadow-lg relative"
          >
            <h2 class="text-xl font-bold mb-4">Detail Jawaban Mahasiswa</h2>
            <p><strong>Nama:</strong> {{ selectedSubmission.student_name }}</p>
            <p><strong>NIM:</strong> {{ selectedSubmission.nim }}</p>
            <p><strong>Skor:</strong> {{ selectedSubmission.score }}</p>
            <p>
              <strong>Tanggal:</strong> {{ formatDate(selectedSubmission.submitted_at) }}
            </p>

            <button
              class="absolute top-4 right-4 text-red-600 hover:text-red-800"
              @click="showDetailModal = false"
            >
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import treasureService from "@/service/treasureService.js";

export default {
  name: "StudentSubmissions",
  components: {
    SidebarAdmin,
  },
  data() {
    return {
      rawSubmissions: [],
      submissions: [],
      showDetailModal: false,
      selectedSubmission: null,
    };
  },
  methods: {
    async fetchSubmissions() {
      try {
        const response = await treasureService.getSubmissions();
        console.log("RESPON DARI BACKEND:", response.data); // Tambahkan ini

        this.rawSubmissions = response.data.data;
        this.groupSubmissions();
      } catch (error) {
        console.error("Gagal mengambil data submissions:", error);
      }
    },
    groupSubmissions() {
      const grouped = {};
      this.rawSubmissions.forEach((item) => {
        const mhsId = item.mahasiswa_id;
        if (!grouped[mhsId]) {
          grouped[mhsId] = {
            student_name: item.Mahasiswa.name,
            nim: item.Mahasiswa.nim,
            answers: [],
            score: 0,
            submitted_at: item.answered_at,
          };
        }

        grouped[mhsId].answers.push({
          question: item.Question.question,
          correct_answer: item.Question.correct,
          student_answer: item.selected,
          is_correct: item.is_correct,
        });

        if (item.is_correct) grouped[mhsId].score += 1;
      });

      // ubah menjadi array untuk v-for
      this.submissions = Object.values(grouped);
    },

    viewDetail(submission) {
      this.selectedSubmission = submission;
      this.showDetailModal = true;
    },
    formatDate(datetime) {
      const date = new Date(datetime);
      return date.toLocaleString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  mounted() {
    this.fetchSubmissions();
  },
};
</script>

<style scoped>
/* Tambahan opsional */
</style>
