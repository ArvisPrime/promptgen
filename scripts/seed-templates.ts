import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

/**
 * Seed initial templates into the Supabase `templates` table.
 */
// Define the shape for template records we will insert
type RawTemplate = {
  name: string;
  description: string | null;
  structure: string;
  category: string;
  is_default: boolean;
  placeholders: Record<string, string> | null;
};

// Initialize Supabase client using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const templates: RawTemplate[] = [
  {
    name: 'General Purpose',
    description: 'Balanced prompts for most use cases',
    structure:
      'I need information about [TOPIC]. Please provide a [DETAIL_LEVEL] explanation covering [ASPECTS]. Format the response as [FORMAT].',
    category: 'general',
    is_default: true,
    placeholders: {
      TOPIC: 'the subject matter',
      DETAIL_LEVEL: 'detailed',
      ASPECTS: 'key aspects',
      FORMAT: 'a well-structured document with appropriate headings'
    }
  },
  {
    name: 'Creative Writing',
    description: 'For storytelling and creative content',
    structure:
      'Write a [GENRE] about [SUBJECT] that includes [ELEMENTS]. The tone should be [TONE] and the length approximately [LENGTH].',
    category: 'creative',
    is_default: true,
    placeholders: {
      GENRE: 'creative piece',
      SUBJECT: 'the subject matter',
      ELEMENTS: 'engaging elements',
      TONE: 'balanced',
      LENGTH: 'appropriate length'
    }
  },
  {
    name: 'Technical Documentation',
    description: 'For technical explanations and documentation',
    structure:
      'Explain [TECHNOLOGY] in [DETAIL_LEVEL] detail. Include [SPECIFIC_ASPECTS] and provide [CODE_EXAMPLES] if relevant. Target audience is [AUDIENCE].',
    category: 'technical',
    is_default: true,
    placeholders: {
      TECHNOLOGY: 'the technical concept',
      DETAIL_LEVEL: 'comprehensive',
      SPECIFIC_ASPECTS: 'key components and principles',
      CODE_EXAMPLES: 'practical code examples',
      AUDIENCE: 'professionals with domain knowledge'
    }
  },
  {
    name: 'Analysis & Research',
    description: 'For analytical thinking and research',
    structure:
      'Analyze [SUBJECT] from [PERSPECTIVES]. Consider [FACTORS] and their relationships. Provide [DATA_POINTS] to support the analysis and suggest [RECOMMENDATIONS].',
    category: 'analytical',
    is_default: true,
    placeholders: {
      SUBJECT: 'the subject matter',
      PERSPECTIVES: 'relevant perspectives',
      FACTORS: 'key factors',
      DATA_POINTS: 'supporting evidence',
      RECOMMENDATIONS: 'actionable recommendations'
    }
  },
  {
    name: 'Educational Content',
    description: 'For teaching and tutorials',
    structure:
      'Create a lesson on [TOPIC] for [AUDIENCE_LEVEL] students. Include [CONCEPTS], [EXAMPLES], and [EXERCISES]. The learning objective is [OBJECTIVE].',
    category: 'instructional',
    is_default: true,
    placeholders: {
      TOPIC: 'the subject matter',
      AUDIENCE_LEVEL: 'intermediate',
      CONCEPTS: 'fundamental concepts',
      EXAMPLES: 'practical examples',
      EXERCISES: 'engaging exercises',
      OBJECTIVE: 'comprehensive understanding'
    }
  },
  {
    name: 'Business Communication',
    description: 'For professional documents',
    structure:
      'Draft a [DOCUMENT_TYPE] regarding [SUBJECT]. Include [KEY_POINTS], address [STAKEHOLDERS], and recommend [ACTIONS]. The communication style should be [STYLE].',
    category: 'business',
    is_default: true,
    placeholders: {
      DOCUMENT_TYPE: 'business document',
      SUBJECT: 'the subject matter',
      KEY_POINTS: 'essential information',
      STAKEHOLDERS: 'relevant parties',
      ACTIONS: 'next steps',
      STYLE: 'professional'
    }
  }
];

async function seedTemplates() {
  console.log('Seeding templates...');
  for (const t of templates) {
    const { error } = await supabase.from('templates').insert(t);
    if (error) {
      console.error(`Error inserting ${t.name}:`, error.message);
    } else {
      console.log(`Inserted template: ${t.name}`);
    }
  }
  console.log('Seeding complete.');
}

seedTemplates()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  });