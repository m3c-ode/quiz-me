-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS users CASCADE;

DROP TABLE IF EXISTS quizzes CASCADE;

DROP TABLE IF EXISTS questions CASCADE;

DROP TABLE IF EXISTS answers CASCADE;

DROP TABLE IF EXISTS attempts CASCADE;

DROP TABLE IF EXISTS answers_attempts CASCADE;

CREATE TABLE
  users (
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(255),
    email VARCHAR(255) NOT NULL
  );

CREATE TABLE
  quizzes (
    id SERIAL PRIMARY KEY NOT NULL,
    owner_id INTEGER REFERENCES users (id) NOT NULL ON DELETE CASCADE,
    is_public BOOLEAN NOT NULL DEFAULT TRUE,
    title VARCHAR(255) NOT NULL,
    TIMESTAMP TIMESTAMP NOT NULL DEFAULT NOW ()
  );

CREATE TABLE
  questions (
    id SERIAL PRIMARY KEY NOT NULL,
    quiz_id INTEGER REFERENCES quizzes (id) NOT NULL ON DELETE CASCADE,
    text TEXT NOT NULL
  );

CREATE TABLE
  answers (
    id SERIAL PRIMARY KEY NOT NULL,
    question_id INTEGER REFERENCES questions (id) NOT NULL ON DELETE CASCADE,
    text VARCHAR(255) NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE
  );

CREATE TABLE
  attempts (
    id SERIAL PRIMARY KEY NOT NULL,
    quiz_id INTEGER REFERENCES quizzes (id) NOT NULL ON DELETE CASCADE,
    user_id INTEGER REFERENCES users (id) NOT NULL ON DELETE CASCADE,
    TIMESTAMP TIMESTAMP DEFAULT NOW ()
  );

CREATE TABLE
  answers_attempts (
    id SERIAL PRIMARY KEY NOT NULL,
    answer_id INTEGER REFERENCES answers (id) NOT NULL ON DELETE CASCADE,
    attempt_id INTEGER REFERENCES attempts (id) NOT NULL ON DELETE CASCADE,
  );