"use client";
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCustomTemplates } from '@/hooks/use-custom-templates';

// Schema for new template form
const TemplateSchema = z.object({
  name: z.string().nonempty('Name is required'),
  description: z.string().optional(),
  structure: z.string().nonempty('Structure is required'),
  category: z.enum([
    'general',
    'creative',
    'technical',
    'analytical',
    'instructional',
    'business'
  ])
});
type FormData = z.infer<typeof TemplateSchema>;

export default function NewTemplatePage() {
  const router = useRouter();
  const { addTemplate } = useCustomTemplates();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(TemplateSchema)
  });

  const onSubmit = (data: FormData) => {
    const newTpl = {
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description || null,
      structure: data.structure,
      category: data.category,
      is_default: false,
      placeholders: {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    addTemplate(newTpl);
    router.push('/templates');
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">New Custom Template</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            {...register('name')}
            className="w-full border p-2 rounded"
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <input
            {...register('description')}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Category</label>
          <select
            {...register('category')}
            className="w-full border p-2 rounded"
          >
            <option value="general">General</option>
            <option value="creative">Creative</option>
            <option value="technical">Technical</option>
            <option value="analytical">Analytical</option>
            <option value="instructional">Instructional</option>
            <option value="business">Business</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Structure</label>
          <textarea
            {...register('structure')}
            rows={4}
            className="w-full border p-2 rounded"
          />
          {errors.structure && <p className="text-red-600">{errors.structure.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Template
        </button>
      </form>
    </div>
  );
}