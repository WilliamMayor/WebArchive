---
layout: post
title: Some Rough Numbers
tags: [exploration]
---

This post does a bit of exploration into the facts and figures of the web as it is currently.

## How Large is the Web?

There are many ways of answering this question because there are lots of ways to understand what the 'size' of the web means. Let's first consider how many web pages there are. Every web site is a collection of one or more (usually more) web pages, each page is likely to be a record in an archive. So how many records are we looking to store? One website answers this question by performing searches for commonly used words and looking to see what the recorded number of total matches is. Using this total and a figure for the probability that a word appears in text, I can estimate the total size of the web. For instance, let's suppose that 60% of all English language webpages contain the word 'the', I can perform a search for 'the' in Google and collect a figure how many pages that is. Doing that today (20/06/2013) gives me that about 25,270,000,000 webpages contain 'the'. That means my estimate for the total number is `25270000000 / 0.6 = 42116666667`. I can then repeat the experiment for lots of different words and average over all of the results. I then have to consider other languages and do the same thing, summing up the results. Luckily, I don't have to do this myself as the kind folks at [worldwidewebsize](http://www.worldwidewebsize.com/) have done it for me. By their estimations the web is at least 48.5 billion pages large. Of course, this only counts HTML pages, if we wanted to archive the associated images, css and js files as well we would have to increase that number once again. The [Web Foundation](http://www.webfoundation.org/)'s [WebIndex](http://www.webfoundation.org/projects/the-web-index/) puts the total at more than 1 trillion pages, other sources will report other, differing scores. The unstructured nature of the web makes it hard to calculate with certainty.

So there are lots of records but how large are they? How many bytes do they use? There's a great service called the [HTTP Archive](http://httparchive.org/) that monitors all kinds of information about how the web is built. They crawl the web sites listed in the Alexa rankings of the top 1 million web pages. It is unclear whether they just consider a single page from each site or whether they perform a full crawl. For each page downloaded they measure statistics such as: content type, response size, HTTPS requests, and errors. It's well worth a visit to browse the nice graphs they have. As of today (20/6/2013) the average page load is 1466 KB, that includes images, Flash, css, etc. The breakdown of the sizes are:

- scripts (js etc.) - 224KB
- stylesheets (css etc.) - 37KB
- Flash - 90KB
- HTML - 54KB
- images (jpeg, png, etc.) - 899KB
- other - 141KB

Putting the number so far together we can estimate the size in bytes of the web. If we say that there are 50 billion web pages on the web and each takes up 1.466 MB then the world wide web currently clocks in at 73.3 petabytes. Let's imagine we wanted to store all of these web pages on our computers. If each computer offered 500GB of space for this initiative, we would need 146,600 computers. If a 500GB external hard drive costs us £50 ($77) then we would need to spend £7,330,000 ($11,321,918) to store everything. This is 0.001% of the UK government's total revenue in 2012.

The above 'analysis' is slightly tongue-in-cheek. Many factors effect the total size of the web, not least the estimates and averages used in calculating the base numbers. Importantly, many files (such as images and css) will be re-used across a web site and so do not need to be archived several times. Also, file compression can shrink these files down by quite some margin.

The [Internet Archive](http://archive.org/) states in their [FAQ](http://archive.org/about/faqs.php#9) that their archive is 2 PB.


## How Often Does Web Content Change?

According to [[1](#cho2003)], we can expect a web page to change according to a Poisson process. That is, if we can determine the average frequency of change of a web page, we can calculate the expected number of times a page will change in any given time interval. The paper also gives us a way to estimate the average frequency of change if we have incomplete history of previous changes. e.g. If we crawl a page once a day for a month we can't be sure that the page didn't actually change 5 times a day. Using this method we can come up with a good estimate for the rate of change, despite our poor knowledge of the system. This is interesting, but doesn't give us any numbers (the goal of this post).

In a paper from 1999, [[2](#cho1999)], web pages change, on average, every four months. This is a very rough number and shouldn't really be used for any serious calculations. SLightly better is to say that: 19% of web pages live between one week and one month; 70% of pages live longer than one month; and it takes 50 days for 50% of the web to change. Whilst these are slightly meatier numbers, the paper they come from was published more than a decade ago, when web content was very different to today. These figures should be taken with a large pinch of salt.

For some better numbers we can look at [[3](#adar2009)], only four years old (on 20/06/13). This paper observes web pages changing content every 123 hours on average. That's the equivalent of one change every 5 days. Intuitively, this seems likely to be more accurate than the previous numbers.

<span id="cho2003">[1] J. Cho and H. Garcia-Molina, “Estimating frequency of change,” ACM Transactions on Internet Technology, vol. 3, no. 3, pp. 256–290, Aug. 2003.

<span id="cho1999">[2]</span> J. Cho and H. Garcia-Molina, “The evolution of the web and implications for an incremental crawler,” pp. 1–21, 1999.

<span id="adar2009">[3]</span> E. Adar, J. Teevan, S. Dumais, and J. Elsas, “The web changes everything: understanding the dynamics of web content,” … on Web Search and Data …, pp. 282–291, 2009.

