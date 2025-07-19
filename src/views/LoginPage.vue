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
        <h1 class="text-2xl font-bold text-black mb-1">Treasure Hunt</h1>
        <h1 class="text-2xl font-bold text-black">UNTAG</h1>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="nim" class="block text-sm font-medium text-black mb-2"> NIM </label>
          <div class="relative">
            <input
              id="nim"
              v-model="loginForm.nim"
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
              v-model="loginForm.password"
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

        <div class="flex items-center justify-between">
          <label class="flex items-center">
            <input
              v-model="loginForm.rememberMe"
              type="checkbox"
              class="rounded border-gray-300 text-red-500 focus:ring-red-500"
            />
            <span class="ml-2 text-sm text-black">Ingat saya</span>
          </label>
          <a href="#" class="text-sm text-black hover:text-gray-700 font-medium">
            Lupa password?
          </a>
        </div>

        <div class="flex items-center justify-center">
          <button
            type="submit"
            :disabled="isLoading"
            class="w-[1/2] bg-red-700 hover:bg-red-600 disabled:bg-red-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
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
            {{ isLoading ? "LOGIN..." : "LOGIN" }}
          </button>
        </div>

        <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-3">
          <p class="text-sm text-red-600 text-center">{{ errorMessage }}</p>
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
  name: "LoginPage",
  setup() {
    const isLoading = ref(false);
    const showPassword = ref(false);
    const errorMessage = ref("");

    const router = useRouter();

    const loginForm = reactive({
      nim: "",
      password: "",
      rememberMe: false,
    });

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    const handleLogin = async () => {
      try {
        isLoading.value = true;
        errorMessage.value = "";

        if (!loginForm.nim || !loginForm.password) {
          errorMessage.value = "NIM dan password harus diisi";
          return;
        }

        const response = await treasureService.login({
          nim: loginForm.nim,
          password: loginForm.password,
        });

        // ✅ Cek respon dan arahkan user
        console.log("Login berhasil:", response.data);
        // Simpan token / data user jika dibutuhkan
        localStorage.setItem("token", response.data.token);
        console.log("Login berhasil, token disimpan:", response.data.token);
        router.push("/quiz");
      } catch (error) {
        console.error("Login error:", error);
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
      loginForm,
      isLoading,
      showPassword,
      errorMessage,
      togglePassword,
      handleLogin,
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
input:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Custom checkbox styles */
input[type="checkbox"]:checked {
  background-color: #ef4444;
  border-color: #ef4444;
}
</style>
