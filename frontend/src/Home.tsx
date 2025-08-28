import { useState } from 'react';

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

export default function Home() {
  const [title, setTitle] = useState('My Ranked Choice Poll');
  const [description, setDescription] = useState('');
  const [choices, setChoices] = useState<Choice[]>([
    { id: '1', text: 'Option 1', isEditing: false },
    { id: '2', text: 'Option 2', isEditing: false },
    { id: '3', text: 'Option 3', isEditing: false },
  ]);
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);

  const addChoice = () => {
    const newId = (choices.length + 1).toString();
    setChoices([...choices, { id: newId, text: `Option ${newId}`, isEditing: false }]);
  };

  const updateChoice = (id: string, newText: string) => {
    setChoices(choices.map(choice => 
      choice.id === id ? { ...choice, text: newText, isEditing: false } : choice
    ));
  };

  const startEditing = (id: string) => {
    setChoices(choices.map(choice => 
      choice.id === id ? { ...choice, isEditing: true } : choice
    ));
  };

  const startTitleEditing = () => {
    setIsTitleEditing(true);
    // If title is placeholder text, clear it for editing
    if (title.trim() === '' || title.trim() === 'My Ranked Choice Poll') {
      setTitle('');
    }
  };

  const startDescriptionEditing = () => {
    setIsDescriptionEditing(true);
    // If description is empty, don't change anything
  };

  const removeChoice = (id: string) => {
    if (choices.length > 2) {
      setChoices(choices.filter(choice => choice.id !== id));
    }
  };

  const saveTitle = (newTitle: string) => {
    setTitle(newTitle);
    setIsTitleEditing(false);
  };

  const saveDescription = (newDescription: string) => {
    setDescription(newDescription);
    setIsDescriptionEditing(false);
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
              <div className="mb-8 w-full" style={{ minWidth: 0, maxWidth: '100%' }}>
                {isTitleEditing ? (
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={() => saveTitle(title)}
                    onKeyPress={(e) => e.key === 'Enter' && saveTitle(title)}
                                      className={`text-4xl xl:text-5xl font-bold ${selectedStyle.textPrimary} bg-transparent focus:outline-none ${selectedStyle.focusRing} rounded-lg px-3 py-2 border-2 border-transparent focus:border-rose-300`}
                  style={{ width: '100%', maxWidth: '28rem', boxSizing: 'border-box' }}
                  placeholder="Enter your title"
                    autoFocus
                  />
                ) : (
                  <h2 
                    onClick={startTitleEditing}
                    className={`text-4xl xl:text-5xl font-bold ${title.trim() === '' || title.trim() === 'My Ranked Choice Poll' ? selectedStyle.textPlaceholder : selectedStyle.textPrimary} cursor-pointer hover:bg-rose-50 rounded-lg px-3 py-2 transition-all duration-200 border-2 border-transparent hover:border-rose-200`}
                    style={{ width: '400px', display: 'block' }}
                    title="Click to edit title"
                  >
                    {title.trim() === '' ? 'My Ranked Choice Poll' : title}
                  </h2>
                )}
              </div>

              {/* Editable Description */}
              <div className="mb-8 w-full" style={{ minWidth: 0, maxWidth: '100%' }}>
                {isDescriptionEditing ? (
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={() => saveDescription(description)}
                    onKeyPress={(e) => e.key === 'Enter' && e.ctrlKey && saveDescription(description)}
                    className={`text-lg xl:text-xl ${selectedStyle.textSecondary} bg-transparent focus:outline-none ${selectedStyle.focusRing} rounded-lg px-3 py-2 border-2 border-transparent focus:border-rose-300 resize-none`}
                  style={{ width: '100%', maxWidth: '28rem', boxSizing: 'border-box' }}
                    placeholder="Add a description for your poll..."
                    rows={3}
                    autoFocus
                  />
                              ) : description && description.trim() !== '' ? (
                <p 
                  onClick={startDescriptionEditing}
                  className={`text-lg xl:text-xl ${selectedStyle.textSecondary} cursor-pointer hover:bg-rose-50 rounded-lg px-3 py-2 transition-all duration-200 border-2 border-transparent hover:border-rose-200`}
                  style={{ width: '400px', display: 'block' }}
                  title="Click to edit description"
                >
                  {description}
                </p>
              ) : (
                <button
                  onClick={startDescriptionEditing}
                  className={`text-lg xl:text-xl ${selectedStyle.textPlaceholder} hover:text-rose-500 transition-colors duration-200 underline decoration-dotted px-3 py-2`}
                >
                  + Add description
                </button>
              )}
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
                  <div key={choice.id} className="flex items-center gap-4 xl:gap-6">
                    <div className="flex-1">
                      {choice.isEditing ? (
                        <input
                          type="text"
                          value={choice.text}
                          onChange={(e) => updateChoice(choice.id, e.target.value)}
                          onBlur={() => updateChoice(choice.id, choice.text)}
                          onKeyPress={(e) => e.key === 'Enter' && updateChoice(choice.id, choice.text)}
                          className={`w-full px-6 py-4 text-lg xl:text-xl ${choice.text.startsWith('Option ') ? selectedStyle.textPlaceholder : selectedStyle.textPrimary} bg-white border-2 border-rose-200 rounded-xl ${selectedStyle.focusRing} focus:border-rose-400 transition-all duration-200 shadow-sm`}
                          placeholder="Enter choice text..."
                          autoFocus
                        />
                      ) : (
                        <div
                          onClick={() => startEditing(choice.id)}
                          className={`px-6 py-4 text-lg xl:text-xl ${choice.text.startsWith('Option ') ? selectedStyle.textPlaceholder : selectedStyle.textPrimary} bg-white border-2 border-transparent hover:border-rose-200 cursor-pointer rounded-xl transition-all duration-200 hover:bg-rose-50 shadow-sm hover:shadow-md`}
                          title="Click to edit choice"
                        >
                          {choice.text}
                        </div>
                      )}
                    </div>
                    {choices.length > 2 && (
                      <button
                        onClick={() => removeChoice(choice.id)}
                        className="flex-shrink-0 w-12 h-12 xl:w-14 xl:h-14 text-red-500 hover:bg-red-50 rounded-xl flex items-center justify-center transition-colors duration-200"
                        title="Remove choice"
                      >
                        <svg className="w-6 h-6 xl:w-7 xl:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
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
            <div className="mb-8 w-full" style={{ minWidth: 0, maxWidth: '100%' }}>
              {isTitleEditing ? (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={() => saveTitle(title)}
                  onKeyPress={(e) => e.key === 'Enter' && saveTitle(title)}
                  className={`text-3xl font-bold ${selectedStyle.textPrimary} bg-transparent focus:outline-none ${selectedStyle.focusRing} rounded-lg px-3 py-2 border-2 border-transparent focus:border-rose-300`}
                  style={{ width: '100%', maxWidth: '24rem', boxSizing: 'border-box' }}
                  placeholder="Enter your title"
                  autoFocus
                />
              ) : (
                <h2 
                  onClick={startTitleEditing}
                  className={`text-3xl font-bold ${title === 'My Ranked Choice Poll' ? selectedStyle.textPlaceholder : selectedStyle.textPrimary} cursor-pointer hover:bg-rose-50 rounded-lg px-3 py-2 transition-all duration-200 border-2 border-transparent hover:border-rose-200`}
                  style={{ width: '320px', display: 'block' }}
                  title="Click to edit title"
                >
                  {title}
                </h2>
              )}
            </div>

            {/* Editable Description */}
            <div className="mb-12 w-full" style={{ minWidth: 0, maxWidth: '100%' }}>
              {isDescriptionEditing ? (
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onBlur={() => saveDescription(description)}
                  onKeyPress={(e) => e.key === 'Enter' && e.ctrlKey && saveDescription(description)}
                  className={`text-base ${selectedStyle.textSecondary} bg-transparent focus:outline-none ${selectedStyle.focusRing} rounded-lg px-3 py-2 border-2 border-transparent focus:border-rose-300 resize-none`}
                  style={{ width: '100%', maxWidth: '24rem', boxSizing: 'border-box' }}
                  placeholder="Add a description for your poll..."
                  rows={2}
                  autoFocus
                />
              ) : description ? (
                <p 
                  onClick={startDescriptionEditing}
                  className={`text-base ${selectedStyle.textSecondary} cursor-pointer hover:bg-rose-50 rounded-lg px-3 py-2 transition-all duration-200 border-2 border-transparent hover:border-rose-200`}
                  style={{ width: '320px', display: 'block' }}
                  title="Click to edit description"
                >
                  {description}
                </p>
              ) : (
                <button
                  onClick={startDescriptionEditing}
                  className={`text-base ${selectedStyle.textPlaceholder} hover:text-rose-500 transition-colors duration-200 underline decoration-dotted px-3 py-2`}
                >
                  + Add description
                </button>
              )}
            </div>

            {/* Choices Section */}
            <div className="space-y-6">
              <h3 className={`text-lg font-semibold ${selectedStyle.textPrimary} mb-6`}>
                Choices
              </h3>
              <div className="space-y-4">
                {choices.map((choice) => (
                  <div key={choice.id} className="flex items-center gap-3">
                    <div className="flex-1">
                      {choice.isEditing ? (
                        <input
                          type="text"
                          value={choice.text}
                          onChange={(e) => updateChoice(choice.id, e.target.value)}
                          onBlur={() => updateChoice(choice.id, choice.text)}
                          onKeyPress={(e) => e.key === 'Enter' && updateChoice(choice.id, choice.text)}
                          className={`w-full px-4 py-3 text-base ${choice.text.startsWith('Option ') ? selectedStyle.textPlaceholder : selectedStyle.textPrimary} bg-white border-2 border-rose-200 rounded-lg ${selectedStyle.focusRing} focus:border-rose-400 transition-all duration-200`}
                          placeholder="Enter choice text..."
                          autoFocus
                        />
                      ) : (
                        <div
                          onClick={() => startEditing(choice.id)}
                          className={`px-4 py-3 text-base ${choice.text.startsWith('Option ') ? selectedStyle.textPlaceholder : selectedStyle.textPrimary} bg-white border-2 border-transparent hover:border-rose-200 cursor-pointer rounded-lg transition-all duration-200 hover:bg-rose-50`}
                          title="Click to edit choice"
                        >
                          {choice.text}
                        </div>
                      )}
                    </div>
                    {choices.length > 2 && (
                      <button
                        onClick={() => removeChoice(choice.id)}
                        className="flex-shrink-0 w-10 h-10 text-red-500 hover:bg-red-50 rounded-lg flex items-center justify-center transition-colors duration-200"
                        title="Remove choice"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
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
