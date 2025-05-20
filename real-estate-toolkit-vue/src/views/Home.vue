<template>
  <div class="dashboard">
    <!-- Welcome Section -->
    <v-card class="mb-6 bg-primary-subtle" variant="flat">
      <v-card-text class="pa-6">
        <v-row align="center">
          <v-col cols="12" md="7">
            <div class="text-h5 font-weight-bold text-primary mb-2">Welcome back, John!</div>
            <div class="text-body-1 mb-4">Your portfolio is performing well. Here's what happened while you were away.</div>
            <v-row dense>
              <v-col v-for="(metric, i) in performanceMetrics" :key="i" cols="6" sm="4">
                <v-card class="pa-4 d-flex flex-column h-100" variant="flat">
                  <div class="text-caption font-weight-medium text-medium-emphasis mb-1">{{ metric.label }}</div>
                  <div class="d-flex align-center">
                    <span class="text-h5 font-weight-bold mr-2">{{ metric.value }}</span>
                    <v-chip density="compact" :color="metric.change >= 0 ? 'success' : 'error'" size="small" variant="tonal">
                      <v-icon size="x-small" start>{{ metric.change >= 0 ? 'mdi-arrow-up' : 'mdi-arrow-down' }}</v-icon>
                      {{ Math.abs(metric.change) }}%
                    </v-chip>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="5" class="d-none d-md-flex justify-center align-center">
            <v-sheet class="pa-4 rounded-lg" width="100%" height="200">
              <!-- Placeholder for chart -->
              <div class="d-flex justify-center align-center h-100">
                <div class="text-center">
                  <v-icon size="48" color="primary" class="mb-2">mdi-chart-line</v-icon>
                  <div class="text-caption text-medium-emphasis">Portfolio Performance</div>
                </div>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
        <v-divider class="my-4"></v-divider>
        <div class="d-flex flex-wrap gap-3">
          <v-btn prepend-icon="mdi-home-plus" color="primary">Add New Property</v-btn>
          <v-btn prepend-icon="mdi-file-document-outline" variant="tonal">Generate Report</v-btn>
          <v-btn prepend-icon="mdi-book-open-outline" variant="text">Continue Learning</v-btn>
        </div>
      </v-card-text>
    </v-card>

    <!-- Quick Actions Row -->
    <div class="d-flex align-center justify-space-between mb-6">
      <h2 class="text-h5 font-weight-bold">Quick Actions</h2>
      <v-btn size="small" variant="text" color="primary" class="text-capitalize">View All
        <v-icon end>mdi-chevron-right</v-icon>
      </v-btn>
    </div>

    <!-- Quick Actions Cards -->
    <v-row class="mb-6">
      <v-col v-for="(module, i) in modules" :key="i" cols="12" sm="6" md="4" xl="2">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            :to="module.to"
            class="h-100 d-flex flex-column"
            :elevation="isHovering ? 4 : 1"
            :class="{ 'on-hover': isHovering }"
          >
            <v-card-item>
              <v-avatar
                :color="`${module.color}-lighten-4`"
                :class="`text-${module.color}`"
                rounded="lg"
                size="48"
                class="mb-2"
              >
                <v-icon>{{ module.icon }}</v-icon>
              </v-avatar>
              <v-card-title class="px-0 pt-2 text-body-1 font-weight-bold">{{ module.title }}</v-card-title>
              <v-card-subtitle class="px-0 text-body-2">{{ module.description }}</v-card-subtitle>
            </v-card-item>
            
            <v-card-actions class="mt-auto px-4 pb-4">
              <v-spacer></v-spacer>
              <v-btn
                variant="text"
                :color="module.color"
                :to="module.to"
                class="text-capitalize"
                size="small"
              >
                Explore
                <v-icon end size="small">mdi-arrow-right</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-if="isHovering" class="module-overlay d-flex align-center justify-center transition-fast-in-fast-out">
                <v-btn
                  :to="module.to"
                  :color="module.color"
                  variant="flat"
                  class="text-capitalize"
                >
                  Open {{ module.title }}
                </v-btn>
              </div>
            </v-expand-transition>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
    
    <!-- Recent Activity & Quick Stats -->
    <v-row>
      <!-- Recent Activity -->
      <v-col cols="12" lg="8">
        <div class="d-flex align-center justify-space-between mb-4">
          <h2 class="text-h5 font-weight-bold">Recent Activity</h2>
          <v-btn size="small" variant="text" color="primary" class="text-capitalize">View All
            <v-icon end>mdi-chevron-right</v-icon>
          </v-btn>
        </div>
        <v-card>
          <v-list lines="two">
            <v-list-item
              v-for="(activity, i) in recentActivities"
              :key="i"
              :title="activity.title"
              :subtitle="activity.description"
              rounded="lg"
              class="mb-1"
            >
              <template v-slot:prepend>
                <v-avatar
                  :color="`${activity.colorName}-lighten-4`"
                  :class="`text-${activity.colorName}`"
                  size="42"
                >
                  <v-icon>{{ activity.icon }}</v-icon>
                </v-avatar>
              </template>
              <template v-slot:append>
                <div class="d-flex flex-column align-end">
                  <v-chip
                    size="small"
                    :color="activity.colorName"
                    variant="tonal"
                    class="mb-1"
                  >
                    {{ activity.time }}
                  </v-chip>
                  <v-btn size="x-small" variant="text" color="primary" class="mt-1">View</v-btn>
                </div>
              </template>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-card-actions class="pa-4">
            <v-spacer></v-spacer>
            <v-btn variant="tonal" prepend-icon="mdi-refresh">Load More</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      
      <!-- Right Side Column -->
      <v-col cols="12" lg="4">
        <!-- Quick Stats -->
        <div class="d-flex align-center justify-space-between mb-4">
          <h2 class="text-h5 font-weight-bold">Analytics</h2>
          <v-btn size="small" variant="text" icon="mdi-dots-horizontal"></v-btn>
        </div>
        
        <v-card class="mb-6">
          <v-card-text class="pa-4">
            <div v-for="(stat, i) in quickStats" :key="i" class="d-flex align-center mb-4">
              <v-avatar
                size="54"
                :color="`${stat.colorName}-lighten-4`"
                :class="`text-${stat.colorName}`"
                class="mr-4"
              >
                <v-icon size="24">{{ stat.icon }}</v-icon>
              </v-avatar>
              <div class="flex-grow-1">
                <div class="d-flex justify-space-between align-center mb-1">
                  <span class="text-subtitle-2 font-weight-medium">{{ stat.label }}</span>
                  <span class="text-h6 font-weight-bold">{{ stat.value }}</span>
                </div>
                <v-progress-linear
                  :model-value="stat.progress"
                  :color="stat.colorName"
                  height="8"
                  rounded
                ></v-progress-linear>
              </div>
            </div>
          </v-card-text>
        </v-card>
        
        <!-- Upcoming Tasks -->
        <div class="d-flex align-center justify-space-between mb-4">
          <h2 class="text-h5 font-weight-bold">Upcoming Tasks</h2>
          <v-btn size="small" variant="text" icon="mdi-plus" color="primary"></v-btn>
        </div>
        
        <v-card>
          <v-list lines="two">
            <v-list-item
              v-for="(task, i) in upcomingTasks"
              :key="i"
              :title="task.title"
              :subtitle="`Due: ${task.dueDate}`"
              rounded="lg"
              class="mb-1"
            >
              <template v-slot:prepend>
                <v-checkbox-btn :model-value="task.completed" color="primary"></v-checkbox-btn>
              </template>
              <template v-slot:append>
                <v-chip size="small" :color="task.priority === 'High' ? 'error' : task.priority === 'Medium' ? 'warning' : 'success'" variant="tonal">
                  {{ task.priority }}
                </v-chip>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
