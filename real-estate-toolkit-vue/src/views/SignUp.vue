<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card elevation="3" class="pa-4">
          <div class="d-flex justify-center mb-4">
            <v-avatar size="80" color="primary" class="elevation-2">
              <v-img src="https://i.imgur.com/6CRLf8S.png" alt="Logo"></v-img>
            </v-avatar>
          </div>
          
          <v-card-title class="text-center text-h5 mb-4">Create your account</v-card-title>
          
          <v-stepper v-model="currentStep" class="mb-4">
            <v-stepper-window>
              <!-- Step 1: Personal Information -->
              <v-stepper-window-item value="1">
                <v-form ref="personalInfoForm" @submit.prevent="validatePersonalInfo">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="firstName"
                        label="First Name"
                        variant="outlined"
                        prepend-inner-icon="mdi-account-outline"
                        :error-messages="firstNameError"
                        required
                      ></v-text-field>
                    </v-col>
                    
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="lastName"
                        label="Last Name"
                        variant="outlined"
                        prepend-inner-icon="mdi-account-outline"
                        :error-messages="lastNameError"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  
                  <v-text-field
                    v-model="email"
                    label="Email"
                    type="email"
                    variant="outlined"
                    prepend-inner-icon="mdi-email-outline"
                    :error-messages="emailError"
                    required
                    class="mb-4"
                  ></v-text-field>
                  
                  <v-select
                    v-model="investorType"
                    :items="investorTypes"
                    label="Investor Type"
                    variant="outlined"
                    prepend-inner-icon="mdi-briefcase-outline"
                    :error-messages="investorTypeError"
                    required
                    class="mb-4"
                  ></v-select>
                  
                  <v-btn
                    type="submit"
                    color="primary"
                    block
                    size="large"
                  >
                    Continue
                  </v-btn>
                </v-form>
              </v-stepper-window-item>
              
              <!-- Step 2: Account Security -->
              <v-stepper-window-item value="2">
                <v-form ref="securityForm" @submit.prevent="validateSecurity">
                  <v-text-field
                    v-model="password"
                    label="Password"
                    variant="outlined"
                    prepend-inner-icon="mdi-lock-outline"
                    :error-messages="passwordError"
                    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append-inner="showPassword = !showPassword"
                    required
                    class="mb-4"
                  ></v-text-field>
                  
                  <v-text-field
                    v-model="confirmPassword"
                    label="Confirm Password"
                    variant="outlined"
                    prepend-inner-icon="mdi-lock-outline"
                    :error-messages="confirmPasswordError"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    class="mb-4"
                  ></v-text-field>
                  
                  <div class="mb-4">
                    <div class="text-subtitle-2 mb-2">Password Strength</div>
                    <v-progress-linear
                      :model-value="passwordStrength"
                      :color="passwordStrengthColor"
                      height="8"
                      rounded
                      class="mb-1"
                    ></v-progress-linear>
                    <div class="text-caption" :class="passwordStrengthColor + '--text'">
                      {{ passwordStrengthText }}
                    </div>
                  </div>
                  
                  <div class="d-flex">
                    <v-btn
                      variant="outlined"
                      class="me-4"
                      @click="currentStep = '1'"
                    >
                      Back
                    </v-btn>
                    
                    <v-btn
                      type="submit"
                      color="primary"
                      block
                    >
                      Continue
                    </v-btn>
                  </div>
                </v-form>
              </v-stepper-window-item>
              
              <!-- Step 3: Terms and Conditions -->
              <v-stepper-window-item value="3">
                <v-form ref="termsForm" @submit.prevent="handleSubmit">
                  <v-card variant="outlined" class="mb-4 pa-4" max-height="200" style="overflow-y: auto">
                    <div class="text-body-2">
                      <p><strong>Terms and Conditions</strong></p>
                      <p>By signing up for the Real Estate Investor Toolkit, you agree to our Terms and Conditions and Privacy Policy.</p>
                      <p>Our platform provides tools and resources for real estate investors. We do not guarantee any specific returns on investments and all investment decisions should be made at your own discretion.</p>
                      <p>Your personal data will be handled according to our Privacy Policy. We may send occasional emails related to your account and service updates.</p>
                    </div>
                  </v-card>
                  
                  <v-checkbox
                    v-model="agreeToTerms"
                    label="I agree to the Terms and Conditions and Privacy Policy"
                    :error-messages="termsError"
                    required
                    class="mb-4"
                  ></v-checkbox>
                  
                  <v-checkbox
                    v-model="subscribeToNewsletter"
                    label="Subscribe to newsletter about real estate investment tips"
                    class="mb-4"
                  ></v-checkbox>
                  
                  <div class="d-flex">
                    <v-btn
                      variant="outlined"
                      class="me-4"
                      @click="currentStep = '2'"
                    >
                      Back
                    </v-btn>
                    
                    <v-btn
                      type="submit"
                      color="primary"
                      block
                      :loading="loading"
                    >
                      Create Account
                    </v-btn>
                  </div>
                </v-form>
              </v-stepper-window-item>
            </v-stepper-window>
          </v-stepper>
          
          <div class="text-center mt-6">
            <span class="text-body-2 text-medium-emphasis">Already have an account?</span>
            <v-btn
              variant="text"
              color="primary"
              class="ml-2"
              to="/sign-in"
            >
              Sign In
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form state
const currentStep = ref('1')
const loading = ref(false)
const showPassword = ref(false)

