-- Questions table seeds here
-- CREATE TABLE questions (
--   id SERIAL PRIMARY KEY NOT NULL,
--   quiz_id INTEGER REFERENCES quizzes(id) NOT NULL ON DELETE CASCADE,
--   text TEXT NOT NULL
-- );
-- 1: Javascript
-- 2: Hockey
-- 3: Blood bowl - based on warhammer original but american football
-- JAVASCRIPT QUIZ
INSERT INTO
  questions (quiz_id, text)
VALUES
  (
    1,
    'What does JavaScript primarily add to web development?'
  );

INSERT INTO
  questions (quiz_id, text)
VALUES
  (
    1,
    'Which keyword is used to declare a constant variable in JavaScript?'
  );

INSERT INTO
  questions (quiz_id, text)
VALUES
  (1, 'What does the DOM stand for in JavaScript?');

INSERT INTO
  questions (quiz_id, text)
VALUES
  (
    1,
    'Which of the following is not a data type in JavaScript?'
  );

INSERT INTO
  questions (quiz_id, text)
VALUES
  (
    1,
    'What is the purpose of the "for" loop in JavaScript?'
  );