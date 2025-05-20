<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-6">Analysis & Due Diligence</h1>
        <p class="text-subtitle-1">Analyze, track, and manage your real estate deals</p>
      </v-col>
    </v-row>

    <!-- Action Buttons -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-btn-group variant="outlined">
          <v-btn color="primary" prepend-icon="mdi-plus">New Analysis</v-btn>
          <v-btn color="primary" prepend-icon="mdi-magnify">Find Comps</v-btn>
          <v-btn color="primary" prepend-icon="mdi-file-export">Export</v-btn>
        </v-btn-group>
      </v-col>
    </v-row>

    <!-- Deal Analysis Tool -->
    <v-row>
      <v-col cols="12" lg="8">
        <v-card elevation="2">
          <v-card-title>Property Analysis Tool</v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Property Address"
                    variant="outlined"
                    placeholder="123 Main St, Cityville, ST 12345"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    label="Property Type"
                    :items="['Single Family', 'Multi-Family (2-4 units)', 'Multi-Family (5+ units)', 'Commercial', 'Land']"
                    variant="outlined"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Purchase Price"
                    variant="outlined"
                    placeholder="$250,000"
                    prepend-inner-icon="mdi-currency-usd"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Estimated After Repair Value (ARV)"
                    variant="outlined"
                    placeholder="$350,000"
                    prepend-inner-icon="mdi-currency-usd"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Estimated Repair Costs"
                    variant="outlined"
                    placeholder="$50,000"
                    prepend-inner-icon="mdi-currency-usd"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Holding Costs (monthly)"
                    variant="outlined"
                    placeholder="$1,500"
                    prepend-inner-icon="mdi-currency-usd"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Estimated Rehab Time (months)"
                    variant="outlined"
                    placeholder="3"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Closing Costs (%)"
                    variant="outlined"
                    placeholder="3"
                    type="number"
                    suffix="%"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-divider class="my-4"></v-divider>
              
              <v-row justify="end">
                <v-col cols="12" md="4">
                  <v-btn 
                    color="primary"
                    block
                    prepend-icon="mdi-calculator"
                    size="large"
                  >
                    Analyze Deal
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>

        <!-- Results Preview Card - Only shown after analysis -->
        <v-card elevation="2" class="mt-4">
          <v-card-title class="d-flex align-center">
            <span>Analysis Results</span>
            <v-spacer></v-spacer>
            <v-chip
              color="success"
              size="small"
            >
              Good Deal
            </v-chip>
          </v-card-title>
          
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <div class="text-center pa-2">
                  <div class="text-h4 primary--text">$45,000</div>
                  <div class="text-caption">Potential Profit</div>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="text-center pa-2">
                  <div class="text-h4 info--text">18%</div>
                  <div class="text-caption">ROI</div>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="text-center pa-2">
                  <div class="text-h4 secondary--text">$350,000</div>
                  <div class="text-caption">ARV</div>
                </div>
              </v-col>
            </v-row>
            
            <v-divider class="my-3"></v-divider>
            
            <v-row>
              <v-col cols="12">
                <h3 class="text-subtitle-1 font-weight-bold mb-2">Cost Breakdown</h3>
                <v-list density="compact">
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon color="primary">mdi-home</v-icon>
                    </template>
                    <v-list-item-title>Purchase Price</v-list-item-title>
                    <template v-slot:append>
                      <strong>$250,000</strong>
                    </template>
                  </v-list-item>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon color="error">mdi-hammer</v-icon>
                    </template>
                    <v-list-item-title>Repair Costs</v-list-item-title>
                    <template v-slot:append>
                      <strong>$50,000</strong>
                    </template>
                  </v-list-item>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon color="warning">mdi-clock-outline</v-icon>
                    </template>
                    <v-list-item-title>Holding Costs (3 months)</v-list-item-title>
                    <template v-slot:append>
                      <strong>$4,500</strong>
                    </template>
                  </v-list-item>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon color="info">mdi-cash-register</v-icon>
                    </template>
                    <v-list-item-title>Closing Costs</v-list-item-title>
                    <template v-slot:append>
                      <strong>$7,500</strong>
                    </template>
                  </v-list-item>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon color="success">mdi-cash-multiple</v-icon>
                    </template>
                    <v-list-item-title class="font-weight-bold">Total Investment</v-list-item-title>
                    <template v-slot:append>
                      <strong>$312,000</strong>
                    </template>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
            
            <v-divider class="my-3"></v-divider>
            
            <v-row justify="end">
              <v-col cols="auto">
                <v-btn variant="text" color="primary" prepend-icon="mdi-file-pdf-box">
                  Download PDF
                </v-btn>
                <v-btn variant="text" color="primary" prepend-icon="mdi-content-save">
                  Save Analysis
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" lg="4">
        <!-- Saved Deals -->
        <v-card elevation="2" class="mb-4">
          <v-card-title>Saved Deals</v-card-title>
          <v-list select-strategy="classic" density="compact">
            <v-list-item
              v-for="(deal, i) in savedDeals"
              :key="i"
              :value="deal"
              :title="deal.address"
              :subtitle="`${deal.type} - ${deal.status}`"
              lines="two"
            >
              <template v-slot:prepend>
                <v-avatar
                  :color="getStatusColor(deal.status)"
                  variant="flat"
                  class="mr-2"
                >
                  <v-icon color="white">{{ getStatusIcon(deal.status) }}</v-icon>
                </v-avatar>
              </template>
              <template v-slot:append>
                <div class="text-caption text-right">
                  <div>{{ deal.price }}</div>
                  <div class="mt-1">
                    <v-chip
                      size="x-small"
                      :color="getStatusColor(deal.status)"
                      class="font-weight-medium"
                    >
                      {{ deal.roi }}% ROI
                    </v-chip>
                  </div>
                </div>
              </template>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-btn variant="text" block>View All Deals</v-btn>
          </v-card-actions>
        </v-card>
        
        <!-- Comps Map -->
        <v-card elevation="2">
          <v-card-title>Comparable Properties</v-card-title>
          <v-card-text class="pb-0">
            <div class="mb-2">
              <strong>123 Main St, Springfield, IL 62704</strong>
            </div>
            <div class="text-caption mb-4">Displaying 5 recent sales within 1 mile</div>
            
            <div style="height: 300px; background-color: #eee;" class="rounded position-relative mb-2">
              <div class="position-absolute d-flex align-center justify-center" style="inset: 0;">
                <div class="text-center">
                  <v-icon size="large" color="grey-darken-1">mdi-map</v-icon>
                  <div class="mt-2 text-body-2">Map view will be displayed here</div>
                </div>
              </div>
            </div>
          </v-card-text>
          
          <v-list density="compact">
            <v-list-item
              v-for="(comp, i) in comps"
              :key="i"
              :title="comp.address"
              :subtitle="`${comp.sqft} sqft, ${comp.beds}bd/${comp.baths}ba`"
            >
              <template v-slot:prepend>
                <v-avatar
                  size="36"
                  variant="outlined"
                  color="primary"
                  class="me-3"
                >
                  <span class="text-body-2">{{ i + 1 }}</span>
                </v-avatar>
              </template>
              <template v-slot:append>
                <div class="text-right">
                  <div class="font-weight-medium">{{ comp.price }}</div>
                  <div class="text-caption">{{ comp.date }}</div>
                </div>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const savedDeals = [
  {
    address: '123 Main St, Springfield',
    type: 'Single Family',
    status: 'Active',
    price: '$250,000',
    roi: '18'
  },
  {
    address: '45 Oakwood Ave, Riverside',
    type: 'Multi-Family',
    status: 'Completed',
    price: '$385,000',
    roi: '22'
  },
  {
    address: '789 Park Ln, Meadowview',
    type: 'Single Family',
    status: 'Hold',
    price: '$175,000',
    roi: '15'
  },
  {
    address: '221 Pine St, Downtown',
    type: 'Commercial',
    status: 'Analyzing',
    price: '$450,000',
    roi: '12'
  },
  {
    address: '10 Highland Dr, Northside',
    type: 'Land',
    status: 'Pending',
    price: '$120,000',
    roi: '25'
  }
]

