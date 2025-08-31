import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { EditableTextProps } from '../types/poll';


export const EditableText: React.FC<EditableTextProps> = ({
  value,
  setValue,
  isValueEditing,
  setIsValueEditing,
  placeholder,
  dualFontSize,
  textPrimaryClass = 'text-gray-900',
  textPlaceholderClass = 'text-gray-500',
  focusRingClass = 'focus:ring-2 focus:ring-rose-300'
}) => {
  const [fontSize, setFontSize] = useState<'large' | 'small'>('large');
  const [sizeTesterHeight, setSizeTesterHeight] = useState<number>(0);
  const sizeTesterRef = useRef<HTMLHeadingElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Callback ref to set height when textarea is mounted
  const setTextareaRef = useCallback((node: HTMLTextAreaElement | null) => {
    if (node) {
      textareaRef.current = node;
      // Set height immediately when textarea is mounted
      node.style.height = 'auto';
      node.style.height = node.scrollHeight + 'px';
    }
  }, []);

  // Calculate line count and adjust font size
  useEffect(() => {
    updateState();
  }, [value, placeholder]);

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
  }, [isValueEditing]);

  // Re-measure height when viewport size changes
  useEffect(() => {
    const handleResize = () => {
      updateState();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

    const updateState = () => {
    // Only do dynamic font sizing if dualFontSize is provided
    if (!dualFontSize) {
      return;
    }

    if (sizeTesterRef.current) {
      const element = sizeTesterRef.current;
      const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
      const scrollHeight = element.scrollHeight;
      const lineCount = Math.floor(scrollHeight / lineHeight);
      
      // Store the height for margin calculation
      setSizeTesterHeight(scrollHeight);
      
      // Switch to small font if threshold or more lines
      const threshold = dualFontSize.linesThreshold;
      const newFontSize = lineCount >= threshold ? 'small' : 'large';
      setFontSize(newFontSize);

      // Make sure the textarea adjusts automatically to the appropriate height
      if (newFontSize !== fontSize) {
        if (newFontSize === 'small') {
          setTimeout(() => {
            if (textareaRef.current) {
              textareaRef.current.style.height = 'auto'; // Apparently this line is necessary
              textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
            }
          }, 250);
        } else {
          if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = element.scrollHeight + 'px';
          }
        }
      }
    } else {
      // Default to large font for empty/placeholder text
      setFontSize('large');
      setSizeTesterHeight(0);
    }
  }

  const startTitleEditing = () => {
    setIsValueEditing(true);
    if (value.trim() === '' || value.trim() === placeholder) {
      setValue('');
    }
  };

  const saveValue = (newTitle: string) => {
    setValue(newTitle);
    setIsValueEditing(false);
  };

  return (
    <>
      {isValueEditing ? (
        <textarea
          ref={setTextareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => saveValue(value)}
          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && saveValue(value)}
          className={`font-bold ${textPrimaryClass} bg-transparent focus:outline-none ${focusRingClass} rounded-lg px-3 py-2 border-2 border-transparent focus:border-rose-300 resize-none overflow-hidden`}
                           style={{ 
           width: '100%', 
           boxSizing: 'border-box',
           fontSize: dualFontSize 
             ? (fontSize === 'large' ? dualFontSize.largeFontSize : dualFontSize.smallFontSize)
             : undefined,

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
          className={`font-bold ${value.trim() === '' || value.trim() === placeholder ? textPlaceholderClass : textPrimaryClass} cursor-pointer hover:bg-rose-50 px-3 pb-4 pt-2 transition-all duration-200 border-2 border-transparent hover:border-rose-200 rounded-lg`}
                     style={{ 
             display: 'block',
             fontSize: dualFontSize 
               ? (fontSize === 'large' ? dualFontSize.largeFontSize : dualFontSize.smallFontSize)
               : undefined,

             transition: 'font-size 0.2s ease-in-out'
           }}
          title="Click to edit title"
        >
          <span className={`${value.trim() === '' || value.trim() === placeholder ? 'border-b-4 border-dotted border-gray-300' : ''}`}>
            {value.trim() === '' ? placeholder : value}
          </span>
        </h2>
      )}
      
            {/* Only render size-tester for measurement when dualFontSize is provided */}
      {dualFontSize && (
        <h2 
          ref={sizeTesterRef}
          className={`size-tester font-bold ${value.trim() === '' || value.trim() === placeholder ? textPlaceholderClass : textPrimaryClass} px-3 pb-4 pt-2 border-2 border-transparent rounded-lg`}
          style={{ 
            visibility: 'hidden',
            width: '100%',
            maxWidth: 'inherit',
            fontSize: dualFontSize.largeFontSize,
 
            marginTop: `-${sizeTesterHeight}px`,
            padding: '0.5rem 0.75rem 1rem 0.75rem'
          }}
        >
          <span className={`${value.trim() === '' || value.trim() === placeholder ? 'border-b-4 border-dotted border-gray-300' : ''}`}>
            {value.trim() === '' ? placeholder : value}
          </span>
        </h2>
      )}
    </>
  );
};
