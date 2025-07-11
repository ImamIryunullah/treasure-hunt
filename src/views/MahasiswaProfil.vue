<template>
    <div class="flex min-h-screen bg-gray-50">
      <SidebarMahasiswa />
      <div class="flex-1 p-8">
        <div class=" mx-auto">
          <!-- Header -->
          <div class="mb-8">
            <h1 class="text-2xl font-bold text-gray-800 flex items-center">
              <i class="fas fa-user mr-2"></i>
              Profil Mahasiswa
            </h1>
            <p class="text-gray-600 mt-1">
              Kelola informasi profil dan lihat status aktivitas Anda
            </p>
          </div>
  
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Profile Information -->
            <div class="lg:col-span-2">
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div class="flex items-center justify-between mb-6">
                  <h2 class="text-lg font-semibold text-gray-800 flex items-center">
                    <i class="fas fa-user mr-2"></i>
                    Informasi Pribadi
                  </h2>
                  <button
                    @click="toggleEdit"
                    class="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <i class="fas fa-edit"></i>
                    <span>{{ isEditing ? 'Simpan' : 'Edit' }}</span>
                  </button>
                </div>
  
                <div class="flex items-start space-x-6 mb-6">
                  <div class="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                    <i class="fas fa-user text-gray-400 text-2xl"></i>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center space-x-2 mb-2">
                      <h3 class="text-xl font-semibold text-gray-800">
                        {{ studentData.name }}
                      </h3>
                      <span class="text-sm text-gray-500">
                        {{ studentData.nim }}
                      </span>
                    </div>
                    <p class="text-gray-600">{{ studentData.program }}</p>
                  </div>
                </div>
  
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap
                    </label>
                    <input
                      v-if="isEditing"
                      v-model="studentData.name"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p v-else class="text-gray-800">{{ studentData.name }}</p>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      NIM
                    </label>
                    <p class="text-gray-800">{{ studentData.nim }}</p>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Program Studi
                    </label>
                    <p class="text-gray-800">{{ studentData.program }}</p>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Angkatan
                    </label>
                    <p class="text-gray-800">{{ studentData.year }}</p>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      v-if="isEditing"
                      v-model="studentData.email"
                      type="email"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p v-else class="text-gray-800">{{ studentData.email }}</p>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      No. WhatsApp
                    </label>
                    <input
                      v-if="isEditing"
                      v-model="studentData.whatsapp"
                      type="tel"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p v-else class="text-gray-800">{{ studentData.whatsapp }}</p>
                  </div>
                </div>
              </div>
  
              <!-- Activity History -->
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
                <h2 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <i class="fas fa-calendar mr-2"></i>
                  Riwayat Aktivitas
                </h2>
                <p class="text-gray-600 mb-6">Timeline aktivitas treasure hunt Anda</p>
                
                <div class="space-y-4">
                  <div
                    v-for="(activity, index) in activities"
                    :key="index"
                    class="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm border border-gray-200"
                  >
                    <div :class="`p-2 rounded-full bg-${activity.color}-100`">
                      <i :class="`${activity.icon} text-${activity.color}-600 text-sm`"></i>
                    </div>
                    <div class="flex-1">
                      <h4 class="font-medium text-gray-800">{{ activity.title }}</h4>
                      <p class="text-sm text-gray-600 mt-1">{{ activity.description }}</p>
                      <span class="text-xs text-gray-500 mt-2 block">{{ activity.time }}</span>
                    </div>
                    <div :class="getStatusClass(activity.status)">
                      {{ activity.status }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Right Sidebar -->
            <div class="space-y-6">
              <!-- Status Activities -->
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">
                  Status Aktivitas
                </h3>
                <p class="text-gray-600 mb-4">
                  Ringkasan status partisipasi Anda
                </p>
                
                <div class="space-y-3">
                  <div
                    v-for="(status, index) in statusActivities"
                    :key="index"
                    class="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
                  >
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-3">
                        <i :class="`${status.icon} text-${status.color}-500`"></i>
                        <span class="font-medium text-gray-800">{{ status.title }}</span>
                      </div>
                      <button
                        @click="handleStatusAction(status.action)"
                        :class="getStatusButtonClass(status.status)"
                        class="px-3 py-1 rounded-full text-sm font-medium transition-colors hover:opacity-80"
                      >
                        {{ status.status }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Contact -->
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">
                  Kontak
                </h3>
                
                <div class="space-y-3">
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-envelope text-gray-500"></i>
                    <div>
                      <p class="text-sm font-medium text-gray-700">Email</p>
                      <p class="text-sm text-blue-600">{{ studentData.email }}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-3">
                    <i class="fab fa-whatsapp text-gray-500"></i>
                    <div>
                      <p class="text-sm font-medium text-gray-700">WhatsApp</p>
                      <p class="text-sm text-gray-600">{{ studentData.whatsapp }}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-graduation-cap text-gray-500"></i>
                    <div>
                      <p class="text-sm font-medium text-gray-700">Program Studi</p>
                      <p class="text-sm text-blue-600">{{ studentData.program }}</p>
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Statistics -->
              <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 class="text-lg font-semibold text-gray-800 mb-4">
                  Statistik
                </h3>
                
                <div class="grid grid-cols-1 gap-4">
                  <div
                    v-for="(stat, index) in statistics"
                    :key="index"
                    class="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center"
                  >
                    <div :class="`text-3xl font-bold text-${stat.color}-500 mb-2`">
                      {{ stat.number }}
                    </div>
                    <div class="text-gray-600 text-sm">{{ stat.label }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import SidebarMahasiswa from "@/components/SidebarMahasiswa.vue";
  import { ref, reactive } from "vue";
  
  export default {
    components: {
      SidebarMahasiswa,
    },
    setup() {
      const isEditing = ref(false);
  
      const studentData = reactive({
        name: 'John Doe',
        nim: '2024001234',
        program: 'Teknik Informatika',
        year: '2024',
        email: 'john.doe@university.ac.id',
        whatsapp: '08123456789'
      });
  
      const activities = reactive([
        {
          title: 'Area Masjid Kampus Diselesaikan',
          description: 'Berhasil menemukan kode PEACE2024',
          time: 'Hari ini, 15:00',
          status: 'Selesai',
          icon: 'fas fa-map-marker-alt',
          color: 'green'
        },
        {
          title: 'Bergabung dengan Tim Explorer',
          description: 'Terdaftar sebagai anggota kelompok',
          time: 'Hari ini, 09:30',
          status: 'Berlangsung',
          icon: 'fas fa-users',
          color: 'blue'
        },
        {
          title: 'Lolos Seleksi Quiz',
          description: 'Skor 85/100 - Peringkat #15',
          time: 'Kemarin, 16:45',
          status: 'Selesai',
          icon: 'fas fa-trophy',
          color: 'yellow'
        }
      ]);
  
      const statusActivities = reactive([
        {
          title: 'Seleksi Quiz',
          status: 'Lolos',
          color: 'green',
          icon: 'fas fa-book',
          action: 'View Quiz Results'
        },
        {
          title: 'Kelompok',
          status: 'Terdaftar',
          color: 'blue',
          icon: 'fas fa-users',
          action: 'View Group'
        },
        {
          title: 'Treasure Hunt',
          status: 'Berlangsung',
          color: 'purple',
          icon: 'fas fa-map',
          action: 'Continue Hunt'
        }
      ]);
  
      const statistics = reactive([
        {
          number: '6',
          label: 'Area Diselesaikan',
          color: 'blue'
        },
        {
          number: '60',
          label: 'Total Poin',
          color: 'green'
        },
        {
          number: '#3',
          label: 'Ranking Tim',
          color: 'purple'
        }
      ]);
  
      const toggleEdit = () => {
        if (isEditing.value) {
          // Save logic here
          console.log('Profile updated:', studentData);
        }
        isEditing.value = !isEditing.value;
      };
  
      const handleStatusAction = (action) => {
        console.log(`${action} clicked`);
        // Handle status actions like viewing quiz results, registering for groups, etc.
      };
  
      const getStatusClass = (status) => {
        const classes = {
          'Selesai': 'px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800',
          'Berlangsung': 'px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800',
          'Terdaftar': 'px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800'
        };
        return classes[status] || 'px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800';
      };
  
      const getStatusButtonClass = (status) => {
        const classes = {
          'Lolos': 'bg-green-100 text-green-800',
          'Terdaftar': 'bg-blue-100 text-blue-800',
          'Berlangsung': 'bg-purple-100 text-purple-800'
        };
        return classes[status] || 'bg-gray-100 text-gray-800';
      };
  
      return {
        isEditing,
        studentData,
        activities,
        statusActivities,
        statistics,
        toggleEdit,
        handleStatusAction,
        getStatusClass,
        getStatusButtonClass
      };
    },
  };
  </script>
  
  <style scoped>
  /* Custom styles if needed */
  .transition-colors {
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
  }
  </style>