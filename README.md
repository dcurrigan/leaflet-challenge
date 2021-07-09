# leaflet-challenge
Week 17 Geo-mapping Homework

> Created by Dale Currigan  
> July 2021  
  
![Leaflet](/Images/Lightmap.png)  

## Table of contents  
* [Project Intro](#Project-Intro)  
* [Project Structure](#Project-Structure)  
* [Setup](#Setup)  
* [Design](#Design) 
* [Sources](#Sources)  
* [Contributors](#Contributors)  
* [Status](#Status)  

# Project Intro
This project covers the week 17 homework on geomapping and leaflet. Earthquake data from the <a href="http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php">US Geological Survey (USGS)</a> was to be used to creat a visualisation of recent earthquakes and how they relate to the position of the tectonic plates. The briefing for the project was as follows: 

*Welcome to the United States Geological Survey, or USGS for short! The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!*  
  
*The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.*  
  
  
# Project Structure  
```
leaflet-challenge   
|  
|    
|__ index.html                          # The site landing page html doc
|__ README.md                           # This file
|
|__ static/                              
|   |__css/                             # Directory for css stylesheets
|   |  |__ style.css                              
|   |
|   |__data/                            # Directory for the data files
|   |  |__ data.geojson                 # Test data file of earthquake data
|   |  |__ PB2002_boundaries.json       # Tectonic plate geojson
|   | 
|   |__js/                              # Directory for javscript code
|      |__ logic.js                     # Primary javascript code for site
|      |__ config.js                    # Mapbox API key needs to be inserted here
|      |__ leaflet-heat.js              # Heatmap plugin for leaflet
|      
|__ Images/                             # Directory for image files
|   |__ Heatmap.png
|   |__ Lightmap.png
|   |__ Satellitemap.png
|
``` 
  
# Setup 
  
* The site is can be accessed at: https://dcurrigan.github.io/D3-challenge/
* The html for the site is all contained in index.html
* All styles are contained within static/css/D3style.css and style.css
* The javascript code enabling the functionality of the site is can be found within static/js/app.js
* The base dataset is found within data.csv   

# Design 
I've created an interactive web visualisation using D3 to explore the US Census Bureau data. <a href="https://data.census.gov/cedsci/">US Census Bureau data</a>. An interactive scatter plot has been generated with the data, allowing the user to investigate the data further by changing axes or the colour scale for the chart (see below).  
  
![Leaflet](/Images/Satellitemap.png)  
  
  
Example code sourced <a href="https://bl.ocks.org/starcalibre/6cccfa843ed254aa0a0d">here</a> provided the basis for the colour scaling and legend. The data points are coloured based upon the scale generated with scaleQuantize(), which allows scaling of a numerical value in the domain to a string (the colour hex value) in the range.    

![Leaflet](/Images/Heatmap.png)  

  
**Example Code:** Creating a colour scale 
```
  function colour_scaler(data) {
    return d3.scaleQuantize()
      .domain([(d3.min(censusData, d => d[data])), (d3.max(censusData, d => d[data]))])  
      .range(['#E7F1D7', '#D0E7BD', '#B2DDA3', '#8FD28A', '#71C67B', '#59BA76', '#41ae76', '#379A7C', '#2E857E', '#256770', '#1D465B'])

  };
```
  
  
# Sources
|No|Source|Link|
|-|-|-|
|1|United States Census Beureau            |https://data.census.gov/cedsci/| 
|2|Dynamic Colour Scale Legend             |https://bl.ocks.org/starcalibre/6cccfa843ed254aa0a0d|

   
# Contributors  
Dale Currigan  
[@dcurrigan](https://github.com/dcurrigan)  
<dcurrigan@gmail.com>


## Status
Project is: 
````diff 
+ Completed
````


