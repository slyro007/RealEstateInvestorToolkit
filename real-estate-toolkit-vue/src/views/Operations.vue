<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-6">Operations</h1>
        <p class="text-subtitle-1">Property management, entity setup, and business operations</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" lg="8">
        <!-- Management Dashboard -->
        <v-card elevation="2" class="mb-4">
          <v-card-title>Property Management</v-card-title>
          <v-tabs v-model="activePropertyTab" class="px-4">
            <v-tab value="maintenance">Maintenance</v-tab>
            <v-tab value="tenants">Tenants</v-tab>
            <v-tab value="expenses">Expenses</v-tab>
            <v-tab value="documents">Documents</v-tab>
          </v-tabs>
          
          <v-window v-model="activePropertyTab">
            <!-- Maintenance Tab -->
            <v-window-item value="maintenance">
              <v-card-text>
                <div class="d-flex align-center justify-space-between mb-4">
                  <div class="text-h6">Maintenance Tasks</div>
                  <v-btn prepend-icon="mdi-plus" size="small" color="primary" variant="outlined">
                    Add Task
                  </v-btn>
                </div>
                
                <v-list>
                  <v-list-subheader>URGENT</v-list-subheader>
                  <v-list-item
                    v-for="(task, i) in maintenanceTasks.filter(t => t.status === 'urgent')"
                    :key="`urgent-${i}`"
                    :title="task.title"
                    :subtitle="`${task.property} | Due: ${task.dueDate}`"
                    lines="two"
                  >
                    <template v-slot:prepend>
                      <v-checkbox-btn :model-value="task.completed"></v-checkbox-btn>
                    </template>
                    <template v-slot:append>
                      <v-chip
                        size="small"
                        color="error"
                      >
                        Urgent
                      </v-chip>
                    </template>
                  </v-list-item>
                  
                  <v-divider class="my-2"></v-divider>
                  
                  <v-list-subheader>SCHEDULED</v-list-subheader>
                  <v-list-item
                    v-for="(task, i) in maintenanceTasks.filter(t => t.status === 'scheduled')"
                    :key="`scheduled-${i}`"
                    :title="task.title"
                    :subtitle="`${task.property} | Due: ${task.dueDate}`"
                    lines="two"
                  >
                    <template v-slot:prepend>
                      <v-checkbox-btn :model-value="task.completed"></v-checkbox-btn>
                    </template>
                    <template v-slot:append>
                      <v-chip
                        size="small"
                        color="primary"
                      >
                        Scheduled
                      </v-chip>
                    </template>
                  </v-list-item>
                  
                  <v-divider class="my-2"></v-divider>
                  
                  <v-list-subheader>COMPLETED</v-list-subheader>
                  <v-list-item
                    v-for="(task, i) in maintenanceTasks.filter(t => t.status === 'completed')"
                    :key="`completed-${i}`"
                    :title="task.title"
                    :subtitle="`${task.property} | Completed: ${task.completedDate}`"
                    lines="two"
                  >
                    <template v-slot:prepend>
                      <v-checkbox-btn :model-value="task.completed"></v-checkbox-btn>
                    </template>
                    <template v-slot:append>
                      <v-chip
                        size="small"
                        color="success"
                      >
                        Completed
                      </v-chip>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-window-item>
            
            <!-- Tenants Tab -->
            <v-window-item value="tenants">
              <v-card-text>
                <div class="d-flex align-center justify-space-between mb-4">
                  <div class="text-h6">Tenant Management</div>
                  <v-btn prepend-icon="mdi-account-plus" size="small" color="primary" variant="outlined">
                    Add Tenant
                  </v-btn>
                </div>
                
                <v-table>
                  <thead>
                    <tr>
                      <th class="text-left">Name</th>
                      <th class="text-left">Property</th>
                      <th class="text-left">Lease End</th>
                      <th class="text-left">Rent</th>
                      <th class="text-left">Status</th>
                      <th class="text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(tenant, i) in tenants" :key="i">
                      <td>{{ tenant.name }}</td>
                      <td>{{ tenant.property }}</td>
                      <td>{{ tenant.leaseEnd }}</td>
                      <td>${{ tenant.rent }}/mo</td>
                      <td>
                        <v-chip
                          size="small"
                          :color="getTenantStatusColor(tenant.status)"
                        >
                          {{ tenant.status }}
                        </v-chip>
                      </td>
                      <td>
                        <v-btn icon variant="text" size="small" color="primary">
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn icon variant="text" size="small" color="primary">
                          <v-icon>mdi-file-document-outline</v-icon>
                        </v-btn>
                        <v-btn icon variant="text" size="small" color="primary">
                          <v-icon>mdi-email-outline</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card-text>
            </v-window-item>
            
            <!-- Expenses Tab -->
            <v-window-item value="expenses">
              <v-card-text>
                <div class="d-flex align-center justify-space-between mb-4">
                  <div class="text-h6">Property Expenses</div>
                  <v-btn prepend-icon="mdi-plus" size="small" color="primary" variant="outlined">
                    Log Expense
                  </v-btn>
                </div>
                
                <v-chart-wrapper>
                  <div class="d-flex" style="height: 250px;">
                    <div class="flex-grow-1 position-relative">
                      <div class="position-absolute d-flex align-center justify-center" style="inset: 0;">
                        <div class="text-center">
                          <v-icon size="large" color="grey-darken-1">mdi-chart-bar</v-icon>
                          <div class="mt-2 text-body-2">Expense Breakdown Chart</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-chart-wrapper>
                
                <v-list density="compact" class="mt-4">
                  <v-list-subheader>RECENT EXPENSES</v-list-subheader>
                  
                  <v-list-item
                    v-for="(expense, i) in expenses"
                    :key="i"
                    :title="expense.description"
                    :subtitle="`${expense.property} | ${expense.date}`"
                  >
                    <template v-slot:prepend>
                      <v-avatar
                        size="32"
                        :color="getCategoryColor(expense.category)"
                        class="mr-2"
                      >
                        <v-icon color="white" size="small">{{ getCategoryIcon(expense.category) }}</v-icon>
                      </v-avatar>
                    </template>
                    <template v-slot:append>
                      <div class="text-right">
                        <div class="font-weight-bold">${{ expense.amount }}</div>
                        <div class="text-caption">{{ expense.category }}</div>
                      </div>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-window-item>
            
            <!-- Documents Tab -->
            <v-window-item value="documents">
              <v-card-text>
                <div class="d-flex align-center justify-space-between mb-4">
                  <div class="text-h6">Document Management</div>
                  <div>
                    <v-btn prepend-icon="mdi-upload" size="small" color="primary" variant="outlined" class="mr-2">
                      Upload
                    </v-btn>
                    <v-btn prepend-icon="mdi-folder-plus" size="small" color="primary" variant="outlined">
                      New Folder
                    </v-btn>
                  </div>
                </div>
                
                <v-breadcrumbs :items="['Documents', 'Properties']"></v-breadcrumbs>
                
                <v-table>
                  <thead>
                    <tr>
                      <th class="text-left">Name</th>
                      <th class="text-left">Type</th>
                      <th class="text-left">Size</th>
                      <th class="text-left">Modified</th>
                      <th class="text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(document, i) in documents" :key="i">
                      <td>
                        <div class="d-flex align-center">
                          <v-icon class="mr-2">{{ getDocumentIcon(document.type) }}</v-icon>
                          {{ document.name }}
                        </div>
                      </td>
                      <td>{{ document.type }}</td>
                      <td>{{ document.size }}</td>
                      <td>{{ document.modified }}</td>
                      <td>
                        <v-btn icon variant="text" size="small" color="primary">
                          <v-icon>mdi-eye</v-icon>
                        </v-btn>
                        <v-btn icon variant="text" size="small" color="primary">
                          <v-icon>mdi-download</v-icon>
                        </v-btn>
                        <v-btn icon variant="text" size="small" color="primary">
                          <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card-text>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
      
      <v-col cols="12" lg="4">
        <!-- Entity Management -->
        <v-card elevation="2" class="mb-4">
          <v-card-title>Business Entities</v-card-title>
          <v-list density="compact">
            <v-list-item
              v-for="(entity, i) in entities"
              :key="i"
              :title="entity.name"
              :subtitle="entity.type"
              lines="two"
            >
              <template v-slot:prepend>
                <v-icon color="primary">mdi-office-building</v-icon>
              </template>
              <template v-slot:append>
                <v-btn icon variant="text" size="small">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-btn prepend-icon="mdi-plus" block variant="text">Add New Entity</v-btn>
          </v-card-actions>
        </v-card>
        
        <!-- Contractor Directory -->
        <v-card elevation="2" class="mb-4">
          <v-card-title>Contractor Directory</v-card-title>
          <v-list density="compact">
            <v-list-item
              v-for="(contractor, i) in contractors"
              :key="i"
              :title="contractor.name"
              :subtitle="contractor.service"
            >
              <template v-slot:prepend>
                <v-avatar color="grey-lighten-1" size="32">
                  <v-icon>{{ getContractorIcon(contractor.service) }}</v-icon>
                </v-avatar>
              </template>
              <template v-slot:append>
                <v-btn icon="mdi-phone" variant="text" size="small" color="primary"></v-btn>
              </template>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-btn prepend-icon="mdi-plus" block variant="text">Add Contractor</v-btn>
          </v-card-actions>
        </v-card>
        
        <!-- Calendar -->
        <v-card elevation="2">
          <v-card-title>Upcoming Tasks</v-card-title>
          <v-card-text class="pb-0">
            <div style="height: 250px; background-color: #f5f5f5;" class="rounded position-relative mb-4">
              <div class="position-absolute d-flex align-center justify-center" style="inset: 0;">
                <div class="text-center">
                  <v-icon size="large" color="grey-darken-1">mdi-calendar-month</v-icon>
                  <div class="mt-2 text-body-2">Calendar view will be displayed here</div>
                </div>
              </div>
            </div>
          </v-card-text>
          
          <v-list density="compact">
            <v-list-subheader>UPCOMING</v-list-subheader>
            <v-list-item
              v-for="(event, i) in calendarEvents"
              :key="i"
              :title="event.title"
              :subtitle="event.date"
              lines="two"
            >
              <template v-slot:prepend>
                <v-icon :color="event.color">{{ event.icon }}</v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activePropertyTab = ref('maintenance')

