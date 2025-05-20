import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Styles
import './style.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

// Import Inter font
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#1E88E5',       // Professional blue
          secondary: '#26A69A',     // Teal for accents
          accent: '#FF5722',        // Deep orange for highlights
          success: '#43A047',       // Green
          warning: '#FDD835',       // Yellow
          error: '#E53935',         // Red
          info: '#29B6F6',          // Light blue
          background: '#F5F7FA',    // Light gray-blue background
          surface: '#FFFFFF',
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: '#42A5F5',       // Lighter blue for dark mode
          secondary: '#4DB6AC',     // Softer teal for dark mode
          accent: '#FF7043',        // Softer orange for dark mode
          success: '#66BB6A',       // Softer green
          warning: '#FFEE58',       // Softer yellow
          error: '#EF5350',         // Softer red
          info: '#4FC3F7',          // Softer light blue
          background: '#121212',    // Dark background
          surface: '#1E1E1E',       // Slightly lighter dark for cards
        }
      }
    },
    variations: {
      colors: ['primary', 'secondary', 'accent'],
      lighten: 3,
      darken: 3,
    },
  },
  defaults: {
    VCard: {
      elevation: 2,
      rounded: 'lg',
    },
    VBtn: {
      rounded: 'pill',
      fontWeight: 'medium',
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary',
    },
    VSelect: {
      variant: 'outlined',
      density: 'comfortable',
      color: 'primary',
    },
  }
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
