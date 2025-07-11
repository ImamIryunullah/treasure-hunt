<template>
  <div class="bg-purple-50 flex min-h-screen">
    <SidebarAdmin
      :is-collapsed="isCollapsed"
      :menu-items="menuItems"
      @toggle="toggleSidebar"
      @set-active="setActiveMenu"
    />

    <div class="flex-1 p-8">
      <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between">
          <div class="mb-4 md:mb-0">
            <h1 class="text-3xl font-bold text-gray-800 mb-2">Laporan & Rekap Akhir</h1>
            <p class="text-gray-600 mb-4">Hasil Lengkap Treasure Hunt UNTAG Surabaya</p>
          </div>
          <div class="flex gap-3">
            <button
              @click="exportToExcel"
              class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm flex items-center gap-2"
            >
              <i class="fas fa-file-excel"></i>
              Export Excel
            </button>
            <button
              @click="exportToPDF"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm flex items-center gap-2"
            >
              <i class="fas fa-file-pdf"></i>
              Export PDF
            </button>
          </div>
        </div>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <i class="fas fa-users text-blue-500 text-2xl"></i>
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-gray-500">Total Kelompok</div>
              <div class="text-2xl font-bold text-gray-900">{{ statistics.totalKelompok }}</div>
              <div class="text-sm text-gray-500">Kelompok terdaftar</div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <i class="fas fa-trophy text-yellow-500 text-2xl"></i>
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-gray-500">Total Hadiah</div>
              <div class="text-2xl font-bold text-gray-900">{{ statistics.totalHadiah }}</div>
              <div class="text-sm text-gray-500">Hadiah terdistribusi</div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <i class="fas fa-clock text-orange-500 text-2xl"></i>
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-gray-500">Rata-rata Waktu</div>
              <div class="text-2xl font-bold text-gray-900">{{ statistics.rataWaktu }}</div>
              <div class="text-sm text-gray-500">Menit per kelompok</div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <i class="fas fa-check-circle text-green-500 text-2xl"></i>
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-gray-500">Tingkat Keberhasilan</div>
              <div class="text-2xl font-bold text-gray-900">{{ statistics.tingkatKeberhasilan }}%</div>
              <div class="text-sm text-gray-500">Berhasil terfinish</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Faculty Statistics Chart -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Statistik per Fakultas</h2>
          <p class="text-gray-600 mb-4">Partisipasi kelompok berdasarkan fakultas</p>
          <div class="h-64">
            <canvas ref="facultyChart"></canvas>
          </div>
        </div>

        <!-- Prize Distribution Chart -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-4">Distribusi Hadiah</h2>
          <p class="text-gray-600 mb-4">Sebaran jumlah hadiah yang didistribusikan</p>
          <div class="h-64">
            <canvas ref="prizeChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Final Rankings Table -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Peringkat Akhir Kelompok</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peringkat</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Kelompok</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fakultas</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lokasi Dicapai</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skor Diperoleh</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jawaban Benar</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hadiah</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(kelompok, index) in finalRankings" :key="index" 
                  :class="[
                    'hover:bg-gray-50',
                    index === 0 ? 'bg-yellow-50' : '',
                    index === 1 ? 'bg-gray-50' : '',
                    index === 2 ? 'bg-orange-50' : ''
                  ]">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <span :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      index === 0 ? 'bg-yellow-500 text-white' : 
                      index === 1 ? 'bg-gray-400 text-white' : 
                      index === 2 ? 'bg-orange-500 text-white' : 'bg-blue-100 text-blue-800'
                    ]">
                      #{{ index + 1 }}
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ kelompok.nama }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ kelompok.fakultas }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ kelompok.lokasiDicapai }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ kelompok.skorDiperoleh }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ kelompok.jawabanBenar }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ kelompok.hadiah }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ kelompok.waktu }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Performance by Location -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Performa per Lokasi</h2>
        <p class="text-gray-600 mb-4">Statistik kebehasilan dan tingkat berhasil</p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(lokasi, index) in performanceByLocation" :key="index" class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-lg font-semibold text-gray-800">{{ lokasi.nama }}</h3>
              <span class="text-sm text-gray-500">{{ lokasi.keberhasilan }} Keberhasilan</span>
            </div>
            <div class="mb-2">
              <div class="flex justify-between text-sm text-gray-600 mb-1">
                <span>Tingkat Berhasil</span>
                <span>{{ lokasi.tingkatBerhasil }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-blue-600 h-2 rounded-full" :style="{ width: lokasi.tingkatBerhasil + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Event Summary -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Ringkasan Event</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-3">Highlights</h3>
            <ul class="space-y-2">
              <li v-for="(highlight, index) in eventSummary.highlights" :key="index" 
                  class="flex items-start">
                <i class="fas fa-check-circle text-green-500 mr-2 mt-1"></i>
                <span class="text-gray-700">{{ highlight }}</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-800 mb-3">Rekomendasi</h3>
            <ul class="space-y-2">
              <li v-for="(recommendation, index) in eventSummary.recommendations" :key="index" 
                  class="flex items-start">
                <i class="fas fa-lightbulb text-yellow-500 mr-2 mt-1"></i>
                <span class="text-gray-700">{{ recommendation }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import { reactive, ref, onMounted } from "vue";
import Chart from 'chart.js/auto';

export default {
  components: {
    SidebarAdmin,
  },
  setup() {
    const isCollapsed = ref(false);
    const facultyChart = ref(null);
    const prizeChart = ref(null);

    const statistics = reactive({
      totalKelompok: 5,
      totalHadiah: 14,
      rataWaktu: 25,
      tingkatKeberhasilan: 100
    });

    const finalRankings = reactive([
      {
        nama: "Karton",
        fakultas: "Keperawatan Kuan",
        lokasiDicapai: "Gedung G",
        skorDiperoleh: "+3",
        jawabanBenar: 5,
        hadiah: 5,
        waktu: "28 menit"
      },
      {
        nama: "Suharmo",
        fakultas: "okokok",
        lokasiDicapai: "Gedung G",
        skorDiperoleh: "+2",
        jawabanBenar: 4,
        hadiah: 3,
        waktu: "25 menit"
      },
      {
        nama: "Ditempatkan",
        fakultas: "Psikologi",
        lokasiDicapai: "Lab Komputer",
        skorDiperoleh: "+1",
        jawabanBenar: 3,
        hadiah: 3,
        waktu: "22 menit"
      },
      {
        nama: "Hades",
        fakultas: "IT/Teknik",
        lokasiDicapai: "Aula",
        skorDiperoleh: "0",
        jawabanBenar: 2,
        hadiah: 1,
        waktu: "30 menit"
      },
      {
        nama: "Cut Nyak Dien",
        fakultas: "Komunikasi",
        lokasiDicapai: "Aula",
        skorDiperoleh: "0",
        jawabanBenar: 2,
        hadiah: 2,
        waktu: "32 menit"
      }
    ]);

    const performanceByLocation = reactive([
      {
        nama: "Gedung G",
        keberhasilan: 15,
        tingkatBerhasil: 85
      },
      {
        nama: "Perpustakaan",
        keberhasilan: 12,
        tingkatBerhasil: 70
      },
      {
        nama: "Aula",
        keberhasilan: 10,
        tingkatBerhasil: 60
      },
      {
        nama: "Lab Komputer",
        keberhasilan: 14,
        tingkatBerhasil: 80
      },
      {
        nama: "Jogja",
        keberhasilan: 8,
        tingkatBerhasil: 45
      },
      {
        nama: "Aula",
        keberhasilan: 10,
        tingkatBerhasil: 60
      }
    ]);

    const eventSummary = reactive({
      highlights: [
        "Partisipasi aktif semua fakultas dengan tingkat kehadiran 100%",
        "Total persimpangan lokasi yang dikunjungi mencapai 15 titik",
        "Tingkat keberhasilan penyelesaian soal mencapai 85%",
        "Waktu tercepat 16 menit (Cut Nyak Dien)"
      ],
      recommendations: [
        "Tingkatkan kesulitan soal Lab Komputer untuk meningkatkan tantangan",
        "Optimisasi alokasi waktu untuk mengurangi antrian kelompok",
        "Pertimbangkan penambahan checkpoint untuk experience yang lebih baik",
        "Event serupa direkomendasikan dengan format engagement maksimal"
      ]
    });

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const exportToExcel = () => {
      // Simulate Excel export
      const data = finalRankings.map(kelompok => ({
        Peringkat: finalRankings.indexOf(kelompok) + 1,
        'Nama Kelompok': kelompok.nama,
        Fakultas: kelompok.fakultas,
        'Lokasi Dicapai': kelompok.lokasiDicapai,
        'Skor Diperoleh': kelompok.skorDiperoleh,
        'Jawaban Benar': kelompok.jawabanBenar,
        Hadiah: kelompok.hadiah,
        Waktu: kelompok.waktu
      }));
      
      console.log('Exporting to Excel:', data);
      alert('Data telah diekspor ke Excel!');
    };

    const exportToPDF = () => {
      // Simulate PDF export
      console.log('Exporting to PDF...');
      alert('Laporan telah diekspor ke PDF!');
    };

    const initCharts = () => {
      // Faculty Chart
      if (facultyChart.value) {
        const ctx = facultyChart.value.getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Teknik', 'Ekonomi', 'Hukum', 'Psikologi', 'Komunikasi'],
            datasets: [{
              label: 'Jumlah Kelompok',
              data: [3, 2, 1, 2, 1],
              backgroundColor: [
                'rgba(59, 130, 246, 0.8)',
                'rgba(16, 185, 129, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(239, 68, 68, 0.8)',
                'rgba(139, 92, 246, 0.8)'
              ],
              borderColor: [
                'rgba(59, 130, 246, 1)',
                'rgba(16, 185, 129, 1)',
                'rgba(245, 158, 11, 1)',
                'rgba(239, 68, 68, 1)',
                'rgba(139, 92, 246, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 5
              }
            }
          }
        });
      }

      // Prize Distribution Chart
      if (prizeChart.value) {
        const ctx = prizeChart.value.getContext('2d');
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Hadiah 1', 'Hadiah 2', 'Hadiah 3', 'Hadiah 4', 'Hadiah 5'],
            datasets: [{
              data: [5, 3, 3, 2, 1],
              backgroundColor: [
                'rgba(59, 130, 246, 0.8)',
                'rgba(16, 185, 129, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(239, 68, 68, 0.8)',
                'rgba(139, 92, 246, 0.8)'
              ],
              borderColor: [
                'rgba(59, 130, 246, 1)',
                'rgba(16, 185, 129, 1)',
                'rgba(245, 158, 11, 1)',
                'rgba(239, 68, 68, 1)',
                'rgba(139, 92, 246, 1)'
              ],
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom'
              }
            }
          }
        });
      }
    };

    onMounted(() => {
      setTimeout(() => {
        initCharts();
      }, 100);
    });

    return {
      isCollapsed,
      statistics,
      finalRankings,
      performanceByLocation,
      eventSummary,
      facultyChart,
      prizeChart,
      toggleSidebar,
      exportToExcel,
      exportToPDF
    };
  },
};
</script>

<style>
/* Add FontAwesome for icons */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
</style>