// Maintenance Tasks
const maintenanceTasks = [
  {
    title: 'Fix leaky roof at Oakwood property',
    property: '123 Main St',
    status: 'urgent',
    dueDate: 'Aug 10, 2023',
    completed: false,
    completedDate: null
  },
  {
    title: 'Replace HVAC filter',
    property: '456 Oak Ave',
    status: 'scheduled',
    dueDate: 'Aug 15, 2023',
    completed: false,
    completedDate: null
  },
  {
    title: 'Paint exterior trim',
    property: '789 Pine St',
    status: 'scheduled',
    dueDate: 'Aug 25, 2023',
    completed: false,
    completedDate: null
  },
  {
    title: 'Replace broken dishwasher',
    property: '321 Maple Dr',
    status: 'completed',
    dueDate: 'Aug 3, 2023',
    completed: true,
    completedDate: 'Aug 3, 2023'
  },
  {
    title: 'Repair garage door opener',
    property: '654 Elm St',
    status: 'completed',
    dueDate: 'Jul 28, 2023',
    completed: true,
    completedDate: 'Jul 30, 2023'
  }
]

// Tenants
const tenants = [
  {
    name: 'James Wilson',
    property: '123 Main St, Apt 2B',
    leaseEnd: 'Dec 31, 2023',
    rent: 1250,
    status: 'Current'
  },
  {
    name: 'Emily Davis',
    property: '456 Oak Ave, Unit 5',
    leaseEnd: 'Mar 15, 2024',
    rent: 1450,
    status: 'Current'
  },
  {
    name: 'Michael Johnson',
    property: '789 Pine St, Apt 3C',
    leaseEnd: 'Aug 31, 2023',
    rent: 1350,
    status: 'Expiring Soon'
  },
  {
    name: 'Sarah Miller',
    property: '321 Maple Dr, Unit 1',
    leaseEnd: 'Oct 15, 2023',
    rent: 1100,
    status: 'Late Payment'
  },
  {
    name: 'Robert Smith',
    property: '654 Elm St, Apt 4D',
    leaseEnd: 'Feb 28, 2024',
    rent: 1550,
    status: 'Current'
  }
]

