  <template>
    <div
      class="relative min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style="background-image: url('/background_login.jpeg')"
    >
      <div class="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div class="absolute inset-0 bg-black bg-opacity-30">
        <div class="absolute inset-0"></div>
      </div>

      <div class="relative bg-[#545454] rounded-2xl shadow-2xl p-4 w-full max-w-md">
        <div class="text-center mb-8">
          <div class="w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <img src="@/assets/logo_untag.png" alt="" class="w-44 h-auto" />
          </div>
          <h1 class="text-2xl font-bold text-black mb-1">Registrasi</h1>
          <h1 class="text-2xl font-bold text-black">Treasure Hunt UNTAG</h1>
        </div>

        <form @submit.prevent="handleRegistration" class="space-y-4">
          <div>
            <label for="nim" class="block text-sm font-medium text-black mb-2">
              Nama
            </label>
            <div class="relative">
              <input
                id="name"
                v-model="registrationForm.name"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors pl-11"
                placeholder="Masukkan name"
              />
              <svg
                class="w-5 h-5 text-gray-400 absolute left-3 top-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>
          <div>
            <label for="nim" class="block text-sm font-medium text-black mb-2"> NIM </label>
            <div class="relative">
              <input
                id="nim"
                v-model="registrationForm.nim"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors pl-11"
                placeholder="Masukkan NIM"
              />
              <svg
                class="w-5 h-5 text-gray-400 absolute left-3 top-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-black mb-2">
              Password
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="registrationForm.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors pl-11 pr-11"
                placeholder="Masukkan password"
              />
              <svg
                class="w-5 h-5 text-gray-400 absolute left-3 top-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <button
                type="button"
                @click="togglePassword"
                class="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                <svg
                  v-if="!showPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <label for="fakultas" class="block text-sm font-medium text-black mb-2">
              Fakultas
            </label>
            <div class="relative">
              <select
                id="fakultas"
                v-model="registrationForm.fakultas"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors pl-11 appearance-none bg-white"
              >
                <option value="">Pilih Fakultas</option>
                <option value="FTI">Fakultas Teknologi Informasi</option>
                <option value="FEB">Fakultas Ekonomi dan Bisnis</option>
                <option value="FH">Fakultas Hukum</option>
                <option value="FT">Fakultas Teknik</option>
                <option value="FISIP">Fakultas Ilmu Sosial dan Ilmu Politik</option>
                <option value="FKG">Fakultas Kedokteran Gigi</option>
                <option value="FK">Fakultas Kedokteran</option>
              </select>
              <svg
                class="w-5 h-5 text-gray-400 absolute left-3 top-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <svg
                class="w-5 h-5 text-gray-400 absolute right-3 top-3.5 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <div>
            <label for="jurusan" class="block text-sm font-medium text-black mb-2">
              Jurusan
            </label>
            <div class="relative">
              <input
                id="jurusan"
                v-model="registrationForm.jurusan"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors pl-11"
                placeholder="Masukkan jurusan"
              />
              <svg
                class="w-5 h-5 text-gray-400 absolute left-3 top-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
          </div>

          <div>
            <label for="angkatan" class="block text-sm font-medium text-black mb-2">
              Angkatan
            </label>
            <div class="relative">
              <select
                id="angkatan"
                v-model="registrationForm.angkatan"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors pl-11 appearance-none bg-white"
              >
                <option value="">Pilih Angkatan</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
              <svg
                class="w-5 h-5 text-gray-400 absolute left-3 top-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v5a2 2 0 002 2h4a2 2 0 002-2v-5m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v2M8 7h8"
                />
              </svg>
              <svg
                class="w-5 h-5 text-gray-400 absolute right-3 top-3.5 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <div class="flex items-center justify-center pt-4">
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-red-700 hover:bg-red-600 disabled:bg-red-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              <svg
                v-if="isLoading"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ isLoading ? "MENDAFTAR..." : "DAFTAR" }}
            </button>
          </div>

          <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-3">
            <p class="text-sm text-red-600 text-center">{{ errorMessage }}</p>
          </div>

          <div
            v-if="successMessage"
            class="bg-green-50 border border-green-200 rounded-lg p-3"
          >
            <p class="text-sm text-green-600 text-center">{{ successMessage }}</p>
          </div>
        </form>

        <div class="mt-6 text-center">
          <p class="text-xs text-gray-500">© 2025 UNTAG Surabaya. All rights reserved.</p>
        </div>
      </div>

      <div
        class="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"
      ></div>
      <div
        class="absolute bottom-10 right-10 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-pulse"
        style="animation-delay: 1s"
      ></div>
      <div
        class="absolute top-1/3 right-20 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-pulse"
        style="animation-delay: 2s"
      ></div>
    </div>
  </template>

<script>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import treasureService from "@/service/treasureService";

export default {
  name: "RegistrationPage",
  setup() {
    const isLoading = ref(false);
    const showPassword = ref(false);
    const errorMessage = ref("");
    const successMessage = ref("");

    const router = useRouter();

    const registrationForm = reactive({
      name: "",
      nim: "",
      password: "",
      fakultas: "",
      jurusan: "",
      angkatan: "",
    });

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };
    const handleRegistration = async () => {
      try {
        isLoading.value = true;
        errorMessage.value = "";
        successMessage.value = "";

        // Validasi form
        if (
          !registrationForm.name ||
          !registrationForm.nim ||
          !registrationForm.password ||
          !registrationForm.fakultas ||
          !registrationForm.jurusan ||
          !registrationForm.angkatan 
        ) {
          errorMessage.value = "Semua field harus diisi";
          return;
        }

        if (!/^\d+$/.test(registrationForm.nim)) {
          errorMessage.value = "NIM harus berupa angka";
          return;
        }

        if (registrationForm.password.length < 6) {
          errorMessage.value = "Password minimal 6 karakter";
          return;
        }

        // Kirim ke backend
        const response = await treasureService.register({
          name: registrationForm.name,
          nim: registrationForm.nim,
          password: registrationForm.password,
          fakultas: registrationForm.fakultas,
          jurusan: registrationForm.jurusan,
          angkatan: registrationForm.angkatan,
        });

        successMessage.value = response.data.message || "Registrasi berhasil!";

        setTimeout(() => {
          registrationForm.name = "";
          registrationForm.nim = "";
          registrationForm.password = "";
          registrationForm.fakultas = "";
          registrationForm.jurusan = "";
          registrationForm.angkatan = "";
          router.push("/login");
        }, 2000);
      } catch (error) {
        console.error("Registration error:", error);
        if (error.response?.data?.error) {
          errorMessage.value = error.response.data.error;
        } else {
          errorMessage.value = "Terjadi kesalahan. Silakan coba lagi.";
        }
      } finally {
        isLoading.value = false;
      }
    };

    return {
      registrationForm,
      isLoading,
      showPassword,
      errorMessage,
      successMessage,
      togglePassword,
      handleRegistration,
    };
  },
};
</script>

<style scoped>
/* Custom animations */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Custom focus styles */
input:focus,
select:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Custom select styles */
select {
  background-image: none;
}
</style>
