import { useState } from 'react';

interface Choice {
  id: string;
  text: string;
  isEditing: boolean;
}

// STYLE THEMES - Commented out for future use
/*
interface StyleTheme {
  name: string;
  background: string;
  cardBg: string;
  primaryGradient: string;
  secondaryGradient: string;
  textPrimary: string;
  textSecondary: string;
  borderColor: string;
  focusRing: string;
  buttonHover: string;
}

const styleThemes: StyleTheme[] = [
  {
    name: "Ocean Blue",
    background: "bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50",
    cardBg: "bg-white",
    primaryGradient: "from-blue-600 to-cyan-600",
    secondaryGradient: "from-blue-500 to-cyan-500",
    textPrimary: "text-gray-800",
    textSecondary: "text-gray-600",
    borderColor: "border-blue-300",
    focusRing: "focus:ring-blue-500",
    buttonHover: "hover:from-blue-700 hover:to-cyan-700"
  },
  {
    name: "Sunset",
    background: "bg-gradient-to-br from-orange-50 via-red-50 to-pink-50",
    cardBg: "bg-white",
    primaryGradient: "from-orange-500 to-red-500",
    secondaryGradient: "from-orange-400 to-red-400",
    textPrimary: "text-gray-800",
    textSecondary: "text-gray-600",
    borderColor: "border-orange-300",
    focusRing: "focus:ring-orange-500",
    buttonHover: "hover:from-orange-600 hover:to-red-600"
  },
  {
    name: "Forest",
    background: "bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50",
    cardBg: "bg-white",
    primaryGradient: "from-green-600 to-emerald-600",
    secondaryGradient: "from-green-500 to-emerald-500",
    textPrimary: "text-gray-800",
    textSecondary: "text-gray-600",
    borderColor: "border-green-300",
    focusRing: "focus:ring-green-500",
    buttonHover: "hover:from-green-700 hover:to-emerald-700"
  },
  {
    name: "Royal Purple",
    background: "bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50",
    cardBg: "bg-white",
    primaryGradient: "from-purple-600 to-violet-600",
    secondaryGradient: "from-purple-500 to-violet-500",
    textPrimary: "text-gray-800",
    textSecondary: "text-gray-600",
    borderColor: "border-purple-300",
    focusRing: "focus:ring-purple-500",
    buttonHover: "hover:from-purple-700 hover:to-violet-700"
  },
  {
    name: "Midnight",
    background: "bg-gradient-to-br from-gray-900 via-slate-800 to-zinc-800",
    cardBg: "bg-gray-800",
    primaryGradient: "from-indigo-500 to-purple-500",
    secondaryGradient: "from-indigo-400 to-purple-400",
    textPrimary: "text-white",
    textSecondary: "text-gray-300",
    borderColor: "border-gray-600",
    focusRing: "focus:ring-indigo-500",
    buttonHover: "hover:from-indigo-600 hover:to-purple-600"
  },
  {
    name: "Warm Cream",
    background: "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50",
    cardBg: "bg-amber-50",
    primaryGradient: "from-amber-600 to-orange-600",
    secondaryGradient: "from-amber-500 to-orange-500",
    textPrimary: "text-gray-800",
    textSecondary: "text-gray-600",
    borderColor: "border-amber-300",
    focusRing: "focus:ring-amber-500",
    buttonHover: "hover:from-amber-700 hover:to-orange-700"
  },
  {
    name: "Ocean Deep",
    background: "bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900",
    cardBg: "bg-slate-800",
    primaryGradient: "from-cyan-400 to-blue-500",
    secondaryGradient: "from-cyan-300 to-blue-400",
    textPrimary: "text-white",
    textSecondary: "text-cyan-100",
    borderColor: "border-slate-600",
    focusRing: "focus:ring-cyan-500",
    buttonHover: "hover:from-cyan-500 hover:to-blue-600"
  },
  {
    name: "Mint Fresh",
    background: "bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50",
    cardBg: "bg-emerald-50",
    primaryGradient: "from-emerald-500 to-teal-500",
    secondaryGradient: "from-emerald-400 to-teal-400",
    textPrimary: "text-gray-800",
    textSecondary: "text-gray-600",
    borderColor: "border-emerald-300",
    focusRing: "focus:ring-emerald-500",
    buttonHover: "hover:from-emerald-600 hover:to-teal-600"
  },
  {
    name: "Classic Gray",
    background: "bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50",
    cardBg: "bg-white",
    primaryGradient: "from-gray-600 to-slate-600",
    secondaryGradient: "from-gray-500 to-slate-500",
    textPrimary: "text-gray-800",
    textSecondary: "text-gray-600",
    borderColor: "border-gray-300",
    focusRing: "focus:ring-gray-500",
    buttonHover: "hover:from-gray-700 hover:to-slate-700"
  }
];
*/

