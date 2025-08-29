import React, { useEffect, useRef, useState } from 'react';
import type { EditableTitleProps } from '../types/poll';
import { selectedStyle } from '../styles/theme';

export const EditableTitle: React.FC<EditableTitleProps> = ({
  title,
  setTitle,
  isTitleEditing,
  setIsTitleEditing,
  setTextareaRef,
  TITLE_PLACEHOLDER
}) => {
  const [fontSize, setFontSize] = useState<'large' | 'small'>('large');
  const sizeTesterRef = useRef<HTMLHeadingElement>(null);

  // Calculate line count and adjust font size
  useEffect(() => {
    console.log('title:', title);
    console.log('sizeTesterRef.current:', sizeTesterRef.current);
    if (sizeTesterRef.current && title.trim() !== '' && title.trim() !== TITLE_PLACEHOLDER) {
      console.log('testing size');
      const element = sizeTesterRef.current;
      const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
      const scrollHeight = element.scrollHeight;
      const lineCount = Math.ceil(scrollHeight / lineHeight);

      console.log('lineHeight', lineHeight);
      console.log('scrollHeight', scrollHeight);
      console.log('lineCount', lineCount);
      console.log('use font size', lineCount >= 3 ? 'small' : 'large');
      // Switch to small font if 3 or more lines
      setFontSize(lineCount >= 3 ? 'small' : 'large');
    } else {
      console.log("use large font");
      // Default to large font for empty/placeholder text
      setFontSize('large');
    }
  }, [title, TITLE_PLACEHOLDER]);

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
          fontSize: fontSize === 'large' 
            ? 'clamp(1.875rem, 4vw, 2.25rem)' 
            : 'clamp(1.25rem, 2.5vw, 1.5rem)',
          minHeight: 'clamp(2.5rem, 5vw, 3rem)',
          lineHeight: '1.2',
          transition: 'font-size 0.2s ease-in-out'
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
    <>
      <h2 
        onClick={startTitleEditing}
        className={`font-bold ${title.trim() === '' || title.trim() === TITLE_PLACEHOLDER ? selectedStyle.textPlaceholder : selectedStyle.textPrimary} cursor-pointer hover:bg-rose-50 px-3 pb-4 pt-2 transition-all duration-200 border-2 border-transparent hover:border-rose-200 rounded-lg`}
        style={{ 
          display: 'block',
          fontSize: fontSize === 'large' 
            ? 'clamp(1.875rem, 4vw, 2.25rem)' 
            : 'clamp(1.25rem, 2.5vw, 1.5rem)',
          transition: 'font-size 0.2s ease-in-out'
        }}
        title="Click to edit title"
      >
        <span className={`${title.trim() === '' || title.trim() === TITLE_PLACEHOLDER ? 'border-b-4 border-dotted border-gray-300' : ''}`}>
          {title.trim() === '' ? TITLE_PLACEHOLDER : title}
        </span>
      </h2>
      <h2 
        ref={sizeTesterRef}
        className={`size-tester font-bold ${title.trim() === '' || title.trim() === TITLE_PLACEHOLDER ? selectedStyle.textPlaceholder : selectedStyle.textPrimary} px-3 pb-4 pt-2 border-2 border-transparent rounded-lg`}
        style={{ 
          // visibility: 'hidden',
          // position: 'absolute',
          // left: '-9999px',
          width: '100%',
          maxWidth: 'inherit',
          fontSize: 'clamp(1.875rem, 4vw, 2.25rem)',
          lineHeight: '1.2',
          margin: 0,
          padding: '0.5rem 0.75rem 1rem 0.75rem'
        }}
      >
        <span className={`${title.trim() === '' || title.trim() === TITLE_PLACEHOLDER ? 'border-b-4 border-dotted border-gray-300' : ''}`}>
          {title.trim() === '' ? TITLE_PLACEHOLDER : title}
        </span>
      </h2>
    </>
  );
};
