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
          
          <v-card-title class="text-center text-h5 mb-4">Sign in to your account</v-card-title>
          
          <v-form @submit.prevent="handleSubmit">
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
            
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              variant="outlined"
              prepend-inner-icon="mdi-lock-outline"
              :error-messages="passwordError"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              :type="showPassword ? 'text' : 'password'"
              @click:append-inner="showPassword = !showPassword"
              required
              class="mb-2"
            ></v-text-field>
            
            <div class="d-flex justify-space-between align-center mb-4">
              <v-checkbox
                v-model="rememberMe"
                label="Remember me"
                hide-details
                density="compact"
              ></v-checkbox>
              
              <v-btn variant="text" color="primary" density="compact">
                Forgot password?
              </v-btn>
            </div>
            
            <v-btn
              type="submit"
              color="primary"
              block
              size="large"
              :loading="loading"
              class="mb-4"
            >
              Sign In
            </v-btn>
            
            <v-divider class="mb-4">
              <span class="text-body-2 text-medium-emphasis">OR</span>
            </v-divider>
            
            <v-row>
              <v-col cols="6">
                <v-btn
                  prepend-icon="mdi-google"
                  variant="outlined"
                  block
                  class="text-none"
                >
                  Google
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  prepend-icon="mdi-microsoft"
                  variant="outlined"
                  block
                  class="text-none"
                >
                  Microsoft
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
          
          <div class="text-center mt-6">
            <span class="text-body-2 text-medium-emphasis">Don't have an account?</span>
            <v-btn
              variant="text"
              color="primary"
              class="ml-2"
              to="/sign-up"
            >
              Sign Up
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const loading = ref(false)
const emailError = ref('')
const passwordError = ref('')

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

const validatePassword = () => {
  if (!password.value) {
    passwordError.value = 'Password is required'
    return false
  } else if (password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters long'
    return false
  }
  passwordError.value = ''
  return true
}

const handleSubmit = async () => {
  const isEmailValid = validateEmail()
  const isPasswordValid = validatePassword()
  
  if (!isEmailValid || !isPasswordValid) {
    return
  }
  
  loading.value = true
  
  try {
    // Here you would implement your actual authentication logic
    // For demo purposes, we'll just simulate a successful login after a delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // After successful login, redirect to dashboard
    router.push('/')
  } catch (error) {
    console.error('Login failed:', error)
    // Handle login error
  } finally {
    loading.value = false
  }
}
</script> 