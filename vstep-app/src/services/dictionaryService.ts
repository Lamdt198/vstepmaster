import { dictionaryExtended } from '../data/dictionaryData';
import { vocabTopics } from '../data/vocabularyData';
import { ApiClient } from './apiClient';

export interface WordLookupResult {
  word: string;
  meaning: string;
  phonetic?: string;
  partOfSpeech?: string;
  level?: string;
  example?: string;
  source: 'offline' | 'online_saved';
  audioUrl?: string;
}

class DictionaryService {
  private memoryCache = new Map<string, WordLookupResult>();
  private fullDict: Record<string, string> | null = null;
  private isFullDictLoading = false;
  private readonly STORAGE_KEY = 'vstep_offline_dictionary';

  constructor() {
    this.loadCustomOfflineDict();
    // Eagerly initiate background loading of 92K offline dictionary without blocking
    if (typeof window !== 'undefined') {
      setTimeout(() => this.ensureFullDictLoaded(), 1000);
    }
  }

  /**
   * Load user-learned words from localStorage into fast memory cache
   */
  private loadCustomOfflineDict() {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        const parsed: Record<string, WordLookupResult> = JSON.parse(raw);
        Object.entries(parsed).forEach(([key, val]) => {
          this.memoryCache.set(key.toLowerCase(), val);
        });
      }
    } catch (e) {
      console.warn('[DictionaryService] Could not load local dictionary cache', e);
    }
  }

  /**
   * Save a newly searched word into offline localStorage cache
   */
  private saveToLocalCache(result: WordLookupResult) {
    if (typeof window === 'undefined') return;
    try {
      this.memoryCache.set(result.word.toLowerCase(), result);
      const raw = localStorage.getItem(this.STORAGE_KEY);
      const current: Record<string, WordLookupResult> = raw ? JSON.parse(raw) : {};
      current[result.word.toLowerCase()] = result;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(current));
    } catch (e) {
      console.warn('[DictionaryService] Could not persist word to localStorage', e);
    }
  }

  /**
   * Load the 92,000+ words English-Vietnamese offline dictionary (dict-ev.json)
   */
  public async ensureFullDictLoaded(): Promise<Record<string, string> | null> {
    if (this.fullDict) return this.fullDict;
    if (this.isFullDictLoading) return null;

    this.isFullDictLoading = true;
    try {
      const res = await fetch('/dict-ev.json');
      if (res.ok) {
        const data = await res.json();
        this.fullDict = data;
        return data;
      }
    } catch (e) {
      console.warn('[DictionaryService] dict-ev.json not loaded, using built-in extended dict', e);
    } finally {
      this.isFullDictLoading = false;
    }
    return null;
  }

  /**
   * Cleans punctuation, handles lowercasing, preserving internal hyphens, apostrophes, and spaces for phrases
   */
  public cleanWord(rawWord: string): string {
    return rawWord
      .trim()
      .toLowerCase()
      .replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '') // trim leading/trailing non-alphanumerics
      .replace(/\s+/g, ' ') // normalize whitespace to single spaces
      .replace(/[^a-zA-Z0-9'\s-]/g, ''); // keep letters, numbers, spaces, hyphens and apostrophes
  }

  /**
   * Fast synchronous offline lookup (0ms)
   */
  public lookupOfflineSync(rawWord: string): WordLookupResult | null {
    const clean = this.cleanWord(rawWord);
    if (!clean || clean.length < 1) return null;

    // 1. Check in-memory / custom offline dictionary
    if (this.memoryCache.has(clean)) {
      return this.memoryCache.get(clean)!;
    }

    // 2. Check curated VSTEP vocabulary topics
    for (const topic of vocabTopics) {
      const match = topic.words.find((w) => w.word.toLowerCase() === clean);
      if (match) {
        const res: WordLookupResult = {
          word: match.word,
          meaning: match.meaning,
          phonetic: match.phonetic || `/${match.word}/`,
          level: topic.level,
          example: match.example,
          source: 'offline',
        };
        this.memoryCache.set(clean, res);
        return res;
      }
    }

    // 3. Check built-in extended dictionary (3,000+ words)
    if (dictionaryExtended[clean]) {
      const res: WordLookupResult = {
        word: clean,
        meaning: dictionaryExtended[clean],
        phonetic: clean.includes(' ') ? '' : `/${clean}/`,
        level: clean.length > 7 ? 'B2' : 'B1',
        source: 'offline',
      };
      this.memoryCache.set(clean, res);
      return res;
    }

    // 4. Check full 92K dictionary if already loaded
    if (this.fullDict && this.fullDict[clean]) {
      const res: WordLookupResult = {
        word: clean,
        meaning: this.fullDict[clean],
        phonetic: clean.includes(' ') ? '' : `/${clean}/`,
        level: clean.length > 8 ? 'C1' : clean.length > 6 ? 'B2' : 'B1',
        source: 'offline',
      };
      this.memoryCache.set(clean, res);
      return res;
    }

    return null;
  }

  /**
   * Search online via FreeDictionaryAPI and Translation APIs, then automatically
   * saves into C# Backend SQLite DB and Local Offline Storage!
   */
  public async searchOnlineAndSave(rawWord: string): Promise<WordLookupResult | null> {
    const clean = this.cleanWord(rawWord);
    if (!clean || clean.length < 1) return null;

    const isPhrase = clean.includes(' ');
    const isCompound = clean.includes('-');

    let phonetic = isPhrase ? '' : `/${clean}/`;
    let partOfSpeech = isPhrase ? 'Cụm từ (Phrase)' : isCompound ? 'Từ ghép (Compound)' : '';
    let englishDefinition = '';
    let englishExample = '';
    let audioUrl = '';

    // Step 1: Free Dictionary API (for single & compound words)
    if (!isPhrase) {
      try {
        const dictRes = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(clean)}`,
          { signal: AbortSignal.timeout(3000) }
        );
        if (dictRes.ok) {
          const data = await dictRes.json();
          const entry = data[0];
          if (entry) {
            phonetic = entry.phonetic || entry.phonetics?.find((p: any) => p.text)?.text || phonetic;
            audioUrl = entry.phonetics?.find((p: any) => p.audio && p.audio.length > 0)?.audio || '';

            if (entry.meanings && entry.meanings.length > 0) {
              const firstMeaning = entry.meanings[0];
              partOfSpeech = firstMeaning.partOfSpeech || partOfSpeech;
              const firstDef = firstMeaning.definitions?.[0];
              englishDefinition = firstDef?.definition || '';
              englishExample = firstDef?.example || '';
            }
          }
        }
      } catch (e) {
        console.warn('[DictionaryService] FreeDictionaryAPI timeout or error, proceeding to translation', e);
      }
    }

    // Step 2: Translate to Vietnamese (Google Translate gtx + MyMemory)
    let vietnameseMeaning = '';

    // 2.1 Google Translate gtx API (highly accurate, free)
    try {
      const gRes = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(clean)}`,
        { signal: AbortSignal.timeout(3500) }
      );
      if (gRes.ok) {
        const gData = await gRes.json();
        if (gData && gData[0] && gData[0][0] && gData[0][0][0]) {
          const trans = gData[0][0][0].trim();
          if (trans.toLowerCase() !== clean.toLowerCase()) {
            vietnameseMeaning = trans;
          }
        }
      }
    } catch {
      /* ignore */
    }

    // 2.2 MyMemory fallback if Google didn't succeed
    if (!vietnameseMeaning) {
      try {
        const memRes = await fetch(
          `https://api.mymemory.translated.net/get?q=${encodeURIComponent(clean)}&langpair=en|vi`,
          { signal: AbortSignal.timeout(3500) }
        );
        if (memRes.ok) {
          const memData = await memRes.json();
          const trans = memData?.responseData?.translatedText;
          if (trans && trans.toLowerCase() !== clean.toLowerCase()) {
            // Decode any HTML entities e.g. &quot; &#39;
            const decoded = trans
              .replace(/&quot;/g, '"')
              .replace(/&#39;/g, "'")
              .replace(/&amp;/g, '&');
            vietnameseMeaning = decoded;
          }
        }
      } catch {
        /* ignore */
      }
    }

    // If word translation failed but we have an English definition, use it
    if (!vietnameseMeaning && englishDefinition) {
      vietnameseMeaning = `(${partOfSpeech || 'từ vựng'}) ${englishDefinition}`;
    }

    // If both failed, return null
    if (!vietnameseMeaning && !englishDefinition) {
      return null;
    }

    const estimatedLevel = isPhrase ? 'B2' : clean.length > 9 ? 'C1' : clean.length > 6 ? 'B2' : 'B1';
    const topicCategory = isPhrase
      ? 'VSTEP Idioms & Collocations'
      : isCompound
      ? 'VSTEP Compound Words'
      : 'VSTEP Academic';

    const result: WordLookupResult = {
      word: clean,
      meaning: vietnameseMeaning || englishDefinition,
      phonetic,
      partOfSpeech,
      level: estimatedLevel,
      example: englishExample,
      source: 'online_saved',
      audioUrl,
    };

    // Step 3: Save to Offline LocalStorage Cache
    this.saveToLocalCache(result);

    // Step 4: Save to C# Backend SQLite Database (Asynchronous, doesn't block)
    ApiClient.saveVocab({
      word: clean,
      phonetic,
      cefrLevel: estimatedLevel,
      definitionVi: result.meaning,
      exampleEn: englishExample,
      topic: topicCategory,
    }).then((res) => {
      if (res?.success) {
        console.log(`[DictionaryService] ✓ '${clean}' successfully saved to SQLite Database!`);
      }
    }).catch((err) => {
      console.warn('[DictionaryService] Could not sync with backend DB', err);
    });

    return result;
  }

  /**
   * Complete Lookup Pipeline:
   * 1. Offline fast check (Sync)
   * 2. Full 92K dictionary check
   * 3. Backend SQLite DB check
   * 4. Online Search + Auto-Save to SQLite and LocalStorage
   */
  public async lookup(rawWord: string): Promise<WordLookupResult | null> {
    const clean = this.cleanWord(rawWord);
    if (!clean) return null;

    // 1. Instant local sync check
    const syncRes = this.lookupOfflineSync(clean);
    if (syncRes) return syncRes;

    // 2. Try loading full 92K dict if not loaded
    const full = await this.ensureFullDictLoaded();
    if (full && full[clean]) {
      const res: WordLookupResult = {
        word: clean,
        meaning: full[clean],
        phonetic: `/${clean}/`,
        level: clean.length > 8 ? 'C1' : clean.length > 6 ? 'B2' : 'B1',
        source: 'offline',
      };
      this.saveToLocalCache(res);
      return res;
    }

    // 3. Try searching Backend SQLite Database
    try {
      const dbRes = await ApiClient.searchVocab(clean);
      if (dbRes && dbRes.word) {
        const res: WordLookupResult = {
          word: dbRes.word,
          meaning: dbRes.definitionVi || dbRes.meaning || 'Đã lưu trong CSDL',
          phonetic: dbRes.phonetic || `/${dbRes.word}/`,
          level: dbRes.cefrLevel || 'B2',
          example: dbRes.exampleEn || '',
          source: 'offline',
        };
        this.saveToLocalCache(res);
        return res;
      }
    } catch {
      /* ignore backend offline */
    }

    // 4. NOT FOUND in any offline source -> Search online, return result, and AUTO-SAVE to DB!
    return await this.searchOnlineAndSave(clean);
  }
}

export const dictionaryService = new DictionaryService();
