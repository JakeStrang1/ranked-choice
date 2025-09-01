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
  TITLE_PLACEHOLDER: string;
}

export interface EditableTextProps {
  value: string;
  setValue: (title: string) => void;
  isValueEditing: boolean;
  setIsValueEditing: (editing: boolean) => void;
  placeholder: string;
  dualFontSize?: null | DualFontSizeProps;
  textPrimaryClass?: string;
  textPlaceholderClass?: string;
  focusRingClass?: string;
  showDottedBorder?: boolean;
  bold?: boolean;
}

export interface DualFontSizeProps {
  largeFontSize: string;
  smallFontSize: string;
  linesThreshold: number; // number of lines to switch to small font size
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
