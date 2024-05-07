import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import axios from 'axios';
import { LocalizationService } from 'src/localization/localization.service';
import { MessageService } from 'src/message/message.service';
import { integer } from 'aws-sdk/clients/cloudfront';
import { BhagavadService } from './bhagavad.service';

dotenv.config();

@Injectable()
export class SwiftchatMessageService extends MessageService {
  private botId = process.env.BOT_ID;
  private apiKey = process.env.API_KEY;
  private apiUrl = process.env.API_URL;
  private baseUrl = `${this.apiUrl}/${this.botId}/messages`;

  constructor(private bhagavadService: BhagavadService) {super();}

  private prepareRequestData(from: string, requestBody: string): any {
    return {
      to: from,
      type: 'text',
      text: {
        body: requestBody,
      },
    };
  }
  async sendWelcomeMessage(from: string, language: string) {
    const localisedStrings = LocalizationService.getLocalisedString(language);
    const requestData = this.prepareRequestData(
      from,
      localisedStrings.welcomeMessage,
    );

    const response = await this.sendMessage(
      this.baseUrl,
      requestData,
      this.apiKey,
    );
    return response;
  }

  async sendChapterSummary(from: string, chapterNumber: number, language: string) {
    const localisedStrings = LocalizationService.getLocalisedString(language);
    const chapterSummary = this.bhagavadService.getChapterSummary(chapterNumber);

    if (chapterSummary) {
      const requestData = this.prepareRequestData(from, chapterSummary);

      const response = await this.sendMessage(
        this.baseUrl,
        requestData,
        this.apiKey,
      );
      return response;
    } else {
      const requestData = this.prepareRequestData(
        from,
        localisedStrings.chapterSummaryNotFound,
      );

      const response = await this.sendMessage(
        this.baseUrl,
        requestData,
        this.apiKey,
      );
      return response;
    }
  }
  async sendVerse(from: string, chapterNumber: number, verseNumber: number, language: string) {
    try {
      const localisedStrings = LocalizationService.getLocalisedString(language);
      const verseDetails = this.bhagavadService.getVerseDetails(chapterNumber, verseNumber);
  
      if (!verseDetails || !verseDetails.text || !verseDetails.meaning) {
        const requestData = this.prepareRequestData(
          from,
          localisedStrings.verseDetailsNotFound
        );
  
        const response = await this.sendMessage(
          this.baseUrl,
          requestData,
          this.apiKey
        );
        return response;
      }
  
      const verseText = `${verseDetails.text}\n\nMeaning: ${verseDetails.meaning}`;
      const requestData = this.prepareRequestData(from, verseText);
  
      const response = await this.sendMessage(
        this.baseUrl,
        requestData,
        this.apiKey
      );
      return response;
    } catch (error) {
      console.error('Error sending verse:', error);
      throw new Error('Failed to send verse.');
    }
  }
  

  async sendLanguageChangedMessage(from: string, language: string) {
    const localisedStrings = LocalizationService.getLocalisedString(language);
    const requestData = this.prepareRequestData(
      from,
      localisedStrings.select_language,
    );

    const response = await this.sendMessage(
      this.baseUrl,
      requestData,
      this.apiKey,
    );
    return response;
  }
  async followupbuttons(from: string, language: string, chapter: number): Promise<void> {
    const localisedStrings = LocalizationService.getLocalisedString(language);
    const messageData = {
      to: from,
      type: 'button',
      button: {
        body: {
          type: 'text',
          text: {
            body: localisedStrings.followupButtonBody,
          },
        },
        buttons: localisedStrings.followupButtons(chapter),
        allow_custom_response: false,
      },
    };
    try {
      const response = await axios.post(this.baseUrl, messageData, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('errors:', error);
    }
  }
  async afterversebuttons(from: string, language: string): Promise<void> {
    const localisedStrings = LocalizationService.getLocalisedString(language);
    const messageData = {
      to: from,
      type: 'button',
      button: {
        body: {
          type: 'text',
          text: {
            body: localisedStrings.followupButtonBody,
          },
        },
        buttons: localisedStrings.afterVerseButtons,
        allow_custom_response: false,
      },
    };
    try {
      const response = await axios.post(this.baseUrl, messageData, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('errors:', error);
    }
  }
}
