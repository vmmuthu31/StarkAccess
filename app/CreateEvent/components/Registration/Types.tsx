export type SelectionType = "text" | "option" | "checkbox" | "social";

export type Question = {
  id: number;
  type: SelectionType;
  required: boolean;
  question: string;
  options?: string[];
  socialId?: string;
};