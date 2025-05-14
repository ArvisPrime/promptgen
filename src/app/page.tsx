"use client";
import { useState, useEffect } from 'react';
import { useTemplates } from '@/hooks/use-templates';
import { useGeneratePrompt } from '@/hooks/use-generate-prompt';
import { useTestPrompt } from '@/hooks/use-test-prompt';
import { useHistoryStore } from '@/store/store';
import type { Template } from '@/types';

export default function Home() {
  const { data: templates, isLoading, error } = useTemplates();
  const generateMutation = useGeneratePrompt();
  const testMutation = useTestPrompt();
  const addToHistory = useHistoryStore((state) => state.addToHistory);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [roughIdea, setRoughIdea] = useState('');
  const [refinedPrompt, setRefinedPrompt] = useState('');

  useEffect(() => {
    if (templates && templates.length > 0 && !selectedTemplate) {
      setSelectedTemplate(templates[0]);
    }
  }, [templates, selectedTemplate]);

  const generatePrompt = () => {
    if (!selectedTemplate) return;
    generateMutation.mutate(
      { templateId: selectedTemplate.id, rawInput: roughIdea },
      {
        onSuccess: (data) => {
          setRefinedPrompt(data.refinedPrompt);
        }
      }
    );
  };

  if (isLoading) {
    return <div className="p-4">Loading templates...</div>;
  }
  if (error) {
    return <div className="p-4 text-red-600">Error loading templates: {error.message}</div>;
  }
  if (!templates || templates.length === 0) {
    return <div className="p-4">No templates available.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Prompt Gen</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Select Prompt Template:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <button
              key={template.id}
              className={`border rounded p-4 text-left hover:border-blue-500 ${
                selectedTemplate?.id === template.id ? 'border-blue-500' : 'border-gray-300'
              }`}
              onClick={() => {
                setSelectedTemplate(template);
                setRefinedPrompt('');
              }}
            >
              <h3 className="font-medium">{template.name}</h3>
              <p className="text-gray-500 text-sm">{template.description}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="roughIdea" className="block mb-2 font-semibold">
          Enter your rough idea:
        </label>
        <textarea
          id="roughIdea"
          rows={4}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe what you want to create or learn about..."
          value={roughIdea}
          onChange={(e) => setRoughIdea(e.target.value)}
        />
      </div>
      <button
        onClick={generatePrompt}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={!roughIdea || generateMutation.isLoading}
      >
        {generateMutation.isLoading ? 'Generating…' : 'Generate Refined Prompt'}
      </button>
      {refinedPrompt && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Refined Prompt:</h2>
          <textarea
            readOnly
            rows={6}
            className="w-full border border-gray-300 rounded p-2 bg-gray-50"
            value={refinedPrompt}
          />
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => navigator.clipboard.writeText(refinedPrompt)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              Copy
            </button>
            <button
              onClick={() =>
                addToHistory({ rawInput: roughIdea, refinedPrompt, templateId: selectedTemplate!.id })
              }
              className="px-3 py-1 bg-green-200 rounded hover:bg-green-300"
            >
              Save to History
            </button>
            <button
              onClick={() => testMutation.mutate({ prompt: refinedPrompt })}
              disabled={testMutation.isLoading}
              className="px-3 py-1 bg-blue-200 rounded hover:bg-blue-300 disabled:opacity-50"
            >
              {testMutation.isLoading ? 'Testing…' : 'Test Prompt'}
            </button>
          </div>
          {testMutation.data && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Test Result:</h2>
              <pre className="bg-gray-100 p-2 rounded whitespace-pre-wrap">
                {testMutation.data}
              </pre>
            </div>
          )}
          {testMutation.error && (
            <div className="mt-2 text-red-600">
              Error testing prompt: {testMutation.error.message}
            </div>
          )}
        </div>
      )}
    </div>
  );
}