export interface Choice {
  id: string;
  text: string;
  isEditing: boolean;
}

export interface EditableTitleProps {
  title: string;
  setTitle: (title: string) => void;
  isTitleEditing: boolean;
  setIsTitleEditing: (editing: boolean) => void;
  setTextareaRef: (node: HTMLTextAreaElement | null) => void;
  TITLE_PLACEHOLDER: string;
  TITLE_FONT_SHRINK_THRESHOLD: number;
}

export interface EditableDescriptionProps {
  description: string;
  setDescription: (description: string) => void;
  isDescriptionEditing: boolean;
  setIsDescriptionEditing: (editing: boolean) => void;
  DESCRIPTION_PLACEHOLDER: string;
}

export interface ChoiceItemProps {
  choice: Choice;
  choices: Choice[];
  updateChoice: (id: string, newText: string) => void;
  startEditing: (id: string) => void;
  removeChoice: (id: string) => void;
  isDesktop?: boolean;
}
