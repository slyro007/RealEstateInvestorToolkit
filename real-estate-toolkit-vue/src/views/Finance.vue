<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-6">Finance</h1>
        <p class="text-subtitle-1">Financial tools, loan options, and investment tracking</p>
      </v-col>
    </v-row>

    <v-row>
      <!-- Financial Dashboard -->
      <v-col cols="12" lg="8">
        <v-card elevation="2" class="mb-4">
          <v-card-title>Portfolio Overview</v-card-title>
          <v-card-text>
            <v-row class="mb-4">
              <v-col cols="12" md="4">
                <div class="text-center pa-2">
                  <div class="text-h4 primary--text">$1.2M</div>
                  <div class="text-subtitle-2">Total Portfolio Value</div>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="text-center pa-2">
                  <div class="text-h4 success--text">$8,500</div>
                  <div class="text-subtitle-2">Monthly Cash Flow</div>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="text-center pa-2">
                  <div class="text-h4 warning--text">$720K</div>
                  <div class="text-subtitle-2">Total Financing</div>
                </div>
              </v-col>
            </v-row>
            
            <v-divider class="mb-4"></v-divider>
            
            <!-- Charts here -->
            <div class="d-flex" style="height: 300px;">
              <div class="flex-grow-1 position-relative">
                <div class="position-absolute d-flex align-center justify-center" style="inset: 0;">
                  <div class="text-center">
                    <v-icon size="large" color="grey-darken-1">mdi-chart-pie</v-icon>
                    <div class="mt-2 text-body-2">Asset Allocation Chart</div>
                  </div>
                </div>
              </div>
              <div class="flex-grow-1 position-relative">
                <div class="position-absolute d-flex align-center justify-center" style="inset: 0;">
                  <div class="text-center">
                    <v-icon size="large" color="grey-darken-1">mdi-chart-line</v-icon>
                    <div class="mt-2 text-body-2">Cash Flow Trend Chart</div>
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <!-- Property Financial Overview -->
        <v-card elevation="2">
          <v-card-title class="d-flex align-center">
            <span>Property Financials</span>
            <v-spacer></v-spacer>
            <v-text-field
              density="compact"
              variant="outlined"
              hide-details
              label="Search"
              prepend-inner-icon="mdi-magnify"
              class="max-width-200"
            ></v-text-field>
          </v-card-title>
          
          <v-data-table
            :headers="propertyHeaders"
            :items="properties"
            :items-per-page="5"
            class="elevation-0"
          >
            <template v-slot:item.cashFlow="{ item }">
              <span :class="item.cashFlow >= 0 ? 'text-success' : 'text-error'">
                {{ item.cashFlow >= 0 ? '+' : '' }}${{ item.cashFlow }}
              </span>
            </template>
            
            <template v-slot:item.equity="{ item }">
              <div class="d-flex align-center">
                <span>${{ item.equity }}</span>
                <v-progress-linear
                  :model-value="getEquityPercentage(item)"
                  color="primary"
                  height="5"
                  class="ml-2"
                  style="width: 60px;"
                ></v-progress-linear>
              </div>
            </template>
            
            <template v-slot:item.roi="{ item }">
              <v-chip
                :color="getRoiColor(item.roi)"
                size="small"
              >
                {{ item.roi }}%
              </v-chip>
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
                icon="mdi-chart-box"
                size="small"
                color="secondary"
              ></v-btn>
              <v-btn
                variant="text"
                icon="mdi-dots-vertical"
                size="small"
              ></v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      
      <v-col cols="12" lg="4">
        <!-- Loan Calculator -->
        <v-card elevation="2" class="mb-4">
          <v-card-title>Mortgage Calculator</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Property Value"
                variant="outlined"
                placeholder="300000"
                prepend-inner-icon="mdi-currency-usd"
                type="number"
                class="mb-3"
                v-model="mortgageCalc.propertyValue"
              ></v-text-field>
              
              <v-text-field
                label="Down Payment"
                variant="outlined"
                placeholder="60000"
                prepend-inner-icon="mdi-currency-usd"
                type="number"
                class="mb-3"
                v-model="mortgageCalc.downPayment"
              ></v-text-field>
              
              <v-text-field
                label="Interest Rate (%)"
                variant="outlined"
                placeholder="5.5"
                suffix="%"
                type="number"
                step="0.125"
                class="mb-3"
                v-model="mortgageCalc.interestRate"
              ></v-text-field>
              
              <v-text-field
                label="Loan Term (years)"
                variant="outlined"
                placeholder="30"
                type="number"
                class="mb-3"
                v-model="mortgageCalc.loanTerm"
              ></v-text-field>
              
              <v-btn
                color="primary"
                block
                prepend-icon="mdi-calculator"
              >
                Calculate
              </v-btn>
              
              <v-divider class="my-4"></v-divider>
              
              <div class="d-flex justify-space-between align-center mb-2">
                <div class="text-subtitle-2">Monthly Payment:</div>
                <div class="text-h6">${{ calculateMonthlyPayment() }}</div>
              </div>
              
              <div class="d-flex justify-space-between align-center mb-2">
                <div class="text-subtitle-2">Loan Amount:</div>
                <div class="text-body-1">${{ calculateLoanAmount() }}</div>
              </div>
              
              <div class="d-flex justify-space-between align-center mb-2">
                <div class="text-subtitle-2">Total Interest:</div>
                <div class="text-body-1">${{ calculateTotalInterest() }}</div>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
        
        <!-- Financing Options -->
        <v-card elevation="2">
          <v-card-title>Financing Options</v-card-title>
          <v-list>
            <v-list-item
              v-for="(lender, i) in lenders"
              :key="i"
              :title="lender.name"
              :subtitle="`${lender.rate}% | ${lender.points} points`"
              lines="two"
            >
              <template v-slot:prepend>
                <v-avatar
                  size="36"
                  :image="lender.logo"
                  class="mr-3"
                ></v-avatar>
              </template>
              <template v-slot:append>
                <v-btn
                  variant="tonal"
                  size="small"
                  color="primary"
                >
                  Apply
                </v-btn>
              </template>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-btn variant="text" block>See More Options</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const mortgageCalc = ref({
  propertyValue: 300000,
  downPayment: 60000,
  interestRate: 5.5,
  loanTerm: 30
})

