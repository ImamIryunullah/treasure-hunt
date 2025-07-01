<template>
    <div class="flex min-h-screen bg-gray-50">
      <SidebarAdmin
        :is-collapsed="isCollapsed"
        :menu-items="menuItems"
        @toggle="toggleSidebar"
        @set-active="setActiveMenu"
      />
      <div class="flex-1 p-4 md:p-6 lg:p-8">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 md:mb-8">
          <div class="mb-4 lg:mb-0">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Manajemen Event</h1>
            <p class="text-sm md:text-base text-gray-600">
              Kelola semua event selama PKKMB
            </p>
          </div>
          <div class="flex">
            <button
              @click="showAddModal = true"
              class="bg-red-500 hover:bg-red-600 text-white px-4 md:px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 text-sm md:text-base"
            >
              <span>+</span>
              <span>Tambah Event</span>
            </button>
          </div>
        </div>
  
        
        <div v-if="activeEvents.length > 0" class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <div
            v-for="event in activeEvents"
            :key="event.id"
            class="bg-green-100 rounded-lg p-6 border-2 border-yellow-600"
          >
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ event.name }}</h3>
                <p class="text-sm text-gray-600 mb-2">Waktu tersisah</p>
                <p class="text-3xl font-bold text-gray-900 mb-2">{{ formatTime(event.timeRemaining) }}</p>
                <p class="text-sm text-gray-600">{{ event.type }}</p>
              </div>
              <div class="flex space-x-2">
                <button
                  v-if="event.status === 'running'"
                  @click="pauseEvent(event.id)"
                  class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                >
                  Berjalan
                </button>
                <button
                  v-else
                  @click="resumeEvent(event.id)"
                  class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                >
                  Pause
                </button>
                <button
                  @click="endEvent(event.id)"
                  class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Berakhir
                </button>
              </div>
            </div>
            <div class="flex space-x-2">
              <button
                @click="startEvent(event.id)"
                class="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded flex items-center space-x-1 border border-black"
              >
                <span class="text-black">▷</span>
                <span>Mulai</span>
              </button>
              <button
                @click="pauseEvent(event.id)    "
                class="bg-gray-400 hover:bg-gray-600 text-black border border-black px-4 py-2 rounded flex items-center space-x-1"
              >
                <span class="text-black">❚❚</span>
                <span>Pause</span>
              </button>
              <button
                @click="resetEvent(event.id)"
                class="border border-black text-black px-4 py-2 rounded flex items-center space-x-1"
              >
                <span>↻</span>
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
  
        
        <div v-else class="bg-gray-100 rounded-lg p-12 text-center mb-8 border-2 border-dashed border-gray-300">
          <h3 class="text-xl font-semibold text-gray-700 mb-2">Tidak Ada Event Aktif</h3>
          <p class="text-gray-500 mb-4">Belum ada event yang sedang berjalan saat ini</p>
          <button
            @click="showAddModal = true"
            class="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium"
          >
            Tambah Event Baru
          </button>
        </div>
  
        
        <div class="flex border-b border-black mb-6">
          <button
            @click="activeTab = 'umum'"
            :class="[
              'px-4 py-2 font-medium text-sm',
              activeTab === 'umum'
                ? 'border-b-2 border-red-500 text-red-600'
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            Umum
          </button>
          <button
            @click="activeTab = 'sponsor'"
            :class="[
              'px-4 py-2 font-medium text-sm',
              activeTab === 'sponsor'
                ? 'border-b-2 border-red-500 text-red-600'
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            Sponsor
          </button>
        </div>
  
        
        <div class="bg-white rounded-lg border border-black shadow-sm">
          <div class="p-4 border-b border-black">
            <h3 class="text-lg font-semibold text-gray-900 mb-1">Daftar Event Umum/kampus</h3>
            <p class="text-sm text-gray-600 mb-4">Daftar semua event kampus</p>
            
            
            <div class="flex flex-col sm:flex-row gap-4">
              <div class="flex-1">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Cari nama Peserta"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <select
                v-model="facultyFilter"
                class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Semua fakultas</option>
                <option value="teknik">Fakultas Teknik</option>
                <option value="ekonomi">Fakultas Ekonomi</option>
                <option value="hukum">Fakultas Hukum</option>
              </select>
              <select
                v-model="statusFilter"
                class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Semua status</option>
                <option value="berjalan">Berjalan</option>
                <option value="draft">Draft</option>
                <option value="selesai">Selesai</option>
              </select>
            </div>
          </div>
  
          
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">Peserta</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Tempat</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prodi</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">Waktu mulai</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">Waktu selesai</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-black">
                <tr v-if="filteredEvents.length === 0">
                  <td colspan="8" class="px-4 py-8 text-center text-gray-500">
                    <div class="flex flex-col items-center">
                      <div class="text-6xl mb-4">📅</div>
                      <h3 class="text-lg font-semibold mb-2">Tidak Ada Event</h3>
                      <p class="text-sm text-gray-400 mb-4">Belum ada event yang tersedia</p>
                      <button
                        @click="showAddModal = true"
                        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Tambah Event
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-for="event in filteredEvents" :key="event.id" class="hover:bg-gray-50">
                  <td class="px-4 py-3 text-sm font-medium text-gray-900">{{ event.name }}</td>
                  <td class="px-4 py-3 text-sm text-gray-500 hidden sm:table-cell">{{ event.participants }}</td>
                  <td class="px-4 py-3 text-sm text-gray-500 hidden md:table-cell">{{ event.location || '-' }}</td>
                  <td class="px-4 py-3 text-sm text-gray-500">{{ event.prodi }}</td>
                  <td class="px-4 py-3 text-sm text-gray-500 hidden lg:table-cell">{{ event.startTime }}</td>
                  <td class="px-4 py-3 text-sm text-gray-500 hidden lg:table-cell">{{ event.endTime }}</td>
                  <td class="px-4 py-3">
                    <span
                      :class="[
                        'px-2 py-1 text-xs font-medium rounded-lg border border-black',
                        event.status === 'berjalan'
                          ? 'bg-green-100 text-green-800'
                          : event.status === 'draft'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-blue-100 text-blue-800'
                      ]"
                    >
                      {{ event.status === 'berjalan' ? 'Berjalan' : event.status === 'draft' ? 'Draft' : 'Mulai' }}
                    </span>
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex space-x-2">
                      <button
                        v-if="event.status === 'draft'"
                        @click="startEvent(event.id)"
                        class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs border border-black"
                      >
                        Mulai
                      </button>
                      <button
                        v-else
                        @click="endEvent(event.id)"
                        class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs border border-black"
                      >
                        Akhiri
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      
      <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <h2 class="text-xl font-bold mb-4">Tambah Event Baru</h2>
          <form @submit.prevent="addEvent">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Nama Event</label>
              <input
                v-model="newEvent.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Masukkan nama event"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Tipe Event</label>
              <select
                v-model="newEvent.type"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Pilih tipe event</option>
                <option value="Event Umum">Event Umum</option>
                <option value="Event Sponsor">Event Sponsor</option>
              </select>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Durasi (menit)</label>
              <input
                v-model.number="newEvent.duration"
                type="number"
                required
                min="1"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="30"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Lokasi</label>
              <input
                v-model="newEvent.location"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Masukkan lokasi event"
              />
            </div>
            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="showAddModal = false"
                class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
  
      
      <div v-if="showAddGroupModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <h2 class="text-xl font-bold mb-4">Tambah Kelompok Baru</h2>
          <p class="text-sm text-gray-600 mb-4">Daftarkan kelompok baru untuk EVENT</p>
          
          <form @submit.prevent="addGroup">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Nama kelompok</label>
              <select
                v-model="newGroup.name"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Nama kelompok</option>
                <option value="Kelompok 1">Kelompok 1</option>
                <option value="Kelompok 2">Kelompok 2</option>
                <option value="Kelompok 3">Kelompok 3</option>
              </select>
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Fakultas</label>
              <select
                v-model="newGroup.faculty"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">fakultas</option>
                <option value="Fakultas Teknik">Fakultas Teknik</option>
                <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
                <option value="Fakultas Hukum">Fakultas Hukum</option>
              </select>
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Anggota kelompok</label>
              <div class="space-y-2">
                <div v-for="i in 5" :key="i" class="flex space-x-2">
                  <input
                    v-model="newGroup.members[i-1].nim"
                    type="text"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="NIM"
                  />
                  <input
                    v-model="newGroup.members[i-1].name"
                    type="text"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Nama"
                  />
                </div>
              </div>
            </div>
            
            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="showAddGroupModal = false"
                class="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Batal
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
  import SidebarAdmin from "@/components/SidebarAdmin.vue";
  
  export default {
    components: {
      SidebarAdmin
    },
    setup() {
      const isCollapsed = ref(false);
      const activeTab = ref('umum');
      const showAddModal = ref(false);
      const showAddGroupModal = ref(false);
      const searchQuery = ref('');
      const facultyFilter = ref('');
      const statusFilter = ref('');
      
      const timers = ref({});
  
      const toggleSidebar = () => {
        isCollapsed.value = !isCollapsed.value;
      };
  
      const setActiveMenu = (menuName) => {
        menuItems.forEach((item) => {
          item.active = item.name === menuName;
        });
      };
  
      const newEvent = reactive({
        name: '',
        type: '',
        duration: 30,
        location: ''
      });
  
      const newGroup = reactive({
        name: '',
        faculty: '',
        members: [
          { nim: '', name: '' },
          { nim: '', name: '' },
          { nim: '', name: '' },
          { nim: '', name: '' },
          { nim: '', name: '' }
        ]
      });
  
      const activeEvents = ref([
        {
          id: 1,
          name: 'Treasure Hunt Untag 2025',
          type: 'Event Umum',
          timeRemaining: 1800, // 30 minutes in seconds
          status: 'running'
        },
        {
          id: 2,
          name: 'Kuis bank CBA',
          type: 'Event Sponsor',
          timeRemaining: 1800,
          status: 'running'
        }
      ]);
  
      const events = ref([
        {
          id: 1,
          name: 'Treasure hunt untag 2025',
          participants: 30,
          location: '',
          prodi: 'Prodi',
          startTime: '8.00',
          endTime: '11.00',
          status: 'berjalan'
        },
        {
          id: 2,
          name: 'Treasure hunt untag 2025',
          participants: 30,
          location: '',
          prodi: 'Prodi',
          startTime: '13.00',
          endTime: '15.30',
          status: 'draft'
        }
      ]);
  
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
        { name: "Sponsorship", icon: "navbar-6.png", route: "/sponsorship", active: false },
        {
          name: "Manajemen Kelompok",
          icon: "navbar-7.png",
          route: "/manajemen-kelompok",
          active: false,
        },
        { name: "Manajemen Event", icon: "navbar.png", route: "/manajemen-event", active: true },
      ]);
  
      const filteredEvents = computed(() => {
        return events.value.filter(event => {
          const matchesSearch = event.name.toLowerCase().includes(searchQuery.value.toLowerCase());
          const matchesFaculty = !facultyFilter.value || event.prodi.toLowerCase().includes(facultyFilter.value.toLowerCase());
          const matchesStatus = !statusFilter.value || event.status === statusFilter.value;
          
          return matchesSearch && matchesFaculty && matchesStatus;
        });
      });
  
      const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
      };
  
      const startTimer = (eventId) => {
        if (timers.value[eventId]) {
          clearInterval(timers.value[eventId]);
        }
        
        timers.value[eventId] = setInterval(() => {
          const event = activeEvents.value.find(e => e.id === eventId);
          if (event && event.timeRemaining > 0 && event.status === 'running') {
            event.timeRemaining--;
          } else if (event && event.timeRemaining <= 0) {
            event.status = 'finished';
            clearInterval(timers.value[eventId]);
          }
        }, 1000);
      };
  
      const addEvent = () => {
        const event = {
          id: Date.now(),
          name: newEvent.name,
          participants: 0,
          location: newEvent.location,
          prodi: 'Prodi',
          startTime: '0.00',
          endTime: '0.00',
          status: 'draft'
        };
        
        events.value.push(event);
        
        // Reset form
        Object.assign(newEvent, {
          name: '',
          type: '',
          duration: 30,
          location: ''
        });
        
        showAddModal.value = false;
      };
  
      const addGroup = () => {
        // Add group logic here
        console.log('Adding group:', newGroup);
        
        // Reset form
        Object.assign(newGroup, {
          name: '',
          faculty: '',
          members: [
            { nim: '', name: '' },
            { nim: '', name: '' },
            { nim: '', name: '' },
            { nim: '', name: '' },
            { nim: '', name: '' }
          ]
        });
        
        showAddGroupModal.value = false;
      };
  
      const startEvent = (eventId) => {
        const event = events.value.find(e => e.id === eventId);
        if (event) {
          event.status = 'berjalan';
          
          // Add to active events if not already there
          const activeEvent = activeEvents.value.find(e => e.id === eventId);
          if (!activeEvent) {
            activeEvents.value.push({
              id: eventId,
              name: event.name,
              type: 'Event Umum',
              timeRemaining: 1800,
              status: 'running'
            });
          }
          
          startTimer(eventId);
        }
      };
  
      const pauseEvent = (eventId) => {
        const event = activeEvents.value.find(e => e.id === eventId);
        if (event) {
          event.status = event.status === 'running' ? 'paused' : 'running';
          if (event.status === 'running') {
            startTimer(eventId);
          } else {
            clearInterval(timers.value[eventId]);
          }
        }
      };
  
      const resumeEvent = (eventId) => {
        const event = activeEvents.value.find(e => e.id === eventId);
        if (event) {
          event.status = 'running';
          startTimer(eventId);
        }
      };
  
      const resetEvent = (eventId) => {
        const event = activeEvents.value.find(e => e.id === eventId);
        if (event) {
          event.timeRemaining = 1800;
          event.status = 'running';
          startTimer(eventId);
        }
      };
  
      const endEvent = (eventId) => {
        const event = events.value.find(e => e.id === eventId);
        const activeEvent = activeEvents.value.find(e => e.id === eventId);
        
        if (event) {
          event.status = 'selesai';
        }
        
        if (activeEvent) {
          activeEvents.value = activeEvents.value.filter(e => e.id !== eventId);
        }
        
        if (timers.value[eventId]) {
          clearInterval(timers.value[eventId]);
          delete timers.value[eventId];
        }
      };
  
      // Start timers for running events on mount
      onMounted(() => {
        activeEvents.value.forEach(event => {
          if (event.status === 'running') {
            startTimer(event.id);
          }
        });
      });
  
      // Clean up timers on unmount
      onUnmounted(() => {
        Object.values(timers.value).forEach(timer => {
          clearInterval(timer);
        });
      });
  
      return {
        menuItems,
        isCollapsed,
        activeTab,
        showAddModal,
        showAddGroupModal,
        searchQuery,
        facultyFilter,
        statusFilter,
        newEvent,
        newGroup,
        activeEvents,
        events,
        filteredEvents,
        toggleSidebar,
        setActiveMenu,
        formatTime,
        addEvent,
        addGroup,
        startEvent,
        pauseEvent,
        resumeEvent,
        resetEvent,
        endEvent
      };
    }
  };
  </script>