// Expenses
const expenses = [
  {
    description: 'New Refrigerator',
    property: '123 Main St',
    amount: 1200,
    category: 'Appliances',
    date: 'Aug 5, 2023'
  },
  {
    description: 'Lawn Maintenance',
    property: '456 Oak Ave',
    amount: 150,
    category: 'Landscaping',
    date: 'Aug 1, 2023'
  },
  {
    description: 'Plumbing Repair',
    property: '789 Pine St',
    amount: 350,
    category: 'Repairs',
    date: 'Jul 28, 2023'
  },
  {
    description: 'Property Insurance',
    property: '321 Maple Dr',
    amount: 1450,
    category: 'Insurance',
    date: 'Jul 25, 2023'
  },
  {
    description: 'Property Taxes',
    property: '654 Elm St',
    amount: 2200,
    category: 'Taxes',
    date: 'Jul 15, 2023'
  }
]

// Documents
const documents = [
  {
    name: 'Property Lease - 123 Main St.pdf',
    type: 'PDF',
    size: '1.2 MB',
    modified: 'Aug 1, 2023'
  },
  {
    name: 'Insurance Policy.docx',
    type: 'Document',
    size: '850 KB',
    modified: 'Jul 15, 2023'
  },
  {
    name: 'Property Tax Records',
    type: 'Folder',
    size: '--',
    modified: 'Jul 10, 2023'
  },
  {
    name: 'Contractor Invoices',
    type: 'Folder',
    size: '--',
    modified: 'Jul 5, 2023'
  },
  {
    name: 'Rental Application Template.docx',
    type: 'Document',
    size: '450 KB',
    modified: 'Jun 28, 2023'
  },
  {
    name: 'Property Photos',
    type: 'Folder',
    size: '--',
    modified: 'Jun 20, 2023'
  }
]

