import React from 'react';
import type { Choice } from '../types/poll';
import { selectedStyle } from '../styles/theme';
import { ChoiceItem } from './ChoiceItem';

interface ChoicesSectionProps {
  choices: Choice[];
  updateChoice: (id: string, newText: string) => void;
  startEditing: (id: string) => void;
  removeChoice: (id: string) => void;
  addChoice: () => void;
  isDesktop?: boolean;
}

export const ChoicesSection: React.FC<ChoicesSectionProps> = ({
  choices,
  updateChoice,
  startEditing,
  removeChoice,
  addChoice,
  isDesktop = false
}) => {
  const containerClasses = isDesktop 
    ? "bg-white/60 backdrop-blur-sm rounded-3xl p-8 xl:p-12 shadow-xl"
    : "space-y-6 mx-4";
    
  const titleClasses = isDesktop
    ? "text-2xl xl:text-3xl font-semibold mb-8 xl:mb-12"
    : "text-lg font-semibold mb-6";
    
  const choicesContainerClasses = isDesktop
    ? "space-y-6 xl:space-y-8"
    : "space-y-4";
    
  const addButtonClasses = isDesktop
    ? "w-full mt-8 xl:mt-12 px-8 py-6 xl:py-8 border-2 border-dashed rounded-xl transition-all duration-200 flex items-center justify-center gap-3 text-lg xl:text-xl font-medium"
    : "w-full px-6 py-4 border-2 border-dashed rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-base font-medium";
    
  const addButtonIconClasses = isDesktop
    ? "w-6 h-6 xl:w-7 xl:h-7"
    : "w-5 h-5";

  if (isDesktop) {
    return (
      <div className={containerClasses}>
        <h3 className={`${titleClasses} ${selectedStyle.textPrimary}`}>
          Choices
        </h3>
        <div className={choicesContainerClasses}>
          {choices.map((choice) => (
            <ChoiceItem
              key={choice.id}
              choice={choice}
              choices={choices}
              updateChoice={updateChoice}
              startEditing={startEditing}
              removeChoice={removeChoice}
              isDesktop={true}
            />
          ))}
        </div>

        {/* Add Choice Button */}
        <button
          onClick={addChoice}
          className={`${addButtonClasses} ${selectedStyle.borderColor} text-rose-500 hover:border-rose-400 hover:bg-rose-50`}
        >
          <svg className={addButtonIconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Choice
        </button>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <h3 className={`${titleClasses} ${selectedStyle.textPrimary}`}>
        Choices
      </h3>
      <div className={choicesContainerClasses}>
        {choices.map((choice) => (
          <ChoiceItem
            key={choice.id}
            choice={choice}
            choices={choices}
            updateChoice={updateChoice}
            startEditing={startEditing}
            removeChoice={removeChoice}
            isDesktop={false}
          />
        ))}
      </div>

      {/* Add Choice Button */}
      <button
        onClick={addChoice}
        className={`${addButtonClasses} ${selectedStyle.borderColor} text-rose-500 hover:border-rose-400 hover:bg-rose-50`}
      >
        <svg className={addButtonIconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Choice
      </button>
    </div>
  );
};
