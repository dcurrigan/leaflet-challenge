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
  
* The requires a <a href="https://www.mapbox.com/">Mapbox</a> API key, which should be first entered in the config.js file
* Once the API key has been inserted the index.html can be opend to view the page
* Use the controls on the upper right of the screen to change maps, or to enable/disable layers
* Click on any of the coloured markers and a pop-up will appear with further information on that earthquake  

# Design 
I've created an interactive web visualisation using javascript and leaflet to explore the  <a href="http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php">USGS</a> Earthquake data. The landing page displays a worldmap with the <a href="https://docs.mapbox.com/api/maps/styles/">Mapbox Light style</a>. Each earthquake in the dataset from the past 7 days is plotted as a circle marker, with colour and size determined by the magnitude of the quake. To emphasize the larger quakes a pulsating animation was added to those with magnitude over 5.0.    
  
![Leaflet](/Images/Satellitemap.png)  
  
  
Four map styles are available for the user to switch between. Both the earthquake and plate tectonics layers can additionally be toggled on and off. A heatmap layer was also added using the <a href="https://github.com/Leaflet/Leaflet.heat">leaflet-heat</a> plugin. This highlights the high number of earthquakes in the western north america region (even though they are of low magnitude).   

![Leaflet](/Images/Heatmap.png)  

    
# Sources
|No|Source|Link|
|-|-|-|
|1|USGS GeoJSON Summary Feed            |http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php| 
|2|Tectonic Plates GeoJson              |https://github.com/fraxen/tectonicplates|
|3|Leafelt-Heat Plugin                  |https://github.com/Leaflet/Leaflet.heat|

   
# Contributors  
Dale Currigan  
[@dcurrigan](https://github.com/dcurrigan)  
<dcurrigan@gmail.com>


## Status
Project is: 
````diff 
+ Completed
````


