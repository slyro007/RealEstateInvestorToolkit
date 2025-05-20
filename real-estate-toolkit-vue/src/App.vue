<template>
  <v-app>
    <!-- Modern Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail && !$vuetify.display.mdAndDown"
      :permanent="!$vuetify.display.mdAndDown"
      :temporary="$vuetify.display.mdAndDown"
      :theme="theme"
      width="280"
      class="rounded-tr-xl rounded-br-xl"
      elevation="3"
    >
      <div class="d-flex flex-column fill-height">
        <!-- App Brand -->
        <div class="px-3 py-4 d-flex align-center">
          <div v-if="!rail || $vuetify.display.mdAndDown" class="d-flex align-center">
            <v-avatar size="40" color="primary" class="me-3">
              <v-icon color="white">mdi-home-city</v-icon>
            </v-avatar>
            <span class="text-h6 font-weight-bold">REI Toolkit</span>
          </div>
          <v-avatar v-else size="40" color="primary">
            <v-icon color="white">mdi-home-city</v-icon>
          </v-avatar>
          
          <v-spacer></v-spacer>
          
          <v-btn
            v-if="!$vuetify.display.mdAndDown"
            variant="text"
            icon
            density="comfortable"
            @click.stop="rail = !rail"
          >
            <v-icon>{{ rail ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
          </v-btn>
        </div>

        <v-divider></v-divider>

        <!-- User Profile Quick View -->
        <div v-if="!rail || $vuetify.display.mdAndDown" class="px-4 py-3">
          <div class="d-flex align-center mb-2">
            <v-avatar color="primary" size="42" class="mr-3">
              <span class="text-h6 font-weight-medium">{{ userInitials }}</span>
            </v-avatar>
            <div>
              <div class="text-subtitle-1 font-weight-medium">John Smith</div>
              <div class="text-caption text-medium-emphasis">Real Estate Pro</div>
            </div>
          </div>
        </div>

        <v-divider class="mb-2"></v-divider>

        <!-- Navigation Links -->
        <v-list nav density="comfortable" :class="rail && !$vuetify.display.mdAndDown ? 'px-2' : 'px-3'" class="scrollable-y">
          <div v-for="(section, i) in navSections" :key="`section-${i}`">
            <v-list-subheader 
              v-if="(!rail || $vuetify.display.mdAndDown) && section.title" 
              class="text-caption font-weight-bold text-uppercase text-medium-emphasis ml-2 mt-2"
            >
              {{ section.title }}
            </v-list-subheader>
            
            <v-list-item
              v-for="(item, j) in section.items"
              :key="`item-${i}-${j}`"
              :to="item.to"
              :value="item.to"
              :prepend-icon="item.icon"
              :title="!rail || $vuetify.display.mdAndDown ? item.title : ''"
              :active="route.path === item.to"
              class="mb-1 rounded-lg"
              min-height="44"
              :class="rail && !$vuetify.display.mdAndDown ? 'justify-center my-2' : ''"
              color="primary"
            ></v-list-item>
            
            <v-divider v-if="i < navSections.length - 1" class="my-2"></v-divider>
          </div>
        </v-list>

        <v-divider></v-divider>

        <!-- Footer Actions -->
        <div class="mt-auto px-3 py-3">
          <v-list density="comfortable">
            <v-list-item
              prepend-icon="mdi-brightness-6"
              :title="!rail || $vuetify.display.mdAndDown ? 'Toggle Theme' : ''"
              @click="toggleTheme"
              rounded="lg"
              min-height="44"
              class="mb-1"
            ></v-list-item>
            
            <v-list-item
              v-if="!isAuthenticated"
              prepend-icon="mdi-login"
              :title="!rail || $vuetify.display.mdAndDown ? 'Sign In' : ''"
              to="/sign-in"
              rounded="lg"
              min-height="44"
              class="mb-1"
            ></v-list-item>
            
            <v-list-item
              v-else
              prepend-icon="mdi-logout"
              :title="!rail || $vuetify.display.mdAndDown ? 'Sign Out' : ''"
              @click="signOut"
              rounded="lg"
              min-height="44"
            ></v-list-item>
          </v-list>
        </div>
      </div>
    </v-navigation-drawer>

    <!-- Modern App Bar -->
    <v-app-bar 
      elevate-on-scroll
      scroll-threshold="5"
      :elevation="appBarElevation"
      :theme="theme"
      height="70"
    >
      <!-- Mobile Toggle Menu -->
      <template v-slot:prepend>
        <v-app-bar-nav-icon 
          v-if="$vuetify.display.mdAndDown" 
          @click="drawer = !drawer"
          class="ml-1"
        ></v-app-bar-nav-icon>
        
        <v-avatar 
          v-if="rail && !$vuetify.display.mdAndDown" 
          color="primary" 
          size="38" 
          class="ml-4 mr-3"
        >
          <v-icon color="white">mdi-home-city</v-icon>
        </v-avatar>
        
        <span 
          v-if="!$vuetify.display.smAndDown" 
          class="text-h6 font-weight-medium truncate-text mr-4"
        >
          {{ currentPageTitle }}
        </span>
      </template>

      <!-- Search Field -->
      <v-text-field
        v-if="!$vuetify.display.smAndDown"
        density="comfortable"
        variant="outlined"
        prepend-inner-icon="mdi-magnify"
        placeholder="Search properties, deals, or resources..."
        hide-details
        class="max-width-300 mx-auto"
        bg-color="background"
        rounded="pill"
      ></v-text-field>

      <!-- Right Side Tools -->
      <template v-slot:append>
        <div class="d-flex align-center">
          <!-- Search Icon (Mobile) -->
          <v-btn 
            v-if="$vuetify.display.smAndDown" 
            icon="mdi-magnify" 
            variant="text"
          ></v-btn>
          
          <!-- Notifications -->
          <v-badge
            color="error"
            content="3"
            location="top end"
            offset-x="3"
            offset-y="3"
          >
            <v-btn icon variant="text">
              <v-icon>mdi-bell-outline</v-icon>
            </v-btn>
          </v-badge>
          
          <!-- Quick Actions Menu -->
          <v-menu min-width="200">
            <template v-slot:activator="{ props }">
              <v-btn 
                icon="mdi-dots-vertical" 
                v-bind="props"
                variant="text"
              ></v-btn>
            </template>
            <v-list density="comfortable">
              <v-list-item prepend-icon="mdi-plus-circle" title="New Deal"></v-list-item>
              <v-list-item prepend-icon="mdi-chart-box" title="Analytics"></v-list-item>
              <v-divider></v-divider>
              <v-list-item prepend-icon="mdi-cog" title="Settings"></v-list-item>
              <v-list-item prepend-icon="mdi-help-circle" title="Help Center"></v-list-item>
            </v-list>
          </v-menu>
          
          <!-- User Menu -->
          <v-menu min-width="200" location="bottom end">
            <template v-slot:activator="{ props }">
              <v-btn 
                class="ml-2 mr-3" 
                v-bind="props"
                variant="text"
              >
                <v-avatar color="primary" size="38">
                  <span class="text-body-1 font-weight-medium">{{ userInitials }}</span>
                </v-avatar>
                <span v-if="!$vuetify.display.smAndDown" class="ml-2">John Smith</span>
                <v-icon v-if="!$vuetify.display.smAndDown" class="ml-1">mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list density="comfortable">
              <v-list-item prepend-icon="mdi-account" title="My Profile"></v-list-item>
              <v-list-item prepend-icon="mdi-wallet" title="Billing"></v-list-item>
              <v-divider></v-divider>
              <v-list-item prepend-icon="mdi-logout" title="Sign Out" @click="signOut"></v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
    </v-app-bar>

    <!-- Main Content Area -->
    <v-main>
      <v-container fluid class="fill-height pa-6 main-container">
        <router-view v-slot="{ Component }">
          <v-fade-transition mode="out-in">
            <component :is="Component" />
          </v-fade-transition>
        </router-view>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app :theme="theme" class="px-4 py-3 d-flex justify-space-between align-center">
      <span class="text-caption">&copy; {{ new Date().getFullYear() }} Real Estate Investor Toolkit</span>
      <div class="d-flex align-center">
        <v-btn variant="text" size="small" class="text-caption" href="/privacy">Privacy</v-btn>
        <v-btn variant="text" size="small" class="text-caption" href="/terms">Terms</v-btn>
        <v-btn variant="text" size="small" class="text-caption" href="/contact">Contact</v-btn>
      </div>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'

const router = useRouter()
const route = useRoute()
const drawer = ref(true)
const rail = ref(false)
const theme = ref('light')
const isAuthenticated = ref(true) // Set to true for now - replace with actual authentication state
const appBarElevation = ref(0)

// Navigation Sections with Grouping
const navSections = [
  {
    title: 'Overview',
    items: [
      {
        title: 'Dashboard',
        icon: 'mdi-view-dashboard-outline',
        to: '/'
      },
    ]
  },
  {
    title: 'Core Features',
    items: [
      {
        title: 'Deal Analysis',
        icon: 'mdi-calculator-variant-outline',
        to: '/deals'
      },
      {
        title: 'Marketing',
        icon: 'mdi-bullhorn-outline',
        to: '/marketing'
      },
      {
        title: 'Education',
        icon: 'mdi-book-open-page-variant-outline',
        to: '/education'
      },
      {
        title: 'Sales',
        icon: 'mdi-handshake-outline',
        to: '/sales'
      },
    ]
  },
  {
    title: 'Management',
    items: [
      {
        title: 'Finance',
        icon: 'mdi-currency-usd',
        to: '/finance'
      },
      {
        title: 'Operations',
        icon: 'mdi-cog-outline',
        to: '/operations'
      }
    ]
  }
]

// Responsive behavior
onMounted(() => {
  const { smAndDown } = useDisplay()
  // Set to rail mode on desktop by default
  rail.value = !smAndDown.value
  
  // Load theme from local storage
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    theme.value = savedTheme
  }
  
  // Handle window scroll for app bar elevation
  window.addEventListener('scroll', updateAppBarElevation)
})

watch(() => theme.value, (newValue) => {
  localStorage.setItem('theme', newValue)
})

// Clean up event listeners
onMounted(() => {
  return () => {
    window.removeEventListener('scroll', updateAppBarElevation)
  }
})

// Computed properties
const currentPageTitle = computed(() => {
  // Find the page title by flattening the sections and finding the matching route
  const allItems = navSections.flatMap(section => section.items)
  const currentRoute = allItems.find(item => item.to === route.path)
  return currentRoute ? currentRoute.title : 'Dashboard'
})

const userInitials = computed(() => {
  return 'JS' // Would be computed from actual user name
})

// Methods
const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

const signOut = () => {
  // Sign out logic here
  isAuthenticated.value = false
  router.push('/sign-in')
}

const updateAppBarElevation = () => {
  appBarElevation.value = window.scrollY > 0 ? 4 : 0
}
</script>

<style>
/* Improved styles for a professional look */
.main-container {
  background-color: var(--v-background-base);
  max-width: 100%;
}

.v-navigation-drawer {
  border-right: none !important;
}

.scrollable-y {
  overflow-y: auto;
  flex: 1;
}

.truncate-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 180px;
}

.max-width-300 {
  max-width: 400px;
}

/* Modern transition effects */
.v-navigation-drawer, .v-app-bar {
  transition: box-shadow 0.3s ease, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .v-navigation-drawer {
    border-radius: 0 !important;
  }
}

/* Subtle border for cards */
.v-card {
  border: thin solid rgba(var(--v-border-color), 0.12);
}

.v-btn-group .v-btn {
  box-shadow: none !important;
}

/* Improved scrollbars */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}
</style>
