# World Development Indicators - Life Expentency

Data Munging & Data Visualization with D3

Part 1: Data Munging


Write a Nodejs program that converts the csv file into a json file that will be used to plot data in part 2. You have to come up with an optimal schema for the json file based on the requirements of Part 2.


Part 2: Data Visualization with D3.js


Make a stacked bar chart of the following data cumulated for Asian countries over the years supplied (1960 - 2015)

Life expectancy at birth, female (years)

Life expectancy at birth, male (years)



2.  Make a bar chart of Top 5 countries with highest Life expectancy at birth, total (years) in   the given time period of 1960 - 2015

Use the local server http://172.23.238.252/csv_files for accessing csv.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

1. Clone this repo to your local machine using https://github.com/fvcproductions/SOMEREPO
2. run the code in http-server
3. install eslint to validate your combine.js file
4. Use the local server http://172.23.238.252/csv_files for accessing Indicator.csv and extract it to the root folder.

### Installing

A step by step series of examples that tell you have to get a development env running

### Installation of http-server:

npm install http-server -g
This will install http-server globally so that it may be run from the command line.

### Install eslint and validate
1. Go to the root directory
2. In the command Line type "npm init -y"
3. type "npm install eslint"
4. type "./node_modules/bin/eslint --init"
5. Follow the Steps (I have validated with airbnb)
6. type "./node_modules/bin/eslint combine.js"



## Running
In the Command-Line TYPE:
1. "node combine.js"(JSON file partone.json and parttwo.json will be created)
2. "http-server"

# now open the link in the browser





## Built With

* [https://github.com/d3/d3/wiki) - The D3 
* (https://nodejs.org/dist/latest-v9.x/docs/api/) - Nodejs


 

## Creator

* **Abhishek Nema** 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
