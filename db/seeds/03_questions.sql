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

-- HOCKEY
INSERT INTO
  questions (quiz_id, text)
VALUES
  (2, 'What is the primary objective in ice hockey?');

INSERT INTO
  questions (quiz_id, text)
VALUES
  (
    2,
    'How many players are typically on the ice for each team during a standard ice hockey game?'
  );

INSERT INTO
  questions (quiz_id, text)
VALUES
  (
    2,
    'Which of the following is NOT a piece of equipment commonly used in ice hockey?'
  );

INSERT INTO
  questions (quiz_id, text)
VALUES
  (
    2,
    'What is the area called where a goaltender defends the net?'
  );

INSERT INTO
  questions (quiz_id, text)
VALUES
  (
    2,
    'How long is a standard period in professional ice hockey?'
  );

-- BLOODBOWL
INSERT INTO
  questions (quiz_id, text)
VALUES
  (3, 'What type of game is Warhammer Blood Bowl?');

INSERT INTO
  questions (quiz_id, text)
VALUES
  (
    3,
    'How many players are typically on a Blood Bowl team during a match?'
  );

INSERT INTO
  questions (quiz_id, text)
VALUES
  (3, 'What is the objective of a Blood Bowl match?');

INSERT INTO
  questions (quiz_id, text)
VALUES
  (
    3,
    'Which of the following is NOT a playable team in Blood Bowl?'
  );

INSERT INTO
  questions (quiz_id, text)
VALUES
  (
    3,
    'What does a "Blitz" action in Blood Bowl allow a player to do?'
  );