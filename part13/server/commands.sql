-- Create Blog table

CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
	url text NOT NULL,
	title text NOT NULL,
	likes integer DEFAULT 0
);

-- Insert two blogs to the database 
INSERT INTO blogs (author, url, title, likes) VALUES ('John Doe', 'https://www.johndoe.com/blog1', 'Exploring the Benefits of Green Energy', 150);
INSERT INTO blogs (author, url, title, likes) VALUES ('Jane Smith', 'https://www.janesmith.com/blog1', 'The Future of Artificial Intelligence', 200);