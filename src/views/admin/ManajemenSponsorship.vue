<template>
  <div class="flex min-h-screen bg-gray-50">
    <SidebarAdmin
      :is-collapsed="isCollapsed"
      :menu-items="menuItems"
      @toggle="toggleSidebar"
      @set-active="setActiveMenu"
    />
    <div class="flex-1 p-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div class="mb-4 md:mb-0">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Manajemen Sponsorship</h1>
          <p class="text-gray-600">
            Peringkat hasil seleksi berdasarkan fakultas dan program studi
          </p>
        </div>
        <div class="flex">
          <button
            @click="showAddModal = true"
            class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <span>+</span>
            <span>Tambah Baru</span>
          </button>
        </div>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8"
      >
        <div
          v-for="stat in stats"
          :key="stat.title"
          class="bg-white rounded-lg p-4 md:p-6 border border-gray-200 shadow-sm"
        >
          <h3 class="text-base md:text-lg font-semibold text-gray-900 mb-1">
            {{ stat.title }}
          </h3>
          <p class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {{ stat.value }}
          </p>
          <p class="text-xs md:text-sm text-gray-500">{{ stat.subtitle }}</p>
        </div>
      </div>

      <div class="mb-6">
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="[
                'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              ]"
            >
              {{ tab.name }}
            </button>
          </nav>
        </div>
      </div>

      <!-- Event Tab Content -->
      <div v-if="activeTab === 'event'" class="space-y-6">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-xl font-semibold text-gray-900">Event aktif</h2>
            <p class="text-sm text-gray-600">Event sponsor yang sedang berjalan</p>
          </div>
          <button
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
          >
            <span>+</span>
            <span>Tambah event</span>
          </button>
        </div>

        <div class="space-y-4">
          <div
            v-for="event in events"
            :key="event.id"
            class="bg-white border border-gray-200 rounded-lg p-6"
          >
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <div class="flex items-center space-x-2 mb-2">
                  <h3 class="text-lg font-semibold text-gray-900">{{ event.title }}</h3>
                  <span
                    class="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded"
                    >{{ event.status }}</span
                  >
                </div>
                <p class="text-sm text-gray-600 mb-2">Sponsor: {{ event.sponsor }}</p>
                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <div class="flex items-center space-x-1">
                    <span>📅</span>
                    <span>{{ event.dateRange }}</span>
                  </div>
                  <div class="flex items-center space-x-1">
                    <span>👥</span>
                    <span>{{ event.participants }} peserta</span>
                  </div>
                  <span>Durasi: {{ event.duration }}</span>
                </div>
              </div>
              <div class="flex space-x-2">
                <button class="p-2 text-gray-400 hover:text-gray-600">
                  <span>
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
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
                      ></path></svg
                  ></span>
                </button>
                <button class="p-2 text-gray-400 hover:text-gray-600">
                  <span>
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      ></path>
                    </svg>
                  </span>
                </button>
                <button class="p-2 text-gray-400 hover:text-red-600">
                  <span>
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path></svg
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sponsorship Tab Content -->
      <div v-if="activeTab === 'sponsor'" class="space-y-6">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-xl font-semibold text-gray-900">Sponsorship</h2>
            <p class="text-sm text-gray-600">Kelola sponsor dan mitra kerjasama</p>
          </div>
          <button
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
          >
            <span>+</span>
            <span>Tambah Sponsor</span>
          </button>
        </div>

        <div class="bg-white rounded-lg border border-gray-200">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Logo
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nama sponsor
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Posisi
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    urutan
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    status
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="sponsor in sponsors" :key="sponsor.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div
                      class="w-12 h-12 bg-gray-200 rounded flex items-center justify-center"
                    >
                      <span class="text-gray-400">📄</span>
                    </div>
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {{ sponsor.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded"
                      >{{ sponsor.position }}</span
                    >
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ sponsor.order }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded"
                      >{{ sponsor.status }}</span
                    >
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div class="flex space-x-2">
                      <button class="text-gray-400 hover:text-gray-600">
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
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
                      </button>
                      <button class="text-gray-400 hover:text-gray-600">
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          ></path>
                        </svg>
                      </button>
                      <button class="text-gray-400 hover:text-red-600">
                        <svg
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Pop-up Iklan Tab Content -->
      <div v-if="activeTab === 'popup'" class="space-y-6">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-xl font-semibold text-gray-900">Pop-up sponsorship</h2>
            <p class="text-sm text-gray-600">
              Atur pop-up iklan sponsor yang akan muncul
            </p>
          </div>
          <button
            class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
          >
            <span>+</span>
            <span>Tambah Iklan</span>
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div
            v-for="popup in popupAds"
            :key="popup.id"
            class="bg-white border border-gray-200 rounded-lg p-4"
          >
            <div
              class="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center"
            >
              <span class="text-gray-400 text-2xl">🖼</span>
            </div>
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-900">{{ popup.sponsor }}</span>
                <span class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">{{
                  popup.status
                }}</span>
              </div>
              <div class="text-xs text-gray-500 space-y-1">
  <div class="flex items-center justify-between">
    <span class="flex items-center space-x-1">
      <!-- Eye icon -->
      <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M1.5 12s4.5-7.5 10.5-7.5S22.5 12 22.5 12s-4.5 7.5-10.5 7.5S1.5 12 1.5 12z" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5" />
      </svg>
      <span>{{ popup.views }}</span>
    </span>
    <span>{{ popup.clicks }}</span>
  </div>

  <div class="flex items-center justify-between">
    <span class="flex items-center space-x-1">
      <!-- Chart icon -->
      <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6v12M12 10v8M20 4v16" />
      </svg>
      <span>{{ popup.engagement }}</span>
    </span>

    <div class="flex space-x-1">
      <!-- Eye button -->
      <button class="text-gray-400 hover:text-gray-600">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M1.5 12s4.5-7.5 10.5-7.5S22.5 12 22.5 12s-4.5 7.5-10.5 7.5S1.5 12 1.5 12z" />
          <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5" />
        </svg>
      </button>

      <!-- Edit button -->
      <button class="text-gray-400 hover:text-gray-600">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536M4 20h4l11-11-4-4L4 20z" />
        </svg>
      </button>

      <!-- Activate button -->
      <button class="bg-red-500 text-white p-1 rounded text-xs">
        Aktifkan
      </button>
    </div>
  </div>
