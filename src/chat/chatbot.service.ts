import { Injectable } from '@nestjs/common';
import IntentClassifier from '../intent/intent.classifier';
import { MessageService } from 'src/message/message.service';
import { UserService } from 'src/model/user.service';
import { LocalizationService } from '../localization/localization.service';

@Injectable()
export class ChatbotService {
  private readonly message: MessageService;
  private readonly userService: UserService;

  constructor(
    intentClassifier: IntentClassifier,
    message: MessageService,
    userService: UserService,
  ) {
    this.message = message;
    this.userService = userService;
  }

  public async processMessage(body: any): Promise<any> {
    try{
    const { from, text, button_response, persistent_menu_response } = body;    
    let botID = process.env.BOT_ID;
    let UserData = await this.userService.findUserByMobileNumber(from);

    if (!UserData) {
      await this.userService.createUser(from, botID);
    }
    const userData = await this.userService.findUserByMobileNumber(from);
    const localisedStrings = await LocalizationService.getLocalisedString(
      userData.language,
    );

    if (userData.language === 'english' || userData.language === 'hindi') {
      await this.userService.saveUser(userData);
    }
    if (!persistent_menu_response && !button_response && localisedStrings.greetingMessages.includes(text.body)) {
      await this.message.sendWelcomeMessage(from, userData.language);
      await this.message.sendChapterSummary(from,1,userData.language);
      await this.userService.saveChapterNumber(from,botID,1)
      await this.message.followupbuttons(from,userData.language,userData.chapterNumber)
    // } else if (intent === 'select_language') {
    //   const selectedLanguage = entities[0];
    //   const userData = await this.userService.findUserByMobileNumber(from);
    //   userData.language = selectedLanguage;
    //   await this.userService.saveUser(userData);
    //   this.message.sendLanguageChangedMessage(from, userData.language);
    // }
    }else if (button_response && localisedStrings.followupButton_list(userData.chapterNumber).includes(button_response.body)){
      if(button_response.body=== localisedStrings.followupButton_list(userData.chapterNumber)[0]){
        await this.userService.saveverseNumber(from,botID,1,userData.chapterNumber);
        await this.message.sendVerse(from,userData.chapterNumber,userData.verseNumber,userData.language);
        await this.message.afterversebuttons(from,userData.language);
      }
    }
    return 'ok';
  }catch (error) {
    console.error('Error processing message:', error);
    throw error;
  }
}
}
export default ChatbotService;
