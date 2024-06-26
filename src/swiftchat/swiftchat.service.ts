import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import axios from 'axios';
import { LocalizationService } from '../localization/localization.service';
import { MessageService } from '../message/message.service';
import { integer } from 'aws-sdk/clients/cloudfront';
import { BhagavadService } from './bhagavad.service';
import { LaunchWizard } from 'aws-sdk';

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

  async askChapterNumber(from: string, language: string) {
    const localisedStrings = LocalizationService.getLocalisedString(language);
    const requestData = this.prepareRequestData(
      from,
      localisedStrings.askChapterNumberPrompt,
    );

    const response = await this.sendMessage(
      this.baseUrl,
      requestData,
      this.apiKey,
    );
    return response;
  }
  async askquestionprompt(from: string, language: string) {
    const localisedStrings = LocalizationService.getLocalisedString(language);
    const requestData = this.prepareRequestData(
      from,
      localisedStrings.askQuestionPrompt,
    );

    const response = await this.sendMessage(
      this.baseUrl,
      requestData,
      this.apiKey,
    );
    return response;
  }

  async sendnoAnswerMessage(from: string, language: string) {
    const localisedStrings = LocalizationService.getLocalisedString(language);
    const requestData = this.prepareRequestData(
      from,
      localisedStrings.noanswer,
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
    const chapterSummary =await this.bhagavadService.getChapterSummary(chapterNumber);

    if (chapterSummary) {
      const requestData = this.prepareRequestData(from, chapterSummary.chapterSummary);

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
  async sendVerseEnglish(from: string, chapterNumber: number, verseNumber: number, language: string) {
    try {
        const localisedStrings = LocalizationService.getLocalisedString(language);
        const verseDetails =await this.bhagavadService.getVerseDetails(chapterNumber, verseNumber,language);

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
        const verseText = `${verseDetails.text}\nMeaning: ${verseDetails.meaning}`;
        const requestData = this.prepareRequestData(from, verseText);

        const response = await this.sendMessage(
            this.baseUrl,
            requestData,
            this.apiKey
        );

        const chapterSummary =await this.bhagavadService.getChapterSummary(chapterNumber);
        if (chapterSummary && verseNumber >= chapterSummary.versesCount) {
            const nextChapterNumber = chapterNumber + 1;
            const nextChapterMessage = localisedStrings.moveNextChapterMessage.replace('{nextChapterNumber}', nextChapterNumber.toString());
            const nextChapterRequestData = this.prepareRequestData(from, nextChapterMessage);
            await this.sendMessage(this.baseUrl, nextChapterRequestData, this.apiKey);
        }

        return response;
    } catch (error) {
        console.error('Error sending verse:', error);
        throw new Error('Failed to send verse.');
    }
}

async sendVerseHindi(from: string, chapterNumber: number, verseNumber: number, language: string) {
  try {
      const localisedStrings = LocalizationService.getLocalisedString(language);
      const verseDetails =await this.bhagavadService.getVerseDetails(chapterNumber, verseNumber,language);

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
      const verseText = `${verseDetails.text}`;
      const requestData = this.prepareRequestData(from, verseText);

      const response = await this.sendMessage(
          this.baseUrl,
          requestData,
          this.apiKey
      );

      const chapterSummary =await this.bhagavadService.getChapterSummary(chapterNumber);
      if (chapterSummary && verseNumber >= chapterSummary.versesCount) {
          const nextChapterNumber = chapterNumber + 1;
          const nextChapterMessage = localisedStrings.moveNextChapterMessage.replace('{nextChapterNumber}', nextChapterNumber.toString());
          const nextChapterRequestData = this.prepareRequestData(from, nextChapterMessage);
          await this.sendMessage(this.baseUrl, nextChapterRequestData, this.apiKey);
      }

      return response;
  } catch (error) {
      console.error('Error sending verse:', error);
      throw new Error('Failed to send verse.');
  }
}

async sendVersedesc(from: string,description: string){
  const requestData = this.prepareRequestData(
    from,
    description,
  );

  const response = await this.sendMessage(
    this.baseUrl,
    requestData,
    this.apiKey,
  );
  return response;
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

  async chapterButtons(from: string, language: string): Promise<void> {
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
        buttons: localisedStrings.ChapterButtons,
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
  async endversebuttons(from: string, language: string): Promise<void> {
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
        buttons: localisedStrings.endVerseButtons,
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

  async endExplanationbuttons(from: string, language: string): Promise<void> {
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
        buttons: localisedStrings.endExplanationButtons,
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
  async endChapterbuttons(from: string, language: string): Promise<void> {
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
        buttons: localisedStrings.endChapterButtons,
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
  async languageButtons(from: string, language: string): Promise<void> {
    const localisedStrings = LocalizationService.getLocalisedString(language);
    const messageData = {
      to: from,
      type: 'button',
      button: {
        body: {
          type: 'text',
          text: {
            body: localisedStrings.languagebody,
          },
        },
        buttons: localisedStrings.languagebuttons,
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
