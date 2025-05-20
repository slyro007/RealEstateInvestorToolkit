<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-6">Marketing</h1>
        <p class="text-subtitle-1">Create, manage, and track your real estate marketing campaigns</p>
      </v-col>
    </v-row>

    <!-- Action Buttons -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-btn-group variant="outlined">
          <v-btn color="primary" prepend-icon="mdi-plus">New Campaign</v-btn>
          <v-btn color="primary" prepend-icon="mdi-content-duplicate">Duplicate</v-btn>
          <v-btn color="primary" prepend-icon="mdi-delete">Delete</v-btn>
        </v-btn-group>
      </v-col>
    </v-row>

    <!-- Campaigns Table -->
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title>
            <div class="d-flex align-center justify-space-between w-100">
              <span>Active Campaigns</span>
              <v-text-field
                density="compact"
                variant="outlined"
                label="Search"
                append-inner-icon="mdi-magnify"
                hide-details
                class="max-width-250"
              ></v-text-field>
            </div>
          </v-card-title>
          
          <v-data-table-server
            :headers="campaignHeaders"
            :items="campaigns"
            :items-per-page="5"
            class="elevation-0"
          >
            <template v-slot:item.status="{ item }">
              <v-chip
                :color="getStatusColor(item.status)"
                size="small"
              >
                {{ item.status }}
              </v-chip>
            </template>
            
            <template v-slot:item.responses="{ item }">
              <div class="d-flex align-center">
                <strong>{{ item.responses }}</strong>
                <v-tooltip location="top">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      v-bind="props"
                      :color="getResponseTrendColor(item.responsesTrend)"
                      class="ml-2"
                      size="small"
                    >
                      {{ getResponseTrendIcon(item.responsesTrend) }}
                    </v-icon>
                  </template>
                  <span>{{ getResponseTrendText(item.responsesTrend) }}</span>
                </v-tooltip>
              </div>
            </template>
            
            <template v-slot:item.actions="{ item }">
              <v-btn
                variant="text"
                icon="mdi-pencil"
                size="small"
                color="primary"
              ></v-btn>
              <v-btn
                variant="text"
                icon="mdi-chart-bar"
                size="small"
                color="info"
              ></v-btn>
              <v-btn
                variant="text"
                icon="mdi-dots-vertical"
                size="small"
              ></v-btn>
            </template>
          </v-data-table-server>
        </v-card>
      </v-col>
    </v-row>

    <!-- Content Generator -->
    <v-row class="mt-6">
      <v-col cols="12">
        <h2 class="text-h5 mb-4">AI Content Generator</h2>
      </v-col>

      <v-col cols="12" lg="8">
        <v-card elevation="2">
          <v-tabs v-model="activeContentTab">
            <v-tab value="direct-mail">Direct Mail</v-tab>
            <v-tab value="email">Email</v-tab>
            <v-tab value="social">Social Media</v-tab>
            <v-tab value="ads">Ads</v-tab>
          </v-tabs>
          
          <v-card-text>
            <v-window v-model="activeContentTab">
              <v-window-item value="direct-mail">
                <v-form>
                  <v-select
                    label="Letter Type"
                    :items="['Motivated Seller', 'Absentee Owner', 'First-time Buyer', 'Custom']"
                    variant="outlined"
                    class="mb-4"
                  ></v-select>
                  
                  <v-textarea
                    label="Key Points to Include"
                    rows="3"
                    placeholder="Include your experience, benefits to the seller, testimonials, etc."
                    variant="outlined"
                    class="mb-4"
                  ></v-textarea>
                  
                  <v-btn 
                    color="primary"
                    block
                    prepend-icon="mdi-text-box-outline"
                  >
                    Generate Letter
                  </v-btn>
                </v-form>
              </v-window-item>
              
              <v-window-item value="email">
                <v-form>
                  <v-select
                    label="Email Purpose"
                    :items="['Cold Outreach', 'Follow-up', 'Nurture Sequence', 'Custom']"
                    variant="outlined"
                    class="mb-4"
                  ></v-select>
                  
                  <v-textarea
                    label="Key Points to Include"
                    rows="3"
                    placeholder="Include your value proposition, call to action, etc."
                    variant="outlined"
                    class="mb-4"
                  ></v-textarea>
                  
                  <v-btn 
                    color="primary"
                    block
                    prepend-icon="mdi-email-outline"
                  >
                    Generate Email
                  </v-btn>
                </v-form>
              </v-window-item>
              
              <v-window-item value="social">
                <v-form>
                  <v-select
                    label="Platform"
                    :items="['Facebook', 'Instagram', 'LinkedIn', 'Twitter']"
                    variant="outlined"
                    class="mb-4"
                  ></v-select>
                  
                  <v-select
                    label="Content Type"
                    :items="['Educational Post', 'Property Showcase', 'Testimonial', 'Market Update']"
                    variant="outlined"
                    class="mb-4"
                  ></v-select>
                  
                  <v-textarea
                    label="Key Details"
                    rows="3"
                    placeholder="Property details, market insights, or specific topics to cover"
                    variant="outlined"
                    class="mb-4"
                  ></v-textarea>
                  
                  <v-btn 
                    color="primary"
                    block
                    prepend-icon="mdi-post-outline"
                  >
                    Generate Social Post
                  </v-btn>
                </v-form>
              </v-window-item>
              
              <v-window-item value="ads">
                <v-form>
                  <v-select
                    label="Ad Type"
                    :items="['Facebook Ad', 'Google Ad', 'Display Banner', 'Real Estate Portal Ad']"
                    variant="outlined"
                    class="mb-4"
                  ></v-select>
                  
                  <v-textarea
                    label="Key Selling Points"
                    rows="3"
                    placeholder="USPs, benefits, call-to-action, etc."
                    variant="outlined"
                    class="mb-4"
                  ></v-textarea>
                  
                  <v-btn 
                    color="primary"
                    block
                    prepend-icon="mdi-bullhorn"
                  >
                    Generate Ad Copy
                  </v-btn>
                </v-form>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4">
        <v-card elevation="2" class="mb-4">
          <v-card-title>Marketing Performance</v-card-title>
          <v-card-text>
            <v-row>
              <v-col v-for="(stat, i) in marketingStats" :key="i" cols="6">
                <div class="d-flex flex-column align-center text-center">
                  <v-avatar
                    size="56"
                    :color="stat.color"
                    class="mb-2"
                  >
                    <v-icon size="large">{{ stat.icon }}</v-icon>
                  </v-avatar>
                  <div class="text-h5">{{ stat.value }}</div>
                  <div class="text-caption">{{ stat.label }}</div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        
        <v-card elevation="2">
          <v-card-title>Saved Templates</v-card-title>
          <v-list density="compact">
            <v-list-item
              v-for="(template, i) in savedTemplates"
              :key="i"
              :title="template.name"
              :subtitle="template.type"
            >
              <template v-slot:prepend>
                <v-icon :color="template.color">{{ template.icon }}</v-icon>
              </template>
              <template v-slot:append>
                <v-btn variant="text" icon="mdi-content-copy" size="small" color="primary"></v-btn>
              </template>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-btn variant="text" block>Manage Templates</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeContentTab = ref('direct-mail')

