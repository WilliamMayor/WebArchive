---
layout: default
title: Home
name: home
js: []
---

# {{ page.title }}

The world wide web contains a staggeringly vast collection of websites (672,837,096 as of May 2013), some of these sites are huge (think [Wikipedia](http://www.wikipedia.org/) or [Facebook](https://www.facebook.com/)), some are quite small (like this one). Some of these sites contain rich and wonderful information (e.g. [Khan Academy](https://www.khanacademy.org/)), some are full of spam (I'm not going to link one). In the future, people are going to want to look back on the Internet of the 2000s, they're going to be interested in political opinion, current entertainment, fashion, and just about everything else. Even today people are interested in the shape and interconnectivity of the web, trends in Tweets about bird flu, and a whole bunch of other things. A web archive can provide this kind of information and can keep it safe. That's what we're trying to do here: archive the web.

Unfortunately, it's not an easy task. The sheer volume of web pages makes storing them tricky, the ever-changing content makes keeping up-to-date difficult, and even finding the pages in the first place is harder than you  might think. That's why we're here, researching the problems and finding solutions.

This site documents our journey. You can read about our exploits on the [blog](/blog/), and you can download and try out our [software](/software/) to see them yourself.

Latest blog entries:

{% for post in site.posts limit:5 %}
*    [{{ post.title }}]({{ post.url }})
{% endfor %}
