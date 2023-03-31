CREATE DATABASE eventpass;
CREATE USER eventpassuser WITH PASSWORD 'eventpass';
ALTER DATABASE eventpass OWNER TO eventpassuser;
GRANT USAGE, CREATE ON SCHEMA public TO eventpassuser;