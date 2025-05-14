"use client";
import Link from 'next/link';
import { useTemplates } from '@/hooks/use-templates';
import { useCustomTemplates } from '@/hooks/use-custom-templates';
import type { Template } from '@/types';

export default function TemplatesPage() {
  const { data: apiTemplates, isLoading, error } = useTemplates();
  const { templates: customTemplates, clearCustomTemplates } = useCustomTemplates();

  if (isLoading) return <div className="p-4">Loading templates…</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error.message}</div>;

  const allTemplates: Template[] = [];
  if (apiTemplates) allTemplates.push(...apiTemplates);
  allTemplates.push(...customTemplates);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Templates</h1>
        <Link href="/templates/new">
          <button className="bg-blue-600 text-white px-3 py-1 rounded">
            + New Template
          </button>
        </Link>
      </div>
      {allTemplates.length === 0 ? (
        <p className="text-gray-600">No templates available.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allTemplates.map((tpl: Template) => (
            <li key={tpl.id || tpl.name} className="border p-4 rounded">
              <h3 className="font-medium">{tpl.name}</h3>
              {tpl.description && (
                <p className="text-gray-500 text-sm">{tpl.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}
      {customTemplates.length > 0 && (
        <button
          onClick={clearCustomTemplates}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear Custom Templates
        </button>
      )}
    </div>
  );
}