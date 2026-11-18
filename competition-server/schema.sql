PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS guests (
  id TEXT PRIMARY KEY, token_hash TEXT NOT NULL UNIQUE, name TEXT NOT NULL,
  created_at INTEGER NOT NULL, expires_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS rooms (
  id TEXT PRIMARY KEY, code TEXT NOT NULL UNIQUE, language TEXT NOT NULL,
  host_id TEXT NOT NULL REFERENCES guests(id), guest_id TEXT REFERENCES guests(id),
  status TEXT NOT NULL CHECK(status IN ('waiting','active','finished','cancelled')),
  created_at INTEGER NOT NULL, expires_at INTEGER NOT NULL,
  starts_at INTEGER, ends_at INTEGER
);
CREATE INDEX IF NOT EXISTS rooms_due ON rooms(status, ends_at);
CREATE TABLE IF NOT EXISTS questions (
  room_id TEXT NOT NULL REFERENCES rooms(id), idx INTEGER NOT NULL,
  kind TEXT NOT NULL, prompt TEXT NOT NULL, hint TEXT NOT NULL,
  options TEXT NOT NULL, answer INTEGER NOT NULL, explanation TEXT NOT NULL,
  PRIMARY KEY(room_id,idx)
);
CREATE TABLE IF NOT EXISTS room_players (
  room_id TEXT NOT NULL REFERENCES rooms(id), player_id TEXT NOT NULL REFERENCES guests(id),
  cursor INTEGER NOT NULL DEFAULT 0, correct INTEGER NOT NULL DEFAULT 0,
  attempts INTEGER NOT NULL DEFAULT 0, nonce TEXT NOT NULL,
  last_nonce TEXT, last_answer_at INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY(room_id,player_id)
);
CREATE TABLE IF NOT EXISTS active_players (
  player_id TEXT PRIMARY KEY REFERENCES guests(id), room_id TEXT NOT NULL REFERENCES rooms(id),
  expires_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS receipts (
  room_id TEXT NOT NULL, player_id TEXT NOT NULL, nonce TEXT NOT NULL,
  correct INTEGER NOT NULL, answer INTEGER NOT NULL, explanation TEXT NOT NULL,
  accepted_at INTEGER NOT NULL, PRIMARY KEY(room_id,player_id,nonce)
);
CREATE TABLE IF NOT EXISTS results (
  room_id TEXT NOT NULL, player_id TEXT NOT NULL, language TEXT NOT NULL,
  correct INTEGER NOT NULL, attempts INTEGER NOT NULL,
  outcome TEXT NOT NULL CHECK(outcome IN ('win','draw','loss')),
  finished_at INTEGER NOT NULL, PRIMARY KEY(room_id,player_id)
);
CREATE INDEX IF NOT EXISTS results_language ON results(language,player_id);
CREATE TABLE IF NOT EXISTS rate_limits (
  bucket TEXT PRIMARY KEY, count INTEGER NOT NULL, resets_at INTEGER NOT NULL
);
