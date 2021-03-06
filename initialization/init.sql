-- Database: bamboo

-- DROP DATABASE bamboo;

-- CREATE DATABASE IF NOT EXISTS bamboo;

-- \connect bamboo

-- DROP TABLE accounts;

CREATE TABLE IF NOT EXISTS "accounts" (
  id character varying(50) PRIMARY KEY NOT NULL UNIQUE,
  email character varying(150) NOT NULL,
  phone_number character varying(15) NOT NULL,
  password character varying(250) NOT NULL,
  salt_key character varying(50) NOT NULL,
  is_verified boolean DEFAULT false NOT NULL,
  is_admin boolean DEFAULT false NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  deleted_at timestamp with time zone
);

-- DROP TABLE users;

CREATE TABLE IF NOT EXISTS "users" (
  id character varying(50) PRIMARY KEY NOT NULL UNIQUE,
  account_id character varying(50) NOT NULL,
  first_name character varying(150) NOT NULL,
  last_name character varying(150) NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  deleted_at timestamp with time zone
);

-- DROP TABLE products;

CREATE TABLE IF NOT EXISTS "products" (
  id character varying(50) PRIMARY KEY NOT NULL UNIQUE,
  user_id character varying(50) NOT NULL,
  name character varying(150) NOT NULL,
  estimated_price character varying(150) NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  deleted_at timestamp with time zone
);

-- DROP TABLE contracts;

CREATE TABLE IF NOT EXISTS "contracts" (
  id character varying(50) PRIMARY KEY NOT NULL UNIQUE,
  user_id character varying(50) NOT NULL,
  product_id character varying(50) NOT NULL,
  price character varying(150) NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  deleted_at timestamp with time zone
);

-- TRIGGER

CREATE OR REPLACE FUNCTION update_updated_at_timestamp_on_update()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ language 'plpgsql';

DO $$
DECLARE
  t varchar;
  tables varchar[] := array[
    'accounts',
    'users',
    'products',
    'contracts'
  ];
BEGIN
  FOREACH t IN ARRAY tables
  LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_' || t || '_updated_at_timestamp') THEN
      EXECUTE 'CREATE TRIGGER update_' || t || '_updated_at_timestamp BEFORE UPDATE ON ' || t || ' FOR EACH ROW EXECUTE PROCEDURE update_updated_at_timestamp_on_update()';
    END IF;
  END LOOP;
END
$$;
