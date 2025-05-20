# Real Estate Investor Toolkit

A comprehensive platform for off-market real estate investing, featuring AI-powered marketing tools, deal analysis, and educational resources.

## Recent Updates

- **Appwrite Migration:**
  - All authentication and database functionality is now powered by Appwrite.
  - Docker, Prisma, and Postgres have been removed from the stack.
- **Modern Animated Landing Page:**
  - Beautiful gradient background and improved layout.
  - Three main feature cards (AI-Powered Marketing, Deal Analysis, Education & Insights) are now clickable and link to dedicated info pages.
- **Module Info Pages:**
  - Each module (Marketing, Deals, Education) has a clean, animated info page with hero section, icon animation, and feature highlights.
- **Improved Navigation:**
  - The landing page is now the main entry point for the app, with clear navigation to sign in and module details.
- **UI/UX Enhancements:**
  - Larger, more prominent login button.
  - Consistent, modern design across all public pages.

## Features

- **Marketing Module**
  - Direct mail campaign management
  - Cold calling scripts
  - Driving for dollars tracking
  - AI-powered script generation
  - Campaign analytics

- **Deals Module**
  - Deal analysis
  - ROI calculations
  - Property evaluation
  - Market research

- **Education Module**
  - Learning paths
  - Strategy guides
  - Market insights
  - Investment techniques

## Tech Stack

- **Frontend**
  - Next.js 14
  - React
  - Tailwind CSS
  - shadcn/ui
- **Backend & Database**
  - Appwrite (auth, database, and API)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/real-estate-investor-toolkit.git
   cd real-estate-investor-toolkit
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   APPWRITE_API_KEY=your_appwrite_api_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 