import { Injectable } from '@nestjs/common';
import { integer } from 'aws-sdk/clients/cloudfront';
import axios from 'axios';
import { CustomException } from '../common/exception/custom.exception';
import { localisedStrings } from '../i18n/en/localised-strings';

@Injectable()
export abstract class MessageService {
  async prepareWelcomeMessage() {
    return localisedStrings.welcomeMessage;
  }
  getSeeMoreButtonLabel() {
    return localisedStrings.seeMoreMessage;
  }

  async sendMessage(baseUrl: string, requestData: any, token: string) {
    try {
      const response = await axios.post(baseUrl, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new CustomException(error);
    }
  }

  abstract sendWelcomeMessage(from: string, language: string);
  abstract sendLanguageChangedMessage(from: string, language: string);
  abstract sendChapterSummary(from: string, chapterNumber:number,language: string);
  abstract sendVerseEnglish(from: string,chapterNumber,verseNumber: number, language: string);
  abstract sendVerseHindi(from: string,chapterNumber,verseNumber: number, language: string);
  abstract followupbuttons(from: string, language:string, chapter: number);
  abstract afterversebuttons(from: string, language:string);
  abstract askChapterNumber(from: string, language: string);
  abstract askquestionprompt(from: string, language: string);
  abstract endversebuttons(from: string, language: string);
  abstract sendnoAnswerMessage(from: string, language: string);
  abstract sendVersedesc(from: string,description: string);
  abstract endExplanationbuttons(from: string, language: string);
  abstract chapterButtons(from: string, language: string);
  abstract languageButtons(from: string, language: string);



}