// LAYOUT STYLES - Commented out for future use
/*
interface LayoutStyle {
  name: string;
  cardStyle: string;
  inputStyle: string;
  buttonStyle: string;
  spacing: string;
  shadow: string;
  borderRadius: string;
  borderStyle: string;
}

const layoutStyles: LayoutStyle[] = [
  {
    name: "Classic",
    cardStyle: "bg-white border border-gray-200",
    inputStyle: "border border-gray-200 focus:ring-2",
    buttonStyle: "shadow-lg hover:shadow-xl",
    spacing: "p-6 space-y-6",
    shadow: "shadow-xl",
    borderRadius: "rounded-2xl",
    borderStyle: "border border-gray-200"
  },
  {
    name: "Minimal",
    cardStyle: "bg-white/90 backdrop-blur-sm",
    inputStyle: "border-0 border-b-2 border-gray-200 focus:ring-2 focus:border-blue-500",
    buttonStyle: "shadow-sm hover:shadow-md",
    spacing: "p-8 space-y-8",
    shadow: "shadow-lg",
    borderRadius: "rounded-xl",
    borderStyle: "border-b-2 border-gray-200"
  },
  {
    name: "Bordered",
    cardStyle: "bg-white border-2 border-gray-300",
    inputStyle: "border-2 border-gray-300 focus:ring-2",
    buttonStyle: "border-2 border-transparent shadow-md hover:shadow-lg",
    spacing: "p-6 space-y-6",
    shadow: "shadow-xl",
    borderRadius: "rounded-2xl",
    borderStyle: "border-2 border-gray-300"
  },
  {
    name: "Compact",
    cardStyle: "bg-white border border-gray-200",
    inputStyle: "border border-gray-200 focus:ring-1",
    buttonStyle: "shadow-md hover:shadow-lg",
    spacing: "p-4 space-y-4",
    shadow: "shadow-lg",
    borderRadius: "rounded-lg",
    borderStyle: "border border-gray-200"
  },
  {
    name: "Glass",
    cardStyle: "bg-white/20 backdrop-blur-xl border border-white/30",
    inputStyle: "bg-white/20 border border-white/30 focus:ring-2 focus:bg-white/30",
    buttonStyle: "backdrop-blur-sm bg-white/20 border border-white/30 hover:bg-white/30",
    spacing: "p-6 space-y-6",
    shadow: "shadow-2xl",
    borderRadius: "rounded-2xl",
    borderStyle: "border border-white/30"
  },
  {
    name: "Neumorphic",
    cardStyle: "bg-gray-100 shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.7),inset_2px_2px_4px_rgba(0,0,0,0.1)]",
    inputStyle: "bg-gray-100 border-0 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)] focus:shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.7),inset_2px_2px_4px_rgba(0,0,0,0.1)]",
    buttonStyle: "shadow-[4px_4px_8px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.7)] hover:shadow-[2px_2px_4px_rgba(0,0,0,0.1),-1px_-1px_2px_rgba(255,255,255,0.7)]",
    spacing: "p-6 space-y-6",
    shadow: "shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.7),inset_2px_2px_4px_rgba(0,0,0,0.1)]",
    borderRadius: "rounded-2xl",
    borderStyle: "border-0"
  },
  {
    name: "Card Stack",
    cardStyle: "bg-white border border-gray-200",
    inputStyle: "border border-gray-200 focus:ring-2",
    buttonStyle: "shadow-lg hover:shadow-xl",
    spacing: "p-6 space-y-6",
    shadow: "shadow-xl",
    borderRadius: "rounded-2xl",
    borderStyle: "border border-gray-200"
  }
];
*/

// SELECTED STYLE: Rose Garden + Floating
const selectedStyle = {
  background: "bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50",
  cardBg: "bg-white/95 backdrop-blur-md",
  primaryGradient: "from-rose-500 to-pink-500",
  secondaryGradient: "from-rose-400 to-pink-400",
  textPrimary: "text-gray-800",
  textSecondary: "text-gray-600",
  borderColor: "border-rose-300",
  focusRing: "focus:ring-rose-500",
  buttonHover: "hover:from-rose-600 hover:to-pink-600"
};

