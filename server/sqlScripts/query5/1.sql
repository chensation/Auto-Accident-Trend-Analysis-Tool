-- Factor: DEFAULT
-- Year: 00

SELECT
    ((totsum - (sevsum * tempsum / count)) / sqrt((sevsumsq - power(sevsum, 2.0) / count) * (tempsumsq - power(tempsum, 2.0) / count))) AS "CORRELATION_COEFFICIENT"


FROM(
SELECT
    sum(SEVERITY) AS sevsum,
    sum(DEFAULT) AS tempsum,
    sum(SEVERITY * SEVERITY) AS sevsumsq,
    sum(DEFAULT *DEFAULT) AS tempsumsq,
    sum(SEVERITY * DEFAULT) AS totsum,
    count(*) as count

FROM(
SIYUCHEN.ACCIDENT
natural join
SIYUCHEN.WEATHER
)
WHERE TO_CHAR(START_TIME, 'YYYY')='0000' 
)