const calculateMonthlyPayment = () => {
  const p = mortgageCalc.value.propertyValue - mortgageCalc.value.downPayment
  const r = mortgageCalc.value.interestRate / 100 / 12
  const n = mortgageCalc.value.loanTerm * 12
  
  if (r === 0) return (p / n).toFixed(2)
  
  const monthlyPayment = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  return monthlyPayment.toFixed(2)
}

const calculateLoanAmount = () => {
  return (mortgageCalc.value.propertyValue - mortgageCalc.value.downPayment).toLocaleString()
}

const calculateTotalInterest = () => {
  const monthlyPayment = parseFloat(calculateMonthlyPayment())
  const totalPayments = mortgageCalc.value.loanTerm * 12
  const loanAmount = mortgageCalc.value.propertyValue - mortgageCalc.value.downPayment
  const totalInterest = (monthlyPayment * totalPayments) - loanAmount
  
  return totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })
}

const propertyHeaders = [
  { title: 'Property', key: 'address' },
  { title: 'Value', key: 'value' },
  { title: 'Mortgage', key: 'mortgage' },
  { title: 'Equity', key: 'equity' },
  { title: 'Cash Flow', key: 'cashFlow' },
  { title: 'ROI', key: 'roi' },
  { title: 'Actions', key: 'actions', sortable: false }
]

const properties = [
  {
    address: '123 Main St',
    value: '350000',
    mortgage: '280000',
    equity: '70000',
    cashFlow: 650,
    roi: 12.5
  },
  {
    address: '456 Oak Ave',
    value: '275000',
    mortgage: '220000',
    equity: '55000',
    cashFlow: 425,
    roi: 9.8
  },
  {
    address: '789 Pine St',
    value: '425000',
    mortgage: '340000',
    equity: '85000',
    cashFlow: 950,
    roi: 14.2
  },
  {
    address: '321 Maple Dr',
    value: '180000',
    mortgage: '144000',
    equity: '36000',
    cashFlow: -75,
    roi: 3.5
  },
  {
    address: '654 Elm St',
    value: '290000',
    mortgage: '203000',
    equity: '87000',
    cashFlow: 550,
    roi: 10.3
  }
]

const lenders = [
  {
    name: 'First National Bank',
    rate: 5.625,
    points: 0.5,
    logo: 'https://via.placeholder.com/36?text=FNB'
  },
  {
    name: 'Investor Credit Union',
    rate: 5.750,
    points: 0,
    logo: 'https://via.placeholder.com/36?text=ICU'
  },
  {
    name: 'Real Estate Lenders Inc',
    rate: 5.500,
    points: 1.0,
    logo: 'https://via.placeholder.com/36?text=REL'
  },
  {
    name: 'Community Mortgage Co',
    rate: 5.875,
    points: 0.25,
    logo: 'https://via.placeholder.com/36?text=CMC'
  }
]

const getEquityPercentage = (item: any) => {
  return (parseInt(item.equity) / parseInt(item.value)) * 100
}

const getRoiColor = (roi: number) => {
  if (roi >= 12) return 'success'
  if (roi >= 8) return 'primary'
  if (roi >= 5) return 'warning'
  return 'error'
}
</script>

<style scoped>
.text-success {
  color: rgb(76, 175, 80);
}

.text-error {
  color: rgb(244, 67, 54);
}

.max-width-200 {
  max-width: 200px;
}

.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
}
</style> 