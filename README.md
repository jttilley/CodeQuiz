# CodeQuiz

# Link to quiz:
https://jttilley.github.io/CodeQuiz/

# Objective:
Create dynamic code quiz that is timed and stores scores. The web page runs through the quiz with javascript dynamically changing the page.

# What I did:
* I have some questions, answers, and the correct answer index in an array of objects that I use to create the quiz.
* There can be any number of answers
* I have event listeners for buttons clicked
* when an answer is clicked it sets up the next question and displays if it was correct or wrong for 5 seconds in the footer.
* I have a high scores list div that looks and acts like a link that activates the highscores portion of the page. 
* The timer counts down seconds from 60
* When the user finishes the quiz it asks for their initials and waits for an enter or the submit button to be clicked.
* The score is the time left. When a wrong answer is selected the timer loses 10 seconds, but the score cannot go below 0.
* If the timer hits 0 before the quiz is complete it quits the quiz and will save a score of 0 for the initials entered. 
* The high scores are stored in the local storage so will remain the next time the quiz page is opened. 
* All high scores are save all caps and sorted from highest to lowest
* The user can clear the high scores by clicking the clear scores button. When clicked the scores are cleared from variables and local storage and cannot be retrieved or undone.
* The user can see the high scores list at any time. If they click on it in the middle of the quiz the quiz is stopped and reset if they go back and hit start again.
