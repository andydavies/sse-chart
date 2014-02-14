sse-chart
=========

Simple nodejs experiment that drives a rickshaw.js chart using Server Sent Events

To use 

1. Clone the repository
2. Run ```node sse-chart.js```
3. Load 127.0.0.1:8888 in a browser


It's a pretty trivial example and has a few things that need to be rectified e.g.

- Should use timebase of event for plotting, so that missed event will show as gaps in nchart
- X axes should display actual time of event too
 
I may get around to addressing these, I may not.



 

