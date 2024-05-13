export const localisedStrings = {
  welcomeMessage: 'Welcome, Bhagavad Gita Chatbot!',
  chapter1Summary: "In Chapter 1 of the Bhagavad Gita, the stage is set on the battlefield of Kurukshetra, where the armies of the Kauravas and Pandavas stand face to face. Sanjay, blessed with divine vision by sage Ved Vyas, narrates this epic saga to King Dhritrashtra, enabling him to witness the unfolding events despite his physical absence.\n Sanjay vividly describes the vast armies of both sides to Dhritrashtra, highlighting the valor and prowess of the warriors. He prophesies that victory will favor the side where Shri Krishna resides.\n Meanwhile, Arjuna, positioned in a chariot under the control of Lord Krishna—the master of the three worlds—is deeply distressed to see his own relatives and friends lined up as adversaries. Overwhelmed by conflicting emotions, Arjuna implores Krishna to place the chariot between the two armies so he can discern his opponents clearly. \n Driven by the virtue of 'Satgun'—the quality of love and affection—Arjuna's heart is heavy as he drops his weapons and retreats to the rear of the chariot. He expresses his anguish to Krishna, unable to reconcile the idea of fighting those whom he once held dear. Arjuna even contemplates that his own demise at the hands of Duryodhana would spare countless lives from the impending bloodshed, seeking solace and guidance from Lord Krishna in this moment of profound crisis.",
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
  [`Show Chapter 11 summary`, `Show Chapter 2 summary`, 'Show Chapter 3 summary', 'Show Chapter 4 summary','Show Chapter 5 summary','Show Chapter 6 summary','Show Chapter 7 summary','Show Chapter 8 summary','Show Chapter 9 summary','Show Chapter 10 summary','Show Chapter 11 summary','Show Chapter 12 summary','Show Chapter 13 summary','Show Chapter 14 summary','Show Chapter 15 summary','Show Chapter 16 summary','Show Chapter 17 summary','Show Chapter 18 summary'],
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
endChapterButtons: [
  {
    type: 'solid',
    body: `Show Chapter 18 verses`,
    reply: `Show Chapter 18 verses`,
  },
  {
    type: 'solid',
    body: `Return Back to Chapter 1`,
    reply: `Return Back to Chapter 1`,
  },
  {
    type: 'solid',
    body: 'Choose a Chapter',
    reply: 'Choose a chapter',
  },
  {
    type: 'solid',
    body: 'Ask a question',
    reply: 'Ask a question',
  }
],
endChapterButton_list:'Return Back to Chapter 1',
noanswer:"Sorry, I can't answer this question right now. Please try again later.",
nextExplanationButtons: [
  {
    type: 'solid',
    body: `Next part of Explanation`,
    reply: `Next part of Explanation`,
  },
  {
    type: 'solid',
    body: 'Next Verse',
    reply: 'Next Verse',
  }
],
nextExplanationButton_list:`Next part of Explanation`,
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
};
