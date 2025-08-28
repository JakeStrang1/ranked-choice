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
    <div className={`min-h-screen ${selectedStyle.background}`}>
      {/* Minimal Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200/50">
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
      </header>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Editable Title */}
        <div className="mb-8">
          {isTitleEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => saveTitle(title)}
              onKeyPress={(e) => e.key === 'Enter' && saveTitle(title)}
              className={`text-4xl font-bold ${selectedStyle.textPrimary} bg-transparent w-full focus:outline-none ${selectedStyle.focusRing} rounded-lg px-3 py-2 border-2 border-transparent focus:border-rose-300`}
              placeholder="Enter your poll title..."
              autoFocus
            />
          ) : (
            <h2 
              onClick={() => setIsTitleEditing(true)}
              className={`text-4xl font-bold ${title === 'My Ranked Choice Poll' ? selectedStyle.textPlaceholder : selectedStyle.textPrimary} cursor-pointer hover:bg-rose-50 rounded-lg px-3 py-2 transition-all duration-200 border-2 border-transparent hover:border-rose-200`}
              title="Click to edit title"
            >
              {title}
            </h2>
          )}
        </div>

        {/* Editable Description */}
        <div className="mb-12">
          {isDescriptionEditing ? (
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => saveDescription(description)}
              onKeyPress={(e) => e.key === 'Enter' && e.ctrlKey && saveDescription(description)}
              className={`text-lg ${selectedStyle.textSecondary} bg-transparent w-full focus:outline-none ${selectedStyle.focusRing} rounded-lg px-3 py-2 border-2 border-transparent focus:border-rose-300 resize-none`}
              placeholder="Add a description for your poll..."
              rows={2}
              autoFocus
            />
          ) : description ? (
            <p 
              onClick={() => setIsDescriptionEditing(true)}
              className={`text-lg ${selectedStyle.textSecondary} cursor-pointer hover:bg-rose-50 rounded-lg px-3 py-2 transition-all duration-200 border-2 border-transparent hover:border-rose-200`}
              title="Click to edit description"
            >
              {description}
            </p>
          ) : (
            <button
              onClick={() => setIsDescriptionEditing(true)}
              className={`text-lg ${selectedStyle.textPlaceholder} hover:text-rose-500 transition-colors duration-200 underline decoration-dotted px-3 py-2`}
            >
              + Add description
            </button>
          )}
        </div>

        {/* Choices Section */}
        <div className="space-y-6">
          <h3 className={`text-xl font-semibold ${selectedStyle.textPrimary} mb-6`}>
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
                      className={`w-full px-4 py-3 text-lg ${choice.text.startsWith('Option ') ? selectedStyle.textPlaceholder : selectedStyle.textPrimary} bg-white border-2 border-rose-200 rounded-lg ${selectedStyle.focusRing} focus:border-rose-400 transition-all duration-200`}
                      placeholder="Enter choice text..."
                      autoFocus
                    />
                  ) : (
                    <div
                      onClick={() => startEditing(choice.id)}
                      className={`px-4 py-3 text-lg ${choice.text.startsWith('Option ') ? selectedStyle.textPlaceholder : selectedStyle.textPrimary} bg-white border-2 border-transparent hover:border-rose-200 cursor-pointer rounded-lg transition-all duration-200 hover:bg-rose-50`}
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
            className={`w-full px-6 py-4 border-2 border-dashed ${selectedStyle.borderColor} text-rose-500 hover:border-rose-400 hover:bg-rose-50 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-lg font-medium`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  );
}
