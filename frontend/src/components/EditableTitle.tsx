import React from 'react';
import type { EditableTitleProps } from '../types/poll';
import { selectedStyle } from '../styles/theme';

export const EditableTitle: React.FC<EditableTitleProps> = ({
  title,
  setTitle,
  isTitleEditing,
  setIsTitleEditing,
  setTextareaRef,
  TITLE_PLACEHOLDER,
  TITLE_FONT_SHRINK_THRESHOLD
}) => {
  const startTitleEditing = () => {
    setIsTitleEditing(true);
    if (title.trim() === '' || title.trim() === TITLE_PLACEHOLDER) {
      setTitle('');
    }
  };

  const saveTitle = (newTitle: string) => {
    setTitle(newTitle);
    setIsTitleEditing(false);
  };

  if (isTitleEditing) {
    return (
      <textarea
        ref={setTextareaRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => saveTitle(title)}
        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && saveTitle(title)}
        className={`font-bold ${selectedStyle.textPrimary} bg-transparent focus:outline-none ${selectedStyle.focusRing} rounded-lg px-3 py-2 border-2 border-transparent focus:border-rose-300 resize-none overflow-hidden`}
        style={{ 
          width: '100%', 
          boxSizing: 'border-box',
          fontSize: title.length >= TITLE_FONT_SHRINK_THRESHOLD ? 
            'clamp(1.25rem, 2.5vw, 1.5rem)' : 'clamp(1.875rem, 4vw, 2.25rem)',
          minHeight: 'clamp(2.5rem, 5vw, 3rem)',
          lineHeight: '1.2'
        }}
        placeholder="Enter your title"
        rows={1}
        autoFocus
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          target.style.height = 'auto';
          target.style.height = target.scrollHeight + 'px';
        }}
      />
    );
  }

  return (
    <h2 
      onClick={startTitleEditing}
      className={`font-bold ${title.trim() === '' || title.trim() === TITLE_PLACEHOLDER ? selectedStyle.textPlaceholder : selectedStyle.textPrimary} cursor-pointer hover:bg-rose-50 px-3 pb-4 pt-2 transition-all duration-200 border-2 border-transparent hover:border-rose-200 rounded-lg`}
      style={{ 
        display: 'block',
        fontSize: title.length >= TITLE_FONT_SHRINK_THRESHOLD ? 
          'clamp(1.25rem, 2.5vw, 1.5rem)' : 'clamp(1.875rem, 4vw, 2.25rem)'
      }}
      title="Click to edit title"
    >
      <span className={`${title.trim() === '' || title.trim() === TITLE_PLACEHOLDER ? 'border-b-4 border-dotted border-gray-300' : ''}`}>
        {title.trim() === '' ? TITLE_PLACEHOLDER : title}
      </span>
    </h2>
  );
};
