import { useState, useCallback } from 'react';
import type { Choice } from './types/poll';
import { selectedStyle } from './styles/theme';
import { EditableTitle, EditableDescription, Header, ChoicesSection } from './components';

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
      <Header />

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
            <ChoicesSection
              choices={choices}
              updateChoice={updateChoice}
              startEditing={startEditing}
              removeChoice={removeChoice}
              addChoice={addChoice}
              isDesktop={true}
            />
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
            <ChoicesSection
              choices={choices}
              updateChoice={updateChoice}
              startEditing={startEditing}
              removeChoice={removeChoice}
              addChoice={addChoice}
              isDesktop={false}
            />

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
