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
          <h1 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Selamat Datang di Treasure Hunt! 🎯
          </h1>
          <p class="text-gray-600">
            Ikuti petualangan seru untuk mengenal kampus dan teman-teman baru
          </p>
        </div>
      </div>
      
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div
          v-for="stat in stats"
          :key="stat.title"
          :class="[
            'rounded-lg p-5 border shadow-sm relative overflow-hidden',
            stat.bgColor,
          ]"
        >
          
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

          
          <h3 class="text-base font-semibold text-gray-800">{{ stat.title }}</h3>
          <p class="text-sm text-gray-600">{{ stat.subtitle }}</p>
        </div>
      </div>

      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div class="lg:col-span-2 bg-white rounded-lg shadow-sm border p-6">
          <div class="flex items-center gap-3 mb-6">
            <font-awesome-icon :icon="['fas', 'map']" class="text-xl text-blue-600" />
            <div>
              <h2 class="text-lg font-semibold text-gray-800">Progress Treasure Hunt</h2>
              <p class="text-sm text-gray-600">Progres kelompok Anda dalam menyelesaikan tantangan</p>
            </div>
          </div>

          
          <div class="mb-6">
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm font-medium text-gray-700">Area Diselesaikan</span>
              <span class="text-sm font-medium text-gray-700">{{ progress.completed }} dari {{ progress.total }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3">
              <div 
                class="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                :style="{ width: `${(progress.completed / progress.total) * 100}%` }"
              ></div>
            </div>
          </div>

          
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="bg-green-50 rounded-lg p-4 border border-green-200">
              <div class="text-2xl font-bold text-green-600 mb-1">{{ progress.completed }}</div>
              <div class="text-sm text-green-700">Area Selesai</div>
            </div>
            <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div class="text-2xl font-bold text-blue-600 mb-1">{{ progress.remaining }}</div>
              <div class="text-sm text-blue-700">Area Tersisa</div>
            </div>
          </div>

          
          <button 
            @click="continueTreasureHunt"
            class="w-full bg-gray-800 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            Lanjutkan Treasure Hunt
          </button>
        </div>

        
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-6">Aksi Cepat</h3>
          
          <div class="space-y-4">
            <button 
              @click="goToTreasureHunt"
              class="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 hover:from-blue-100 hover:to-purple-100 transition-all group"
            >
              <font-awesome-icon :icon="['fas', 'map-marked-alt']" class="text-blue-600 group-hover:scale-110 transition-transform" />
              <div class="text-left">
                <div class="font-medium text-gray-800">Treasure Hunt</div>
                <div class="text-sm text-gray-600">Mulai petualangan</div>
              </div>
            </button>

            <button 
              @click="viewProgress"
              class="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:from-green-100 hover:to-emerald-100 transition-all group"
            >
              <font-awesome-icon :icon="['fas', 'chart-bar']" class="text-green-600 group-hover:scale-110 transition-transform" />
              <div class="text-left">
                <div class="font-medium text-gray-800">Lihat Progres</div>
                <div class="text-sm text-gray-600">Cek perkembangan tim</div>
              </div>
            </button>

            <button 
              @click="editProfile"
              class="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-200 hover:from-orange-100 hover:to-yellow-100 transition-all group"
            >
              <font-awesome-icon :icon="['fas', 'user-edit']" class="text-orange-600 group-hover:scale-110 transition-transform" />
              <div class="text-left">
                <div class="font-medium text-gray-800">Edit Profil</div>
                <div class="text-sm text-gray-600">Perbarui informasi</div>
              </div>
            </button>
          </div>

          
          <div class="mt-8 pt-6 border-t border-gray-200">
            <div class="flex items-center gap-2 mb-4">
              <font-awesome-icon :icon="['fas', 'clock']" class="text-gray-600" />
              <h4 class="font-semibold text-gray-800">Jadwal Mendatang</h4>
            </div>
            
            <div class="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <div class="flex items-center gap-2 mb-2">
                <font-awesome-icon :icon="['fas', 'exclamation-triangle']" class="text-yellow-600" />
                <span class="font-medium text-yellow-800">Deadline Treasure Hunt</span>
              </div>
              <div class="text-sm text-yellow-700">
                {{ deadlineText }}
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
import "@fortawesome/fontawesome-free/css/all.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCheckCircle,
  faUsers,
  faMapMarkedAlt,
  faTrophy,
  faMap,
  faChartBar,
  faUserEdit,
  faClock,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useRouter } from 'vue-router';