</div>

            </div>
          </div>
        </div>
      </div>

      <!-- Laporan Tab Content -->
      <div v-if="activeTab === 'laporan'" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Statistik Event Sponsor -->
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              Statistik Event Sponsor
            </h3>
            <p class="text-sm text-gray-600 mb-4">
              Performa event sponsor dalam periode tertentu
            </p>  
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Total peserta event</span>
                <span class="text-sm font-medium">300</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Event selesai</span>
                <span class="text-sm font-medium">600</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Tingkat penyelesaian</span>
                <span class="text-sm font-medium">80%</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Event aktif</span>
                <span class="text-sm font-medium">15</span>
              </div>
            </div>
          </div>

          <!-- Engagement Sponsor -->
          <div class="bg-white border border-gray-200 rounded-lg p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Engagement Sponsor</h3>
            <p class="text-sm text-gray-600 mb-4">
              Interaksi pengguna dengan konten sponsor
            </p>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Total klik</span>
                <span class="text-sm font-medium">123</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Total iklan pop up</span>
                <span class="text-sm font-medium">100 tampil</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Konversi iklan view ke</span>
                <span class="text-sm font-medium">5.1 menit</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Logo Sponsor -->
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Logo sponsor</h3>
          <p class="text-sm text-gray-600 mb-4">
            Menampilkan logo sponsor yang telah bekerja sama
          </p>
          <div class="space-y-4">
            <div
              v-for="logoSponsor in logoSponsors"
              :key="logoSponsor.id"
              class="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
            >
              <div class="flex items-center space-x-4">
                <div
                  class="w-12 h-12 bg-gray-200 rounded flex items-center justify-center"
                >
                  <span class="text-gray-400">📄</span>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-900">
                    {{ logoSponsor.name }}
                  </h4>
                  <p class="text-xs text-gray-500">{{ logoSponsor.category }}</p>
                  <p class="text-xs text-gray-500">{{ logoSponsor.members }} member</p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div class="text-right text-xs text-gray-500">
                  <div>Klik Rate</div>
                  <div>{{ logoSponsor.clickRate }}</div>
                </div>
                <div class="text-right text-xs text-gray-500">
                  <div>Klik Rate</div>
                  <div>{{ logoSponsor.engagement }}</div>
                </div>
                <span class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">{{
                  logoSponsor.status
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Export Laporan -->
        <div class="bg-white border border-gray-200 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Export Laporan Sponsor</h3>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <span class="text-2xl mb-2">📄</span>
              <span class="text-sm font-medium">Laporan PDF</span>
            </button>
            <button
              class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <span class="text-2xl mb-2">📊</span>
              <span class="text-sm font-medium">Data excel</span>
            </button>
            <button
              class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <span class="text-2xl mb-2">👥</span>
              <span class="text-sm font-medium">Data Peserta</span>
            </button>
            <button
              class="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <span class="text-2xl mb-2">🏆</span>
              <span class="text-sm font-medium">ROI Sponsor</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import { reactive, ref } from "vue";

