
SELECT COUNT(*) FROM SIYUCHEN.ACCIDENT
=======


SELECT
    ((totsum - (xsum * ysum / count)) / sqrt((xsumsq - power(xsum, 2.0) / count) * (ysumsq - power(ysum, 2.0) / count))) AS "temperature-severity Corr Coef"


FROM(
SELECT
    sum(SEVERITY) AS xsum,
    sum(temperature) AS ysum,
    sum(SEVERITY * SEVERITY) AS xsumsq,
    sum(temperature *temperature) AS ysumsq,
    sum(SEVERITY * temperature) AS totsum,
    count(*) as count

FROM(
SIYUCHEN.ACCIDENT
natural join
SIYUCHEN.WEATHER
)
WHERE TO_CHAR(START_TIME, 'YY-MM')='20-02' 
)

-------------------------
SELECT
    ((totsum - (xsum * ysum / count)) / sqrt((xsumsq - power(xsum, 2.0) / count) * (ysumsq - power(ysum, 2.0) / count))) AS "windchill-severity Corr Coef"


FROM(
SELECT
    sum(SEVERITY) AS xsum,
    sum(wind_chill) AS ysum,
    sum(SEVERITY * SEVERITY) AS xsumsq,
    sum(wind_chill *wind_chill) AS ysumsq,
    sum(SEVERITY *wind_chill) AS totsum,
    count(*) as count

FROM(
SIYUCHEN.ACCIDENT
natural join
SIYUCHEN.WEATHER
)
WHERE TO_CHAR(START_TIME, 'YY-MM')='20-02' 
)
----------------
SELECT
    ((totsum - (xsum * ysum / count)) / sqrt((xsumsq - power(xsum, 2.0) / count) * (ysumsq - power(ysum, 2.0) / count))) AS "visibility-severity Corr Coef"


FROM(
SELECT
    sum(SEVERITY) AS xsum,
    sum(visibility) AS ysum,
    sum(SEVERITY * SEVERITY) AS xsumsq,
    sum(visibility *visibility) AS ysumsq,
    sum(SEVERITY *visibility) AS totsum,
    count(*) as count

FROM(
SIYUCHEN.ACCIDENT
natural join
SIYUCHEN.WEATHER
)
WHERE TO_CHAR(START_TIME, 'YY-MM')='20-02' 
)

----------
SELECT
    ((totsum - (xsum * ysum / count)) / sqrt((xsumsq - power(xsum, 2.0) / count) * (ysumsq - power(ysum, 2.0) / count))) AS "humidity-severity Corr Coef"


FROM(
SELECT
    sum(SEVERITY) AS xsum,
    sum(humidity) AS ysum,
    sum(SEVERITY * SEVERITY) AS xsumsq,
    sum(humidity *humidity) AS ysumsq,
    sum(SEVERITY *humidity) AS totsum,
    count(*) as count

FROM(
SIYUCHEN.ACCIDENT
natural join
SIYUCHEN.WEATHER
)
WHERE TO_CHAR(START_TIME, 'YY-MM')='20-02' 
)
---------------
SELECT
    ((totsum - (xsum * ysum / count)) / sqrt((xsumsq - power(xsum, 2.0) / count) * (ysumsq - power(ysum, 2.0) / count))) AS "pressure-severity Corr Coef"


FROM(
SELECT
    sum(SEVERITY) AS xsum,
    sum(pressure) AS ysum,
    sum(SEVERITY * SEVERITY) AS xsumsq,
    sum(pressure *pressure) AS ysumsq,
    sum(SEVERITY *pressure) AS totsum,
    count(*) as count

FROM(
SIYUCHEN.ACCIDENT
natural join
SIYUCHEN.WEATHER
)
WHERE TO_CHAR(START_TIME, 'YY-MM')='20-02' 
)

-------


SELECT
    ((totsum - (xsum * ysum / count)) / sqrt((xsumsq - power(xsum, 2.0) / count) * (ysumsq - power(ysum, 2.0) / count))) AS "precipitation-severity Corr Coef"


FROM(
SELECT
    sum(SEVERITY) AS xsum,
    sum(precipitation) AS ysum,
    sum(SEVERITY * SEVERITY) AS xsumsq,
    sum(precipitation *precipitation) AS ysumsq,
    sum(SEVERITY *precipitation) AS totsum,
    count(*) as count

FROM(
SIYUCHEN.ACCIDENT
natural join
SIYUCHEN.WEATHER
)
WHERE TO_CHAR(START_TIME, 'YY-MM')='20-02' 
)
--------------

























