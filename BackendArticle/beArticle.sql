-- Active: 1690239807961@@147.139.210.135@5432@langgeng01

CREATE TABLE
    article (
        id SERIAL PRIMARY KEY NOT NULL,
        article_name VARCHAR(64) NOT NULL,
        article_detail VARCHAR NOT NULL,
        article_photo VARCHAR NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    )

DROP TABLE article 