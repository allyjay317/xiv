CREATE TABLE IF NOT EXISTS characters(
    character_id varchar (50) unique not null PRIMARY KEY,
    user_id UUID references users(id),
    name varchar (50),
    avatar varchar (150),
    portrait varchar (150),
    last_fetch date default now()
);

CREATE FUNCTION sync_lastmod() RETURNS trigger as $$
BEGIN
    NEW.last_fetch := NOW();

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER
    sync_lastmod
BEFORE UPDATE ON
    characters
FOR EACH ROW EXECUTE PROCEDURE
    sync_lastmod();