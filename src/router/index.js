import { createRouter, createWebHistory } from "vue-router";
// import store from "@/store/store";
const AdminDashboard = () => import("@/views/AdminDashboard");
const AdminKelolaSoal = () => import("@/views/AdminKelolaSoal");
const AdminMonitoringProgress = () => import("@/views/AdminMonitoringProgress");
const MahasiswaLeaderboard = () => import("@/views/MahasiswaLeaderboard");
const ManajemenSponsorship = () => import("@/views/ManajemenSponsorship");
const AdminManajemenKelompok = () => import("@/views/AdminManajemenKelompok");
const ManajementEvent = () => import("@/views/ManajemenEvent");
const AdminTreasureHunt = () => import("@/views/AdminTreasureHunt");
const AdminLaporan = () => import("@/views/AdminLaporan");
const AdminLeaderboard = () => import("@/views/AdminLeaderboard");

const LoginPage = () => import("@/views/LoginPage");

const MahasiswaDashboard = () => import("@/views/MahasiswaDashboard")
const MahasiswaSeleksiQuiz = () => import("@/views/MahasiswaSeleksiQuiz")
const MahasiswaPengumuman = () => import("@/views/MahasiswaPengumuman")
const MahasiswaDaftarKelompok = () => import("@/views/MahasiswaDaftarKelompok")
const MahasiswaTreasureHunt = () => import("@/views/MahasiswaTreasureHunt")
const MahasiswaProgressKelompok = () => import("@/views/MahasiswaProgressKelompok")
const MahasiswaHuntSponsorship = () => import("@/views/MahasiswaHuntSponsorship")
const MahasiswaProfil = () => import("@/views/MahasiswaProfil")
const MahasiswaSurveySistem = () => import("@/views/MahasiswaSurveySistem")

const routes = [

  {
    path: "/dashboard-admin",
    name: "Admin Dashboard",
    component: AdminDashboard,
  },

  {
    path: "/bank-soal",
    name: "Kelola Soal",
    component: AdminKelolaSoal,
  },
  {
    path: "/manajemen-treasure-hunt",
    name: "Admin Manajemen Treasure Hunt",
    component: AdminTreasureHunt,
  },

  {
    path: "/leaderboard-game-kuis",
    name: "Admin Leaderboard Kuis",
    component: AdminLeaderboard,
  },

  {
    path: "/monitoring-progress",
    name: "Monitoring Progress",
    component: AdminMonitoringProgress,
  },

  {
    path: "/laporan-dan-rekapan-akhir",
    name: "Laporan & Rekapan Akhir",
    component: AdminLaporan,
  },

  {
    path: "/leaderboard-kuis",
    name: "Leaderboard",
    component: MahasiswaLeaderboard,
  },

  {
    path: "/sponsorship",
    name: "Manajemen Sponsorship",
    component: ManajemenSponsorship,
  },
  {
    path: "/manajemen-kelompok",
    name: "Manajemen Kelompok",
    component: AdminManajemenKelompok,
  },
  {
    path: "/manajemen-event",
    name: "Manajemen Event",
    component: ManajementEvent,
  },


  {
    path: "/login",
    name: "Login Page",
    component: LoginPage,
  },

  {
    path: "/mahasiswa-dashboard",
    name: "Mahasiswa Dashboard",
    component: MahasiswaDashboard ,
  },
  {
    path: "/mahasiswa-seleksi-quiz",
    name: "Mahasiswa Seleksi Quiz",
    component: MahasiswaSeleksiQuiz ,
  },
  {
    path: "/mahasiswa-pengumuman",
    name: "Mahasiswa Pengumuman",
    component: MahasiswaPengumuman,
  },
  {
    path: "/mahasiswa-daftar-kelompok",
    name: "Mahasiswa Daftar Kelompok",
    component: MahasiswaDaftarKelompok,
  },
  {
    path: "/mahasiswa-treasure-hunt",
    name: "Mahasiswa Treasure Hunt",
    component: MahasiswaTreasureHunt,
  },
  {
    path: "/mahasiswa-progress-kelompok",
    name: "Mahasiswa Progress Kelompok",
    component: MahasiswaProgressKelompok,
  },
  {
    path: "/mahasiswa-hunt-sponsorship",
    name: "Mahasiswa Hunt Sponsorship",
    component: MahasiswaHuntSponsorship,
  },
  {
    path: "/mahasiswa-profil",
    name: "Mahasiswa Profile",
    component: MahasiswaProfil,
  },
  {
    path: "/survey-kepuasan-pengguna",
    name: "Survey Kepuasan Pengguna",
    component: MahasiswaSurveySistem,
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    return { top: 0 };
  },
});

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
//   scrollBehavior(to, from, savedPosition) {
//     // Jika ada savedPosition (misalnya dari tombol 'back' browser), gunakan posisi tersebut
//     if (savedPosition) {
//       return savedPosition;
//     }
//     // Secara default, scroll ke atas
//     return { top: 0 };
//   },
// });

// router.beforeEach(async (to, from, next) => {
//   var isAuthenticated = null;
//   var userRole = null;
//   if (to.meta.requiresAuth)
//     if (to.meta.requiredRole === "swi") {
//       await store.dispatch("storeswi/updateStoreSwi");
//       isAuthenticated = store.state.storeswi.userLoggedInSwi;
//       userRole = store.state.storeswi.userRoleSwi;
//     } else {
//       await store.dispatch("updateStoreLpkni");
//       isAuthenticated = store.state.storeLpkni.UserLpkniIsLoggedIn;
//       userRole = store.state.storeLpkni.userLpkniRole;
//     } 

//   console.log(isAuthenticated);
//   console.log(userRole);
//   if (to.meta.requiresAuth && !isAuthenticated) {
//     alert("Sesi Anda Habis!");
//     next({ name: "Login" });
//   } else if (
//     to.meta.requiresAuth &&
//     to.meta.requiredRole &&
//     to.meta.requiredRole !== userRole
//   ) {
//     alert("Tidak Memiliki Hak Akses!");
//     next({ name: "Login" });
//   } else {
//     next();
//   }
// });

router.afterEach((to) => {
  document.title = to.meta.title || "Treasure Hunt Untag";
});

export default router;
