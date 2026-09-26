import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface BookmarkedWord {
  word: string;
  meaning: string;
  example: string;
}

export interface BookmarkedKnowledge {
  id: string;
  title: string;
  content: string;
}

interface BookmarkContextType {
  savedWords: BookmarkedWord[];
  savedKnowledge: BookmarkedKnowledge[];
  addWord: (word: BookmarkedWord) => void;
  removeWord: (word: string) => void;
  isWordSaved: (word: string) => boolean;
  addKnowledge: (item: BookmarkedKnowledge) => void;
  removeKnowledge: (id: string) => void;
  isKnowledgeSaved: (id: string) => boolean;
  clearAll: () => void;
}

const BookmarkContext = createContext<BookmarkContextType>({
  savedWords: [],
  savedKnowledge: [],
  addWord: () => {},
  removeWord: () => {},
  isWordSaved: () => false,
  addKnowledge: () => {},
  removeKnowledge: () => {},
  isKnowledgeSaved: () => false,
  clearAll: () => {},
});

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [savedWords, setSavedWords] = useState<BookmarkedWord[]>(() => {
    const saved = localStorage.getItem('vstep_saved_words');
    return saved ? JSON.parse(saved) : [];
  });

  const [savedKnowledge, setSavedKnowledge] = useState<BookmarkedKnowledge[]>(() => {
    const saved = localStorage.getItem('vstep_saved_knowledge');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('vstep_saved_words', JSON.stringify(savedWords));
  }, [savedWords]);

  useEffect(() => {
    localStorage.setItem('vstep_saved_knowledge', JSON.stringify(savedKnowledge));
  }, [savedKnowledge]);

  const addWord = (word: BookmarkedWord) => {
    setSavedWords((prev) => {
      if (prev.find((w) => w.word === word.word)) return prev;
      return [...prev, word];
    });
  };

  const removeWord = (word: string) => {
    setSavedWords((prev) => prev.filter((w) => w.word !== word));
  };

  const isWordSaved = (word: string) => {
    return savedWords.some((w) => w.word === word);
  };

  const addKnowledge = (item: BookmarkedKnowledge) => {
    setSavedKnowledge((prev) => {
      if (prev.find((k) => k.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeKnowledge = (id: string) => {
    setSavedKnowledge((prev) => prev.filter((k) => k.id !== id));
  };

  const isKnowledgeSaved = (id: string) => {
    return savedKnowledge.some((k) => k.id === id);
  };

  const clearAll = () => {
    setSavedWords([]);
    setSavedKnowledge([]);
  };

  return (
    <BookmarkContext.Provider value={{
      savedWords, savedKnowledge,
      addWord, removeWord, isWordSaved,
      addKnowledge, removeKnowledge, isKnowledgeSaved,
      clearAll,
    }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(BookmarkContext);
}
