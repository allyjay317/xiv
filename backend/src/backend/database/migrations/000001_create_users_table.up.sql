CREATE TABLE IF NOT EXISTS users(
    id UUID PRIMARY KEY,
    username VARCHAR (50) UNIQUE NOT NULL,
    discord_id varchar (50) UNIQUE NOT NULL,
    avatar varchar (50),
    accent_color varchar (50)
);