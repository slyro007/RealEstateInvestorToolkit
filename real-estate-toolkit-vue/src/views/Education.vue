<template>
  <div>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 mb-6">Strategy & Education</h1>
      </v-col>
    </v-row>

    <!-- Learning Paths -->
    <v-row>
      <v-col cols="12">
        <h2 class="text-h5 mb-4">Learning Paths</h2>
      </v-col>
      
      <v-col v-for="(path, i) in learningPaths" :key="i" cols="12" md="4">
        <v-card class="h-100" elevation="2">
          <v-img
            :src="path.image"
            height="200"
            cover
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="primary"></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <v-card-title>{{ path.title }}</v-card-title>
          
          <v-card-text>
            <p class="mb-4">{{ path.description }}</p>
            <v-chip-group>
              <v-chip v-for="(tag, j) in path.tags" :key="j" size="small" color="primary" variant="outlined">
                {{ tag }}
              </v-chip>
            </v-chip-group>
          </v-card-text>
          
          <v-card-actions>
            <v-rating
              :model-value="path.rating"
              color="amber"
              density="compact"
              half-increments
              readonly
              size="small"
            ></v-rating>
            <span class="text-caption ml-2">{{ path.reviews }} reviews</span>
            <v-spacer></v-spacer>
            <v-btn color="primary" variant="tonal">
              Start Learning
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Resources and Tools -->
    <v-row class="mt-6">
      <v-col cols="12">
        <h2 class="text-h5 mb-4">Resources & Tools</h2>
      </v-col>

      <v-col cols="12" md="8">
        <v-card elevation="2">
          <v-card-title>AI Strategy Advisor</v-card-title>
          <v-card-text>
            <p class="mb-4">Our AI-powered strategy advisor helps you create personalized investment strategies based on your goals, market conditions, and risk tolerance.</p>
            
            <v-form>
              <v-textarea
                label="Describe your investment goals and constraints"
                rows="3"
                placeholder="E.g., I'm looking to invest in single-family homes in suburban areas with a budget of $250,000. I'm focused on cash flow and have a 5-year investment horizon."
                variant="outlined"
                class="mb-4"
              ></v-textarea>
              
              <v-btn
                prepend-icon="mdi-robot"
                color="primary"
                block
              >
                Generate Strategy
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card elevation="2" class="mb-4">
          <v-card-title>Market Research Library</v-card-title>
          <v-list density="compact">
            <v-list-item
              v-for="(resource, i) in resources.slice(0, 3)"
              :key="i"
              :title="resource.title"
              :subtitle="resource.type"
              :prepend-icon="resource.icon"
            >
              <template v-slot:append>
                <v-btn icon variant="text" color="primary">
                  <v-icon>mdi-download</v-icon>
                </v-btn>
              </template>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-btn variant="text" block>View All Resources</v-btn>
          </v-card-actions>
        </v-card>

        <v-card elevation="2">
          <v-card-title>Upcoming Webinars</v-card-title>
          <v-list>
            <v-list-item
              v-for="(webinar, i) in upcomingWebinars"
              :key="i"
              :title="webinar.title"
              :subtitle="webinar.date"
            >
              <template v-slot:prepend>
                <v-avatar color="primary" variant="tonal">
                  <v-icon>mdi-calendar</v-icon>
                </v-avatar>
              </template>
              <template v-slot:append>
                <v-btn variant="tonal" size="small">Register</v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const learningPaths = [
  {
    title: 'Real Estate Fundamentals',
    description: 'Master the basics of real estate investment, including terminology, property types, and key metrics.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1073&q=80',
    tags: ['Beginner', 'Fundamentals', 'Cash Flow'],
    progress: 0,
    rating: 4.5,
    reviews: 128
  },
  {
    title: 'Rental Property Investing',
    description: 'Learn how to find, analyze, and manage rental properties for consistent cash flow.',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1296&q=80',
    tags: ['Cash Flow', 'Management', 'Analysis'],
    progress: 0,
    rating: 4.7,
    reviews: 213
  },
  {
    title: 'Creative Financing Strategies',
    description: 'Discover alternative financing methods beyond traditional mortgages to fund your investments.',
    image: 'https://images.unsplash.com/photo-1589666564459-93cdd3ab856a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
    tags: ['Financing', 'Advanced', 'Leverage'],
    progress: 0,
    rating: 4.8,
    reviews: 97
  }
]

const resources = [
  {
    title: '2023 Housing Market Trends',
    type: 'PDF Report',
    icon: 'mdi-file-document-outline'
  },
  {
    title: 'Rental Market Analysis Tool',
    type: 'Excel Spreadsheet',
    icon: 'mdi-file-excel-outline'
  },
  {
    title: 'Tax Strategies for Investors',
    type: 'Video Course',
    icon: 'mdi-video-outline'
  },
  {
    title: 'Neighborhood Evaluation Checklist',
    type: 'Printable Template',
    icon: 'mdi-checkbox-marked-outline'
  }
]

const upcomingWebinars = [
  {
    title: 'Market Trends & Opportunities',
    date: 'May 25, 2023 - 1:00 PM EST'
  },
  {
    title: 'Tax Strategies for Real Estate',
    date: 'June 3, 2023 - 2:00 PM EST'
  },
  {
    title: 'Creative Financing Workshop',
    date: 'June 12, 2023 - 11:00 AM EST'
  }
]
</script>

<style scoped>
.v-card {
  transition: transform 0.2s;
}
.v-card:hover {
  transform: translateY(-5px);
}
</style>