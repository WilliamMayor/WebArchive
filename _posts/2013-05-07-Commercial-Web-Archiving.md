---
layout: post
title: Commercial Web Archive, For Profit!
tags: [review]
---

I was quite surprised at how many commercial web archiving services there were. I originally imagined web archiving to be the exact digital equivalent to more traditional archiving; people sat in dusty rooms putting files in boxes. Instead there's a thriving industry of companies making a decent profit (I assume) by archiving web sites. 

It's mostly done for compliance reasons. For example, the FINRA Regulatory Notice 10-6, SEC 17a-4 states that companies must keep a record of all communications related to their business. NASD 3010/3110 are very similar.

I've noticed that web archiving companies tend to fall into one of two broad categories; subscribe-archive, and freeze. Subscribe-archive solutions seem to be aimed at the companies wanting to maintain compliance with regulations. The company pays a subscription fee and the archiving company takes a snapshot of the website periodically. The freeze solutions offer a service where you give the archiving company a URL and they go away and make an archived version for you. Sometimes this seems to be aimed at researchers wanting to be able to reliably cite a web source, quite often it seems to be for personal use. The freeze solutions are often free.

Here's a list of the companies I've come across so far and short (very short) run down of their services.


## Freeze Services


###[archive.is](http://archive.is/)

Save a webpage snapshot on demand. Can archive; Web 2.0 pages, pages that use hashbangs, and dynamically generated SVGs. Uses a URL shortner. Saves a text a graphical copy (i.e. one actual html, one a picture of the website).

Cannot save video, flash, pdf, and xml pages. Pages must be smaller than 50Mb

Uses [phantomJS](http://phantomjs.org/) to grab and render page.

###[FreezePage](http://www.freezepage.com/)

Another service providing on-demand archiving of a webpage. Very similar to archive.is.

Cannot archive secure (https) pages. This is odd. Does not run scripts. Does not conform to robot.txt, they say they are not a robot as each page capture is the result of a user action.

###[PageFreezer](http://pagefreezer.com/)

Again, a web-based archive product. They have a whitepaper. Nothing special about this one, they're compliant with FINRA, SOX, and SEC.

###[peeep.us](http://www.peeep.us/)

On-demand archive, like archive.is. They have a bookmarklet that allows you to archive personalised webpages. The bookmarklet makes a second request for the current page and uploads the response. This has limitations because if any of the linked files also require personalisation then they will not be loaded properly.

###[WebCite](http://www.webcitation.org/)

On-demand archive service. Aimed at academica wanting to preserve a webpage when citing it. They stop accepting new submission at the end of 2013 unless they raise enough money to continue.


## Subscription Services


###[Aleph Archives](http://aleph-archives.com/)

Subscription web archive. Sign up (and pay) and have your site archived, guaranteed. They've produced a white paper.

###[archive-it.org](http://archive-it.org/)

A project coming from archive.org that lets institutions add their digital web archive to the existing collection. It's a subscription service but I don't know if that means these institutions are paying to have their stuff archived. There's a cool project called K-12 web archiving program that lets kids pick which websites are important enough to archive.

Seems focussed on enabling US government bodies to fulfil their requirement to allow public access to records.

They've written a white paper called: The Web Archiving Life Cycle Model

###[archivethe.net](http://archivethe.net/en/)

A shared web archiving platform operated by the Internet Memory Research. SaaS (Software as a service), you create an archive policy, they perform the archive.

Concerning the technologies, we use and adapt some open sources tools and develop proprietary codes:
The baseline crawler currently used in AtN is Heritrix version 3 but we also developed a crawler which enables us to crawl at large scale (MemoryBot). Concerning access, we use a sophisticated distributed Storage engine (HBase on top of HDFS), which automatically manages replication and fault-tolerance. Although our native storage conforms to the Open-source Hadoop file system representation, we also provide an import/export mechanism based on the standard WARC format. Access to the archive is provided through a wayback-machine-like approach (index page, navigation with on-the-fly link rewriting, banner on top of pages, etc.) using IMR internal access tools. The IM access tool was the first tool to implement a server-side link rewriting 4 years ago and has been constantly improved since then. It enables for instance IMR to implement custom rewriting rules for difficult sites or to embed custom video players and other advanced on the fly presentation improvements.

###[Hanzo Archives](http://www.hanzoarchives.com/)

Social media and web site archiving for compliance, records management and e-discovery. They have a whitepaper.

Corporations, government agencies and institutions are increasingly required to produce website content and social media postings in their native format for compliance, records management, business intelligence and other applications.

They use the WARC standard. They are FINRA compliant.

They have released some open source tools for interacting with WARC files. Python scripts to 'manipulate and manage'.

They capture any content, no matter how dynamic. There's no mention of how on the site but they must render the page server side in order to archive. I wonder what they do about form submission/database/search stuff?

They bang on about 'native format web archiving' which sometimes seems to mean they store data in WARC files and not in a proprietary CMS. Sometimes it seems to mean something mysterious and ground breaking.

###[Vestige Technologies](http://www.vestigetechnologies.com/)

Web archiving compliance for financial services. They have a whitepaper.

###[iterasi](http://www.iterasi.com/)

Another "we'll archive it for you" service for regulations and compliance. They're very confident that they're the best. Their features include the ability to archive "even the most complex pages and sites". They have a whitepaper.

###[cloudpreservation](http://www.cloudpreservation.nextpoint.com/#&panel1-2)

Archive subscription service. They seem to offer a service where a team of technicians will "SmartCrawl" your site for you to get set up.

###[patrina](http://www.patrina.com/)

Archive subscription service. Many more features than other services. Data transformation among them.

###[smarsh](http://www.smarsh.com/web-archiving)

Archive subscription site. They can do archiving of personalised webpages, even for database-driven sites. I assume this takes traffic logs and re-creates the requests. THey have several white papers.

###[SiteReplay](http://www.website-archive.com/)

Subscription archive service. Doesn't mention social media.

## Other Types

I couldn't put all of the services I found into one of the two types. Here's the ones that don't quite belong.

###[common crawl](http://commoncrawl.org/)

They provide an open repository of web crawl data. You can search for URLs that have been indexed by their crawler. The entire thing is open, the crawler code is open source and the data is open to download. It's very fast, nearly Google fast.

###[web archiving service (WAS)](http://webarchives.cdlib.org/)

Web-archiving service aimed at scholars and librarians. They archive a number of public sites (like the 2010 Winter Olympics), and let you sign up to archive private ones. 
