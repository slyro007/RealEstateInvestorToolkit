<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-6">Sales & Negotiation</h1>
        <p class="text-subtitle-1">Manage leads, track conversations, and close more deals</p>
      </v-col>
    </v-row>

    <!-- Lead Management -->
    <v-row>
      <v-col cols="12" lg="8">
        <v-card elevation="2">
          <v-card-title class="d-flex align-center">
            <span>Lead Pipeline</span>
            <v-spacer></v-spacer>
            <v-btn variant="outlined" color="primary" prepend-icon="mdi-plus" size="small">
              Add Lead
            </v-btn>
          </v-card-title>
          
          <v-tabs v-model="activePipelineTab" class="px-4">
            <v-tab value="new">New Leads ({{ pipelineStats.new }})</v-tab>
            <v-tab value="contacted">Contacted ({{ pipelineStats.contacted }})</v-tab>
            <v-tab value="qualified">Qualified ({{ pipelineStats.qualified }})</v-tab>
            <v-tab value="negotiation">Negotiation ({{ pipelineStats.negotiation }})</v-tab>
            <v-tab value="closed">Closed ({{ pipelineStats.closed }})</v-tab>
          </v-tabs>
          
          <v-window v-model="activePipelineTab">
            <v-window-item v-for="stage in pipelineStages" :key="stage" :value="stage">
              <v-card-text>
                <v-row dense>
                  <v-col v-for="(lead, i) in getLeadsByStage(stage)" :key="i" cols="12">
                    <v-card variant="outlined" class="mb-2">
                      <v-card-item>
                        <template v-slot:prepend>
                          <v-avatar color="primary" variant="tonal">
                            {{ lead.name.charAt(0) }}{{ lead.name.split(' ')[1]?.charAt(0) || '' }}
                          </v-avatar>
                        </template>
                        
                        <v-card-title>
                          {{ lead.name }}
                        </v-card-title>
                        
                        <v-card-subtitle>
                          {{ lead.property }}
                        </v-card-subtitle>
                        
                        <template v-slot:append>
                          <v-chip
                            :color="getLeadTypeColor(lead.type)"
                            size="small"
                            class="mr-2"
                          >
                            {{ lead.type }}
                          </v-chip>
                        </template>
                      </v-card-item>
                      
                      <v-divider></v-divider>
                      
                      <v-card-text>
                        <v-row>
                          <v-col cols="7">
                            <div class="text-caption">Last Contact</div>
                            <div class="text-body-2">{{ lead.lastContact }}</div>
                            
                            <div class="mt-2 text-caption">Notes</div>
                            <div class="text-body-2">{{ lead.notes }}</div>
                          </v-col>
                          
                          <v-col cols="5" class="d-flex flex-column">
                            <div class="text-caption">Next Steps</div>
                            <div class="text-body-2">{{ lead.nextSteps }}</div>
                            
                            <div class="mt-2 text-caption">Target Close Date</div>
                            <div class="text-body-2">{{ lead.targetDate || 'Not set' }}</div>
                          </v-col>
                        </v-row>
                      </v-card-text>
                      
                      <v-card-actions>
                        <v-btn variant="text" prepend-icon="mdi-phone" size="small">Call</v-btn>
                        <v-btn variant="text" prepend-icon="mdi-email" size="small">Email</v-btn>
                        <v-btn variant="text" prepend-icon="mdi-calendar" size="small">Schedule</v-btn>
                        
                        <v-spacer></v-spacer>
                        
                        <v-btn 
                          v-if="stage !== 'closed'"
                          variant="tonal" 
                          color="primary" 
                          size="small"
                          prepend-icon="mdi-arrow-right"
                        >
                          Move to {{ getNextStage(stage) }}
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
      
      <v-col cols="12" lg="4">
        <!-- Script Generator -->
        <v-card elevation="2" class="mb-4">
          <v-card-title>Negotiation Script Generator</v-card-title>
          <v-card-text>
            <v-form>
              <v-select
                label="Scenario"
                :items="[
                  'Motivated Seller Call', 
                  'Buyer Objection Handling', 
                  'Price Negotiation', 
                  'Closing the Deal'
                ]"
                variant="outlined"
                class="mb-3"
              ></v-select>
              
              <v-textarea
                label="Key Details"
                rows="3"
                placeholder="Include property details, asking price, your offer, any seller concerns, etc."
                variant="outlined"
                class="mb-3"
              ></v-textarea>
              
              <v-btn 
                color="primary"
                block
                prepend-icon="mdi-text-box-outline"
              >
                Generate Script
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
        
        <!-- Activity Stats -->
        <v-card elevation="2">
          <v-card-title>Activity Summary</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6" v-for="(stat, i) in activityStats" :key="i">
                <v-card variant="outlined">
                  <v-card-text class="text-center">
                    <v-icon :color="stat.color" size="large" class="mb-2">{{ stat.icon }}</v-icon>
                    <div class="text-h5">{{ stat.value }}</div>
                    <div class="text-caption">{{ stat.label }}</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        
        <!-- Recent Messages -->
        <v-card elevation="2" class="mt-4">
          <v-card-title>Recent Messages</v-card-title>
          <v-list density="compact" lines="two">
            <v-list-item
              v-for="(message, i) in recentMessages"
              :key="i"
              :title="message.sender"
              :subtitle="message.preview"
            >
              <template v-slot:prepend>
                <v-avatar color="grey-lighten-1" size="32">
                  <span class="text-caption">{{ message.sender.charAt(0) }}</span>
                </v-avatar>
              </template>
              <template v-slot:append>
                <div class="text-caption">{{ message.time }}</div>
              </template>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-btn variant="text" block>View All Messages</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activePipelineTab = ref('new')

