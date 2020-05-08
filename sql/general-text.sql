SET @val = "@callofthesea.org"; -- escape underscores

SELECT *
FROM wp_posts
WHERE ID IN (
    SELECT post_id AS ID
    FROM wp_postmeta
    WHERE meta_value LIKE CONCAT('%', @val, '%')

    UNION

    SELECT ID
    FROM wp_posts
    WHERE post_content LIKE CONCAT('%', @val, '%')
    AND post_type != 'revision'
)
AND post_type != 'revision'