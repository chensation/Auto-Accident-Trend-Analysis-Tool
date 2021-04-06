--query 3 

--DISTANCE

--WINTER
SELECT  AVG(AFFECTED_DISTANCE) AS AVG_DIS, 
        TO_CHAR(START_TIME, 'HH24') AS H FROM  
                (   
                SELECT *  FROM SIYUCHEN.ACCIDENT 
                WHERE TO_CHAR(START_TIME, 'MM')>=12 
                OR   TO_CHAR(START_TIME, 'MM')<03
                ) 
    GROUP BY TO_CHAR(START_TIME, 'HH24')
    ORDER BY TO_CHAR(START_TIME, 'HH24') ASC 

--SPRING
SELECT  AVG(AFFECTED_DISTANCE) AS AVG_DIS, 
        TO_CHAR(START_TIME, 'HH24') AS H FROM  
                (   
                SELECT *  FROM SIYUCHEN.ACCIDENT 
                WHERE TO_CHAR(START_TIME, 'MM')>=03 
                AND  TO_CHAR(START_TIME, 'MM')<06
                ) 
    GROUP BY TO_CHAR(START_TIME, 'HH24')
    ORDER BY TO_CHAR(START_TIME, 'HH24') ASC 

--SUMMER 
SELECT  AVG(AFFECTED_DISTANCE) AS AVG_DIS, 
        TO_CHAR(START_TIME, 'HH24') AS H FROM  
                (   
                SELECT *  FROM SIYUCHEN.ACCIDENT 
                WHERE TO_CHAR(START_TIME, 'MM')>=06 
                AND   TO_CHAR(START_TIME, 'MM')<09
                ) 
    GROUP BY TO_CHAR(START_TIME, 'HH24')
    ORDER BY TO_CHAR(START_TIME, 'HH24') ASC 
--FALL
SELECT  AVG(AFFECTED_DISTANCE) AS AVG_DIS,
        TO_CHAR(START_TIME, 'HH24') AS H FROM  
                (   
                SELECT *  FROM SIYUCHEN.ACCIDENT 
                WHERE TO_CHAR(START_TIME, 'MM')>=09 
                OR   TO_CHAR(START_TIME, 'MM')<12
                ) 
    GROUP BY TO_CHAR(START_TIME, 'HH24')
    ORDER BY TO_CHAR(START_TIME, 'HH24') ASC 


--DURATION
SELECT  AVG((sysdate + (end_time - start_time)*24*60- sysdate)) AS AVG_MINUTE, 
        TO_CHAR(START_TIME, 'HH24') AS H FROM  
                (   
                SELECT *  FROM SIYUCHEN.ACCIDENT 
                WHERE TO_CHAR(START_TIME, 'MM')>=12 
                OR   TO_CHAR(START_TIME, 'MM')<03
                ) -- WINTER
    GROUP BY TO_CHAR(START_TIME, 'HH24')
    ORDER BY TO_CHAR(START_TIME, 'HH24') ASC 


SELECT AVG((sysdate + (end_time - start_time)*24*60- sysdate)) AS AVG_MINUTE, 
        TO_CHAR(START_TIME, 'HH24') AS H FROM  
                (   
                SELECT *  FROM SIYUCHEN.ACCIDENT 
                WHERE TO_CHAR(START_TIME, 'MM')>=3 
                AND   TO_CHAR(START_TIME, 'MM')<6
                ) -- SPRING
    GROUP BY TO_CHAR(START_TIME, 'HH24')
    ORDER BY TO_CHAR(START_TIME, 'HH24') ASC 
    
SELECT AVG((sysdate + (end_time - start_time)*24*60- sysdate)) AS AVG_MINUTE, 
        TO_CHAR(START_TIME, 'HH24') AS H FROM  
                (   
                SELECT *  FROM SIYUCHEN.ACCIDENT 
                WHERE TO_CHAR(START_TIME, 'MM')>=6 
                AND   TO_CHAR(START_TIME, 'MM')<9
                ) -- SUMMER
    GROUP BY TO_CHAR(START_TIME, 'HH24')
    ORDER BY TO_CHAR(START_TIME, 'HH24') ASC 
    
    
SELECT AVG((sysdate + (end_time - start_time)*24*60- sysdate)) AS AVG_MINUTE, 
        TO_CHAR(START_TIME, 'HH24') AS H FROM  
                (   
                SELECT *  FROM SIYUCHEN.ACCIDENT 
                WHERE TO_CHAR(START_TIME, 'MM')>=9 
                AND   TO_CHAR(START_TIME, 'MM')<12
                ) -- FALL
    GROUP BY TO_CHAR(START_TIME, 'HH24')
    ORDER BY TO_CHAR(START_TIME, 'HH24') ASC 
    