// Form values
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const investorType = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeToTerms = ref(false)
const subscribeToNewsletter = ref(false)

// Form errors
const firstNameError = ref('')
const lastNameError = ref('')
const emailError = ref('')
const investorTypeError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const termsError = ref('')

// Options for select
const investorTypes = [
  'Individual Investor',
  'Real Estate Agent',
  'Property Manager',
  'Developer',
  'Investment Company',
  'Other'
]

// Password strength
const passwordStrength = computed(() => {
  if (!password.value) return 0
  
  let strength = 0
  
  // Length
  if (password.value.length >= 8) strength += 25
  
  // Uppercase, lowercase, number, special char
  if (/[A-Z]/.test(password.value)) strength += 25
  if (/[a-z]/.test(password.value)) strength += 25
  if (/[0-9]/.test(password.value)) strength += 15
  if (/[^A-Za-z0-9]/.test(password.value)) strength += 10
  
  return Math.min(strength, 100)
})

const passwordStrengthColor = computed(() => {
  const strength = passwordStrength.value
  if (strength < 30) return 'error'
  if (strength < 70) return 'warning'
  return 'success'
})

const passwordStrengthText = computed(() => {
  const strength = passwordStrength.value
  if (strength < 30) return 'Weak'
  if (strength < 70) return 'Medium'
  return 'Strong'
})

// Validation functions
const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value) {
    emailError.value = 'Email is required'
    return false
  } else if (!emailRegex.test(email.value)) {
    emailError.value = 'Please enter a valid email address'
    return false
  }
  emailError.value = ''
  return true
}

const validatePersonalInfo = () => {
  let isValid = true
  
  if (!firstName.value) {
    firstNameError.value = 'First name is required'
    isValid = false
  } else {
    firstNameError.value = ''
  }
  
  if (!lastName.value) {
    lastNameError.value = 'Last name is required'
    isValid = false
  } else {
    lastNameError.value = ''
  }
  
  if (!validateEmail()) {
    isValid = false
  }
  
  if (!investorType.value) {
    investorTypeError.value = 'Please select an investor type'
    isValid = false
  } else {
    investorTypeError.value = ''
  }
  
  if (isValid) {
    currentStep.value = '2'
  }
}

const validateSecurity = () => {
  let isValid = true
  
  if (!password.value) {
    passwordError.value = 'Password is required'
    isValid = false
  } else if (password.value.length < 8) {
    passwordError.value = 'Password must be at least 8 characters long'
    isValid = false
  } else {
    passwordError.value = ''
  }
  
  if (!confirmPassword.value) {
    confirmPasswordError.value = 'Please confirm your password'
    isValid = false
  } else if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Passwords do not match'
    isValid = false
  } else {
    confirmPasswordError.value = ''
  }
  
  if (isValid) {
    currentStep.value = '3'
  }
}

const handleSubmit = async () => {
  if (!agreeToTerms.value) {
    termsError.value = 'You must agree to the terms and conditions'
    return
  }
  
  loading.value = true
  
  try {
    // Here you would implement your actual registration logic
    // For demo purposes, we'll just simulate a successful registration after a delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // After successful registration, redirect to dashboard or login
    router.push('/')
  } catch (error) {
    console.error('Registration failed:', error)
    // Handle registration error
  } finally {
    loading.value = false
  }
}
</script> 