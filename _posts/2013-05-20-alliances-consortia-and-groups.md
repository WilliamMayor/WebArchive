---
layout: post
title: Alliances, Consortia, and Groups
tags: [review]
---

There are many groups of people / libraries / businesses that are working together to create web archives. Here's a list describing some of them.

##[opencontentalliance.org](http://www.opencontentalliance.org)

A collaborative effort to allow access to digital content across the globe. Contains data from lots of places. Yahoo! provides indexing. The Internet Archive administers the alliance.

###[/participate](http://www.opencontentalliance.org/participate/)

Lays out 6 principles for organisations that contribute to the alliance:

1. Encourage access whilst respecting content owners' rights
2. Contributors determine the terms and conditions of contributed material, as well as attribution
3. Not all material will be accepted. Preference is given to material that can be made widely accessible.
4. Collection and item-level metadata will be available in lots of formats
5. Efforts are welcome to create tools for navigating the archive
6. Material will reside in multiple locations around the world

##[International Internet Preservation Consortium](http://netpreserve.org/)

The IIPC is a membership organization dedicated to improving the tools, standards and best practices of web archiving while promoting international collaboration and the broad access and use of web archives for research and cultural heritage.

They helped create WARC, Heritrix and some analytic tools.

It's split into three working groups:

###[Harvesting](http://netpreserve.org/harvesting-working-group)

The Harvesting Working Group's primary focus is the development of web harvesting technologies, particularly around the Internet Archive’s Heritrix web crawler. They develop and support WARC and some best practises for sharing crawl information. THey are also interested in crawling the deep web as well as streaming media.

They mention a smart crawler but the [link](http://wa.archive.org/blog/2007/03/17/heritrix-1120-crawling-smarter/) is down. The Google cache is still available (ha!). Smart seems to mean that they avoid duplicate records and prioritise URLs as well as crawling URLs at a rate sensitive to the URL's change rate.

###[Access](http://netpreserve.org/access-working-group)

Focusses on providing access to web archives. Their focus areas are:

1. Understanding and defining user requirements for access
2. Resources discovery including full-text and innovative ways of searching web archives
3. Access to multimedia content within archived websites
4. Tools for analysis of structure and content of web archives
5. Identification and documentation of web archive use cases
6. Technology watch

###[Preservation](http://netpreserve.org/preservation-working-group)

The Preservation Working Group (PWG) focus is on policy, practices and resources in support of preserving the content and accessibility of web archives. The PWG aims to understand and report on how approaches used for other kind of digital resources might be used with web archives, as well as the special characteristics of web archives that might require new approaches. It will provide recommendations for additions or enhancements to tools, standards, practice guidelines, and possible further studies/research.

###Selection

This isn't a working group but is an area of archive that they mention that isn't covered by one.

Like any other materials that libraries and archives collect, web archives are selected to complement existing collections and serve different goals. National libraries often focus on collecting their national domains for cultural heritage or as part of copyright deposit regimes and therefore perform broad, very large crawls. These domain crawls represent some of the largest collections of web archives. Universities may concentrate on collecting web archives that serve researcher or educational needs so these collections tend to be focused and deep. Regional and corporate organizations collect web archives for legal or record keeping purposes, targeting specific documents or sites on the web.

##[Living Web Archives (LiWA)](http://www.liwa-project.eu/)

Developing the next generation web archive technologies. LiWA looks 'beyond' simple freezing of sites and aims to create a living archive. Living, in this sense, means i) long term interpretability, ii) improved archive fidelity and less spam, and iii) considering a wide variety of content.

They haven't released a newsletter since, 2011. Did they run out of FP7 funding? They have published lots of papers.

### [Archive Fidelity](http://liwa-project.eu/index.php/thema/C5)

Complete and faithful capture of web content. Find all links to resources, find deep web content, and handle streaming media.

### [Spam Cleansing](http://liwa-project.eu/index.php/thema/C4)

In particular, look at 'fake' web content that is designed to cheat search engines (they say an estimated 20% of the web is like this).

Also mention detecting real changes to content over surface changes (like a timestamp).

### [Temporal Coherence](http://liwa-project.eu/index.php/thema/C6)

Make sure the archive is fully aware of time. Crawls must correctly add temporal metadata, multiple crawls and archives must be reconciled with respect to time, and optimisations can be applied for time-aware crawling.

### [Semantic Evolution](http://liwa-project.eu/index.php/thema/C7)

The words that we use change over time, for instance, if you wanted to search an archive for the history of the iPod you would also want to look at the history of the Walkman. If you didn't know about the Walkman you would miss this part of the history. In the web, terminology evolves rapidly so it is very important for web archives to be able to understand how.

### [Rich Media Archiving](http://liwa-project.eu/index.php/thema/C9/)

How can you archive non-textual data? Streaming media etc. etc.

### [Social Web Archiving](http://liwa-project.eu/index.php/thema/C8/)

Current web archive technologies don't archive the social web that well. How can this be changed? This seems to be the least researched area of LiWA, there are no papers that directly reference this (that I can see).

## [Longitudinal Analytics of Web Archive Data](http://www.lawa-project.eu/)

They hope to build a web-based data analytics solution that is focussed on analytics of web data crawled over a long period of time. They want to extend Hadoop to allow for wide-area data access, distributed storage and indexing, scalable data aggregation and data analysis along the time dimension, and automatic classification of Web contents.

They've published lots of papers and released some open source extensions to Hadoop. THeir RADAR system performs 'named entity disambiguation' over web archives. RADAR maps named entities (people, locations, etc.) to entities in a knowledge base. Project ends August 2013.

### [Virtual Web Observatory Demo](http://vwo.lawa-project.eu/)

You can demo each of the analytic components they've built. Things like spam detection, database statistics. Some work, some don't.

Their Wimmut Suite gives you a visual guide to entities and their relationships to other entities. There's a static wikipedia Wimmut but it wouldn't work because their server is down.

There's a RADAR demo that should disambiguate text but I couldn't get it to work either.
