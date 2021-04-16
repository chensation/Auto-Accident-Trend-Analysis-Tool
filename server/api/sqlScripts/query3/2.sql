-- MONTH1: 00
-- MONTH2: 01
-- OPERATOR: AND

SELECT AVG((sysdate + (end_time - start_time)*24*60- sysdate)) AS AVG_DURATION,
        TO_CHAR(START_TIME, 'HH24') AS H FROM  
                (   
                SELECT *  FROM SIYUCHEN.ACCIDENT 
                WHERE TO_CHAR(START_TIME, 'MM')>=00 
                AND  TO_CHAR(START_TIME, 'MM')<01
                ) -- WINTER
    GROUP BY TO_CHAR(START_TIME, 'HH24')
    ORDER BY TO_CHAR(START_TIME, 'HH24') ASC