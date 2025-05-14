import { useState, useEffect } from 'react';
import { localStorageService, StorageKey } from '@/lib/utils/local-storage';
import type { Template } from '@/types';

/**
 * Hook for managing custom templates stored in localStorage.
 */
export function useCustomTemplates() {
  const storageKey: StorageKey = 'customTemplates';
  const [templates, setTemplates] = useState<Template[]>(
    () => localStorageService.getItem(storageKey, [])
  );

  useEffect(() => {
    localStorageService.setItem(storageKey, templates);
  }, [templates]);

  const addTemplate = (template: Template) => {
    setTemplates((prev) => [template, ...prev]);
  };

  const clearCustomTemplates = () => {
    setTemplates([]);
    localStorageService.removeItem(storageKey);
  };

  return { templates, addTemplate, clearCustomTemplates };
}