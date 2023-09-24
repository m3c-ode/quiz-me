# Entities

## Description

An app that lets you create quizzes and share them between friends. 
The creator of the quiz can view and share all the results at the end of the quiz.

## Requirements

- users can create quizzes
- users can make their quiz unlisted (make them private and not available on the home page, 
   but if someone knows the quiz URL they can visit and take the quiz)
- users can share a link to a single quiz
- users can see a list of public quizzes
- users can see a list of public quizzes on the home page
- users can attempt a quiz
- users can see the results of their recent attempt
- users can share a link to the result of their attempt

## Tables:
- users
    - id
    - name
    - email
    - password
    - avatar_url
- quizzes
    - id
    - owner_id -> users.id
    - is_public (boolean)
    - title
- questions
    - id
    - quiz_id
    - description
- answers
    - id
    - text
    - question_id
    - is_correct (boolean)
- attempts
    - id
    - quiz_id
    - user_id
    - taken (timestamp)
- answers_attempts
    - id
    - answer_id
    - attempts_id

