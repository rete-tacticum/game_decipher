import { generateWords } from '../../containers/VocabularyContainer/wordgen';

describe('generateWords', () => {
  test('should generate words with default options', async () => {
    const words = await generateWords({ language: 'eng' });
    expect(words.length).toBe(16);
    words.forEach(word => {
      expect(typeof word).toBe('string');
      expect(word.length).toBe(8);
    });
  });

  test('should generate words with specified options', async () => {
    const words = await generateWords({
      language: 'latin',
      wordQuantity: 8,
      wordLength: 10
    });
    expect(words.length).toBe(8);
    words.forEach(word => {
      expect(typeof word).toBe('string');
      expect(word.length).toBe(10);
    });
  });

  test('should log error if latin vocabulary for more than 10 chars is requested', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    await generateWords({ language: 'latin', wordLength: 12 });
    expect(consoleSpy).toHaveBeenCalledWith('latin vocabulary for more than 10 chars unavailable, using 10 char words');
    consoleSpy.mockRestore();
  });
});