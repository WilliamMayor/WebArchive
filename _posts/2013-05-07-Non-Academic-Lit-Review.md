---
layout: post
title: The Non-Academic Literature Review
tags: [research, archive]
---

Here's a giant summary of the non-academic (mostly commercial) resources I could find on web archive. I didn't realise the commercial market for web archiving software before this. It seems that it's quite large. Also, Brewster Khale is everywhere!

# [archive.org](http://archive.org)


The wayback machine, etc. etc.

## [/about](http://archive.org/about/)

Lots of links to other places

The Archive has two practical considerations in dealing with digital collections: storage and preservation. Storage is hard because of how much data there is. Preservation faces challenges from: accidents, where data is lost because the storage medium becomes inaccessible; migration, moving data between storage mediums; and data formats becoming obsolete and unreadable.

## [/about/faqs](http://archive.org/about/faqs.php)


The wayback machine is ~2 Petabytes and grows at 20 terabytes per month.

Here are some things that make it difficult to archive a web site:

1. Robots.txt
2. Javascript - If content is loaded from the server using javascript then archiving will fail.
3. Server side image maps - These need to talk to the original server to work
4. Unknown sites
5. Orphan pages - I think this is very similar to unknown sites.

As a general rule of thumb, simple html is the easiest to archive.

##[/stats](http://archive.org/stats/)

Stats for the Internet Archive. Roughly 3m unique IPs per day over all services. Somewhere between 500k and 600k unique IPs for the wayback machine. Roughly 1500 hits per second for wayback machine

##[/web/petabox](http://archive.org/web/petabox.php)

New technology for storing archive data. Each petabox rack stores about 650 terabytes and the cluster requires about 6KW power per petabyte. In 2012 petaboxes were used to store 10 petabytes for the internet archive.

##[/about/ethics](http://archive.org/about/ethics_BK.php)

Thoughts on the ethics of digital librarianship:

1. Don't give away user logs except for scholarly use. Consider sanitizing the records before any transfer is undertaken.   
2. Take the job of information serving seriously. This means to provide a consistent, reliable service and represent the service provided accurately.
3. Count on wide use of the information served, for good uses and bad, so be proud of the information and the collection.
4. Completeness is important. Users learn as much from a question that has no answer as from the ones with answers.  This requires a complete and up-to-date collection.
5. Assume that the patron will not know the your affiliations, and therefore do not tempt patrons to use a service they would regret if they knew more about you.
6. Respect your patrons.  The opinion that users are "rocks with arms", as said by a colleague years ago, will not lead you to become a very helpful digital librarian.

#[openlibrary.org](http://openlibrary.org)

One webpage for every book ever published. Lots of classic books available for free. Some ebooks available to loan.

##[/about/tech](http://openlibrary.org/about/tech)

Uses PostgreSQL to form a versioned key-value database called Infobase. Also built new wiki software to allow editing of Infobase


##[/about/architecture](http://openlibrary.org/about/architecture)

Uses lighttpd, Python and a bit of Solr (via Jetty). Seems like very light weight technologies for a potentially huge task. They don't mention their hardware architecture.

#[wikipedia](http://en.wikipedia.org)

##[FRBR](http://en.wikipedia.org/wiki/Functional_Requirements_for_Bibliographic_Records)

Functional Requirements for Bibliographic Records. An entity-relationship model for describing bibliographic works. A very generic cataloguing standard.

##[Web archiving](http://en.wikipedia.org/wiki/Web_archiving)

Collect webcontent (HTML, CSS, JS, images, videos, etc.) also collect metadata (access time, MIME type, etc.). Use metadata to establish authenticity (??) and provenance.

There exist services that will archive a page 'on-demand' this could be to meet regulatory requirements (i.e. US government) or to ensure website back up.

Database archiving means that database content can be stored as XML documents and then queried in a similar manner to querying the actual database. Doing this means that websites that pull from databases might still be archivable. See DeepArc and Xinq.

