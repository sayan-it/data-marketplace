SELECT
	t1.table_schema
	,t1.table_name
	,t1.col_name
	,t2.data_type
	,t2.isnotnull,t2.isPrimaryKey,t2.isUniqueKey,t2.isForeignKey
	,foreignKey_Fieldnum
	,foreignKey_ConnNum
	,t1.description as "Business_MetaData"
FROM 
(SELECT
    c.table_schema,
    c.table_name,
    c.column_name as col_name,
    pgd.description as description
FROM pg_catalog.pg_statio_all_tables as st
INNER JOIN pg_catalog.pg_description pgd on (
    pgd.objoid = st.relid
)
INNER JOIN information_schema.columns c on (
    pgd.objsubid   = c.ordinal_position and
    c.table_schema = st.schemaname and
    c.table_name   = st.relname
)) t1
JOIN
(SELECT  
    f.attnum AS number,  
   f.attname AS "name",  
    f.attnotnull AS isnotnull,  
    pg_catalog.format_type(f.atttypid,f.atttypmod) AS data_type,  
    CASE  
        WHEN p.contype = 'p' THEN 'true'  
        ELSE 'false'  
    END AS isPrimaryKey,  
    CASE  
        WHEN p.contype = 'u' THEN 'true'  
        ELSE 'false'
    END AS isUniqueKey,
    CASE
        WHEN p.contype = 'f' THEN g.relname
    END AS isForeignKey,
    CASE
        WHEN p.contype = 'f' THEN p.confkey
    END AS foreignKey_Fieldnum,
    CASE
        WHEN p.contype = 'f' THEN p.conkey
    END AS foreignKey_ConnNum
--   CASE
--        WHEN f.atthasdef = 't' THEN d.adsrc
--    END AS default
FROM pg_attribute f  
    JOIN pg_class c ON c.oid = f.attrelid  
    JOIN pg_type t ON t.oid = f.atttypid  
    LEFT JOIN pg_attrdef d ON d.adrelid = c.oid AND d.adnum = f.attnum  
    LEFT JOIN pg_namespace n ON n.oid = c.relnamespace  
    LEFT JOIN pg_constraint p ON p.conrelid = c.oid AND f.attnum = ANY (p.conkey)  
    LEFT JOIN pg_class AS g ON p.confrelid = g.oid  
WHERE c.relkind = 'r'::char  
   AND n.nspname = 'public'  -- Replace with Schema name  
    AND c.relname in ('customers','inventory','order_items','orders','products','shipments','stores')  -- Replace with table name  
    AND f.attnum > 0 ORDER BY number) t2
on t1.col_name = t2.name