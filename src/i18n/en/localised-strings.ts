export const localisedStrings = {
  welcomeMessage: 'Welcome, Bhagavad Gita Chatbot! Let me begin by briefly summarizing Chapter 1 of the Bhagavad Gita.',
  chapter1Summary: "In Chapter 1 of the Bhagavad Gita, the stage is set on the battlefield of Kurukshetra, where the armies of the Kauravas and Pandavas stand face to face. Sanjay, blessed with divine vision by sage Ved Vyas, narrates this epic saga to King Dhritrashtra, enabling him to witness the unfolding events despite his physical absence.\n Sanjay vividly describes the vast armies of both sides to Dhritrashtra, highlighting the valor and prowess of the warriors. He prophesies that victory will favor the side where Shri Krishna resides.\n Meanwhile, Arjuna, positioned in a chariot under the control of Lord Krishna—the master of the three worlds—is deeply distressed to see his own relatives and friends lined up as adversaries. Overwhelmed by conflicting emotions, Arjuna implores Krishna to place the chariot between the two armies so he can discern his opponents clearly. \n Driven by the virtue of 'Satgun'—the quality of love and affection—Arjuna's heart is heavy as he drops his weapons and retreats to the rear of the chariot. He expresses his anguish to Krishna, unable to reconcile the idea of fighting those whom he once held dear. Arjuna even contemplates that his own demise at the hands of Duryodhana would spare countless lives from the impending bloodshed, seeking solace and guidance from Lord Krishna in this moment of profound crisis.",
  seeMoreMessage: 'See More Data',
  language_hindi: 'हिन्दी',
  language_english: 'English',
  language_changed: 'Language changed to English',
  greetingMessages: ['hi','Hi','HI','hI','Hello','hello','hola'],
  followupButtonBody: "Let's delve deeper into the profound wisdom and insights conveyed through this divine dialogue.",
  followupButtons(chapter) {
    return [
      {
        type: 'solid',
        body: `Show Chapter ${chapter} verses`,
        reply: `Show Chapter ${chapter} verses`,
      },
      {
        type: 'solid',
        body: `Show Chapter ${chapter + 1} summary`,
        reply: `Show Chapter ${chapter + 1} summary`,
      },
      {
        type: 'solid',
        body: 'Choose a Chapter',
        reply: 'Choose a Chapter',
      },
      {
        type: 'solid',
        body: 'Ask a question',
        reply: 'Ask a question',
      },
    ];
  },
  followupButton_list(chapter) {
    return [`Show Chapter ${chapter} verses`, `Show Chapter ${chapter + 1} summary`, 'Choose a Chapter', 'Ask a question'];
  },
  afterVerseButtons: [
      {
        type: 'solid',
        body: `Ask a question from this verse`,
        reply: `Ask a question from this verse`,
      },
      {
        type: 'solid',
        body: `Next sloke`,
        reply: `Next sloke`,
      },
      {
        type: 'solid',
        body: 'Next Chapter',
        reply: 'Next Chapter',
      }
  ],
 afterVerseButtons_list: ['Ask a question from this verse','Next sloke','Next Chapter']
  
};