Transactional archiving means storing each individual HTTP request. Seems to be used to collect evidence of what information was viewed and by whom. Mostly server side implementation.

###Difficulties and Limitations

Crawlers:

1. Robots exclusion protocol might prevent archiving certain parts of webpages. Could ignore robots.txt
2. Deep web is hard to crawl. e.g. pages viewed after a form submission are in the deep web
3. Crawlers traps might hang crawler. This is where crawlers encounter infinitely many link (e.g. a calendar site with a 'next day' link).
4. The website might change before the crawler has finished crawling
5. Some servers might not give a crawler the same content as they would give a browser.

###Aspects of Web Curation

1. Verify trustworthiness and integrity of archive
2. Collect assets for archive
3. Provide information retrieval from archive
4. Semantic and ontological continuity and comparability of the collection content (??)

##[Wayback Machine](http://en.wikipedia.org/wiki/Wayback_Machine)

Crawlers respect robots.txt.

Snapshots become available 6+ months after it has been archived. Can be much longer. Frequency of snapshots is variable, intervals of weeks to years are possible.

After August 2008 sites have to be in the Open Directory to be archived. Although other sites might still be captured (it's a bit unclear).

In 2003 the archive was growing by 12TB per month. In 2009 the archive was 3PB and was growing at 100TB per month.

Data is stored either in PetaBoxes or Sun Open Storage. It is unclear which (maybe both?).

In January 2013 the archive contained 240 billion URLs.

Contents from the archive do not seem to be admissible in US court as they are not self-authenticating.

Timestamps from the archive can be used to gain a patent, claiming prior art.

Wayback will retroactively apply the current robots.txt to archived pages.

##[Open Directory Project](http://en.wikipedia.org/wiki/Open_Directory_Project)

Listing of sites on the web. Currently (3/5/13) indexes 5,193,705 sites.

No fully open source and receives criticism. It's the largest directory of the web.

##[Heritrix](http://en.wikipedia.org/wiki/Heritrix)

A webcrawler designed for archiving. It's open source and written in Java. Developed in part by the Internet Archive.

Many organisations use Heritrix to archive the web. National libraries, CiteSeerX, Internet Memory, etc. etc.

Uses Arc (or the newer WARC) files to store pages. Arc files contain a metatdata header, the HTTP response header and then the contents:

    filedesc://IA-2006062.arc 0.0.0.0 20060622190110 text/plain 76
    1 1 InternetArchive
    URL IP-address Archive-date Content-type Archive-length

    http://foo.edu:80/hello.html 127.10.100.2 19961104142103 text/html 187
    HTTP/1.1 200 OK
    Date: Thu, 22 Jun 2006 19:01:15 GMT
    Server: Apache
    Last-Modified: Sat, 10 Jun 2006 22:33:11 GMT
    Content-Length: 30
    Content-Type: text/html

    <html>
    Hello World!!!
    </html>

The Internet Archive seems to use Arc files to store it's archive.

##[Alexa Internet](http://en.wikipedia.org/wiki/Alexa_Internet)

A subsidiary company of Amazon.com, provides web data (famously rankings). Provides lots of archive data to the Internet Archive. Until recently they may have provided all of the data.

##[HTTrack](http://en.wikipedia.org/wiki/HTTrack)

Web crawler and offline browser. Open source, written in C. Can follow generated links (JS, Applets, and Flash) but not all complicated links (generated using functions. etc.).

Seems mostly aimed at offline browsing. I think you point it at a website and it crawls just that site.

##[WGet](http://en.wikipedia.org/wiki/Wget)

Unix command that can be told to recursively download web assets that are linked from a previously downloaded asset.

##[robots.txt](http://en.wikipedia.org/wiki/Robots_exclusion_protocol)

Summary of how the robots.txt exclusion protocol works. Basically, /robots.txt advises a crawler which pages/directories not to crawl.

##[Distributed Web Crawling](http://en.wikipedia.org/wiki/Distributed_web_crawling)

References some papers on how to distribute web crawling tasks around a cluster. Dynamic assignment means that URL are allocated to nodes as they arrive and so a central server can load balance the tasks. Static assignment sets out rules at the beginning that specify how URL are assigned to nodes, using hashing or similar.

There is an uncited quote from Nutch, that says that for distributed web crawlers "A successful search engine requires more bandwidth to upload query result pages than its crawler needs to download pages...". So it seems that the gains are small.

##[Sitemaps](http://en.wikipedia.org/wiki/Sitemaps)

The opposite of a robots.txt file. A sitemap tells a crawler where content is. This is good for allowing bots access to what otherwise would part of the deep web.

##[Digital Preservation](http://en.wikipedia.org/wiki/Digital_preservation)

Digital Preservation is the actions undertaken to ensure continued access to digital material for as long as necessary. Its goal is the accurate rendering of authenticated content over time.

### Challenges

Digital information always need a software environment to render it. Physical storage media, data formats, hardware and software all become obsolete. This is the threat of digital obsolescence.

Digital content can be complex and dynamic, much more so than physical content.

There is a lot of digital content, a 'data deluge', storing this amount of data can be hard.

Digital preservation can be costly and require significant up front costs. Unfortunately, the benefits of the archive are more keenly felt by future generations.

### Intellectual Foundations

In 1994 a task force formed by the Research Libraries Group and the Commission on Preservation and Access released a report on what needed to be done to ensure long-term preservation and continued access to digital records. They created the idea of using trusted digital repositories, they identified five features of digital information integrity (content, fixity, reference, provenance, and context), and set migration as a crucial function of digital archives.

OAIS is the Reference Model for an Open Archival Information System. It describes a digital object's life-cycle;  ingest, archival storage, data management, administration, access and preservation planning. It also deals with metatdata.

International Research on Permanent Authentic Records in Electronic Systems (InterPARES) is a decades long project looking at the preservation of digital material.

### Strategies

What strategies can be used for digital preservation? There's a four point plan:

1. Assess the risk of data loss. Perhaps because of file format or required software
2. Evaluate the digital content, determine which preservations actions are required. e.g format conversion
3. Determine the metadata required
4. Provide access to the content

There are also these ideas:

#### Refreshing

Move data between storage mediums so no data is lost due to physical storage degradation. Also, perhaps refresh the file format.

#### Migration

Move the data to newer system environments. e.g. update OS or file format. This means access is always possible.

#### Replication

Create duplicate copies to guard against losing copies.

#### Emulation

Recreate the obsolete system environment required to access data.

#### Encapsulation

Digital objects are self-describing. All the information required to understand the object is contained within the object itself.

#### Persistent Archives Concept

This "the preservation of the organisation of collection as well as the objects that make up that collection, maintained in a platform independent form". Something about storing the data as well as the context.

#### Metadata Attachment

Have separate metadata in a highly compatible format.

### Digital Sustainability

This seems to encompass the activities and involvement surrounding a digital archive, but not necessarily the technology or data behind the archive itself.

### Certification

There are a number of standards, criteria, and tools that can be used to assess digital preservation attempts:

- Trustworthy Repositories Audit & Certification: Criteria & Checklist (TRAC)
- Digital Repository Audit Method Based On Risk Assessment (DRAMBORA)
- European Framework for Audit and Certification of Digital Repositories
- nestor Catalogue of Criteria
- Planning Tool for Trusted Electronic Repositories (PLATTER)
- Audit and Certification of Trustworthy Digital Repositories (ISO 16363)



#[common crawl](http://commoncrawl.org/)

They provide an open repository of web crawl data. You can search for URLs that have been indexed by their crawler. The entire thing is open, the crawler code is open source and the data is open to download. It's very fast, nearly Google fast.

#[nutch](http://nutch.apache.org/)

Open Source Web Search Engine. Includes a fetcher (crawler) and a MapReduce system (now called Hadoop) for indexing. It is very scalable.

#[Aleph Archives](http://aleph-archives.com/)

Subscription web archive. Sign up (and pay) and have your site archived, guaranteed. They've produced a white paper.

#[archive.is](http://archive.is/)

Save a webpage snapshot on demand. Can archive; Web 2.0 pages, pages that use hashbangs, and dynamically generated SVGs. Uses a URL shortner. Saves a text a graphical copy (i.e. one actual html, one a picture of the website).

Cannot save video, flash, pdf, and xml pages. Pages must be smaller than 50Mb

Uses [phantomJS](http://phantomjs.org/) to grab and render page.


#[archive-it.org](http://archive-it.org/)

A project coming from archive.org that lets institutions add their digital web archive to the existing collection. It's a subscription service but I don't know if that means these institutions are paying to have their stuff archived. There's a cool project called K-12 web archiving program that lets kids pick which websites are important enough to archive.

Seems focussed on enabling US government bodies to fulfil their requirement to allow public access to records.

They've written a white paper called: The Web Archiving Life Cycle Model

#[opencontentalliance.org](http://www.opencontentalliance.org)

A collaborative effort to allow access to digital content across the globe. Contains data from lots of places. Yahoo! provides indexing. The Internet Archive administers the alliance.

##[/participate](http://www.opencontentalliance.org/participate/)

Lays out 6 principles for organisations that contribute to the alliance:

1. Encourage access whilst respecting content owners' rights
2. Contributors determine the terms and conditions of contributed material, as well as attribution
3. Not all material will be accepted. Preference is given to material that can be made widely accessible.
4. Collection and item-level metadata will be available in lots of formats
5. Efforts are welcome to create tools for navigating the archive
6. Material will reside in multiple locations around the world

#[Removal Policy](http://www2.sims.berkeley.edu/research/conferences/aps/removal-policy.html)

Recommendations for removing material from a digital archive. Talks about using robots.txt etc.

There are 7 categories of removal request:

1. By webmaster - There should be self-service removal capability. Can ask to prove ownership by using robots.txt
2. DMCA takedown - Verify the validity of the claim, if valid, remove. Unlike 1. try to make request public
3. IP claims (not DMCA) - Verify the validity, then remove. Make public.
4. Because of controversial content - Do not remove
5. Because of personal data - Treat as 1.
6. By governments - Conform to court orders but don't roll over too quickly
7. Other (error correct, version control) - Treat on a case by case basis

#[archivethe.net](http://archivethe.net/en/)

A shared web archiving platform operated by the Internet Memory Research. SaaS (Software as a service), you create an archive policy, they perform the archive.

Archivethe.Net (AtN) is a Web archiving platform operated by the Internet Memory Research. 
It brings the best web archiving technology, scalability and economy of scale to any cultural institution willing to get engaged in Web Archiving. 
AtN with its 3 modules (Administration, Collection and Report) enables any institution to create, define parameters and manage its Web archive.
Moreover, IMR offers the possibility to operate a methodological human driven QA, which includes repairing operations. 

Concerning the technologies, we use and adapt some open sources tools and develop proprietary codes:
The baseline crawler currently used in AtN is Heritrix version 3 but we also developed a crawler which enables us to crawl at large scale (MemoryBot).
Concerning access, we use a sophisticated distributed Storage engine (HBase on top of HDFS), which automatically manages replication and fault-tolerance. Although our native storage conforms to the Open-source Hadoop file system representation, we also provide an import/export mechanism based on the standard WARC format.
Access to the archive is provided through a wayback-machine-like approach (index page, navigation with on-the-fly link rewriting, banner on top of pages, etc.) using IMR internal access tools. The IM access tool was the first tool to implement a server-side link rewriting 4 years ago and has been constantly improved since then. It enables for instance IMR to implement custom rewriting rules for difficult sites or to embed custom video players and other advanced on the fly presentation improvements.

But maybe are you more interested in our new AtN●2 service, which focus on discovering and archiving sources from social web community? This service does not use the same process and is operated by our crawler, MemoryBot. Please do not hesitate to specify a little bit more your interest.

Moreover we are engaged in several research projects (funded by the European Commission). In this framework, we improve continuously our technologies and methods.


#[WARC (Web ARChive File Format)](http://bibnum.bnf.fr/WARC/WARC_ISO_28500_version1_latestdraft.pdf)

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

#[International Internet Preservation Consortium](http://netpreserve.org/)

The IIPC is a membership organization dedicated to improving the tools, standards and best practices of web archiving while promoting international collaboration and the broad access and use of web archives for research and cultural heritage.

They helped create WARC, Heritrix and some analytic tools.

The British Library is a founding member. Might be interesting to see if we can talk to them.

It's split into three working groups:

##[Harvesting](http://netpreserve.org/harvesting-working-group)

The Harvesting Working Group’s primary focus is the development of web harvesting technologies, particularly around the Internet Archive’s Heritrix web crawler. They develop and support WARC and some best practises for sharing crawl information. THey are also interested in crawling the deep web as well as streaming media.

They mention a smart crawler but the [link](http://wa.archive.org/blog/2007/03/17/heritrix-1120-crawling-smarter/) is down. The Google cache is still available (ha!). Smart seems to mean that they avoid duplicate records and prioritise URLs as well as crawling URLs at a rate sensitive to the URL's change rate.

##[Access](http://netpreserve.org/access-working-group)

Focusses on providing access to web archives. Their focus areas are:

1. Understanding and defining user requirements for access
2. Resources discovery including full-text and innovative ways of searching web archives
3. Access to multimedia content within archived websites
4. Tools for analysis of structure and content of web archives
5. Identification and documentation of web archive use cases
6. Technology watch

##[Preservation](http://netpreserve.org/preservation-working-group)

The Preservation Working Group (PWG) focus is on policy, practices and resources in support of preserving the content and accessibility of web archives. The PWG aims to understand and report on how approaches used for other kind of digital resources might be used with web archives, as well as the special characteristics of web archives that might require new approaches. It will provide recommendations for additions or enhancements to tools, standards, practice guidelines, and possible further studies/research.

##Selection

This isn't a working group but is an area of archive that they mention that isn't covered by one.

Like any other materials that libraries and archives collect, web archives are selected to complement existing collections and serve different goals. National libraries often focus on collecting their national domains for cultural heritage or as part of copyright deposit regimes and therefore perform broad, very large crawls. These domain crawls represent some of the largest collections of web archives. Universities may concentrate on collecting web archives that serve researcher or educational needs so these collections tend to be focused and deep. Regional and corporate organizations collect web archives for legal or record keeping purposes, targeting specific documents or sites on the web.

#[FreezePage](http://www.freezepage.com/)

Another service providing on-demand archiving of a webpage. Very similar to archive.is.

Cannot archive secure (https) pages. This is odd. Does not run scripts. Does not conform to robot.txt, they say they are not a robot as each page capture is the result of a user action.

#[Hanzo Archives](http://www.hanzoarchives.com/)

Social media and web site archiving for compliance, records management and e-discovery. They have a whitepaper.

Corporations, government agencies and institutions are increasingly required to produce website content and social media postings in their native format for compliance, records management, business intelligence and other applications.

They use the WARC standard. They are FINRA compliant.

They have released some open source tools for interacting with WARC files. Python scripts to 'manipulate and manage'.

They capture any content, no matter how dynamic. There's no mention of how on the site but they must render the page server side in order to archive. I wonder what they do about form submission/database/search stuff?

They bang on about 'native format web archiving' which sometimes seems to mean they store data in WARC files and not in a proprietary CMS. Sometimes it seems to mean something mysterious and ground breaking.

#[PageFreezer](http://pagefreezer.com/)

Again, a web-based archive product. They have a whitepaper. Nothing special about this one, they're compliant with FINRA, SOX, and SEC.

#[web archiving service (WAS)](http://webarchives.cdlib.org/)

Web-archiving service aimed at scholars and librarians. They archive a number of public sites (like the 2010 Winter Olympics), and let you sign up to archive private ones.

#[Vestige Technologies](http://www.vestigetechnologies.com/)

Web archiving compliance for financial services. They have a whitepaper.

#[DeepArc](http://deeparc.sourceforge.net/)

An interesting piece of open source software that turns relational databases into XML so they can be archived but are still query-able. Has to be implemented by the database owner but offers a neat way to preserve access to some 'deep web' components.

#[Heritrix Wiki](https://webarchive.jira.com/wiki/display/Heritrix/Heritrix;jsessionid=0C5E6E96941E3DBAB5988DA34AD693A9)

The public wiki for the heritrix crawler. Heritrix is the Internet Archive's open-source, extensible, web-scale, archival-quality web crawler project.

##[Crawl Slow, Crawl Polite](https://webarchive.jira.com/wiki/display/Heritrix/unexpectedly+slow+crawling+on+idle+crawler)

Heritrix sends a single request at a time to each server (hostname I suppose) and has a multi-second delay between successive requests. This is in order to be polite and not overload the website being crawled.

It is possible to override these settings. Interestingly, Heritrix appends `operatorContactURL` and `userAgentTemplate` fields to the metadata in the request. I suppose this means people do not feel like they are anonymous bots that can get away with a DDOS.

##[Streaming Media](https://webarchive.jira.com/wiki/display/Heritrix/collecting+streaming+content)

Heritrx can crawl anything served over HTTP/HTTPS/DNS and FTP. So it can grab some streamed content. It might be required in some cases to use some javascript to get at the content.

There is a paper that demonstrates how to use MPlayer to grab streamed content.

##[JavaScript-walls](https://webarchive.jira.com/wiki/display/Heritrix/crawling+JavaScript)

Heritrix does not render the page as a browser would and does not execute any JS. It does download any JS that is linked to, and it scans the JS for anything likely to be a url. This is fallible, and not all linked content will be found this way.

There is a project to use the Rhino JS engine and Lobobrowser to render pages and follow links.


##[Browser Monkeys](https://webarchive.jira.com/wiki/display/SOC06/Leverage+browsers+for+link-extraction)

A project to use a scalable pool of automated web browsers to download web pages, and perform processing on the resulting pages. This is hoped to be integrated into heritrix.

Work seems to have stalled.

###[Version 2](https://webarchive.jira.com/wiki/display/SOC06/Browser+Monkeys+-+2)

Some people have taken the project further. It's a firefox plugin and a controlling server that can coordinate a cluster of browsers. Every HTTP request made by a browser monkey is logged and archived.

Once again, work seems to have stalled. The controller running at http://crawling04.us.archive.org:8081 is down.

##[SPAM Detection](https://webarchive.jira.com/wiki/display/Heritrix/Web+Spam+Detection+for+Heritrix)

This is a project that aims to help Heritrix detect and avoid spam sites.

##[Web Forms](https://webarchive.jira.com/wiki/display/Heritrix/handling+web+forms)

Heritrx does not fill in forms (how could it?) but it can be configured to login to sites using form POSTS and HTTP Basic/Digest Auth.

It can also attempt to grab the page at a form's action location. Perhaps by submitting empty forms or trying possible strings.

##[Restrict Scope](https://webarchive.jira.com/wiki/display/Heritrix/national+or+regional+domain+scope)

Restricting archiving to only those sites from a particular country is harder than it might seem. Just going by the TLD is not good enough. There are lots of places where country specific sites might reside (Facebook, Blogger, etc.) that don't have the assumed TLD.

#[nutchWax (seriously)](http://archive-access.sourceforge.net/projects/nutch/)

An application of nutch (Apache open source web-search software) for searching arc files instead of live web pages. Nothing about WARC but I assume they're compatible.

#[iterasi](http://www.iterasi.com/)

Another "we'll archive it for you" service for regulations and compliance. They're very confident that they're the best. Their features include the ability to archive "even the most complex pages and sites". They have a whitepaper.

#[cloudpreservation](http://www.cloudpreservation.nextpoint.com/#&panel1-2)

Archive subscription service. They seem to offer a service where a team of technicians will "SmartCrawl" your site for you to get set up.

#[patrina](http://www.patrina.com/)

Archive subscription service. Many more features than other services. Data transformation among them.

#[peeep.us](http://www.peeep.us/)

On-demand archive, like archive.is. They have a bookmarklet that allows you to archive personalised webpages. The bookmarklet makes a second request for the current page and uploads the response. This has limitations because if any of the linked files also require personalisation then they will not be loaded properly.

#[smarsh](http://www.smarsh.com/web-archiving)

Archive subscription site. They can do archiving of personalised webpages, even for database-driven sites. I assume this takes traffic logs and re-creates the requests. THey have several white papers.

#[WebCite](http://www.webcitation.org/)

On-demand archive service. Aimed at academica wanting to preserve a webpage when citing it. They stop accepting new submission at the end fo 2013 unless they raise enough money to continue.

#[SiteReplay](http://www.website-archive.com/)

Subscription archive service. Doesn't mention social media.

#[xinq](http://web.archive.org/web/20110227202744/http://www.nla.gov.au/xinq/)

Creates a web application using an XML database back end. This pairs nicely with Deep Arc.

#[Living Web Archives (LiWA)](http://www.liwa-project.eu/)

Developing the next generation web archive technologies. LiWA looks 'beyond' simple freezing of sites and aims to create a living archive. Living, in this sense, means i) long term interpretability, ii) improved archive fidelity and less spam, and iii) considering a wide variety of content.

