/*
Improvements-
    Use while loop to find multiple email links per page instead of hard coding x number of results tables
    Use regex to find start of email string
*/

SET @val = "@callofthesea.org";
-- escape underscores

CREATE TEMPORARY TABLE temp_posts
(
    ID BIGINT,
    content LONGTEXT
);

CREATE TEMPORARY TABLE results1
(
    ID BIGINT,
    pos BIGINT
);

CREATE TEMPORARY TABLE results2
(
    ID BIGINT,
    pos BIGINT
);

CREATE TEMPORARY TABLE results3
(
    ID BIGINT,
    pos BIGINT
);

CREATE TEMPORARY TABLE results4
(
    ID BIGINT,
    pos BIGINT
);

CREATE TEMPORARY TABLE results5
(
    ID BIGINT,
    pos BIGINT
);

INSERT INTO temp_posts
SELECT post_id AS ID, meta_value AS content
FROM wp_postmeta
WHERE meta_value LIKE CONCAT('%', @val, '%');

INSERT INTO temp_posts
SELECT ID, post_content AS content
FROM wp_posts
WHERE post_content LIKE CONCAT('%', @val, '%')
    AND post_type != 'revision';

INSERT INTO results1
SELECT p.ID, LOCATE(@val, t.content, 1) AS pos
FROM wp_posts p
    JOIN temp_posts t ON t.ID = p.ID;

INSERT INTO results2
SELECT p.ID, LOCATE(@val, t.content, r.pos + 1) AS pos
FROM wp_posts p
    JOIN temp_posts t ON t.ID = p.ID
    JOIN results1 r ON r.ID = p.ID
WHERE LOCATE(@val, t.content, r.pos + 1) != 0;

INSERT INTO results3
SELECT p.ID, LOCATE(@val, t.content, r.pos + 1) AS pos
FROM wp_posts p
    JOIN temp_posts t ON t.ID = p.ID
    JOIN results2 r ON r.ID = p.ID
WHERE LOCATE(@val, t.content, r.pos + 1) != 0;

INSERT INTO results4
SELECT p.ID, LOCATE(@val, t.content, r.pos + 1) AS pos
FROM wp_posts p
    JOIN temp_posts t ON t.ID = p.ID
    JOIN results3 r ON r.ID = p.ID
WHERE LOCATE(@val, t.content, r.pos + 1) != 0;

INSERT INTO results5
SELECT p.ID, LOCATE(@val, t.content, r.pos + 1) AS pos
FROM wp_posts p
    JOIN temp_posts t ON t.ID = p.ID
    JOIN results4 r ON r.ID = p.ID
WHERE LOCATE(@val, t.content, r.pos + 1) != 0;

SELECT p.ID, p.post_name, p.post_type, r.pos, SUBSTRING(t.content, r.pos - 10, 27) AS email, p.guid AS url
FROM wp_posts p
    JOIN temp_posts t ON t.ID = p.ID
    LEFT JOIN (
                                                                                                                                                                         SELECT ID, pos
        FROM results1
    UNION
        SELECT ID, pos
        FROM results2
    UNION
        SELECT ID, pos
        FROM results3
    UNION
        SELECT ID, pos
        FROM results4
    UNION
        SELECT ID, pos
        FROM results5
    ) r ON r.ID = p.ID
WHERE p.post_type IN ('post', 'page');