const campaignHeaders = [
  { title: 'Title', key: 'title' },
  { title: 'Type', key: 'type' },
  { title: 'Target Area', key: 'area' },
  { title: 'Status', key: 'status' },
  { title: 'Responses', key: 'responses' },
  { title: 'Leads', key: 'leads' },
  { title: 'Created', key: 'created' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const campaigns = [
  {
    title: 'Spring Buyers Campaign',
    type: 'Social Media',
    area: 'Oakwood Heights',
    status: 'Active',
    responses: 24,
    responsesTrend: 'up',
    leads: 5,
    created: '04/15/2023'
  },
  {
    title: 'Distressed Property Outreach',
    type: 'Direct Mail',
    area: 'Riverdale',
    status: 'Active',
    responses: 18,
    responsesTrend: 'up',
    leads: 3,
    created: '04/10/2023'
  },
  {
    title: 'First-time Homebuyer Webinar',
    type: 'Email',
    area: 'Citywide',
    status: 'Scheduled',
    responses: 0,
    responsesTrend: 'neutral',
    leads: 0,
    created: '04/08/2023'
  },
  {
    title: 'Winter Property Management',
    type: 'Direct Mail',
    area: 'Mountain View',
    status: 'Completed',
    responses: 32,
    responsesTrend: 'neutral',
    leads: 8,
    created: '01/20/2023'
  },
  {
    title: 'Investment Property Showcase',
    type: 'Email',
    area: 'Downtown',
    status: 'Active',
    responses: 15,
    responsesTrend: 'down',
    leads: 2,
    created: '03/28/2023'
  }
]

const marketingStats = [
  {
    label: 'Open Rate',
    value: '24.8%',
    icon: 'mdi-email-open-outline',
    color: 'primary'
  },
  {
    label: 'Click Rate',
    value: '3.2%',
    icon: 'mdi-cursor-pointer',
    color: 'secondary'
  },
  {
    label: 'Response',
    value: '5.7%',
    icon: 'mdi-reply-outline',
    color: 'success'
  },
  {
    label: 'Conversion',
    value: '1.2%',
    icon: 'mdi-check-circle-outline',
    color: 'info'
  }
]

const savedTemplates = [
  {
    name: 'Motivated Seller Letter',
    type: 'Direct Mail',
    icon: 'mdi-email-outline',
    color: 'primary'
  },
  {
    name: 'Property Listing Announcement',
    type: 'Social Media',
    icon: 'mdi-facebook',
    color: 'info'
  },
  {
    name: 'Buyer Follow-up Sequence',
    type: 'Email',
    icon: 'mdi-email-multiple-outline',
    color: 'success'
  },
  {
    name: 'Investment Opportunity',
    type: 'Ad Copy',
    icon: 'mdi-bullhorn',
    color: 'warning'
  }
]

// Helper functions
function getStatusColor(status: string) {
  switch (status) {
    case 'Active': return 'success'
    case 'Scheduled': return 'info'
    case 'Completed': return 'gray'
    default: return 'gray'
  }
}

function getResponseTrendColor(trend: string) {
  switch (trend) {
    case 'up': return 'success'
    case 'down': return 'error'
    default: return 'gray'
  }
}

function getResponseTrendIcon(trend: string) {
  switch (trend) {
    case 'up': return 'mdi-arrow-up'
    case 'down': return 'mdi-arrow-down'
    default: return 'mdi-minus'
  }
}

function getResponseTrendText(trend: string) {
  switch (trend) {
    case 'up': return 'Increasing from last period'
    case 'down': return 'Decreasing from last period'
    default: return 'No change from last period'
  }
}
</script>

<style scoped>
.max-width-250 {
  max-width: 250px;
}
</style> 