const comps = [
  {
    address: '125 Main St',
    price: '$255,000',
    sqft: '1,850',
    beds: '3',
    baths: '2',
    date: 'Sold 2mo ago'
  },
  {
    address: '130 Main St',
    price: '$262,000',
    sqft: '1,920',
    beds: '3',
    baths: '2.5',
    date: 'Sold 1mo ago'
  },
  {
    address: '118 Main St',
    price: '$242,000',
    sqft: '1,780',
    beds: '3',
    baths: '2',
    date: 'Sold 3mo ago'
  },
  {
    address: '110 Oak Ave',
    price: '$258,000',
    sqft: '1,875',
    beds: '4',
    baths: '2',
    date: 'Sold 6wk ago'
  },
  {
    address: '145 Pine St',
    price: '$249,000',
    sqft: '1,800',
    beds: '3',
    baths: '2',
    date: 'Sold 2wk ago'
  }
]

// Helper functions
function getStatusColor(status: string) {
  switch (status) {
    case 'Active': return 'success'
    case 'Analyzing': return 'info'
    case 'Hold': return 'warning'
    case 'Pending': return 'secondary'
    case 'Completed': return 'grey-darken-1'
    default: return 'grey'
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'Active': return 'mdi-check-circle'
    case 'Analyzing': return 'mdi-magnify'
    case 'Hold': return 'mdi-timer-sand'
    case 'Pending': return 'mdi-clock-outline'
    case 'Completed': return 'mdi-flag-checkered'
    default: return 'mdi-home'
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