---
layout: post
title: Tooling Up
tags: [review]
---

Another brief run down of what software and other tools are available for web archivists.

##[nutch](http://nutch.apache.org/)

Open Source Web Search Engine. Includes a fetcher (crawler) and a MapReduce system (now called Hadoop) for indexing. It is very scalable.

##[WARC (Web ARChive File Format)](http://bibnum.bnf.fr/WARC/WARC_ISO_28500_version1_latestdraft.pdf)

This is the draft version of the ISO standard.

The WARC file format can be used to store information on lots of files downloaded during a web crawl. Its scope is:

1. Store payload content and control information
2. Store arbitrary metadata
3. Support data compression
4. Store request headers as we as response headers
5. Store the results of data transformations linked to other stored data (??)
6. Store duplicate detection events to reduce storage
7. Be extensible
8. Support truncation/segmentation of records

Built on top of Brewster Khale's ARC format.

A WARC file contains multiple WARC records, the first record usually describes the records to follow. Roughly the format follows these rules, where [] denotes an optional value and CAPS denotes arbitrary input:

    file = record [file]
    record = header block
    header = version fields
    version = "WARC/1.0"
    fields = field [fields]
    field = NAME:VALUE
    block = octet [block]
    octet = 8BITS [octet]

There are a number of named fields, such as 'WARC_Record-ID' and 'Content-Length'

Compression occurs externally to the file. I think there might be scope to extend the records with a timestamped diff. This might reduce the file size.

##[DeepArc](http://deeparc.sourceforge.net/)

An interesting piece of open source software that turns relational databases into XML so they can be archived but are still query-able. Has to be implemented by the database owner but offers a neat way to preserve access to some 'deep web' components.

##[Heritrix Wiki](https://webarchive.jira.com/wiki/display/Heritrix/Heritrix;jsessionid=0C5E6E96941E3DBAB5988DA34AD693A9)

The public wiki for the heritrix crawler. Heritrix is the Internet Archive's open-source, extensible, web-scale, archival-quality web crawler project.

###[Crawl Slow, Crawl Polite](https://webarchive.jira.com/wiki/display/Heritrix/unexpectedly+slow+crawling+on+idle+crawler)

Heritrix sends a single request at a time to each server (hostname I suppose) and has a multi-second delay between successive requests. This is in order to be polite and not overload the website being crawled.

It is possible to override these settings. Interestingly, Heritrix appends `operatorContactURL` and `userAgentTemplate` fields to the metadata in the request. I suppose this means people do not feel like they are anonymous bots that can get away with a DDOS.

###[Streaming Media](https://webarchive.jira.com/wiki/display/Heritrix/collecting+streaming+content)

Heritrx can crawl anything served over HTTP/HTTPS/DNS and FTP. So it can grab some streamed content. It might be required in some cases to use some javascript to get at the content.

There is a paper that demonstrates how to use MPlayer to grab streamed content.

###[JavaScript-walls](https://webarchive.jira.com/wiki/display/Heritrix/crawling+JavaScript)

Heritrix does not render the page as a browser would and does not execute any JS. It does download any JS that is linked to, and it scans the JS for anything likely to be a url. This is fallible, and not all linked content will be found this way.

There is a project to use the Rhino JS engine and Lobobrowser to render pages and follow links.

###[Browser Monkeys](https://webarchive.jira.com/wiki/display/SOC06/Leverage+browsers+for+link-extraction)

A project to use a scalable pool of automated web browsers to download web pages, and perform processing on the resulting pages. This is hoped to be integrated into heritrix.

Work seems to have stalled.

####[Version 2](https://webarchive.jira.com/wiki/display/SOC06/Browser+Monkeys+-+2)

Some people have taken the project further. It's a firefox plugin and a controlling server that can coordinate a cluster of browsers. Every HTTP request made by a browser monkey is logged and archived.

Once again, work seems to have stalled. The controller running at http://crawling04.us.archive.org:8081 is down.

###[SPAM Detection](https://webarchive.jira.com/wiki/display/Heritrix/Web+Spam+Detection+for+Heritrix)

This is a project that aims to help Heritrix detect and avoid spam sites.

###[Web Forms](https://webarchive.jira.com/wiki/display/Heritrix/handling+web+forms)

Heritrx does not fill in forms (how could it?) but it can be configured to login to sites using form POSTS and HTTP Basic/Digest Auth.

It can also attempt to grab the page at a form's action location. Perhaps by submitting empty forms or trying possible strings.

###[Restrict Scope](https://webarchive.jira.com/wiki/display/Heritrix/national+or+regional+domain+scope)

Restricting archiving to only those sites from a particular country is harder than it might seem. Just going by the TLD is not good enough. There are lots of places where country specific sites might reside (Facebook, Blogger, etc.) that don't have the assumed TLD.

##[nutchWax (seriously)](http://archive-access.sourceforge.net/projects/nutch/)

An application of nutch (Apache open source web-search software) for searching arc files instead of live web pages. Nothing about WARC but I assume they're compatible.

##[xinq](http://web.archive.org/web/20110227202744/http://www.nla.gov.au/xinq/)

Creates a web application using an XML database back end. This pairs nicely with Deep Arc.

###[Removal Policy](http://www2.sims.berkeley.edu/research/conferences/aps/removal-policy.html)

Recommendations for removing material from a digital archive. Talks about using robots.txt etc.

There are 7 categories of removal request:

1. By webmaster - There should be self-service removal capability. Can ask to prove ownership by using robots.txt
2. DMCA takedown - Verify the validity of the claim, if valid, remove. Unlike 1. try to make request public
3. IP claims (not DMCA) - Verify the validity, then remove. Make public.
4. Because of controversial content - Do not remove
5. Because of personal data - Treat as 1.
6. By governments - Conform to court orders but don't roll over too quickly
7. Other (error correct, version control) - Treat on a case by case basis