// Business Entities
const entities = [
  {
    name: 'Main Street Properties LLC',
    type: 'Limited Liability Company',
    properties: ['123 Main St', '456 Oak Ave']
  },
  {
    name: 'Eastside Investments Inc',
    type: 'S-Corporation',
    properties: ['789 Pine St']
  },
  {
    name: 'Urban Housing Partners LP',
    type: 'Limited Partnership',
    properties: ['321 Maple Dr', '654 Elm St']
  }
]

// Contractors
const contractors = [
  {
    name: 'ABC Plumbing',
    service: 'Plumbing',
    phone: '555-123-4567'
  },
  {
    name: 'Elite Electrical Services',
    service: 'Electrical',
    phone: '555-234-5678'
  },
  {
    name: 'Green Thumb Landscaping',
    service: 'Landscaping',
    phone: '555-345-6789'
  },
  {
    name: 'Reliable Roofing Inc',
    service: 'Roofing',
    phone: '555-456-7890'
  },
  {
    name: 'Comfort HVAC Solutions',
    service: 'HVAC',
    phone: '555-567-8901'
  }
]

// Calendar Events
const calendarEvents = [
  {
    title: 'Property inspection at 123 Main St',
    date: 'Aug 10, 2023 - 10:00 AM',
    icon: 'mdi-home-search',
    color: 'primary'
  },
  {
    title: 'Meeting with ABC Plumbing',
    date: 'Aug 12, 2023 - 2:30 PM',
    icon: 'mdi-account-hard-hat',
    color: 'warning'
  },
  {
    title: 'Rent collection deadline',
    date: 'Aug 15, 2023',
    icon: 'mdi-cash',
    color: 'success'
  },
  {
    title: 'Lease signing with new tenant',
    date: 'Aug 18, 2023 - 11:00 AM',
    icon: 'mdi-file-sign',
    color: 'info'
  }
]

// Helper functions
const getTenantStatusColor = (status: string) => {
  switch (status) {
    case 'Current': return 'success'
    case 'Expiring Soon': return 'warning'
    case 'Late Payment': return 'error'
    default: return 'grey'
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Repairs': return 'error'
    case 'Appliances': return 'primary'
    case 'Landscaping': return 'success'
    case 'Insurance': return 'info'
    case 'Taxes': return 'warning'
    default: return 'grey'
  }
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Repairs': return 'mdi-tools'
    case 'Appliances': return 'mdi-fridge'
    case 'Landscaping': return 'mdi-grass'
    case 'Insurance': return 'mdi-shield'
    case 'Taxes': return 'mdi-cash'
    default: return 'mdi-cash'
  }
}

const getDocumentIcon = (type: string) => {
  switch (type) {
    case 'PDF': return 'mdi-file-pdf-box'
    case 'Document': return 'mdi-file-document-outline'
    case 'Folder': return 'mdi-folder'
    case 'Image': return 'mdi-file-image'
    case 'Spreadsheet': return 'mdi-file-excel'
    default: return 'mdi-file'
  }
}

const getContractorIcon = (service: string) => {
  switch (service) {
    case 'Plumbing': return 'mdi-water-pump'
    case 'Electrical': return 'mdi-lightning-bolt'
    case 'Landscaping': return 'mdi-grass'
    case 'Roofing': return 'mdi-home-roof'
    case 'HVAC': return 'mdi-air-conditioner'
    default: return 'mdi-hammer'
  }
}
</script>

<style scoped>
.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
}
</style> 