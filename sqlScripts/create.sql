CREATE TABLE Population
(
  Year INT NOT NULL,
  State VARCHAR(20) NOT NULL,
  Population_count INT,
  PRIMARY KEY (Year, State)
);

select * from Population;

CREATE TABLE weather
(
  Weather_ID INT NOT NULL,
  Precipitation DECIMAL(3, 2),
  Humidity DECIMAL(5, 2),
  Wind_Chill DECIMAL(5, 2),
  Temperature DECIMAL(5, 2),
  Pressure DECIMAL(4, 2),
  Visibility DECIMAL(4, 2),
  Wind_Speed  DECIMAL(4, 2),
  PRIMARY KEY (Weather_ID)
);

select * from weather;

CREATE TABLE Location
(
  Latitude DECIMAL(8,6) NOT NULL,
  Longitude DECIMAL(8,6) NOT NULL,
  State VARCHAR(20),
  PRIMARY KEY (Longitude, Latitude)
);

select * from Location;

CREATE TABLE Population_to_Location
(
  PtoL_ID INT NOT NULL,
  Latitude DECIMAL(8,6) NOT NULL,
  Longitude DECIMAL(8,6)  NOT NULL,
  Year INT NOT NULL,
  State VARCHAR(20) NOT NULL,
  PRIMARY KEY (PtoL_ID),
  FOREIGN KEY (Latitude, Longitude) REFERENCES Location(Latitude, Longitude),
  FOREIGN KEY (Year, State) REFERENCES Population(Year, State)
);

select * from Population_to_Location;

CREATE TABLE Accident
(
  Accident_ID VARCHAR(20) NOT NULL,
  End_Time TIMESTAMP,
  Start_Time TIMESTAMP,
  Severity INT,
  Affected_Distance DECIMAL(3, 2),
  Weather_ID INT,
  Latitude DECIMAL(8,6) NOT NULL,
  Longitude DECIMAL(8,6) NOT NULL,
  PRIMARY KEY (Accident_ID),
  FOREIGN KEY(Weather_ID) REFERENCES Weather(Weather_ID),
 FOREIGN KEY(Longitude, Latitude) REFERENCES Location(Longitude, Latitude)
);

select * from Accident;
