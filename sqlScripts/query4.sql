
--QUERY 4
select count(*),TO_CHAR(START_TIME, 'YY-MM') AS MONTH from 
    SIYUCHEN.ACCIDENT 
WHERE TO_CHAR(START_TIME, 'YY-MM')<'20-03'
GROUP BY TO_CHAR(START_TIME, 'YY-MM')
ORDER BY TO_CHAR(START_TIME, 'YY-MM')


select count(*),TO_CHAR(START_TIME, 'YY-MM') AS MONTH from 
    SIYUCHEN.ACCIDENT 
WHERE TO_CHAR(START_TIME, 'YY-MM')>='20-03'
GROUP BY TO_CHAR(START_TIME, 'YY-MM')
ORDER BY TO_CHAR(START_TIME, 'YY-MM')


SELECT AVG((sysdate + (end_time - start_time)*24*60- sysdate)) AS AVG_MINUTE, 
        TO_CHAR(START_TIME, 'YY-MM') AS H FROM  
                (   
                SELECT *  FROM SIYUCHEN.ACCIDENT 
                WHERE TO_CHAR(START_TIME, 'YY-MM')<'20-03' 
                
                ) 
    GROUP BY TO_CHAR(START_TIME, 'YY-MM')
    ORDER BY TO_CHAR(START_TIME, 'YY-MM')
    
    
SELECT AVG((sysdate + (end_time - start_time)*24*60- sysdate)) AS AVG_MINUTE, 
        TO_CHAR(START_TIME, 'YY-MM') AS H FROM  
                (   
                SELECT *  FROM SIYUCHEN.ACCIDENT 
                WHERE TO_CHAR(START_TIME, 'YY-MM')>='20-03' 
                
                ) 
    GROUP BY TO_CHAR(START_TIME, 'YY-MM')
    ORDER BY TO_CHAR(START_TIME, 'YY-MM')