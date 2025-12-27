'use client';

import { cn } from '@/lib/utils';
import { useState, useRef, KeyboardEvent, useEffect } from 'react';

interface TagInputProps {
  value?: string[];           // initial tags
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  className?: string;
  id? : string;
}

export default function TagInput({
  value = [],
  onChange,
  placeholder = 'Type a tag and press Enter...',
  maxTags = 10,
  className = '',
  id = ""
}: TagInputProps) {
  const [tags, setTags] = useState<string[]>(value);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync with parent if controlled
  useEffect(() => {
    setTags(value);
  }, [value]);

  const addTag = () => {
    const trimmed = inputValue.trim();
    
    if (!trimmed) return;
    if (tags.includes(trimmed)) return;
    if (tags.length >= maxTags) return;

    const newTags = [...tags, trimmed];
    setTags(newTags);
    onChange?.(newTags);
    
    setInputValue('');
    inputRef.current?.focus();
  };

  const removeTag = (indexToRemove: number) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(newTags);
    onChange?.(newTags);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
    
    // Remove last tag when backspace is pressed on empty input
    if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  return (
    <div id={id} className={cn('w-full', className)}>
      <div
        className="
          min-h-[42px] w-full rounded-lg border border-gray-300 bg-white 
          px-3 py-2 shadow-sm transition-colors
          focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500
          dark:bg-gray-800 dark:border-gray-600 dark:focus-within:border-gray-400
        "
      >
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((tag, index) => (
            <div
              key={`${tag}-${index}`}
              className="
                group flex items-center gap-1.5 rounded-full 
                bg-gray-100 px-3 py-1 text-md font-medium text-gray-800
                dark:bg-gray-900/60 dark:text-indigo-200
              "
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="
                  ml-1 rounded-full p-0.5 text-slate-600 
                  hover:bg-indigo-200 hover:text-slate-800
                  dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-100
                  transition-colors
                "
                aria-label={`Remove tag ${tag}`}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}

          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={tags.length >= maxTags ? 'Max tags reached' : placeholder}
            disabled={tags.length >= maxTags}
            className="
              flex-1 min-w-[160px] bg-transparent outline-none 
              text-gray-900 placeholder-gray-400 text-md
              dark:text-gray-100 dark:placeholder-gray-500
            "
          />
        </div>
      </div>

      {/* Hidden input for form submission - optional */}
      <input type="hidden" name="tags" value={tags.join(',')} />
    </div>
  );
}