export const localisedStrings = {
  welcomeMessage: 'Welcome, Bhagavad Gita Chatbot!',
  seeMoreMessage: 'See More Data',
  language_hindi: 'हिन्दी',
  language_english: 'English',
  language_changed: 'Language changed to English',
  greetingMessages: ['hi','Hi','HI','hI','Hello','hello','hola'],
  followupButtonBody: "Let's explore the timeless wisdom of the Bhagavad Gita together",
  ChapterButtons:
 [
      {
        type: 'solid',
        body: `Show Chapter 1 summary`,
        reply: `Show Chapter 1 summary`,
      },
      {
        type: 'solid',
        body: `Show Chapter 2 summary`,
        reply: `Show Chapter 2 summary`,
      },
      {
        type: 'solid',
        body: 'Show Chapter 3 summary',
        reply: 'Show Chapter 3 summary',
      },
      {
        type: 'solid',
        body: 'Show Chapter 4 summary',
        reply: 'Show Chapter 4 summary',
      },
      {
        type: 'solid',
        body: 'Show Chapter 5 summary',
        reply: 'Show Chapter 5 summary',
      },
      {
        type: 'solid',
        body: 'Show Chapter 6 summary',
        reply: 'Show Chapter 6 summary',
      },
      {
        type: 'solid',
        body: 'Show Chapter 7 summary',
        reply: 'Show Chapter 7 summary',
      },
      {
        type: 'solid',
        body: 'Show Chapter 8 summary',
        reply: 'Show Chapter 8 summary',
      },
      {
        type: 'solid',
        body: 'Show Chapter 9 summary',
        reply: 'Show Chapter 9 summary',
      },
      {
        type: 'solid',
        body: 'Show Chapter 10 summary',
        reply: 'Show Chapter 10 summary',
      },
      {
        type: 'solid',
        body: 'Show Chapter 11 summary',
        reply: 'Show Chapter 11 summary',
      },
      {
        type: 'solid',
        body: 'Show Chapter 12 summary',
        reply: 'Show Chapter 12 summary',
      },
      {
        type: 'solid',
        body: 'Show Chapter 13 summary',
        reply: 'Show Chapter 13 summary',
      },
      {
        type: 'solid',
        body: 'Show Chapter 14 summary',
        reply: 'Show Chapter 14 summary',
      },
      {
        type: 'solid',
        body: 'Show Chapter 15 summary',
        reply: 'Show Chapter 15 summary',
      },
      {
        type: 'solid',
        body: 'Show Chapter 16 summary',
        reply: 'Show Chapter 16 summary',
      },
      {
        type: 'solid',
        body: 'Show Chapter 17 summary',
        reply: 'Show Chapter 17 summary',
      },
      {
        type: 'solid',
        body: 'Show Chapter 18 summary',
        reply: 'Show Chapter 18 summary',
      },   
    ],
  chapterButtons_list:
  [`Show Chapter 1 summary`, `Show Chapter 2 summary`, 'Show Chapter 3 summary', 'Show Chapter 4 summary','Show Chapter 5 summary','Show Chapter 6 summary','Show Chapter 7 summary','Show Chapter 8 summary','Show Chapter 9 summary','Show Chapter 10 summary','Show Chapter 11 summary','Show Chapter 12 summary','Show Chapter 13 summary','Show Chapter 14 summary','Show Chapter 15 summary','Show Chapter 16 summary','Show Chapter 17 summary','Show Chapter 18 summary'],
  followupButtons(chapter){return[
    {
      type: 'solid',
      body: `Show Chapter ${chapter} verses`,
      reply: `Show Chapter ${chapter} verses`,
    },
      {
        type: 'solid',
        body: `Ask a question from this Chapter`,
        reply: `Ask a question from this Chapter`,
      },
      {
        type: 'solid',
        body: 'Back to Main Menu',
        reply: 'Back to Main Menu',
      }
  ];
},
followupbuttons_list(chapter){
  return[`Show Chapter ${chapter} verses`,`Ask a question from this Chapter`,'Back to Main Menu'];
},
  afterVerseButtons: [
    {
      type: 'solid',
      body: `Show Explanation`,
      reply: `Show Explanation`,
    },
      {
        type: 'solid',
        body: `Ask a question from this verse`,
        reply: `Ask a question from this verse`,
      },
      {
        type: 'solid',
        body: `Next Verse`,
        reply: `Next Verse`,
      },
      {
        type: 'solid',
        body: 'Back to Main Menu',
        reply: 'Back to Main Menu',
      }
  ],
 afterVerseButtons_list: ['Show Explanation','Ask a question from this Verse','Next Verse','Back to Main Menu'],
 askChapterNumberPrompt: "Please enter a chapter number between 1 and 18",
 askQuestionPrompt: "Go ahead and ask your question!",
 moveNextChapterMessage:"You have completed all the verses of this chapter.Please move to Next Chapter!",
 endVerseButtons: [
  {
    type: 'solid',
    body: `Ask a question from this verse`,
    reply: `Ask a question from this verse`,
  },
  {
    type: 'solid',
    body: 'Back to Main Menu',
    reply: 'Back to Main Menu',
  }
],
noanswer:"Sorry, I can't answer this question right now. Please try again later.",
endExplanationButtons: [
    {
      type: 'solid',
      body: `Ask a question from this verse`,
      reply: `Ask a question from this verse`,
    },
    {
      type: 'solid',
      body: `Next Verse`,
      reply: `Next Verse`,
    },
    {
      type: 'solid',
      body: 'Back to Main Menu',
      reply: 'Back to Main Menu',
    }
],
languagebody:'Choose a Language',
languagebuttons: [
  {
    type: 'solid',
    body: `English`,
    reply: `English`,
  },
  {
    type: 'solid',
    body: `Hindi`,
    reply: `Hindi`,
  },
],
languagebuttons_list:['English','Hindi']
};
