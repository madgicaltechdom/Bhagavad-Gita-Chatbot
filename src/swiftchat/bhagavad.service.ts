import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class BhagavadService{
    private versesData: any;
    private desData: any;
    constructor() {
        const rawData = fs.readFileSync(
            './src/verses.json',
            'utf-8');
        this.versesData = JSON.parse(rawData);
        const data =fs.readFileSync('./src/description.json','utf-8');
        this.desData= JSON.parse(data);
      }

      getChapterSummary(chapterNumber: number): { chapterSummary: string; versesCount: number } {
        const chapterKey = chapterNumber.toString();
        const chapterData = this.versesData?.chapters?.[chapterKey];
    
        if (chapterData && chapterData.chapter_summary && chapterData.verses_count) {
            const summary: string = chapterData.chapter_summary;
            const versesCount: number = chapterData.verses_count;
            return { chapterSummary: summary, versesCount: versesCount };
        } else {
            return { chapterSummary: 'Chapter summary not found.', versesCount: 0 };
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
      doesVerseExist(chapterNumber: number, verseNumber: number): boolean {
        const chapterKey = chapterNumber.toString();
        const verseKey = verseNumber.toString();
      
        return (
          this.versesData?.verses?.[chapterKey]?.[verseKey] !== undefined
        );
      }
       getDescriptions(chapter: number, verse: number): string[] | null {
        const verseDescription = this.desData.find(v => v.chapter === chapter && v.verse === verse);
        return verseDescription ? verseDescription.description : null;
      }
      
}