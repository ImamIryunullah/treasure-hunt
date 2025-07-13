<template>
  <div class="flex min-h-screen bg-gray-50">
    <SidebarAdmin />

    <div class="flex-1 p-8">
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Treasure Hunt Management 🗺️</h1>
        <p class="text-gray-600">
          Kelola permainan treasure hunt, lokasi, dan monitor aktivitas peserta
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg border border-black p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-black">Total Lokasi</p>
              <p class="text-2xl font-bold text-blue-600">{{ totalLocations }}</p>
            </div>
            <div
              class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"
            >
              <span class="text-2xl">📍</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-black p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-black">Tim Aktif</p>
              <p class="text-2xl font-bold text-green-600">{{ activeTeams }}</p>
            </div>
            <div
              class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"
            >
              <span class="text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-black p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-black">Kode Aktif</p>
              <p class="text-2xl font-bold text-purple-600">{{ activeCodes }}</p>
            </div>
            <div
              class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center"
            >
              <span class="text-2xl">🔑</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg border border-black p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-black">Waktu Tersisa</p>
              <p class="text-2xl font-bold text-red-600">{{ formatTime(gameTime) }}</p>
            </div>
            <div
              class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center"
            >
              <span class="text-2xl">⏰</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md border border-black p-6 mb-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">🎮 Game Control Panel</h2>
          <div class="flex gap-2">
            <button
              @click="startGame"
              :disabled="gameStatus === 'running'"
              class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md disabled:opacity-50 flex items-center space-x-2"
            >
              <i
                :class="gameStatus === 'running' ? 'fas fa-sync-alt' : 'fas fa-play'"
              ></i>
              <span>
                {{ gameStatus === "running" ? "Game Berjalan" : "Mulai Game" }}
              </span>
            </button>

            <button
              @click="pauseGame"
              :disabled="gameStatus !== 'running'"
              class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md disabled:opacity-50 flex items-center space-x-2"
            >
              <i class="fas fa-pause"></i>
              <span>Pause</span>
            </button>

            <button
              @click="resetGame"
              class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center space-x-2"
            >
              <i class="fas fa-undo"></i>
              <span>Reset Game</span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Durasi Game (menit)</label
            >
            <input
              v-model="gameDuration"
              type="number"
              min="30"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <label class="block text-sm font-medium text-gray-700 mb-2">Max Tim</label>
            <input
              v-model="maxTeams"
              type="number"
              min="1"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Status Game</label
            >
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full" :class="getStatusColor(gameStatus)"></div>
              <span class="text-sm font-medium">{{ getStatusText(gameStatus) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 mb-8 border border-black">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">📍 Manajemen Lokasi</h2>
          <button
            @click="showLocationModal = true"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <i class="fas fa-plus"></i>
            <span>Tambah Lokasi</span>
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b">
                <th class="text-left py-3 px-4">Lokasi</th>
                <th class="text-left py-3 px-4">Tipe</th>
                <th class="text-left py-3 px-4">Kode</th>
                <th class="text-left py-3 px-4">Poin</th>
                <th class="text-left py-3 px-4">Status</th>
                <th class="text-left py-3 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="location in locations"
                :key="location.id"
                class="border-b hover:bg-gray-50"
              >
                <td class="py-3 px-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      :class="getLocationClass(location)"
                    >
                      {{ location.icon }}
                    </div>
                    <div>
                      <div class="font-medium">{{ location.name }}</div>
                      <div class="text-sm text-gray-600">
                        Posisi: {{ location.x }}%, {{ location.y }}%
                      </div>
                    </div>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <span
                    class="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
                    >{{ location.type }}</span
                  >
                </td>
                <td class="py-3 px-4">
                  <code class="bg-gray-100 px-2 py-1 rounded text-sm">{{
                    location.code
                  }}</code>
                </td>
                <td class="py-3 px-4">
                  <span class="font-medium">{{ location.points }}</span>
                </td>
                <td class="py-3 px-4">
                  <div class="flex items-center gap-2">
                    <div
                      class="w-2 h-2 rounded-full"
                      :class="location.available ? 'bg-green-500' : 'bg-red-500'"
                    ></div>
                    <span class="text-sm">{{
                      location.available ? "Aktif" : "Nonaktif"
                    }}</span>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <div class="flex gap-2">
                    <button
                      @click="editLocation(location)"
                      class="text-blue-600 hover:text-blue-800 p-1"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button
                      @click="toggleLocationStatus(location)"
                      class="text-yellow-600 hover:text-yellow-800 p-1"
                    >
                      <i
                        :class="location.available ? 'fas fa-lock' : 'fas fa-lock-open'"
                      ></i>
                    </button>
                    <button
                      @click="deleteLocation(location)"
                      class="text-red-600 hover:text-red-800 p-1"
                    >
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 mb-8 border border-black">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold">👥 Manajemen Kelompok</h2>

          <a href="/manajemen-kelompok">
            <button
              @click="showTeamModal = true"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              Kelola Kelompok
            </button></a
          >
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b">
                <th class="text-left py-3 px-4">Tim</th>
                <th class="text-left py-3 px-4">Poin</th>
                <th class="text-left py-3 px-4">Lokasi Selesai</th>
                <th class="text-left py-3 px-4">Waktu Terakhir</th>
                <th class="text-left py-3 px-4">Status</th>
                <th class="text-left py-3 px-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="team in teams" :key="team.id" class="border-b hover:bg-gray-50">
                <td class="py-3 px-4">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm"
                    >
                      {{ team.name.charAt(0) }}
                    </div>
                    <div>
                      <div class="font-medium">{{ team.name }}</div>
                      <div class="text-sm text-gray-600">{{ team.members }} anggota</div>
                    </div>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <span class="font-medium">{{ team.points }}</span>
                </td>
                <td class="py-3 px-4">
                  <span>{{ team.completed }}/{{ totalLocations }}</span>
                </td>
                <td class="py-3 px-4">
                  <span class="text-sm text-gray-600">{{ team.lastActivity }}</span>
                </td>
                <td class="py-3 px-4">
                  <div class="flex items-center gap-2">
                    <div
                      class="w-2 h-2 rounded-full"
                      :class="team.active ? 'bg-green-500' : 'bg-gray-500'"
                    ></div>
                    <span class="text-sm">{{
                      team.active ? "Aktif" : "Tidak Aktif"
                    }}</span>
                  </div>
                </td>
                <td class="py-3 px-4">
                  <div class="flex gap-1">
                    <button
                      @click="viewTeamDetails(team)"
                      class="text-blue-600 hover:text-blue-800 p-1"
                    >
                      <i class="fas fa-eye block"></i>
                    </button>

                    <button
                      @click="resetTeamProgress(team)"
                      class="text-yellow-600 hover:text-yellow-800 p-1"
                    >
                      <i class="fas fa-undo-alt"></i>
                    </button>
                  </div>
                  <div
                    v-if="showTeamModal && selectedTeam"
                    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                  >
                    <div
                      class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative"
                      @click.stop
                    >
                      <h2 class="text-xl font-bold text-gray-800 mb-4">
                        Detail Kelompok
                      </h2>

                      <div class="space-y-2 text-sm text-gray-700">
                        <div><strong>Nama:</strong> {{ selectedTeam.name }}</div>
                        <div>
                          <strong>Deskripsi:</strong> {{ selectedTeam.description }}
                        </div>
                        <div>
                          <strong>Anggota:</strong> {{ selectedTeam.members.length }} /
                          {{ selectedTeam.maxMembers }}
                        </div>
                        <div>
                          <strong>Poin:</strong> {{ selectedTeam.progress?.poin ?? 0 }}
                        </div>
                        <div>
                          <strong>Lokasi Selesai:</strong>
                          {{ selectedTeam.progress?.lokasiSelesai ?? 0 }}
                        </div>
                        <div>
                          <strong>Status:</strong>
                          {{ selectedTeam.progress?.isActive ? "Aktif" : "Tidak Aktif" }}
                        </div>
                      </div>

                      <div class="mt-6 flex justify-end">
                        <button
                          class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                          @click="closeTeamModal"
                        >
                          Tutup
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-6 border border-black">
        <h2 class="text-lg font-semibold mb-4">📊 Aktivitas Terbaru</h2>
        <div class="space-y-3">
          <div
            v-for="activity in recentActivities"
            :key="activity.id"
            class="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
          >
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-lg">
              {{ activity.icon }}
            </div>
            <div class="flex-1">
              <div class="text-sm font-medium">{{ activity.title }}</div>
              <div class="text-xs text-gray-600">{{ activity.description }}</div>
              <div class="text-xs text-gray-500 mt-1">{{ activity.time }}</div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="showLocationModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">
              {{ editingLocation ? "Edit Lokasi" : "Tambah Lokasi" }}
            </h3>
            <button @click="closeLocationModal" class="text-gray-500 hover:text-gray-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Nama Lokasi</label
              >
              <input
                v-model="locationForm.name"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Icon</label>

              <!-- Preview icon -->
              <div v-if="locationForm.icon" class="text-2xl mb-2 text-blue-600">
                <i :class="`fas fa-${locationForm.icon}`"></i>
              </div>

              <!-- Dropdown -->
              <select
                v-model="locationForm.icon"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option disabled value="">Pilih icon</option>
                <option v-for="icon in iconOptions" :key="icon" :value="icon">
                  {{ icon }}
                </option>
              </select>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Koordinat Latitude (%)</label
                >
                <input
                  v-model.number="locationForm.latitude"
                  type="number"
                  min="0"
                  max="100"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Koordinat Longitude (%)</label
                >
                <input
                  v-model.number="locationForm.longitude"
                  type="number"
                  min="0"
                  max="100"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tipe</label>
              <select
                v-model="locationForm.type"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Academic">Academic</option>
                <option value="Administrative">Administrative</option>
                <option value="Religious">Religious</option>
                <option value="Recreation">Recreation</option>
                <option value="Facility">Facility</option>
                <option value="Sports">Sports</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Kode Treasure</label
              >
              <input
                v-model="locationForm.code"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Poin</label>
              <input
                v-model.number="locationForm.points"
                type="number"
                min="0"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Deskripsi</label
              >
              <textarea
                v-model="locationForm.description"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>

          <div class="flex gap-3 mt-6">
            <button
              @click="closeLocationModal"
              class="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
            >
              Batal
            </button>
            <button
              @click="saveLocation"
              class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              {{ editingLocation ? "Update" : "Simpan" }}
            </button>
          </div>
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
  data() {
    return {
      activeTeams: 5,
      activeCodes: 10,
      gameTime: 7200,
      gameDuration: 120,
      showTeamModal: false,
      selectedTeam: null,
      maxTeams: 10,
      gameStatus: "stopped",
      iconOptions: [
        "map-marker-alt",
        "compass",
        "flag",
        "star",
        "location-arrow",
        "crosshairs",
        "anchor",
        "binoculars",
        "bullseye",
        "gem",
        "search-location",
        "route",
        "globe-asia",
        "footprints",
        "skull-crossbones",
      ],

      showLocationModal: false,
      editingLocation: null,

      menuItems: [
        { id: "dashboard", label: "Dashboard", icon: "📊", route: "/admin/dashboard" },
        {
          id: "treasure-hunt",
          label: "Treasure Hunt",
          icon: "🗺️",
          route: "/admin/treasure-hunt",
          active: true,
        },
        { id: "students", label: "Mahasiswa", icon: "👥", route: "/admin/students" },
        { id: "settings", label: "Pengaturan", icon: "⚙️", route: "/admin/settings" },
      ],

      locationForm: {
        name: "",
        icon: "",
        latitude: 0,
        longitude: 0,
        type: "Academic",
        code: "",
        points: 0,
        description: "",
        available: true,
      },

      locations: [],
      teams: [
        {
          id: 1,
          name: "Tim Explorer",
          members: 4,
          points: 630,
          completed: 6,
          active: true,
          lastActivity: "5 menit lalu",
        },
        {
          id: 2,
          name: "Tech Hunters",
          members: 3,
          points: 580,
          completed: 5,
          active: true,
          lastActivity: "12 menit lalu",
        },
        {
          id: 3,
          name: "Campus Rangers",
          members: 5,
          points: 520,
          completed: 5,
          active: true,
          lastActivity: "18 menit lalu",
        },
        {
          id: 4,
          name: "Quest Masters",
          members: 4,
          points: 470,
          completed: 4,
          active: false,
          lastActivity: "35 menit lalu",
        },
        {
          id: 5,
          name: "Adventure Squad",
          members: 3,
          points: 420,
          completed: 4,
          active: true,
          lastActivity: "28 menit lalu",
        },
      ],

      recentActivities: [
        {
          id: 1,
          icon: "🎉",
          title: "Kode Berhasil Divalidasi",
          description: "Tim Explorer berhasil menemukan kode treasure di Lapangan",
          time: "5 menit lalu",
        },
        {
          id: 2,
          icon: "🔑",
          title: "Kode Treasure Ditemukan",
          description: "Tech Hunters menemukan kode treasure di Perpustakaan",
          time: "15 menit lalu",
        },
        {
          id: 3,
          icon: "🏛️",
          title: "Eksplorasi Rektorat",
          description: "Campus Rangers berhasil validasi kode treasure di Rektorat",
          time: "30 menit lalu",
        },
        {
          id: 4,
          icon: "🕌",
          title: "Kunjungi Masjid",
          description: "Quest Masters menemukan dan memvalidasi kode treasure di Masjid",
          time: "45 menit lalu",
        },
        {
          id: 5,
          icon: "👥",
          title: "Tim Baru Bergabung",
          description: "Adventure Squad bergabung dalam permainan",
          time: "1 jam lalu",
        },
      ],
    };
  },
  computed: {
    totalLocations() {
      return this.locations.length;
    },
  },
  methods: {
    formatTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    },
    getStatusColor(status) {
      switch (status) {
        case "running":
          return "bg-green-500";
        case "paused":
          return "bg-yellow-500";
        case "stopped":
          return "bg-red-500";
        default:
          return "bg-gray-500";
      }
    },
    getStatusText(status) {
      switch (status) {
        case "running":
          return "Sedang Berjalan";
        case "paused":
          return "Dijeda";
        case "stopped":
          return "Berhenti";
        default:
          return "Tidak Diketahui";
      }
    },
    getLocationClass(location) {
      return location.available ? "bg-green-500" : "bg-gray-400";
    },
    startGame() {
      this.gameStatus = "running";
      this.gameTime = this.gameDuration * 60;
      alert("Game dimulai! Semua tim dapat mulai bermain.");
    },
    pauseGame() {
      this.gameStatus = "paused";
      alert("Game dijeda sementara.");
    },
    resetGame() {
      if (confirm("Yakin ingin reset game? Semua progress akan hilang.")) {
        this.gameStatus = "stopped";
        this.gameTime = this.gameDuration * 60;
        this.teams.forEach((team) => {
          team.points = 0;
          team.completed = 0;
        });
        alert("Game telah direset.");
      }
    },
    FetchLokasi() {
      treasureService
        .GetAllLokasi()
        .then((res) => {
          this.locations = res.data;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    editLocation(location) {
      this.editingLocation = location;
      Object.assign(this.locationForm, location);
      this.showLocationModal = true;
    },
    closeLocationModal() {
      this.showLocationModal = false;
      this.editingLocation = null;
      Object.assign(this.locationForm, {
        name: "",
        icon: "",
        latitude: 0,
        longitude: 0,
        type: "Academic",
        code: "",
        points: 0,
        description: "",
        available: true,
      });
    },
    async saveLocation() {
      if (this.editingLocation) {
        const index = this.locations.findIndex(
          (loc) => loc.id === this.editingLocation.id
        );
        if (index !== -1) Object.assign(this.locations[index], this.locationForm);
        await treasureService
          .UpdateLokasi(this.editingLocation.id, this.editingLocation)
          .then(() => {
            alert("Lokasi berhasil diupdate!");
          });
      } else {
        try {
          const res = await treasureService.CreateLokasi({ ...this.locationForm });
          console.log(res.data);
          alert("Lokasi berhasil ditambahkan!");
        } catch (err) {
          console.error(err);
        }
      }
      this.closeLocationModal();
    },
    toggleLocationStatus(location) {
      location.available = !location.available;
      alert(
        `Lokasi ${location.name} ${location.available ? "diaktifkan" : "dinonaktifkan"}.`
      );
    },
    deleteLocation(location) {
      if (confirm(`Yakin ingin menghapus lokasi ${location.name}?`)) {
        treasureService.DeleteLokasi(location.id).then(() => {
          alert("Lokasi Berhasil Di Hapus!");
        });
      }
    },
    viewTeamDetails(team) {
      this.selectedTeam = team;
      this.showTeamModal = true;
    },
    closeTeamModal() {
      this.showTeamModal = false;
      this.selectedTeam = null;
    },
    resetTeamProgress(team) {
      if (confirm(`Yakin ingin reset progress tim ${team.name}?`)) {
        team.points = 0;
        team.completed = 0;
        team.lastActivity = "Baru saja";
        alert(`Progress tim ${team.name} berhasil direset!`);
      }
    },
    startGameTimer() {
      if (this.gameTimer) clearInterval(this.gameTimer);
      this.gameTimer = setInterval(() => {
        if (this.gameStatus === "running" && this.gameTime > 0) {
          this.gameTime--;
        } else if (this.gameTime === 0) {
          this.gameStatus = "stopped";
          clearInterval(this.gameTimer);
          alert("Waktu permainan telah habis!");
        }
      }, 1000);
    },
  },
  mounted() {
    this.FetchLokasi();
    this.startGameTimer();

    // Watch manually
    this.$watch("gameStatus", (newStatus) => {
      if (newStatus === "running") {
        this.startGameTimer();
      } else if (newStatus === "paused" || newStatus === "stopped") {
        if (this.gameTimer) clearInterval(this.gameTimer);
      }
    });
  },
  unmounted() {
    if (this.gameTimer) clearInterval(this.gameTimer);
  },
};
</script>
