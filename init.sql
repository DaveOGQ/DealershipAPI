-- Create ENUM type for vehicle body type
CREATE TYPE body_type_enum AS ENUM ('sedan', 'truck', 'coupe', 'SUV', 'convertible', 'hatchback', 'van', 'wagon');

-- Create Client Table
CREATE TABLE client(
    client_id CHAR(8) PRIMARY KEY,
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    province_state VARCHAR(100) NOT NULL,
    client_since DATE NOT NULL
);

-- Create Agent Table
CREATE TABLE agent (
    agent_id CHAR(8) PRIMARY KEY,
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    province_state VARCHAR(100) NOT NULL,
    vehicles_sold INT DEFAULT 0 
);

-- Create Available Vehicles Table
CREATE TABLE vehicle(
    vin VARCHAR(17) PRIMARY KEY,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    manufacture_year INT CHECK (manufacture_year BETWEEN 1000 AND 9999) NOT NULL, -- Ensures it's a 4-digit year
    kilometers INT NOT NULL,
    price INT NOT NULL,
    delivery_available BOOLEAN NOT NULL,
    sold BOOLEAN DEFAULT FALSE NOT NULL,
    body_type body_type_enum NOT NULL
);

-- Create Prospective Vehicles (Interested Cars) Table
CREATE TABLE prospective_vehicles (
    client_id CHAR(8) REFERENCES client(client_id),
    vin VARCHAR(17) REFERENCES vehicle(vin),
    CONSTRAINT unique_client_vehicle UNIQUE (client_id, vin)
);

-- Create Sold Cars Table
CREATE TABLE sold_vehicles (
    agent_id CHAR(8) REFERENCES agent(agent_id),
    vin VARCHAR(17) REFERENCES vehicle(vin),
    CONSTRAINT unique_vin_sales UNIQUE (agent_id, vin)
);
