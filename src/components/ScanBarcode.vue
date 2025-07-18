<template>
    <div class="text-center py-12">
      <qrcode-stream @decode="onDecode" @init="onInit"></qrcode-stream>
  
      <div v-if="scannedUrl" class="mt-6">
        <p class="text-lg font-bold">Tautan Terdeteksi:</p>
        <a :href="scannedUrl" target="_blank" class="text-blue-600 underline">{{ scannedUrl }}</a>
      </div>
    </div>
  </template>
  
  <script>
  import { QrcodeStream } from 'vue-qrcode-reader'
  
  export default {
    components: { QrcodeStream },
    data() {
      return {
        scannedUrl: null,
      }
    },
    methods: {
      onDecode (result) {
        this.scannedUrl = result
        window.location.href = result // redirect otomatis
      },
      onInit (promise) {
        promise.catch(error => {
          console.error(error)
          alert("Kamera tidak dapat diakses. Pastikan izin kamera diaktifkan.")
        })
      }
    }
  }
  </script>
  