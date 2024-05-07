import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class BhagavadService{
    private versesData: any;
    constructor() {
        const rawData = fs.readFileSync(
            './src/verses.json',
            'utf-8');
        this.versesData = JSON.parse(rawData);
      }

      getChapterSummary(chapterNumber: number): string {
        const chapterKey = chapterNumber.toString();
        if (this.versesData?.chapters?.[chapterKey]?.chapter_summary) {
          return this.versesData.chapters[chapterKey].chapter_summary;
        } else {
          return 'Chapter summary not found.';
        }
      }

      getVerseDetails(chapterNumber: number, verseNumber: number): { text: string; meaning: string } {
        const chapterKey = chapterNumber.toString();
        const verseKey = verseNumber.toString();
        if (this.versesData?.verses?.[chapterKey]?.[verseKey]) {
          const verseData = this.versesData.verses[chapterKey][verseKey];
          return {
            text: verseData.text,
            meaning: verseData.meaning
          };
        } else {
          return { text: 'Verse not found.', meaning: 'Meaning not available.' };
        }
      }
}