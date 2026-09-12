import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')

// Sembunyikan ikon sampai font siap: cegah ikon ke-render sebagai teks aneh (FOUT)
// ponytail: visibility (bukan display) biar layout nggak loncat pas ikon muncul
if (document.fonts?.ready) {
  document.fonts.ready.then(() => {
    document.documentElement.classList.add('fonts-ready');
  });
} else {
  document.documentElement.classList.add('fonts-ready');
}