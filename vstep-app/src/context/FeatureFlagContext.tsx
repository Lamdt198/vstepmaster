import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface FeatureFlags {
  // Extraneous modules to hide by default
  enableChinese: boolean;        // default: false (hides /chinese/* & language switcher)
  enableReadingLibrary: boolean; // default: false (hides /reading-library)
  enableLessons: boolean;        // default: false (hides /lessons)
  enableKnowledge: boolean;      // default: false (hides /knowledge & /knowledge-quiz)

  // VSTEP Core features
  enableAiScoring: boolean;      // default: true (Writing/Speaking AI evaluation)
  enableCustomTest: boolean;     // default: true (Word/PDF exam parser)
  enableSpeakingRecord: boolean; // default: true (Web MediaRecorder for Speaking)
  strictAntiCheat: boolean;      // default: true (Track window blur & tab switching during Mock Test)

  // Exam presets
  mockTestDurationMinutes: number; // default: 180 minutes
}

export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  enableChinese: false,
  enableReadingLibrary: false,
  enableLessons: false,
  enableKnowledge: false,
  enableAiScoring: true,
  enableCustomTest: true,
  enableSpeakingRecord: true,
  strictAntiCheat: true,
  mockTestDurationMinutes: 180,
};

interface FeatureFlagContextType {
  flags: FeatureFlags;
  updateFlag: <K extends keyof FeatureFlags>(key: K, value: FeatureFlags[K]) => void;
  resetDefaults: () => void;
}

const STORAGE_KEY = 'vstep_feature_flags';

const FeatureFlagContext = createContext<FeatureFlagContextType>({
  flags: DEFAULT_FEATURE_FLAGS,
  updateFlag: () => {},
  resetDefaults: () => {},
});

export function FeatureFlagProvider({ children }: { children: ReactNode }) {
  const [flags, setFlags] = useState<FeatureFlags>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_FEATURE_FLAGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Error loading feature flags from localStorage:', e);
    }
    return DEFAULT_FEATURE_FLAGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
    } catch (e) {
      console.error('Error saving feature flags to localStorage:', e);
    }
  }, [flags]);

  const updateFlag = <K extends keyof FeatureFlags>(key: K, value: FeatureFlags[K]) => {
    setFlags((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetDefaults = () => {
    setFlags(DEFAULT_FEATURE_FLAGS);
  };

  return (
    <FeatureFlagContext.Provider value={{ flags, updateFlag, resetDefaults }}>
      {children}
    </FeatureFlagContext.Provider>
  );
}

export function useFeatureFlags() {
  return useContext(FeatureFlagContext);
}
