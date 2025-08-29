import { useState, useCallback } from 'react';

interface Choice {
  id: string;
  text: string;
  isEditing: boolean;
}

// SELECTED STYLE: Rose Garden + Floating
const selectedStyle = {
  background: "bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50",
  primaryGradient: "from-rose-500 to-pink-500",
  secondaryGradient: "from-rose-400 to-pink-400",
  textPrimary: "text-gray-900",
  textSecondary: "text-gray-600",
  textPlaceholder: "text-gray-400",
  borderColor: "border-rose-300",
  focusRing: "focus:ring-rose-500",
  buttonHover: "hover:from-rose-600 hover:to-pink-600"
};

// Unified components
interface EditableTitleProps {
  title: string;
  setTitle: (title: string) => void;
  isTitleEditing: boolean;
  setIsTitleEditing: (editing: boolean) => void;
  setTextareaRef: (node: HTMLTextAreaElement | null) => void;
  TITLE_PLACEHOLDER: string;
  TITLE_FONT_SHRINK_THRESHOLD: number;
}

const EditableTitle: React.FC<EditableTitleProps> = ({
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

interface EditableDescriptionProps {
  description: string;
  setDescription: (description: string) => void;
  isDescriptionEditing: boolean;
  setIsDescriptionEditing: (editing: boolean) => void;
  DESCRIPTION_PLACEHOLDER: string;
}

const EditableDescription: React.FC<EditableDescriptionProps> = ({
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

interface ChoiceItemProps {
  choice: Choice;
  choices: Choice[];
  updateChoice: (id: string, newText: string) => void;
  startEditing: (id: string) => void;
  removeChoice: (id: string) => void;
  isDesktop?: boolean;
}

const ChoiceItem: React.FC<ChoiceItemProps> = ({
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

export default function Home() {
  // Placeholder text constants
  const TITLE_PLACEHOLDER = '+ Add a title';
  const DESCRIPTION_PLACEHOLDER = '+ Add a description';
  const TITLE_FONT_SHRINK_THRESHOLD = 30;
  
  const [title, setTitle] = useState(TITLE_PLACEHOLDER);
  const [description, setDescription] = useState('');
  const [choices, setChoices] = useState<Choice[]>([
    { id: '1', text: 'Option 1', isEditing: false },
    { id: '2', text: 'Option 2', isEditing: false },
    { id: '3', text: 'Option 3', isEditing: false },
  ]);
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);

  // Callback ref to set height when textarea is mounted
  const setTextareaRef = useCallback((node: HTMLTextAreaElement | null) => {
    if (node) {
      // Set height immediately when textarea is mounted
      node.style.height = 'auto';
      node.style.height = node.scrollHeight + 'px';
    }
  }, []);

  const addChoice = () => {
    const newId = (choices.length + 1).toString();
    setChoices([...choices, { id: newId, text: `Option ${newId}`, isEditing: false }]);
  };

  const updateChoice = (id: string, newText: string) => {
    setChoices(choices.map(choice => 
      choice.id === id ? { ...choice, text: newText, isEditing: false } : choice
    ));
  };

  const startEditing = (id: string): void => {
    setChoices(choices.map(choice => 
      choice.id === id ? { ...choice, isEditing: true } : choice
    ));
  };

  const removeChoice = (id: string) => {
    if (choices.length > 2) {
      setChoices(choices.filter(choice => choice.id !== id));
    }
  };

  return (
    <div id="page" className={`min-h-screen ${selectedStyle.background}`} style={{ width: '100%', maxWidth: '80rem', margin: '0 auto' }}>
      {/* Minimal Header */}
      <header className="border-b border-gray-200/50 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <h1 className={`text-xl font-semibold ${selectedStyle.textPrimary}`}>Ranked Choice</h1>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-200">
                Share
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-12" style={{ gridTemplateColumns: 'repeat(12, 1fr)', width: '100%' }}>
          {/* Left Column - Title and Description */}
          <div className="lg:col-span-5 xl:col-span-4" style={{ minWidth: 0, maxWidth: 'none', width: '100%' }}>
            <div className="sticky top-24">
              {/* Editable Title */}
              <div className="mb-4 w-full" style={{ minWidth: 0, maxWidth: '100%' }}>
                <EditableTitle
                  title={title}
                  setTitle={setTitle}
                  isTitleEditing={isTitleEditing}
                  setIsTitleEditing={setIsTitleEditing}
                  setTextareaRef={setTextareaRef}
                  TITLE_PLACEHOLDER={TITLE_PLACEHOLDER}
                  TITLE_FONT_SHRINK_THRESHOLD={TITLE_FONT_SHRINK_THRESHOLD}
                />
              </div>

              {/* Editable Description */}
              <div className="mb-8 w-full" style={{ minWidth: 0, maxWidth: '100%' }}>
                <EditableDescription
                  description={description}
                  setDescription={setDescription}
                  isDescriptionEditing={isDescriptionEditing}
                  setIsDescriptionEditing={setIsDescriptionEditing}
                  DESCRIPTION_PLACEHOLDER={DESCRIPTION_PLACEHOLDER}
                />
              </div>

              {/* Footer Info */}
              <div className={`${selectedStyle.textSecondary} text-sm`}>
                <p>Your poll is live and ready to share!</p>
              </div>
            </div>
          </div>

          {/* Right Column - Choices */}
          <div className="lg:col-span-7 xl:col-span-8" style={{ minWidth: 0, maxWidth: 'none', width: '100%' }}>
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 xl:p-12 shadow-xl">
              <h3 className={`text-2xl xl:text-3xl font-semibold ${selectedStyle.textPrimary} mb-8 xl:mb-12`}>
                Choices
              </h3>
              <div className="space-y-6 xl:space-y-8">
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
                className={`w-full mt-8 xl:mt-12 px-8 py-6 xl:py-8 border-2 border-dashed ${selectedStyle.borderColor} text-rose-500 hover:border-rose-400 hover:bg-rose-50 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 text-lg xl:text-xl font-medium`}
              >
                <svg className="w-6 h-6 xl:w-7 xl:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Choice
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="max-w-2xl mx-auto">
            {/* Editable Title */}
            <div className="mb-2 w-full" style={{ minWidth: 0, maxWidth: '100%' }}>
              <EditableTitle
                title={title}
                setTitle={setTitle}
                isTitleEditing={isTitleEditing}
                setIsTitleEditing={setIsTitleEditing}
                setTextareaRef={setTextareaRef}
                TITLE_PLACEHOLDER={TITLE_PLACEHOLDER}
                TITLE_FONT_SHRINK_THRESHOLD={TITLE_FONT_SHRINK_THRESHOLD}
              />
            </div>

            {/* Editable Description */}
            <div className="mb-8 w-full" style={{ minWidth: 0, maxWidth: '100%' }}>
              <EditableDescription
                description={description}
                setDescription={setDescription}
                isDescriptionEditing={isDescriptionEditing}
                setIsDescriptionEditing={setIsDescriptionEditing}
                DESCRIPTION_PLACEHOLDER={DESCRIPTION_PLACEHOLDER}
              />
            </div>

            {/* Choices Section */}
            <div className="space-y-6 mx-4">
              <h3 className={`text-lg font-semibold ${selectedStyle.textPrimary} mb-6`}>
                Choices
              </h3>
              <div className="space-y-4">
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
                className={`w-full px-6 py-4 border-2 border-dashed ${selectedStyle.borderColor} text-rose-500 hover:border-rose-400 hover:bg-rose-50 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-base font-medium`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Choice
              </button>
            </div>

            {/* Footer Info */}
            <div className={`text-center ${selectedStyle.textSecondary} text-sm mt-12`}>
              <p>Your poll is live and ready to share!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
