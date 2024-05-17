import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
const csv = require('csv-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

@Injectable()
export class BhagavadService{
    private versesData: any;
    private desData: any;
    constructor() {
        const rawData = fs.readFileSync(
            './src/verses.json',
            'utf-8');
        this.versesData = JSON.parse(rawData);
        const data =fs.readFileSync('./src/summaries.json','utf-8');
        this.desData= JSON.parse(data);
      }

     async getChapterSummary(chapterNumber: number): Promise<{ chapterSummary: string; versesCount: number }> {
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

      async getVerseDetails(chapterNumber: number, verseNumber: number, language: string):Promise< { text: string; meaning: string }> {
        const chapterKey = chapterNumber.toString();
        const verseKey = verseNumber.toString();
        if (this.versesData?.verses?.[chapterKey]?.[verseKey]) {
          const verseData = this.versesData.verses[chapterKey][verseKey];
          if(language==='English'){
          return {
            text: verseData.text,
            meaning: verseData.meaning
          };
        }else{return {
          text: verseData.text,
          meaning:null
        }
        }
        } else {
          return { text: 'Verse not found.', meaning: 'Meaning not available.' };
        }
      }
       async doesVerseExist(chapterNumber: number, verseNumber: number): Promise<boolean> {
        const chapterKey = chapterNumber.toString();
        const verseKey = verseNumber.toString();
      
        return (
          this.versesData?.verses?.[chapterKey]?.[verseKey] !== undefined
        );
      }
      //  async getDescriptions(chapter: number, verse: number):Promise<string[] | null> {
      //   const verseDescription = this.desData.find(v => v.chapter === chapter && v.verse === verse);
      //   return verseDescription ? verseDescription.description : null;
      // }

      async summarizeDescription(chapter: number, verse: number): Promise<string> {
        const chapterKey = chapter;
        const verseKey = verse;
      
        // Check if this.desData is an array
        if (Array.isArray(this.desData)) {
          // Find the matching description based on chapter and verse
          const matchingDescription = this.desData.find(
            data => data.chapter === chapterKey && data.verse === verseKey
          );
      
          // If a matching description is found, return it
          if (matchingDescription) {
            return matchingDescription.summary;
          } else {
            return 'Description not found';
          }
        } else {
          return 'Description data is not in the expected format';
        }
      }
      
      
}