export type ActivityType = 'content' | 'quiz' | 'password-checker' | 'phishing-simulator' | 'link-detector' | 'drag-and-drop-quiz' | 'security-checklist';

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
  feedback: string;
}

export interface DragDropPair {
  id: string;
  term: string;
  definition: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  explanation: string;
}

export interface Activity {
  type: ActivityType;
  title: string;
  content?: string | string[];
  image?: string;
  questions?: QuizQuestion[];
  dragDropPairs?: DragDropPair[];
  checklistItems?: ChecklistItem[];
  xp: number;
  maxPoints: number;
}

export interface Mission {
  id: string;
  level: number;
  title: string;
  description: string;
  icon: string;
  badgeId: string;
  activities: Activity[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface PlayerState {
  xp: number;
  level: number;
  completedMissionIds: string[];
  unlockedBadgeIds: string[];
  missionScores: { [missionId: string]: number };
  avatar: {
    bgColor: string;
    icon: string;
  };
}