const pipelineStages = ['new', 'contacted', 'qualified', 'negotiation', 'closed']

const pipelineStats = {
  new: 5,
  contacted: 8,
  qualified: 4,
  negotiation: 3,
  closed: 12
}

const leads = [
  {
    name: 'John Smith',
    property: '123 Main St, Springfield',
    type: 'Seller',
    stage: 'new',
    lastContact: 'Never',
    notes: 'Found through Facebook ad, interested in selling inherited property',
    nextSteps: 'Initial phone call',
    targetDate: null
  },
  {
    name: 'Emily Johnson',
    property: '456 Oak Ave, Riverdale',
    type: 'Buyer',
    stage: 'new',
    lastContact: 'Never',
    notes: 'Looking for investment property, has financing pre-approved',
    nextSteps: 'Schedule showing',
    targetDate: null
  },
  {
    name: 'Michael Wilson',
    property: '789 Pine St, Downtown',
    type: 'Seller',
    stage: 'new',
    lastContact: 'Never',
    notes: 'Motivated seller, property needs repairs, interested in as-is sale',
    nextSteps: 'Property evaluation',
    targetDate: null
  },
  {
    name: 'Sarah Davis',
    property: '321 Maple Dr, Westside',
    type: 'Buyer',
    stage: 'contacted',
    lastContact: '2 days ago',
    notes: 'First-time homebuyer, looking in $250-300k range, prequalified',
    nextSteps: 'Follow up call',
    targetDate: '08/15/2023'
  },
  {
    name: 'Robert Brown',
    property: '654 Elm St, Northside',
    type: 'Seller',
    stage: 'contacted',
    lastContact: '1 day ago',
    notes: 'Relocating for job, needs to sell within 60 days, property in good condition',
    nextSteps: 'Present market analysis',
    targetDate: '07/30/2023'
  },
  {
    name: 'Jennifer Miller',
    property: '987 Cedar Ln, Eastside',
    type: 'Buyer',
    stage: 'qualified',
    lastContact: '3 days ago',
    notes: 'Investor looking for rental property, has capital ready, wants multi-family',
    nextSteps: 'Schedule property tour',
    targetDate: '07/25/2023'
  },
  {
    name: 'David Garcia',
    property: '135 Walnut Ave, Hillside',
    type: 'Seller',
    stage: 'negotiation',
    lastContact: 'Yesterday',
    notes: 'Received offer 10% below asking, countered at 5% below',
    nextSteps: 'Follow up on counter offer',
    targetDate: '07/15/2023'
  },
  {
    name: 'Lisa Rodriguez',
    property: '246 Poplar St, Lakeside',
    type: 'Buyer',
    stage: 'negotiation',
    lastContact: 'Today',
    notes: 'Made offer on property, seller countered, discussing terms',
    nextSteps: 'Prepare revised offer',
    targetDate: '07/10/2023'
  },
  {
    name: 'Thomas Wilson',
    property: '753 Birch Rd, Parkview',
    type: 'Seller',
    stage: 'closed',
    lastContact: '1 week ago',
    notes: 'Deal closed successfully, $320,000 sale price',
    nextSteps: 'Send thank you gift',
    targetDate: 'Completed 06/28/2023'
  }
]

const getLeadsByStage = (stage: string) => {
  return leads.filter(lead => lead.stage === stage)
}

const getLeadTypeColor = (type: string) => {
  return type === 'Seller' ? 'primary' : 'secondary'
}

const getNextStage = (stage: string) => {
  const currentIndex = pipelineStages.indexOf(stage)
  return pipelineStages[currentIndex + 1]?.charAt(0).toUpperCase() + pipelineStages[currentIndex + 1]?.slice(1) || 'Closed'
}

const activityStats = [
  {
    label: 'Calls Made',
    value: '32',
    icon: 'mdi-phone-outgoing',
    color: 'primary'
  },
  {
    label: 'Emails Sent',
    value: '58',
    icon: 'mdi-email-outline',
    color: 'info'
  },
  {
    label: 'Meetings',
    value: '14',
    icon: 'mdi-calendar-check',
    color: 'secondary'
  },
  {
    label: 'Deals Closed',
    value: '3',
    icon: 'mdi-handshake',
    color: 'success'
  }
]

const recentMessages = [
  {
    sender: 'David Garcia',
    preview: 'Thanks for sending over the revised offer. I\'ve reviewed it with my wife and we...',
    time: '1h ago'
  },
  {
    sender: 'Jennifer Miller',
    preview: 'I'll be available tomorrow afternoon for the property tour. What time works best?',
    time: '3h ago'
  },
  {
    sender: 'Sarah Davis',
    preview: 'I got preapproved for a higher amount! Can we look at properties in the $350k range?',
    time: '5h ago'
  },
  {
    sender: 'Robert Brown',
    preview: 'The market analysis looks great. When can we list the property?',
    time: '1d ago'
  }
]
</script>

<style scoped>
.v-card-item {
  padding-bottom: 8px;
}
</style> 