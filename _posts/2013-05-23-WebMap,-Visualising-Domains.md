---
layout: post
title: WebMap, Visualising Domains
tags: [research, webarchive]
js: [/software/webmap/examples/sigma.min.js, /software/webmap/examples/sigma.parseGexf.js, /software/webmap/examples/script.js]
css: [/software/webmap/examples/style.css]
---
One very important part in any archive process is collecting the stuff to be archived, in this case, web pages. I've read quite a few articles around the web that talk about how difficult it is to crawl the web. Crawling the web involves having an automated script (called a bot, or robot, crawler, spider, and probably more) download a web page, read it, find links that point to other pages, and then rinse and repeat. In this fashion a bot will 'crawl' over a web site and collect information on its pages. There are lots of complicating factors (e.g. [robots.txt](http://en.wikipedia.org/wiki/Robots_exclusion_standard), or [`<base />`](http://www.w3schools.com/tags/tag_base.asp)) that make this a complex job, the sheer size of the web (and of most websites) make it a lengthy job too. I decided to try and make my own web crawler, partly to learn how it's done, how hard it is, and what the important factors are. Partly to see if I could. This page contains the results of version 1 of my crawler.

[WebMap](/software/webmap/) (the name of my crawler), takes a domain name and visits every page that it can find under that domain. It ignores the robots.txt directive and doesn't download anything outside of the original domain. It will look at sub domains. It produces an [SQLite3](http://www.sqlite.org/) database of all of the pages it found and all of the connections between them. I then pass this database into [Gelphi](https://gephi.org/) in order to create a nice looking graph of the domain, the Gelphi graph is then exported to a [.gexf](http://gexf.net/format/) file that can be read by [sigma.js](http://sigmajs.org/) to produce a nice looking webpage.

Here's an example of what WebMap produces. Mouse over the nodes to see what file you're looking at and what that file is connected to.

For this one it was pointed at [mediafutures.cs.ucl.ac.uk](http://mediafutures.cs.ucl.ac.uk).
<div class="sigma-parent">
    <div class="sigma-expand" id="mf">
    </div>
</div>

Here, it's pointed at [sec.cs.ucl.ac.uk](http://sec.cs.ucl.ac.uk).
<div class="sigma-parent">
    <div class="sigma-expand" id="sec">
    </div>
</div>