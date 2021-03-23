CREATE TABLE State
(
    Name VARCHAR(20) NOT NULL,
    Code VARCHAR(2) NOT NULL,
    PRIMARY KEY(Code)
);

CREATE TABLE Population
(
  Year INT NOT NULL,
  State_Code VARCHAR(2) NOT NULL,
  Population_count INT,
  PRIMARY KEY (Year, State_Name),
  FOREIGN KEY (State_Code) REFERENCES State(Code)
);

CREATE TABLE Weather
(
  Weather_ID INT NOT NULL,
  Precipitation NUMBER,
  Humidity NUMBER,
  Wind_Chill NUMBER,
  Temperature NUMBER,
  Pressure NUMBER,
  Visibility NUMBER,
  Wind_Speed  NUMBER,
  PRIMARY KEY (Weather_ID)
);


CREATE TABLE Location
(
  Latitude NUMBER NOT NULL,
  Longitude NUMBER NOT NULL,
  State_Code VARCHAR(2) NOT NULL,
  PRIMARY KEY (Longitude, Latitude),
  FOREIGN KEY (State_Code) REFERENCES State(Code)
);


CREATE TABLE Accident
(
  Accident_ID VARCHAR(20) NOT NULL,
  End_Time TIMESTAMP,
  Start_Time TIMESTAMP,
  Severity INT,
  Affected_Distance NUMBER,
  Weather_ID INT,
  Latitude NUMBER NOT NULL,
  Longitude NUMBER NOT NULL,
  PRIMARY KEY (Accident_ID),
  FOREIGN KEY(Weather_ID) REFERENCES Weather(Weather_ID),
  FOREIGN KEY(Longitude, Latitude) REFERENCES Location(Longitude, Latitude)
);