// Performance metrics
const performanceMetrics = [
  {
    label: 'Portfolio Value',
    value: '$1.2M',
    change: 5.2
  },
  {
    label: 'Monthly Income',
    value: '$8,650',
    change: 3.7
  },
  {
    label: 'Active Properties',
    value: '12',
    change: -1.0
  }
]

// Main modules
const modules = [
  {
    title: 'Deal Analysis',
    description: 'Analyze properties and calculate ROI',
    icon: 'mdi-calculator-variant',
    to: '/deals',
    color: 'primary',
    colorName: 'primary'
  },
  {
    title: 'Marketing',
    description: 'Create campaigns and generate leads',
    icon: 'mdi-bullhorn',
    to: '/marketing',
    color: 'secondary',
    colorName: 'secondary'
  },
  {
    title: 'Education',
    description: 'Learn investment strategies',
    icon: 'mdi-book-open-page-variant',
    to: '/education',
    color: 'info',
    colorName: 'info'
  },
  {
    title: 'Sales',
    description: 'Track leads and manage deals',
    icon: 'mdi-handshake',
    to: '/sales',
    color: 'success',
    colorName: 'success'
  },
  {
    title: 'Finance',
    description: 'Manage funding and cashflow',
    icon: 'mdi-currency-usd',
    to: '/finance',
    color: 'warning',
    colorName: 'warning'
  },
  {
    title: 'Operations',
    description: 'Streamline your business',
    icon: 'mdi-cog',
    to: '/operations',
    color: 'error',
    colorName: 'error'
  },
]