library.add(
  faCheckCircle, 
  faUsers, 
  faMapMarkedAlt, 
  faTrophy, 
  faMap, 
  faChartBar, 
  faUserEdit, 
  faClock, 
  faExclamationTriangle
);

export default {
  components: {
    SidebarMahasiswa,
    FontAwesomeIcon,
  },
  name: "MahasiswaDashboard",
  setup() {
    const isCollapsed = ref(false);
    const router = useRouter();
    
    const menuItems = reactive([
      {
        name: "Dashboard",
        icon: "fas fa-home",
        route: "/mahasiswa-dashboard",
        active: true,
      },
      {
        name: "Seleksi Quiz",
        icon: "fas fa-book",
        route: "/mahasiswa-seleksi-quiz",
        active: false,
      },
      {
        name: "Pengumuman",
        icon: "fas fa-trophy",
        route: "/mahasiswa-pengumuman",
        active: false,
      },
      {
        name: "Daftar Kelompok",
        icon: "fas fa-users",
        route: "/mahasiswa-daftar-kelompok",
        active: false,
      },
      {
        name: "Treasure Hunt",
        icon: "fas fa-map",
        route: "/mahasiswa-treasure-hunt",
        active: false,
      },
      {
        name: "Hunt Sponsorship",
        icon: "fas fa-gift",
        route: "/mahasiswa-hunt-sponsorship",
        active: false,
      },
      {
        name: "Progres Kelompok",
        icon: "fas fa-chart-bar",
        route: "/mahasiswa-progress-kelompok",
        active: false,
      },
      { 
        name: "Profil", 
        icon: "fas fa-user", 
        route: "/mahasiswa-profil", 
        active: false 
      },
    ]);

    const stats = reactive([
      {
        title: "Seleksi Quiz",
        subtitle: "Skor: 85/100",
        bgColor: "bg-green-50",
        icon: "check-circle",
        status: "Selesai",
        statusColor: "text-green-600",
      },
      {
        title: "Kelompok",
        subtitle: "Tim Explorer",
        bgColor: "bg-blue-50",
        icon: "users",
        status: "Aktif",
        statusColor: "text-blue-600",
      },
      {
        title: "Treasure Hunt",
        subtitle: "6/10 Area",
        bgColor: "bg-purple-50",
        icon: "map-marked-alt",
        status: "Berlangsung",
        statusColor: "text-purple-600",
      },
      {
        title: "Posisi",
        subtitle: "#3 dari 25 tim",
        bgColor: "bg-orange-50",
        icon: "trophy",
        status: "Ranking",
        statusColor: "text-orange-600",
      },
    ]);

    const progress = reactive({
      completed: 6,
      total: 10,
      remaining: 4,
    });

    const deadlineText = "2 hari lagi - 15 Januari 2024";

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const setActiveMenu = (menuName) => {
      menuItems.forEach(item => {
        item.active = item.name === menuName;
      });
    };

    // Button Functions
    const continueTreasureHunt = () => {
      console.log("Navigating to treasure hunt...");
      // Add your navigation logic here
      router.push('/mahasiswa-treasure-hunt');
      alert("Melanjutkan Treasure Hunt!");
    };

    const goToTreasureHunt = () => {
      console.log("Going to treasure hunt...");
      router.push('/mahasiswa-treasure-hunt');
      alert("Menuju halaman Treasure Hunt!");
    };

    const viewProgress = () => {
      console.log("Viewing progress...");
      router.push('/mahasiswa-progress-kelompok');
      alert("Melihat progres kelompok!");
    };

    const editProfile = () => {
      console.log("Editing profile...");
      router.push('/mahasiswa-profil');
      alert("Mengedit profil!");
    };

    return {
      menuItems,
      stats,
      progress,
      deadlineText,
      isCollapsed,
      toggleSidebar,
      setActiveMenu,
      continueTreasureHunt,
      goToTreasureHunt,
      viewProgress,
      editProfile,
    };
  },
};
</script>

<style scoped>
/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.5s ease-out;
}

/* Hover effects */
.hover-scale:hover {
  transform: scale(1.02);
}

/* Progress bar animation */
.progress-bar {
  transition: width 0.5s ease-in-out;
}
</style>