import { Injectable } from '@nestjs/common';
import IntentClassifier from '../intent/intent.classifier';
import { MessageService } from 'src/message/message.service';
import { UserService } from 'src/model/user.service';
import { LocalizationService } from '../localization/localization.service';
import { BhagavadService } from 'src/swiftchat/bhagavad.service';

@Injectable()
export class ChatbotService {
  private readonly message: MessageService;
  private readonly userService: UserService;
  private readonly bhagavadService: BhagavadService;

  constructor(
    intentClassifier: IntentClassifier,
    message: MessageService,
    bhagavadService:BhagavadService,
    userService: UserService,
  ) {
    this.message = message;
    this.userService = userService;
    this.bhagavadService=bhagavadService;
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
    //welcome message
    if (!persistent_menu_response && !button_response && localisedStrings.greetingMessages.includes(text.body)) {
      await this.message.sendWelcomeMessage(from, userData.language);
      await this.message.chapterButtons(from,userData.language)
    }
    //Chapter Summary
    // if(button_response  ){
    //   if(button_response.body === localisedStrings.followupButton_list[1] || button_response.body === localisedStrings.afterVerseButtons_list[3]) {
    //     if(userData.chapterNumber <= 17){
    //     await this.message.sendChapterSummary(from,userData.chapterNumber+1,userData.language);
    //     const temp=await this.userService.saveChapterNumber(from,botID,userData.chapterNumber+1);
    //     await this.message.followupbuttons(from,userData.language,temp.chapterNumber);
    //     }
    //     //in case of last Chapter
    //     else{
    //       await this.message.sendChapterSummary(from,userData.chapterNumber+1,userData.language);
    //       await this.userService.saveChapterNumber(from,botID,userData.chapterNumber+1);
    //       await this.message.endChapterbuttons(from,userData.language);
    //     }
    //   }
        // }
        //chapterButtons handling
     if (button_response && localisedStrings.chapterButtons_list.includes(button_response.body)){
      const numberPattern = /\d+(\.\d+)?/;
      const extractedNumber = button_response.body.match(numberPattern);
      const numericValue = parseFloat(extractedNumber[0]); 
      await this.message.sendChapterSummary(from,numericValue,userData.language);
      const temp=await this.userService.saveChapterNumber(from,botID,numericValue);
      await this.message.followupbuttons(from,userData.language,temp.chapterNumber);
    }
    //followup buttons handling 
    console.log(userData.chapterNumber)
    if (button_response && localisedStrings.followupbuttons_list(userData.chapterNumber).includes(button_response.body)){
      console.log(userData.chapterNumber)
      if(button_response.body === localisedStrings.followupbuttons_list(userData.chapterNumber)[0]){
        if(this.bhagavadService.doesVerseExist(userData.chapterNumber,userData.verseNumber)){
          const temp=await this.userService.saveverseNumber(from,botID,userData.verseNumber,userData.chapterNumber);
          await this.message.sendVerse(from,userData.chapterNumber,temp.verseNumber,userData.language);
          await this.message.afterversebuttons(from,userData.language);
        }
        //in case of last verse
        else {
          await this.message.sendVerse(from,userData.chapterNumber,userData.verseNumber,userData.language);
          await this.message.endversebuttons(from,userData.language);
        }
      }
      if(button_response.body === localisedStrings.followupbuttons_list(userData.chapterNumber)[1]){
        await this.message.askquestionprompt(from,userData.language);
      }
      if(button_response.body === localisedStrings.followupbuttons_list(userData.chapterNumber)[2]){
        await this.message.chapterButtons(from,userData.language);
      }
    }

    //afterverse buttons handling
    if (button_response && localisedStrings.afterVerseButtons_list.includes(button_response.body)){
      if(button_response.body === localisedStrings.afterVerseButtons_list[0] ){
        const desc=await this.bhagavadService.getDescriptions(userData.chapterNumber,userData.verseNumber);
        await this.message.sendVersedesc(from,desc,0);
        if(desc.length=== 1){
          await this.message.endExplanationbuttons(from,userData.language);
          }else{
            await this.message.nextExplanationbuttons(from,userData.language);
          }
        }
      if(button_response.body === localisedStrings.afterVerseButtons_list[1]){
      await this.message.askquestionprompt(from,userData.language);
      } 
      if(button_response.body === localisedStrings.afterVerseButtons_list[2] ){
        if(this.bhagavadService.doesVerseExist(userData.chapterNumber,userData.verseNumber)){
        const temp=await this.userService.saveverseNumber(from,botID,userData.verseNumber+1,userData.chapterNumber);
        await this.message.sendVerse(from,userData.chapterNumber,temp.verseNumber,userData.language);
        await this.message.afterversebuttons(from,userData.language);
      }
      //in case of last verse
      else {
        await this.message.sendVerse(from,userData.chapterNumber,userData.verseNumber,userData.language);
        await this.message.endversebuttons(from,userData.language);
      }
    }
    }
    //reponse to 'choose a chapter' handling
    if (!persistent_menu_response && !button_response && !localisedStrings.greetingMessages.includes(text.body)) {
      const userInput = body.text.body.trim();
    
      if (!isNaN(parseInt(userInput)) && parseInt(userInput) >= 1 && parseInt(userInput) <= 17) {
        const chapNo = parseInt(userInput);
        await this.userService.saveChapterNumber(from, botID, chapNo);
        await this.message.sendChapterSummary(from, chapNo, userData.language);
        await this.message.followupbuttons(from, userData.language, userData.chapterNumber);
      } 
      else if(!isNaN(parseInt(userInput)) && parseInt(userInput) >= 1 && parseInt(userInput) == 18){
        const temp= await this.userService.saveChapterNumber(from,botID,18);
        await this.message.sendChapterSummary(from,temp.chapterNumber,userData.language);
        await this.message.endChapterbuttons(from,userData.language);
      }else {
        await this.message.sendnoAnswerMessage(from, userData.language);
      }
    }
      //handle in case of 'return to chapter 1' button
    // if(button_response && localisedStrings.endChapterButton_list===button_response.body){
    //     await this.message.sendChapterSummary(from,1,userData.language);
    //     const temp=await this.userService.saveChapterNumber(from,botID,1);
    //     await this.message.followupbuttons(from,userData.language,temp.chapterNumber);
    //   }
      // handle next explanation button
      if(button_response && localisedStrings.nextExplanationButton_list===button_response.body){
        const desc=await this.bhagavadService.getDescriptions(userData.chapterNumber,userData.verseNumber);
        await this.message.sendVersedesc(from,desc,userData.VerseIndex);
        const index= await this.userService.saveverseIndex(from,botID,userData.VerseIndex+1,userData.verseNumber,userData.chapterNumber);
        if(index.VerseIndex-1<desc.length-1){
          await this.message.nextExplanationbuttons(from,userData.language);
        }
        else{
          await this.message.endExplanationbuttons(from,userData.language);
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