// Recent Activities
const recentActivities = [
  {
    title: 'New Property Analysis',
    description: '123 Main St, Springfield - Analysis shows 12% Cash on Cash ROI potential',
    icon: 'mdi-home-analytics',
    time: '2h ago',
    colorName: 'primary'
  },
  {
    title: 'Marketing Campaign Created',
    description: 'Direct mail campaign created for Springfield Heights neighborhood',
    icon: 'mdi-email-outline',
    time: '1d ago',
    colorName: 'secondary'
  },
  {
    title: 'Completed Learning Module',
    description: 'You completed "Creative Financing Strategies" module with 92% score',
    icon: 'mdi-book-open',
    time: '3d ago',
    colorName: 'info'
  },
  {
    title: 'New Lead Generated',
    description: 'New seller lead from your Facebook campaign: Jane Smith (555-123-4567)',
    icon: 'mdi-account-plus',
    time: '5d ago',
    colorName: 'success'
  }
]

// Quick Stats
const quickStats = [
  {
    label: 'Deal Analysis',
    value: '12',
    icon: 'mdi-calculator-variant',
    colorName: 'primary',
    progress: 66
  },
  {
    label: 'Marketing Leads',
    value: '28',
    icon: 'mdi-account-multiple',
    colorName: 'secondary',
    progress: 78
  },
  {
    label: 'Education Progress',
    value: '68%',
    icon: 'mdi-school',
    colorName: 'info',
    progress: 68
  },
  {
    label: 'ROI Average',
    value: '15.2%',
    icon: 'mdi-chart-line',
    colorName: 'success',
    progress: 84
  }
]

// Upcoming Tasks
const upcomingTasks = [
  {
    title: 'Call potential seller at 123 Oak Lane',
    dueDate: 'Today',
    priority: 'High',
    completed: false
  },
  {
    title: 'Review Smith property inspection report',
    dueDate: 'Tomorrow',
    priority: 'Medium',
    completed: false
  },
  {
    title: 'Prepare marketing materials for Maple Heights',
    dueDate: 'Sep 23, 2023',
    priority: 'Medium',
    completed: false
  },
  {
    title: 'Update investment portfolio spreadsheet',
    dueDate: 'Sep 25, 2023',
    priority: 'Low',
    completed: true
  }
]
</script>

<style scoped>
.dashboard {
  position: relative;
}

.bg-primary-subtle {
  background: linear-gradient(to right, rgba(var(--v-theme-primary), 0.05), rgba(var(--v-theme-primary), 0.01)) !important;
  border: 1px solid rgba(var(--v-theme-primary), 0.05);
}

.v-card {
  transition: all 0.2s ease;
  border: thin solid rgba(var(--v-border-color), 0.12);
}

.on-hover {
  transform: translateY(-5px);
}

.module-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(var(--v-theme-surface), 0.9);
  z-index: 1;
}

/* Theme-aware color variants for lighter backgrounds */
.primary-lighten-4 {
  background-color: rgba(var(--v-theme-primary), 0.15) !important;
}
.secondary-lighten-4 {
  background-color: rgba(var(--v-theme-secondary), 0.15) !important;
}
.error-lighten-4 {
  background-color: rgba(var(--v-theme-error), 0.15) !important;
}
.warning-lighten-4 {
  background-color: rgba(var(--v-theme-warning), 0.15) !important;
}
.success-lighten-4 {
  background-color: rgba(var(--v-theme-success), 0.15) !important;
}
.info-lighten-4 {
  background-color: rgba(var(--v-theme-info), 0.15) !important;
}
</style> 