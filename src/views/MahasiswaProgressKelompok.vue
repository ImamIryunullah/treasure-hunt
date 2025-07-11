<template>
    <div class="flex min-h-screen bg-gray-50">
      <SidebarMahasiswa
        :is-collapsed="isCollapsed"
        :menu-items="menuItems"
        @toggle="toggleSidebar"
        @set-active="setActiveMenu"
      />
      <div class="flex-1 p-8">
        <div class="flex justify-between items-center mb-8">
          <div>
            <h1 class="text-2xl font-bold text-gray-800">
              Progres Kelompok Tim Explorer 📊
            </h1>
            <p class="text-gray-600">
              Pantau perkembangan dan pencapaian kelompok Anda
            </p>
          </div>
        </div>
  
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div
            v-for="stat in stats"
            :key="stat.value"
            :class="[
              'rounded-lg p-5 border shadow-sm relative overflow-hidden',
              stat.bgColor,
            ]"
          >
            <!-- Icon dan Status -->
            <div class="flex justify-between items-start mb-4">
              <font-awesome-icon
                :icon="['fas', stat.icon]"
                class="text-2xl"
                :class="stat.statusColor"
              />
              <span
                class="text-xs font-medium px-2 py-1 rounded-full bg-white/70"
                :class="stat.statusColor"
              >
                {{ stat.status }}
              </span>
            </div>
  
            <!-- Judul dan Subjudul -->
            <h3 class="text-base font-semibold text-gray-800">{{ stat.value }}</h3>
            <p class="text-sm text-gray-600">{{ stat.subtitle }}</p>
          </div>
        </div>
  
        <!-- Main Content Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Detail Progres Area -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow-sm border p-6">
              <div class="flex items-center mb-6">
                <font-awesome-icon
                  :icon="['fas', 'map-marker-alt']"
                  class="text-blue-500 mr-3"
                />
                <div>
                  <h2 class="text-lg font-semibold text-gray-800">Detail Progres Area</h2>
                  <p class="text-sm text-gray-600">Status penyelesaian setiap area treasure hunt</p>
                </div>
              </div>
  
              <div class="space-y-4">
                <div
                  v-for="(area, index) in areas"
                  :key="index"
                  :class="[
                    'flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200',
                    area.completed ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50',
                    area.inProgress ? 'border-blue-200 bg-blue-50' : ''
                  ]"
                >
                  <div class="flex items-center">
                    <div
                      :class="[
                        'w-8 h-8 rounded-full flex items-center justify-center mr-4 text-sm font-medium',
                        area.completed ? 'bg-green-500 text-white' : 
                        area.inProgress ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                      ]"
                    >
                      {{ index + 1 }}
                    </div>
                    <div>
                      <h3 class="font-medium text-gray-800">{{ area.name }}</h3>
                      <p
                        :class="[
                          'text-sm font-medium',
                          area.completed ? 'text-green-600' : 
                          area.inProgress ? 'text-blue-600' : 'text-gray-500'
                        ]"
                      >
                        {{ area.status }}
                      </p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold text-gray-800">{{ area.points }}</p>
                    <p class="text-sm text-gray-500">{{ area.time }}</p>
                  </div>
                </div>
              </div>
  
              <!-- Download Button -->
              <div class="mt-6 text-center">
                <button
                  @click="downloadProgress"
                  class="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  <font-awesome-icon
                    :icon="['fas', 'download']"
                    class="mr-2"
                  />
                  Download Rekap Progres
                </button>
              </div>
            </div>
          </div>
  
          <!-- Leaderboard -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-sm border p-6">
              <div class="flex items-center mb-6">
                <font-awesome-icon
                  :icon="['fas', 'trophy']"
                  class="text-yellow-500 mr-3"
                />
                <div>
                  <h2 class="text-lg font-semibold text-gray-800">Leaderboard Tim</h2>
                  <p class="text-sm text-gray-600">Ranking semua tim peserta</p>
                </div>
              </div>
  
              <div class="space-y-3">
                <div
                  v-for="(team, index) in leaderboard"
                  :key="index"
                  :class="[
                    'flex items-center justify-between p-3 rounded-lg',
                    team.isCurrentTeam ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50'
                  ]"
                >
                  <div class="flex items-center">
                    <div
                      :class="[
                        'w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm font-bold',
                        index === 0 ? 'bg-yellow-500 text-white' :
                        index === 1 ? 'bg-gray-400 text-white' :
                        index === 2 ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-600'
                      ]"
                    >
                      {{ index + 1 }}
                    </div>
                    <div>
                      <h3 class="font-medium text-gray-800">{{ team.name }}</h3>
                      <p class="text-sm text-gray-500">{{ team.progress }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold text-gray-800">{{ team.points }}</p>
                    <p class="text-xs text-gray-500">poin</p>
                  </div>
                </div>
              </div>
  
              <!-- Team Members -->
              <div class="mt-6 pt-6 border-t">
                <h3 class="text-sm font-semibold text-gray-800 mb-4">👥 Anggota Tim</h3>
                <div class="space-y-2">
                  <div
                    v-for="member in teamMembers"
                    :key="member.name"
                    class="flex items-center justify-between p-2 rounded bg-gray-50"
                  >
                    <div class="flex items-center">
                      <div
                        :class="[
                          'w-2 h-2 rounded-full mr-2',
                          member.status === 'Ketua' ? 'bg-yellow-500' :
                          member.status === 'Aktif' ? 'bg-green-500' : 'bg-gray-400'
                        ]"
                      ></div>
                      <span class="text-sm text-gray-700">{{ member.name }}</span>
                    </div>
                    <span
                      :class="[
                        'text-xs px-2 py-1 rounded',
                        member.status === 'Ketua' ? 'bg-yellow-100 text-yellow-700' :
                        member.status === 'Aktif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      ]"
                    >
                      {{ member.status }}
                    </span>
                  </div>
                </div>
              </div>
  
              <!-- Achievements -->
              <div class="mt-6 pt-6 border-t">
                <h3 class="text-sm font-semibold text-gray-800 mb-4">🏆 Pencapaian</h3>
                <div class="space-y-2">
                  <div
                    v-for="achievement in achievements"
                    :key="achievement.title"
                    class="flex items-center p-2 rounded bg-orange-50"
                  >
                    <font-awesome-icon
                      :icon="['fas', achievement.icon]"
                      class="text-orange-500 mr-2"
                    />
                    <div>
                      <p class="text-sm font-medium text-gray-800">{{ achievement.title }}</p>
                      <p class="text-xs text-gray-600">{{ achievement.description }}</p>
                    </div>
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
  import { reactive } from "vue";
  import "@fortawesome/fontawesome-free/css/all.css";
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
  import {
    faCheckCircle,
    faUsers,
    faMapMarkedAlt,
    faTrophy,
    faDownload,
    faMapMarkerAlt,
    faBolt,
    faUserFriends,
  } from "@fortawesome/free-solid-svg-icons";
  import { library } from "@fortawesome/fontawesome-svg-core";
  
  library.add(
    faCheckCircle,
    faUsers,
    faMapMarkedAlt,
    faTrophy,
    faDownload,
    faMapMarkerAlt,
    faBolt,
    faUserFriends
  );
  
  export default {
    components: {
      SidebarMahasiswa,
      FontAwesomeIcon
    },
    setup() {
      const stats = reactive([
        {
          value: "6/10",
          subtitle: "Area Diselesaikan",
          bgColor: "bg-blue-50",
          icon: "check-circle",
          status: "Progress",
          statusColor: "text-blue-600",
        },
        {
          value: "60",
          subtitle: "Total Poin",
          bgColor: "bg-green-50",
          icon: "trophy",
          status: "Poin",
          statusColor: "text-green-600",
        },
        {
          value: "#3",
          subtitle: "dari 6 tim",
          bgColor: "bg-purple-50",
          icon: "users",
          status: "Ranking",
          statusColor: "text-purple-600",
        },
        {
          value: "4.5h",
          subtitle: "Total Waktu",
          bgColor: "bg-orange-50",
          icon: "map-marked-alt",
          status: "Waktu",
          statusColor: "text-orange-600",
        },
      ]);
  
      const areas = reactive([
        {
          name: "Perpustakaan Pusat",
          status: "Selesai",
          points: "+10",
          time: "10:30",
          completed: true,
          inProgress: false
        },
        {
          name: "Gedung Rektorat",
          status: "Selesai",
          points: "+10",
          time: "11:15",
          completed: true,
          inProgress: false
        },
        {
          name: "Fakultas Teknik",
          status: "Selesai",
          points: "+10",
          time: "12:00",
          completed: true,
          inProgress: false
        },
        {
          name: "Kantin Utama",
          status: "Selesai",
          points: "+10",
          time: "13:30",
          completed: true,
          inProgress: false
        },
        {
          name: "Lapangan Olahraga",
          status: "Selesai",
          points: "+10",
          time: "14:15",
          completed: true,
          inProgress: false
        },
        {
          name: "Masjid Kampus",
          status: "Selesai",
          points: "+10",
          time: "15:00",
          completed: true,
          inProgress: false
        },
        {
          name: "Taman Kampus",
          status: "Berlangsung",
          points: "-",
          time: "Belum selesai",
          completed: false,
          inProgress: true
        },
        {
          name: "Auditorium",
          status: "Terkunci",
          points: "-",
          time: "Belum selesai",
          completed: false,
          inProgress: false
        },
        {
          name: "Lab Bahasa",
          status: "Terkunci",
          points: "-",
          time: "Belum selesai",
          completed: false,
          inProgress: false
        },
        {
          name: "Gedung Serbaguna",
          status: "Terkunci",
          points: "-",
          time: "Belum selesai",
          completed: false,
          inProgress: false
        },
      ]);
  
      const leaderboard = reactive([
        {
          name: "Tim Navigator",
          progress: "8/10 area • 14:45",
          points: "80",
          isCurrentTeam: false
        },
        {
          name: "Tim Quest",
          progress: "7/10 area • 15:20",
          points: "70",
          isCurrentTeam: false
        },
        {
          name: "Tim Explorer",
          progress: "6/10 area • 15:00",
          points: "60",
          isCurrentTeam: true
        },
        {
          name: "Tim Adventure",
          progress: "6/10 area • 15:30",
          points: "60",
          isCurrentTeam: false
        },
        {
          name: "Tim Hunter",
          progress: "5/10 area • 14:30",
          points: "50",
          isCurrentTeam: false
        },
        {
          name: "Tim Discoverer",
          progress: "4/10 area • 15:45",
          points: "40",
          isCurrentTeam: false
        },
      ]);
  
      const teamMembers = reactive([
        {
          name: "John Doe",
          status: "Ketua"
        },
        {
          name: "Sarah Wilson",
          status: "Aktif"
        },
        {
          name: "Mike Johnson",
          status: "Aktif"
        },
        {
          name: "Lisa Chen",
          status: "Aktif"
        },
      ]);
  
      const achievements = reactive([
        {
          title: "Speed Runner",
          description: "Selesaikan 5 area dalam 3 jam",
          icon: "bolt"
        },
        {
          title: "Team Player",
          description: "Semua anggota aktif berpartisipasi",
          icon: "user-friends"
        },
      ]);
  
      const downloadProgress = () => {
        // Simulasi download laporan progres
        const progressData = {
          teamName: "Tim Explorer",
          totalAreas: 10,
          completedAreas: 6,
          totalPoints: 60,
          totalTime: "4.5h",
          ranking: 3,
          areas: areas.map(area => ({
            name: area.name,
            status: area.status,
            points: area.points,
            time: area.time
          })),
          members: teamMembers,
          achievements: achievements
        };
  
        // Buat file JSON untuk download
        const dataStr = JSON.stringify(progressData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `progres_tim_explorer_${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        // Notifikasi sukses
        alert('Laporan progres berhasil diunduh!');
      };
  
      return {
        stats,
        areas,
        leaderboard,
        teamMembers,
        achievements,
        downloadProgress
      };
    },
  };
  </script>
  
  <style scoped>
  /* Custom scrollbar untuk area yang panjang */
  .space-y-4::-webkit-scrollbar {
    width: 4px;
  }
  
  .space-y-4::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  .space-y-4::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 2px;
  }
  
  .space-y-4::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  
  /* Animasi untuk progress bars */
  .progress-bar {
    transition: width 0.5s ease-in-out;
  }
  
  /* Hover effects */
  .hover-effect:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  </style>