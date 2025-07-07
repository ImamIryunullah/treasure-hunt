<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <SidebarAdmin
      :is-collapsed="isCollapsed"
      :menu-items="menuItems"
      @toggle="toggleSidebar"
      @set-active="setActiveMenu"
    />

    <!-- Main Content -->
    <div class="flex-1 transition-all duration-300 ease-in-out">
      <!-- Header -->
      <div class="px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Manajemen Lokasi</h1>
            <p class="text-gray-600 mt-1">
              Kelola 10 lokasi treasure hunt di kampus UNTAG
            </p>
          </div>
          <button
            @click="showAddModal = true"
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Tambah Lokasi
          </button>
        </div>
      </div>

      <!-- Dashboard Content -->
      <div class="p-8">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div
                class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div class="ml-4">
                <div class="text-2xl font-bold text-green-600">4</div>
                <div class="text-sm text-gray-600">dari 5 total lokasi</div>
              </div>
            </div>
            <div class="mt-2">
              <div class="text-sm font-medium text-gray-900">Lokasi Aktif</div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div
                class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div class="ml-4">
                <div class="text-2xl font-bold text-blue-600">12</div>
                <div class="text-sm text-gray-600">dari 26 total kelompok</div>
              </div>
            </div>
            <div class="mt-2">
              <div class="text-sm font-medium text-gray-900">Kelompok Terassign</div>
            </div>
          </div>

          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div
                class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="ml-4">
                <div class="text-2xl font-bold text-purple-600">X</div>
                <div class="text-sm text-gray-600">Perlu aktivasi lokasi</div>
              </div>
            </div>
            <div class="mt-2">
              <div class="text-sm font-medium text-gray-900">Siap Event</div>
            </div>
          </div>
        </div>

        <!-- Location Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <!-- Active Location 1 -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <svg
                  class="w-5 h-5 text-gray-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <h3 class="font-semibold text-gray-900">Gedung Q Lantai 1</h3>
              </div>
              <span
                class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium"
                >Aktif</span
              >
            </div>
            <p class="text-sm text-gray-600 mb-4">
              Area lobby utama dengan patung pendiri universitas
            </p>

            <div class="space-y-3 mb-4">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Batas Waktu:</span>
                <span class="font-medium">30 menit</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Kelompok Assigned:</span>
                <span class="font-medium">3 kelompok</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Jumlah Soal:</span>
                <span class="font-medium">1 soal</span>
              </div>
            </div>

            <div class="flex gap-2">
              <button
                class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Edit
              </button>
              <button
                class="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Nonaktifkan
              </button>
              <button
                class="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
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
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Active Location 2 -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <svg
                  class="w-5 h-5 text-gray-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <h3 class="font-semibold text-gray-900">Perpustakaan Pusat</h3>
              </div>
              <span
                class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium"
                >Aktif</span
              >
            </div>
            <p class="text-sm text-gray-600 mb-4">Ruang baca utama lantai 2</p>

            <div class="space-y-3 mb-4">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Batas Waktu:</span>
                <span class="font-medium">30 menit</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Kelompok Assigned:</span>
                <span class="font-medium">2 kelompok</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Jumlah Soal:</span>
                <span class="font-medium">1 soal</span>
              </div>
            </div>

            <div class="flex gap-2">
              <button
                class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Edit
              </button>
              <button
                class="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Nonaktifkan
              </button>
              <button
                class="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
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
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Active Location 3 -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <svg
                  class="w-5 h-5 text-gray-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <h3 class="font-semibold text-gray-900">Joglo Kampus</h3>
              </div>
              <span
                class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium"
                >Aktif</span
              >
            </div>
            <p class="text-sm text-gray-600 mb-4">
              Titik kumpul utama dan area tradisional
            </p>

            <div class="space-y-3 mb-4">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Batas Waktu:</span>
                <span class="font-medium">30 menit</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Kelompok Assigned:</span>
                <span class="font-medium">4 kelompok</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Jumlah Soal:</span>
                <span class="font-medium">1 soal</span>
              </div>
            </div>

            <div class="flex gap-2">
              <button
                class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Edit
              </button>
              <button
                class="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Nonaktifkan
              </button>
              <button
                class="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
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
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Inactive Location 1 -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <svg
                  class="w-5 h-5 text-gray-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <h3 class="font-semibold text-gray-900">Lab Komputer A</h3>
              </div>
              <span
                class="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full font-medium"
                >Nonaktif</span
              >
            </div>
            <p class="text-sm text-gray-600 mb-4">Laboratorium teknologi informasi</p>

            <div class="space-y-3 mb-4">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Batas Waktu:</span>
                <span class="font-medium">30 menit</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Kelompok Assigned:</span>
                <span class="font-medium">0 kelompok</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Jumlah Soal:</span>
                <span class="font-medium">0 soal</span>
              </div>
            </div>

            <div class="flex gap-2">
              <button
                class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Edit
              </button>
              <button
                class="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Aktifkan
              </button>
              <button
                class="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
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
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Inactive Location 2 -->
          <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <svg
                  class="w-5 h-5 text-gray-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <h3 class="font-semibold text-gray-900">Aula Serbaguna</h3>
              </div>
              <span
                class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium"
                >Aktif</span
              >
            </div>
            <p class="text-sm text-gray-600 mb-4">Ruang acara besar universitas</p>

            <div class="space-y-3 mb-4">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Batas Waktu:</span>
                <span class="font-medium">30 menit</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Kelompok Assigned:</span>
                <span class="font-medium">3 kelompok</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Jumlah Soal:</span>
                <span class="font-medium">1 soal</span>
              </div>
            </div>

            <div class="flex gap-2">
              <button
                class="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Edit
              </button>
              <button
                class="flex-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Nonaktifkan
              </button>
              <button
                class="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
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
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
          <div class="flex flex-wrap gap-3">
            <button
              class="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Aktifkan Semua Lokasi
            </button>
            <button
              class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Nonaktifkan Semua Lokasi
            </button>
            <button
              class="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Export Data Lokasi
            </button>
            <button
              class="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Import Lokasi dari File
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Location Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold text-gray-900">Tambah Lokasi Baru</h3>
          <button @click="showAddModal = false" class="text-gray-500 hover:text-gray-700">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <p class="text-sm text-gray-600 mb-4">Isi informasi lokasi treasure hunt</p>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Nama Lokasi</label
            >
            <input
              v-model="newLocation.name"
              type="text"
              placeholder="Contoh: Gedung Q Lantai 1"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Deskripsi/Petunjuk</label
            >
            <textarea
              v-model="newLocation.description"
              placeholder="Deskripsi lokasi dan petunjuk untuk mahasiswa"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Batas Waktu (menit)</label
            >
            <input
              v-model="newLocation.timeLimit"
              type="number"
              placeholder="30"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div class="flex items-center">
            <input
              v-model="newLocation.isActive"
              type="checkbox"
              class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label class="ml-2 text-sm text-gray-700">Lokasi Aktif</label>
          </div>

          <div>
            <input
              type="file"
              ref="fileInput"
              accept="image/*"
              class="hidden"
              @change="handleFileUpload"
            />

            <button
              @click="triggerFileInput"
              class="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg font-medium transition-colors"
            >
              <svg
                class="w-5 h-5 inline mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Upload Foto
            </button>

            <div v-if="previewUrl" class="mt-4">
              <p class="text-sm mb-1">Preview:</p>
              <img :src="previewUrl" class="w-32 h-32 object-cover rounded border" />
            </div>
          </div>

          <div class="flex gap-3">
            <button
              @click="addLocation"
              class="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Simpan
            </button>
            <button
              @click="showAddModal = false"
              class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-medium transition-colors"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarAdmin from "@/components/SidebarAdmin.vue";
