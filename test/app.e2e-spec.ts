import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { ChatbotService } from '../src/chat/chatbot.service';
import { UserService } from '../src/model/user.service';
import { MessageService } from '../src/message/message.service';
import { SwiftchatMessageService } from '../src/swiftchat/swiftchat.service';
import { localisedStrings as english } from '../src/i18n/en/localised-strings';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/model/user.entity';
import { BhagavadService } from '../src/swiftchat/bhagavad.service';
import { Repository } from 'typeorm';
import IntentClassifier  from '../src/intent/intent.classifier';
import { LocalizationService } from '../src/localization/localization.service';
describe('AppController', () => {
  let messageService: MessageService;
  let userService: UserService;
  let bhagavadService:BhagavadService;
  let chatbotService: ChatbotService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        IntentClassifier,
        ChatbotService,
        BhagavadService,
        SwiftchatMessageService,
       {
        provide: MessageService,
        useFactory: () => ({
          sendWelcomeMessage: jest.fn(),
          sendLanguageChangedMessage: jest.fn(),
          sendChapterSummary:jest.fn(),
          sendVerseEnglish:jest.fn(),
          sendVerseHindi:jest.fn(),
          followupbuttons:jest.fn(),
          afterversebuttons:jest.fn(),
          askChapterNumber:jest.fn(),
          askquestionprompt:jest.fn(),
          endversebuttons:jest.fn(),
          sendnoAnswerMessage:jest.fn(),
          sendVersedesc:jest.fn(),
          endExplanationbuttons:jest.fn(),
          chapterButtons:jest.fn(),
          languageButtons:jest.fn(),
        }),
       },
        UserService,{
          provide: getRepositoryToken(User),
          useClass: Repository,
        }
      ],
    }).compile();
    messageService=module.get<MessageService>(MessageService);
    userService = module.get<UserService>(UserService);
    chatbotService = module.get<ChatbotService>(ChatbotService);
    bhagavadService=module.get<BhagavadService>(BhagavadService);
  });

  it("should send welcome message and category buttons when valid 'from' and 'text' are provided", async () => {
    jest.spyOn(userService.userRepository, 'findOne').mockResolvedValue({
      id: '359a2e1e-ddb9-4cc5-8029-062bdf54bd66',
      mobileNumber: '1234567890',
      botID: '0238981860238953',
      chapterNumber:null,
      verseNumber:null,
      language: 'English',
    });

    const body = {
      from: '1234567890',
      text: { body: 'hi' },
      button_response: null,
      persistent_menu_response: null,
    };

    await chatbotService.processMessage(body);

    expect(messageService.sendWelcomeMessage).toHaveBeenCalledWith(
      '1234567890',
      'English',
    );
    expect(messageService.chapterButtons).toHaveBeenCalledWith(
      '1234567890',
      'English',
    );
  });
});
