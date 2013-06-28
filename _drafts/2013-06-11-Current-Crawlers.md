---
layout: post
title: Current Crawlers
tags: [review, collection]
---

This post is a brief review of current web crawling technologies. It's probably not exhaustive, I grabbed a list of crawlers from wikipedia and started from there. The goal is to understand what's currently available so I know which crawler would make a good starting place for my distributed crawler.

## Heritrix

Heritrix is a web crawler built by the Internet Archive, specially designed for building a web archive out of crawled information. It outputs directly to WARC format and has many useful-for-archive features.

### Pros

- Outputs to WARC
- Concurrent crawls
- Extensible
- Web interface
- Open Source

### Cons

- Not particularly user friendly (lots of Java config files)
- Requires Linux
- Documentation is lacking, probably need to be a developer to get it working
- As far as I'm aware it doesn't do any indexing of the pages. It just stores them.

Heritrix seems to be becoming the de facto standard for web archivists. It's a great tool but the configuration and setup are a large barrier to entry. You need a good understanding of computers, command line interfaces and XML configuration files to get Heritrix to work.

## YaCy

YaCy is a distributed search engine that uses P2P principles to crawl and index the web. A user sets up their own YaCy server that performs web crawls and responds to search queries. The user can use the server as a portal for their own search queries. The local server receives a query and sends it on to the YaCy DHT for remote results whilst searching its own local index for results. The user can tell the server to crawl a site and some, privileged, servers can accept URLs from remote sources.

### Pros

- Fully distributed, no centralised server
- Good UI, might be a bit information heavy for the average user
- Open Source
- Web interface
- Indexes content crawled to enable searching

### Cons

- Doesn't crawl all files (e.g. CSS)
- Doesn't seem to support all HTTP requests (e.g. POST)
- Technical documentation in German
- Very little description of technical details (e.g. how is a crawl performed)
- Doesn't seem to be as flexible as Heritrix when it comes to what pages to crawl

YaCy is very user friendly and offers some great services. It is not built for archive however and so would require some alterations to compete with other software.

## nutch

nutch is search engine crawler written by Apache. It's written from the start to be highly scalable in order to facilitate indexing many millions of webpages. nutch interfaces with lots of data storage options (e.g. HBase, MySQL, etc.) and works very well inside a Hadoop cluster. The architecture is very modular allowing for plugins to be written to extend and modify how nutch works. It isn't clear that the plugins can definitely open up the kind of behaviour a distributed web archiver would require, but it seems likely.

### Pros

- Written to be distributed, so likely to be more reliable than heritrix
- Very modular, easy to extend
- Open source
- Interfaces with lots of backend options, not constrictive
- Indexes for search
- very large user/developer base

### Cons
- Like YaCy, not written for archive
- lots of Java config files