import { ref, reactive } from "vue";

export default {
  components: {
    SidebarAdmin,
  },
  name: "LocationManagement",
  setup() {
    const isCollapsed = ref(false);
    const showAddModal = ref(false);

    const newLocation = reactive({
      name: "",
      description: "",
      timeLimit: 30,
      isActive: true,
    });

    const fileInput = ref(null);
    const previewUrl = ref("");

    const triggerFileInput = () => {
      fileInput.value.click();
    };

    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          previewUrl.value = reader.result;
        };
        reader.readAsDataURL(file);

        // Jika ingin mengunggah ke server, kirim file ke API backend di sini
        console.log("File siap diunggah:", file);
      } else {
        alert("Silakan pilih file gambar.");
      }
    };
    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    const addLocation = () => {
      // Logic to add new location
      console.log("Adding location:", newLocation);
      // Reset form
      newLocation.name = "";
      newLocation.description = "";
      newLocation.timeLimit = 30;
      newLocation.isActive = true;
      showAddModal.value = false;
    };

    const menuItems = reactive([
      { name: "Dashboard", icon: "fas fa-home", route: "/", active: false },
      {
        name: "Kelola Lokasi",
        icon: "fas fa-map-marker-alt",
        route: "/manajemen-lokasi",
        active: true,
      },
      {
        name: "Kelola Kelompok",
        icon: "fas fa-users",
        route: "/manajemen-kelompok",
        active: false,
      },
      {
        name: "Kelola Soal",
        icon: "fas fa-question-circle",
        route: "/bank-soal",
        active: false,
      },
      {
        name: "Monitoring Progress",
        icon: "fas fa-chart-line",
        route: "/monitoring-progress",
        active: false,
      },
      {
        name: "Laporan",
        icon: "fas fa-file-alt",
        route: "/laporan-dan-rekapan-akhir",
        active: false,
      },
    ]);

    const setActiveMenu = (name) => {
      menuItems.forEach((item) => {
        item.active = item.name === name;
      });
    };

    return {
      isCollapsed,
      showAddModal,
      newLocation,
      menuItems,
      toggleSidebar,
      addLocation,
      setActiveMenu,
      triggerFileInput,
      handleFileUpload,
      fileInput,       
      previewUrl 
    };
  },
};
</script>