They haven't released a newsletter since, 2011. Did they run out of FP7 funding? They have published lots of papers.

## [Archive Fidelity](http://liwa-project.eu/index.php/thema/C5)

Complete and faithful capture of web content. Find all links to resources, find deep web content, and handle streaming media.

## [Spam Cleansing](http://liwa-project.eu/index.php/thema/C4)

In particular, look at 'fake' web content that is designed to cheat search engines (they say an estimated 20% of the web is like this).

Also mention detecting real changes to content over surface changes (like a timestamp).

## [Temporal Coherence](http://liwa-project.eu/index.php/thema/C6)

Make sure the archive is fully aware of time. Crawls must correctly add temporal metadata, multiple crawls and archives must be reconciled with respect to time, and optimisations can be applied for time-aware crawling.

## [Semantic Evolution](http://liwa-project.eu/index.php/thema/C7)

The words that we use change over time, for instance, if you wanted to search an archive for the history of the iPod you would also want to look at the history of the Walkman. If you didn't know about the Walkman you would miss this part of the history. In the web, terminology evolves rapidly so it is very important for web archives to be able to understand how.

## [Rich Media Archiving](http://liwa-project.eu/index.php/thema/C9/)

How can you archive non-textual data? Streaming media etc. etc.

## [Social Web Archiving](http://liwa-project.eu/index.php/thema/C8/)

Current web archive technologies don't archive the social web that well. How can this be changed? This seems to be the least researched area of LiWA, there are no papers that directly reference this (that I can see).

# [Longitudinal Analytics of Web Archive Data](http://www.lawa-project.eu/)

They hope to build a web-based data analytics solution that is focussed on analytics of web data crawled over a long period of time. They want to extend Hadoop to allow for wide-area data access, distributed storage and indexing, scalable data aggregation and data analysis along the time dimension, and automatic classification of Web contents.

They've published lots of papers and released some open source extensions to Hadoop. THeir RADAR system performs 'named entity disambiguation' over web archives. RADAR maps named entities (people, locations, etc.) to entities in a knowledge base. Project ends August 2013.

## [Virtual Web Observatory Demo](http://vwo.lawa-project.eu/)

You can demo each of the analytic components they've built. Things like spam detection, database statistics. Some work, some don't.

Their Wimmut Suite gives you a visual guide to entities and their relationships to other entities. There's a static wikipedia Wimmut but it wouldn't work because their server is down.

There's a RADAR demo that should disambiguate text but I couldn't get it to work either.


