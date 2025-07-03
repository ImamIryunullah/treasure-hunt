<template>
    <div class="flex min-h-screen bg-green-50">
      <SidebarMahasiswa
        :is-collapsed="isCollapsed"
        :menu-items="menuItems"
        @toggle="toggleSidebar"
        @set-active="setActiveMenu"
      />
      
      
      <div class="flex-1 p-8 transition-all duration-300">
        
        <div class=" mb-8">
          <h1 class="text-2xl font-bold text-gray-800 mb-2">Hasil Seleksi Mahasiswa Baru</h1>
          <p class="text-gray-600">Hasil seleksi quiz dan penilaian calon himpunan</p>
        </div>
  
        
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <div class="flex items-center justify-center mb-4">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          
          <div class="text-center mb-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-2">🎉 Selamat! Anda Lolos Seleksi!</h2>
            <p class="text-gray-600 text-sm">Anda berhasil melewati tahap seleksi dan dapat melanjutkan ke tahap berikutnya</p>
          </div>
  
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="bg-blue-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-blue-600">85</div>
              <div class="text-sm text-gray-600">Nilai Quiz</div>
              <div class="text-xs text-gray-500">dari 100</div>
            </div>
            <div class="bg-purple-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-purple-600">#15</div>
              <div class="text-sm text-gray-600">Ranking</div>
              <div class="text-xs text-gray-500">dari 150 peserta</div>
            </div>
            <div class="bg-green-50 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-green-600">✓</div>
              <div class="text-sm text-gray-600">Status</div>
              <div class="text-xs text-gray-500">Lolos</div>
            </div>
          </div>
        </div>
  
        
        <div class="bg-white rounded-lg shadow-md p-6 mb-6">
          <div class="flex items-center mb-4">
            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800">📋 Langkah Selanjutnya</h3>
          </div>
          <p class="text-gray-600 text-sm mb-4">Ikuti panduan langkah berikut untuk mengikuti kegiatan himpunan berikutnya</p>
          
          <div class="space-y-3">
            <div class="flex items-start">
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                <span class="text-blue-600 font-semibold text-sm">1</span>
              </div>
              <div>
                <h4 class="font-medium text-gray-800">Daftar Kelompok</h4>
                <p class="text-sm text-gray-600">Pilih dan daftar ke dalam kelompok yang tersedia</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                <span class="text-purple-600 font-semibold text-sm">2</span>
              </div>
              <div>
                <h4 class="font-medium text-gray-800">Treasure Hunt</h4>
                <p class="text-sm text-gray-600">Ikuti permainan treasure hunt bersama kelompok Anda</p>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                <span class="text-green-600 font-semibold text-sm">3</span>
              </div>
              <div>
                <h4 class="font-medium text-gray-800">Selesaikan Misi</h4>
                <p class="text-sm text-gray-600">Menyelesaikan berbagai misi dan tugas yang diberikan</p>
              </div>
            </div>
          </div>
        </div>
  
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center mb-4">
            <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
              <svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800">🏆 Leaderboard Prodi</h3>
          </div>
          <p class="text-gray-600 text-sm mb-4">10 peserta teratas dari setiap prodi</p>
          
          <div class="space-y-3">
            <div class="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                  <span class="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <p class="font-medium text-gray-800">Ahmad Rizki</p>
                  <p class="text-sm text-gray-600">Informatika</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-bold text-yellow-600">95</p>
                <p class="text-xs text-gray-500">poin</p>
              </div>
            </div>
            
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center mr-3">
                  <span class="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <p class="font-medium text-gray-800">Siti Nurhaliza</p>
                  <p class="text-sm text-gray-600">Informatika</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-bold text-gray-600">92</p>
                <p class="text-xs text-gray-500">poin</p>
              </div>
            </div>
            
            <div class="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                  <span class="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <p class="font-medium text-gray-800">Budi Santoso</p>
                  <p class="text-sm text-gray-600">Informatika</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-bold text-orange-600">90</p>
                <p class="text-xs text-gray-500">poin</p>
              </div>
            </div>
            
            <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <span class="text-white font-bold text-sm">4</span>
                </div>
                <div>
                  <p class="font-medium text-gray-800">John Doe</p>
                  <p class="text-sm text-gray-600">Informatika</p>
                  <p class="text-xs text-blue-600 font-medium">Anda</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-bold text-blue-600">85</p>
                <p class="text-xs text-gray-500">poin</p>
              </div>
            </div>
            
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div class="flex items-center">
                <div class="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center mr-3">
                  <span class="text-white font-bold text-sm">5</span>
                </div>
                <div>
                  <p class="font-medium text-gray-800">Maria Garcia</p>
                  <p class="text-sm text-gray-600">Informatika</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-bold text-gray-600">82</p>
                <p class="text-xs text-gray-500">poin</p>
              </div>
            </div>
          </div>
        </div>
  
        
        <div class="mt-8 text-center">
          <div class="bg-gray-800 text-white px-4 py-2 rounded-lg inline-block">
            <p class="text-sm">🎯 Level Daftar Kelompok 🎯</p>
          </div>
          <p class="text-xs text-gray-500 mt-2">
            Jangan lupa untuk melakukan step berikutnya dengan daftar kelompok terlebih dahulu - 
            <a href="#" class="text-blue-600 hover:underline">Daftar Kelompok Saat Ini</a>
          </p>
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
      const isCollapsed = ref(false);
      const menuItems = reactive([
        { name: "Dashboard", icon: "fas fa-home", route: "/mahasiswa-dashboard", active: false },
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
          active: true,
        },
        {
          name: "Daftar Kelompok",
          icon: "fas fa-users",
          route: "/mahasiswa-daftar-kelompok",
          active: false,
        },
        { name: "Treasure Hunt", icon: "fas fa-map", route: "/treasure", active: false },
        {
          name: "Hunt Sponsorship",
          icon: "fas fa-gift",
          route: "/sponsorship",
          active: false,
        },
        {
          name: "Progres Kelompok",
          icon: "fas fa-chart-bar",
          route: "/manajemen-kelompok",
          active: false,
        },
        { name: "Profil", icon: "fas fa-user", route: "/manajemen-event", active: false },
      ]);
  
      const toggleSidebar = () => {
        isCollapsed.value = !isCollapsed.value;
      };
  
      const setActiveMenu = (index) => {
        menuItems.forEach((item, i) => {
          item.active = i === index;
        });
      };
  
      return {
        isCollapsed,
        menuItems,
        toggleSidebar,
        setActiveMenu,
      };
    },
  };
  </script>
  
  <style scoped>
  .transition-all {
    transition: all 0.3s ease;
  }
  </style>