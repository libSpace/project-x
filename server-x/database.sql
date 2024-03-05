-- Create Database for the whole server
CREATE DATABASE busket_buddy;

-- Create Users Table for Login/Sign Up
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Create User items Table
CREATE TABLE user_items (
    item_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    description VARCHAR(255) NOT NULL
);

-- Create User Members Table for Adding Each Other
CREATE TABLE user_members (
    member_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    member_username VARCHAR(50) NOT NULL
);

-- Create User items Shared Table
CREATE TABLE shared_items (
    shared_item_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    member_id INTEGER REFERENCES user_members(member_id),
    description VARCHAR(255) NOT NULL
);

-- Create Groups Table
CREATE TABLE groups (
    group_id SERIAL PRIMARY KEY,
    group_name VARCHAR(50) UNIQUE NOT NULL
);

-- Create Group Members Table
CREATE TABLE group_members (
    group_member_id SERIAL PRIMARY KEY,
    group_id INTEGER REFERENCES groups(group_id),
    user_id INTEGER REFERENCES users(user_id)
);

-- -- NOT YET CREATED 
-- CREATE TABLE user_items_official (
--     item_id SERIAL PRIMARY KEY,
--     user_id INTEGER REFERENCES users(user_id),
--     description VARCHAR(255) NOT NULL,
--     quantity VARCHAR(255),
--     price NUMERIC(10,2)
-- );

-- Add Group ID to User Members Table
ALTER TABLE user_members ADD COLUMN group_id INTEGER REFERENCES groups(group_id);