const selectedLayout = {
  cardStyle: "bg-white/95 backdrop-blur-md",
  inputStyle: "border-0 bg-gray-50 focus:ring-2 focus:bg-white",
  buttonStyle: "shadow-xl hover:shadow-2xl transform hover:-translate-y-1",
  spacing: "p-8 space-y-8",
  shadow: "shadow-2xl",
  borderRadius: "rounded-3xl",
  borderStyle: "border-0"
};

export default function Home() {
  const [title, setTitle] = useState('My Ranked Choice Poll');
  const [description, setDescription] = useState('');
  const [choices, setChoices] = useState<Choice[]>([
    { id: '1', text: 'Option 1', isEditing: false },
    { id: '2', text: 'Option 2', isEditing: false },
    { id: '3', text: 'Option 3', isEditing: false },
  ]);

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

  return (
    <div className={`min-h-screen ${selectedStyle.background} p-4`}>
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className={`text-3xl font-bold ${selectedStyle.textPrimary} mb-2`}>Ranked Choice</h1>
          <p className={selectedStyle.textSecondary}>Create your poll in seconds</p>
        </div>

        {/* Main Form Card */}
        <div className={`${selectedStyle.cardBg} ${selectedLayout.borderRadius} ${selectedLayout.shadow} ${selectedLayout.spacing} mb-6 ${selectedLayout.cardStyle}`}>
          {/* Title Section */}
          <div>
            <label className={`block text-sm font-medium ${selectedStyle.textPrimary} mb-2`}>
              Poll Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-3 ${selectedLayout.borderRadius} ${selectedLayout.inputStyle} ${selectedStyle.focusRing} focus:border-transparent transition-all duration-200 text-lg font-medium`}
              placeholder="Enter poll title..."
            />
          </div>

          {/* Description Section */}
          <div>
            <label className={`block text-sm font-medium ${selectedStyle.textPrimary} mb-2`}>
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-4 py-3 ${selectedLayout.borderRadius} ${selectedLayout.inputStyle} ${selectedStyle.focusRing} focus:border-transparent transition-all duration-200 resize-none`}
              rows={3}
              placeholder="Add a description for your poll..."
            />
          </div>

          {/* Choices Section */}
          <div>
            <label className={`block text-sm font-medium ${selectedStyle.textPrimary} mb-3`}>
              Choices
            </label>
            <div className="space-y-3">
              {choices.map((choice, index) => (
                <div key={choice.id} className="flex items-center gap-3">
                  <div className={`flex-shrink-0 w-8 h-8 bg-gradient-to-r ${selectedStyle.secondaryGradient} rounded-full flex items-center justify-center text-white font-semibold text-sm`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    {choice.isEditing ? (
                      <input
                        type="text"
                        value={choice.text}
                        onChange={(e) => updateChoice(choice.id, e.target.value)}
                        onBlur={() => updateChoice(choice.id, choice.text)}
                        onKeyPress={(e) => e.key === 'Enter' && updateChoice(choice.id, choice.text)}
                        className={`w-full px-3 py-2 ${selectedLayout.borderRadius} ${selectedLayout.inputStyle} ${selectedStyle.focusRing} focus:border-transparent`}
                        autoFocus
                      />
                    ) : (
                      <div
                        onClick={() => startEditing(choice.id)}
                        className={`px-3 py-2 ${selectedLayout.borderRadius} ${selectedLayout.borderStyle} hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200 min-h-[40px] flex items-center`}
                      >
                        {choice.text}
                      </div>
                    )}
                  </div>
                  {choices.length > 2 && (
                    <button
                      onClick={() => removeChoice(choice.id)}
                      className="flex-shrink-0 w-8 h-8 text-red-500 hover:bg-red-50 rounded-full flex items-center justify-center transition-colors duration-200"
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
              className={`w-full mt-4 px-4 py-3 ${selectedLayout.borderRadius} border-2 border-dashed ${selectedStyle.borderColor} text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center gap-2`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Choice
            </button>
          </div>

          {/* Create Poll Button */}
          <button className={`w-full bg-gradient-to-r ${selectedStyle.primaryGradient} text-white py-4 px-6 ${selectedLayout.borderRadius} font-semibold text-lg ${selectedStyle.buttonHover} transform hover:scale-[1.02] transition-all duration-200 ${selectedLayout.buttonStyle}`}>
            Create Poll
          </button>
        </div>

        {/* Footer Info */}
        <div className={`text-center ${selectedStyle.textSecondary} text-sm mb-8`}>
          <p>Your poll will be ready to share in seconds</p>
        </div>
      </div>
    </div>
  );
}
