import React from 'react';
import type { ChoiceItemProps } from '../types/poll';
import { selectedStyle } from '../styles/theme';

export const ChoiceItem: React.FC<ChoiceItemProps> = ({
  choice,
  choices,
  updateChoice,
  startEditing,
  removeChoice,
  isDesktop = false
}) => {
  const baseClasses = isDesktop 
    ? "px-6 py-4 text-lg xl:text-xl rounded-xl shadow-sm"
    : "px-4 py-3 text-base rounded-lg";
  
  const buttonClasses = isDesktop
    ? "w-12 h-12 xl:w-14 xl:h-14 rounded-xl"
    : "w-10 h-10 rounded-lg";
    
  const iconClasses = isDesktop
    ? "w-6 h-6 xl:w-7 xl:h-7"
    : "w-5 h-5";

  if (choice.isEditing) {
    return (
      <div className="flex items-center gap-3 xl:gap-6">
        <div className="flex-1">
          <input
            type="text"
            value={choice.text}
            onChange={(e) => updateChoice(choice.id, e.target.value)}
            onBlur={() => updateChoice(choice.id, choice.text)}
            onKeyPress={(e) => e.key === 'Enter' && updateChoice(choice.id, choice.text)}
            className={`w-full ${baseClasses} ${choice.text.startsWith('Option ') ? selectedStyle.textPlaceholder : selectedStyle.textPrimary} bg-white border-2 border-rose-200 ${selectedStyle.focusRing} focus:border-rose-400 transition-all duration-200 ${isDesktop ? 'hover:shadow-md' : ''}`}
            placeholder="Enter choice text..."
            autoFocus
          />
        </div>
        {choices.length > 2 && (
          <button
            onClick={() => removeChoice(choice.id)}
            className={`flex-shrink-0 ${buttonClasses} text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors duration-200`}
            title="Remove choice"
          >
            <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 xl:gap-6">
      <div className="flex-1">
        <div
          onClick={() => startEditing(choice.id)}
          className={`${baseClasses} ${choice.text.startsWith('Option ') ? selectedStyle.textPlaceholder : selectedStyle.textPrimary} bg-white border-2 border-transparent hover:border-rose-200 cursor-pointer transition-all duration-200 hover:bg-rose-50 ${isDesktop ? 'hover:shadow-md' : ''}`}
          title="Click to edit choice"
        >
          {choice.text}
        </div>
      </div>
      {choices.length > 2 && (
        <button
          onClick={() => removeChoice(choice.id)}
          className={`flex-shrink-0 ${buttonClasses} text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors duration-200`}
          title="Remove choice"
        >
          <svg className={iconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};
