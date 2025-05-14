# Prompt Gen

Prompt Gen is a web application that helps users transform rough ideas into well-structured prompts for generative AI models.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4. Create a `.env.local` file in the project root with your environment variables:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
   OPENAI_API_KEY=<your-openai-key>
   ```

5. Seed the Supabase templates table with initial templates:
   ```bash
   npm run seed:templates
   ```

## Project Structure

- `.env.local` – environment variables (e.g., OpenAI API keys)
- `src/app` – application pages and layouts
- `public` – static assets
- Configuration files for Tailwind CSS, PostCSS, ESLint, and Next.js
