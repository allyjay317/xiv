CREATE TABLE IF NOT EXISTS gear_sets(
    id UUID PRIMARY KEY,
    user_id  UUID references users(id),
    character_id varchar (50) references characters(character_id),
    name VARCHAR (50),
    job int,
    config JSONB
)