export default {
  components: {
    SidebarAdmin,
  },
  setup() {
    const activeTab = ref("event");
    const showAddModal = ref(false);
    const isCollapsed = ref(false);

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const setActiveMenu = (menuName) => {
      menuItems.forEach((item) => {
        item.active = item.name === menuName;
      });
    };

    const menuItems = reactive([
      { name: "Dashboard", icon: "navbar-1.png", route: "/", active: false },
      { name: "Bank Soal", icon: "navbar-2.png", route: "/bank-soal", active: false },
      {
        name: "Monitoring Progress",
        icon: "navbar-3.png",
        route: "/monitoring-progress",
        active: false,
      },
      { name: "Leaderboard", icon: "navbar-4.png", route: "/leaderboard", active: false },
      { name: "Treasure Hint", icon: "navbar-5.png", route: "/treasure", active: false },
      { name: "Sponsorship", icon: "navbar-6.png", route: "/sponsorship", active: true },
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

    const stats = reactive([
      {
        title: "Event Aktif",
        value: "3",
        subtitle: "2 draft 1 Aktif",
      },
      {
        title: "Peserta Event",
        value: "50",
        subtitle: "Dari peserta yang tidak lolos",
      },
      {
        title: "Sponsor Aktif",
        value: "2",
        subtitle: "Bank CBA, PT. Pencari Cinta Sejati",
      },
      {
        title: "Total klik iklan",
        value: "192 x di klik",
        subtitle: "Engagement sponsor",
      },
    ]);

    const tabs = [
      { id: "sponsor", name: "Sponsor" },
      { id: "event", name: "Event" },
      { id: "prodi", name: "Per prodi" },
      { id: "kuis sponsor", name: "Kuis Sponsor" },
      { id: "popup", name: "Pop-up Iklan" },
      { id: "laporan", name: "Laporan" },
    ];

    const events = reactive([
      {
        id: 1,
        title: "Kuis sponsor Bank CBA",
        sponsor: "Bank CBA",
        status: "Status",
        dateRange: "2025-09-06 - 2025-09-08",
        participants: "100",
        duration: "2 hari",
      },
      {
        id: 2,
        title: "Kuis sponsor Bank CBA",
        sponsor: "Bank CBA",
        status: "Status",
        dateRange: "2025-09-06 - 2025-09-08",
        participants: "100",
        duration: "2 hari",
      },
      {
        id: 3,
        title: "Kuis sponsor Bank CBA",
        sponsor: "Bank CBA",
        status: "Status",
        dateRange: "2025-09-06 - 2025-09-08",
        participants: "100",
        duration: "2 hari",
      },
    ]);

    const sponsors = reactive([
      {
        id: 1,
        name: "Nama",
        position: "Footer",
        order: 1,
        status: "Status",
      },
      {
        id: 2,
        name: "Nama",
        position: "All",
        order: 1,
        status: "Status",
      },
      {
        id: 3,
        name: "Nama",
        position: "Header",
        order: 1,
        status: "Status",
      },
    ]);

    const popupAds = reactive([
      {
        id: 1,
        sponsor: "Promo BankBCA",
        status: "Status",
        views: "50 kali",
        clicks: "Link lihat",
        engagement: "5% views",
      },
      {
        id: 2,
        sponsor: "Promo BankBCA",
        status: "Status",
        views: "50 kali",
        clicks: "Link lihat",
        engagement: "5% views",
      },
      {
        id: 3,
        sponsor: "Promo BankBCA",
        status: "Status",
        views: "50 kali",
        clicks: "Link lihat",
        engagement: "5% views",
      },
      {
        id: 4,
        sponsor: "Promo BankBCA",
        status: "Status",
        views: "50 kali",
        clicks: "Link lihat",
        engagement: "5% views",
      },
      {
        id: 5,
        sponsor: "Promo BankBCA",
        status: "Status",
        views: "50 kali",
        clicks: "Link lihat",
        engagement: "5% views",
      },
      {
        id: 6,
        sponsor: "Promo BankBCA",
        status: "Status",
        views: "50 kali",
        clicks: "Link lihat",
        engagement: "5% views",
      },
      {
        id: 7,
        sponsor: "Promo BankBCA",
        status: "Status",
        views: "50 kali",
        clicks: "Link lihat",
        engagement: "5% views",
      },
      {
        id: 8,
        sponsor: "Promo BankBCA",
        status: "Status",
        views: "50 kali",
        clicks: "Link lihat",
        engagement: "5% views",
      },
      {
        id: 9,
        sponsor: "Promo BankBCA",
        status: "Status",
        views: "50 kali",
        clicks: "Link lihat",
        engagement: "5% views",
      },
      {
        id: 10,
        sponsor: "Promo BankBCA",
        status: "Status",
        views: "50 kali",
        clicks: "Link lihat",
        engagement: "5% views",
      },
    ]);

    const logoSponsors = reactive([
      {
        id: 1,
        name: "Bank CBA",
        category: "Perbankan",
        members: "100",
        clickRate: "Klik Rate 100",
        engagement: "Klik Rate 100",
        status: "Status",
      },
      {
        id: 2,
        name: "Bank CBA",
        category: "Perbankan bisnis",
        members: "100",
        clickRate: "Klik Rate 100",
        engagement: "Klik Rate 100",
        status: "Status",
      },
    ]);

    return {
      menuItems,
      stats,
      tabs,
      activeTab,
      showAddModal,
      isCollapsed,
      events,
      sponsors,
      popupAds,
      logoSponsors,
      toggleSidebar,
      setActiveMenu,
    };
  },
};
</script>

<style></style>
