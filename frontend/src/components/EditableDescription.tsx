import React from 'react';
import type { EditableDescriptionProps } from '../types/poll';
import { selectedStyle } from '../styles/theme';

export const EditableDescription: React.FC<EditableDescriptionProps> = ({
  description,
  setDescription,
  isDescriptionEditing,
  setIsDescriptionEditing,
  DESCRIPTION_PLACEHOLDER
}) => {
  const startDescriptionEditing = () => {
    setIsDescriptionEditing(true);
  };

  const saveDescription = (newDescription: string) => {
    setDescription(newDescription);
    setIsDescriptionEditing(false);
  };

  if (isDescriptionEditing) {
    return (
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onBlur={() => saveDescription(description)}
        onKeyPress={(e) => e.key === 'Enter' && e.ctrlKey && saveDescription(description)}
        className={`text-base lg:text-lg xl:text-xl ${selectedStyle.textSecondary} bg-transparent focus:outline-none ${selectedStyle.focusRing} rounded-lg px-3 py-2 border-2 border-transparent focus:border-rose-300 resize-none lg:min-h-[4.5rem]`}
        style={{ width: '100%', boxSizing: 'border-box' }}
        placeholder="Add a description for your poll..."
        rows={3}
        autoFocus
      />
    );
  }

  if (description && description.trim() !== '') {
    return (
      <p 
        onClick={startDescriptionEditing}
        className={`text-base lg:text-lg xl:text-xl ${selectedStyle.textSecondary} cursor-pointer hover:bg-rose-50 rounded-lg px-3 py-2 transition-all duration-200 border-2 border-transparent hover:border-rose-200`}
        style={{ display: 'block' }}
        title="Click to edit description"
      >
        {description}
      </p>
    );
  }

  return (
    <button
      onClick={startDescriptionEditing}
      className={`text-base lg:text-lg xl:text-xl ${selectedStyle.textPlaceholder} cursor-pointer hover:bg-rose-50 hover:border-rose-200 transition-colors duration-200 px-3 pb-1 pt-2 rounded-lg border-2 border-transparent text-left`}
      style={{ width: '100%', display: 'block' }}
    >
      <span className="border-b-3 border-dotted border-gray-300">
        {DESCRIPTION_PLACEHOLDER}
      </span>
    </button>
  );
};
