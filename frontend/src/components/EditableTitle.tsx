import React, { useEffect, useRef, useState } from 'react';
import type { EditableTitleProps } from '../types/poll';
import { selectedStyle } from '../styles/theme';
import { TITLE_FONT_LARGE, TITLE_FONT_SMALL, TITLE_LINE_COUNT_THRESHOLD } from '../constants/poll';

export const EditableTitle: React.FC<EditableTitleProps> = ({
  title,
  setTitle,
  isTitleEditing,
  setIsTitleEditing,
  setTextareaRef,
  TITLE_PLACEHOLDER
}) => {
  const [fontSize, setFontSize] = useState<'large' | 'small'>('large');
  const [sizeTesterHeight, setSizeTesterHeight] = useState<number>(0);
  const sizeTesterRef = useRef<HTMLHeadingElement>(null);

  // Calculate line count and adjust font size
  useEffect(() => {
    if (sizeTesterRef.current && title.trim() !== '' && title.trim() !== TITLE_PLACEHOLDER) {
      const element = sizeTesterRef.current;
      const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
      const scrollHeight = element.scrollHeight;
      const lineCount = Math.floor(scrollHeight / lineHeight);
      
      // Store the height for margin calculation
      setSizeTesterHeight(scrollHeight);
      
      // Switch to small font if threshold or more lines
      setFontSize(lineCount >= TITLE_LINE_COUNT_THRESHOLD ? 'small' : 'large');
    } else {
      // Default to large font for empty/placeholder text
      setFontSize('large');
      setSizeTesterHeight(0);
    }
  }, [title, TITLE_PLACEHOLDER]);

  // Measure initial height when component mounts
  useEffect(() => {
    if (sizeTesterRef.current) {
      const element = sizeTesterRef.current;
      const scrollHeight = element.scrollHeight;
      setSizeTesterHeight(scrollHeight);
    }
  }, []); // Empty dependency array = runs only on mount

  // Re-measure height when editing state changes
  useEffect(() => {
    if (sizeTesterRef.current) {
      const element = sizeTesterRef.current;
      const scrollHeight = element.scrollHeight;
      setSizeTesterHeight(scrollHeight);
    }
  }, [isTitleEditing]);

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

  return (
    <>
      {isTitleEditing ? (
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
            ? TITLE_FONT_LARGE 
            : TITLE_FONT_SMALL,
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
      ) : (
        <h2 
          onClick={startTitleEditing}
          className={`font-bold ${title.trim() === '' || title.trim() === TITLE_PLACEHOLDER ? selectedStyle.textPlaceholder : selectedStyle.textPrimary} cursor-pointer hover:bg-rose-50 px-3 pb-4 pt-2 transition-all duration-200 border-2 border-transparent hover:border-rose-200 rounded-lg`}
          style={{ 
            display: 'block',
            fontSize: fontSize === 'large' 
              ? TITLE_FONT_LARGE 
              : TITLE_FONT_SMALL,
            lineHeight: '1.2',
            transition: 'font-size 0.2s ease-in-out'
          }}
          title="Click to edit title"
        >
          <span className={`${title.trim() === '' || title.trim() === TITLE_PLACEHOLDER ? 'border-b-4 border-dotted border-gray-300' : ''}`}>
            {title.trim() === '' ? TITLE_PLACEHOLDER : title}
          </span>
        </h2>
      )}
      
      {/* Always render size-tester for measurement, regardless of editing state */}
      <h2 
        ref={sizeTesterRef}
        className={`size-tester font-bold ${title.trim() === '' || title.trim() === TITLE_PLACEHOLDER ? selectedStyle.textPlaceholder : selectedStyle.textPrimary} px-3 pb-4 pt-2 border-2 border-transparent rounded-lg`}
        style={{ 
          visibility: 'hidden',
          width: '100%',
          maxWidth: 'inherit',
          fontSize: TITLE_FONT_LARGE,
          lineHeight: '1.2',
          marginTop: `-${sizeTesterHeight}px`,
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
