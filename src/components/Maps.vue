<template>
    <div class="h-screen">
      <MapboxMap
        access-token="pk.eyJ1IjoiZGFybWFwdXRyYTIwMDMiLCJhIjoiY205eDh3ZDJsMTNqNTJpcHl5aTZjaTZ4YyJ9.6DhJSqjPnVyx33ww6BYidQ"
        style="height: 100%; width: 100%;"
        :zoom="12"
        :center="mapCenter"
      >
        <!-- Marker dari lokasi list -->
        <MapboxMarker
          v-for="(lokasi, index) in lokasiList"
          :key="index"
          :lng-lat="[lokasi.lng, lokasi.lat]"
          :element="createCustomMarker(lokasi)"
        />
  
        <!-- Marker lokasi saat ini -->
        <MapboxMarker
          v-if="userLocation"
          :lng-lat="[userLocation.lng, userLocation.lat]"
          :element="createCurrentLocationMarker()"
        />
      </MapboxMap>
    </div>
  </template>
  
  <script>
  import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';
  
  export default {
    name: 'MapsPage',
    components: {
      MapboxMap,
      MapboxMarker,
    },
    data() {
      return {
        mapCenter: [112.6105, -7.9364],
        userLocation: null,
        lokasiList: [
          { lng: 112.6105, lat: -7.9364, iconClass: 'fa-solid fa-bowl-rice' },
          { lng: 112.615, lat: -7.934, iconClass: 'fa-solid fa-location-dot' },
        ],
      };
    },
    methods: {
      createCustomMarker(lokasi) {
        const icon = document.createElement('i');
        icon.className = lokasi.iconClass || 'fa-solid fa-map-pin';
        icon.style.fontSize = '24px';
        icon.style.color = '#009688';
        icon.style.transform = 'translate(-50%, -100%)';
        return icon;
      },
      createCurrentLocationMarker() {
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-street-view';
        icon.style.fontSize = '26px';
        icon.style.color = '#007bff';
        icon.style.transform = 'translate(-50%, -100%)';
        return icon;
      },
      getUserLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.userLocation = {
                lng: position.coords.longitude,
                lat: position.coords.latitude,
              };
              this.mapCenter = [position.coords.longitude, position.coords.latitude];
            },
            (error) => {
              console.error('Gagal mendapatkan lokasi:', error.message);
            }
          );
        } else {
          console.warn('Geolocation tidak didukung di browser ini.');
        }
      },
    },
    mounted() {
      this.getUserLocation();
    },
  };
  </script>
  
  <style>
  /* Tambahkan styling jika perlu */
  </style>
  