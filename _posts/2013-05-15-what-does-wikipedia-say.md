---
layout: post
title: What Does Wikipedia Say?
tags: [review]
---

What can [wikipedia](http://en.wikipedia.org) tell us about web archive? Lots of course.

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