<template>
    <div class="min-h-screen flex flex-col bg-gray-50">
      
      <section class="hero relative py-24 md:py-32 text-white flex-grow">
        <div class="absolute inset-0 bg-black bg-opacity-40"></div>
        <div class="container mx-auto px-6 lg:px-8 relative z-10 text-center">
          <div class="flex justify-center mb-8">
            <img src="@/assets/logo_untag.png" alt="Logo UNTAG" class="w-20 md:w-24 lg:w-28" />
          </div>
          <h1 class="text-3xl md:text-5xl font-bold mb-4">TREASURE HUNT &amp; QUIZ</h1>
          <p class="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Bergabung dalam petualangan seru mencari harta karun dan menguji pengetahuan tentang
            UNTAG Surabaya. Raih kesempatan jadi yang terbaik!
          </p>
          <button
            @click="startSelection"
            :disabled="!isEventActive"
            class="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full shadow-lg transition ease-in-out duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isEventActive ? "Scan Barcode untuk Seleksi" : "Belum Dimulai" }}
          </button>
        </div>
      </section>
  
      
      <div v-if="showScanner" class="py-12 bg-white text-center">
        <qrcode-stream @decode="onDecode" @init="onInit" class="mx-auto w-64 h-64" />
        <div v-if="scannedUrl" class="mt-6">
          <p class="text-lg font-semibold">Tautan Terdeteksi:</p>
          <a :href="scannedUrl" target="_blank" class="text-indigo-600 underline">
            {{ scannedUrl }}
          </a>
        </div>
      </div>
  
      
      <section class="py-16 bg-white">
        <div class="container mx-auto px-6 lg:px-8">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-12">Tanggal Pelaksanaan</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div class="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl shadow-md">
              <p class="font-semibold">Hari Pertama – Seleksi</p>
              <p class="text-lg mt-2">{{ eventDate.day1 }}</p>
            </div>
            <div class="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 rounded-xl shadow-md">
              <p class="font-semibold">Hari Kedua – Treasure Hunt</p>
              <p class="text-lg mt-2">{{ eventDate.day2 }}</p>
            </div>
          </div>
        </div>
      </section>
  
      
      <section class="py-16 bg-gray-100 heroes">
        <div class="container mx-auto px-6 lg:px-8">
      
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center">
              <div class="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">1</div>
              <h3 class="font-semibold text-lg mb-2">Seleksi Quiz</h3>
              <p class="text-gray-700">Scan barcode & jawab 7 pertanyaan UNTAG Surabaya.</p>
            </div>
            <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center">
              <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">2</div>
              <h3 class="font-semibold text-lg mb-2">Pembentukan Tim</h3>
              <p class="text-gray-700">Peserta lolos akan dibagi kelompok Treasure Hunt.</p>
            </div>
            <div class="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center">
              <div class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">3</div>
              <h3 class="font-semibold text-lg mb-2">Treasure Hunt</h3>
              <p class="text-gray-700">Jelajahi 10 area kampus & kumpulkan harta karun.</p>
            </div>
          </div>
        </div>
      </section>
  
      
      <footer class="bg-gray-800 text-white py-12">
        <div class="container mx-auto px-6 lg:px-8 text-center">
          <h4 class="text-xl font-semibold mb-6">Didukung Oleh</h4>
          <div class="flex flex-wrap justify-center space-x-6">
            
            
            <img src="@/assets/sponsor2.png" alt="Sponsor" class="h-12 mb-4" />
            <img src="@/assets/sponsor3.png" alt="Sponsor" class="h-12 mb-4" /> -->
          </div>
          <p class="mt-6 text-gray-400 text-sm">&copy; 2025 UNTAG Surabaya. All rights reserved.</p>
        </div>
      </footer>
  
      
      <div v-if="showSponsorPopup" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="fixed inset-0 bg-black bg-opacity-50" @click="closeSponsorPopup"></div>
        <div class="bg-white rounded-xl p-8 max-w-md w-full relative z-20">
          <button @click="closeSponsorPopup" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            &times;
          </button>
          <h3 class="text-2xl font-bold text-gray-800 mb-4">Selamat Datang!</h3>
          <p class="text-gray-600 mb-6 text-center">Event ini disponsori oleh mitra-mitra terpercaya kami.</p>
          <div class="flex justify-center space-x-4 mb-6">
            
            <img src="@/assets/sponsor2.png" alt="Sponsor" class="h-12" /> -->
          </div>
          <button @click="closeSponsorPopup" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full shadow transition duration-200">
            Mulai Event
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { QrcodeStream } from 'vue-qrcode-reader';
  
  export default {
    components: { QrcodeStream },
    data() {
      return {
        showScanner: false,
        scannedUrl: null,
        showSponsorPopup: false,
        isEventActive: true,
        eventDate: {
          day1: '5 September 2025',
          day2: '6 September 2025'
        }
      };
    },
    methods: {
      startSelection() {
        if (this.isEventActive) this.showScanner = true;
      },
      onDecode(result) {
        this.scannedUrl = result;
        window.location.href = result;
      },
      onInit(promise) {
        promise.catch(() => alert('Kamera tidak bisa diakses'));
      },
      closeSponsorPopup() {
        this.showSponsorPopup = false;
      }
    },
    mounted() {
      setTimeout(() => { this.showSponsorPopup = true; }, 3000);
    }
  };
  </script>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
  * { font-family: 'Poppins', sans-serif; }
  
  .hero {
    background: url('@/assets/background_login.jpeg') center/cover no-repeat;
  }

  .heroes {
    background: url('@/assets/Batik.jpg') center/cover no-repeat;
  }
  
  .qrcode-stream {
    max-width: 320px;
    width: 80%;
    margin: auto;
  }
  </style>
  