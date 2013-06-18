---
layout: post
title: The Five Phases to Web Archiving
tags: [review, selection, collection, storage, access, preservation]
---

The task of building a web archive can be broken down into five distinct phases.


## Selection

During selection the web archive system selects the web pages to be downloaded into the archive. This can happen at the start of the archiving process where selection is based entirely on 'seeds'. Seeds are URLs that are given to the system on start up that provide a starting place for collection to occur. After the system has been seeded, selection occurs whenever a web crawler reports a newly discovered URL (see Collection).

Selecting whether or not a page should go into the archive is a decision that can be based on many factors. If an archive has a pre-defined scope then selection is simply a matter of seeing if a new URL falls into that scope. Archives might have a domain specific remit, where only pages found in a single domain are archived. Domain scopes could be organisational (e.g. only archive pages at ucl.ac.uk), or they could be wider (e.g. only archive .gov.uk). Domain specific archiving is often motivated by legal obligations, and can be run by a single institution. Alternatively, the scope could be defined by topic. For instance, an archive for all academic papers, or for anything related to Sweden. Topic-based scopes are harder to select for, as categorising a page as on- or off-topic can be difficult. As well as selecting to include a page, scopes can be used to prevent inclusion. A common example of this would be to not archive so-called 'spam domains', web sites that include nothing but adverts and keywords, designed to boost search engine rankings without delivering content. Other scopes might not include particular file types, such as .css or .js files.


## Collection

There are many [technical approaches](/blog/2013/06/14/Technical-approaches-to-collection/) to collection, but a clear distinction can be made between remote collection techniques and direct. Remote collection typically involves web crawlers that download web pages from a stream of URLs provided by the selection process. Each downloaded page is scanned for URLs that are then passed to selection for consideration. Direct collection techniques involve simply downloading a web site's entire collection of pages directly from the server, in one go. Direct collection has the benefit of almost certainly archiving the entire site, no pages can be missed. Direct collections can also archive databases of information that are used to create pages on-the-fly. This means that the 'deep web' (pages that are hard for web crawlers to find because they require some kind of human intervention, e.g. filling in a form) can be archived, en-masse. The downside to a direct collection is that it often requires the collaboration of the web site owners. It may also be difficult to later access a directly collected web site, as technologies such as databases and server-side scripting, that were used to create a page, might not still be available. Remote collection has the benefit of producing a uniform output type, no matter the webpage. This means that many websites, using many different server-side technologies, can all be archived together in a similar manner. As long as a suitable storage process is employed, these sites will all equally remain available. Unfortunately, remote collection can miss pages if they are not suitably linked to from other locations. This is especially noticeable for the 'deep web', that remote collection techniques struggle to archive. Remote collection can also struggle with unexpected content, such as streaming media or content loaded using AJAX.


## Storage

Storage deals with the problems of storing the archive. Given the vast amount of data that makes up a web archive, and that the archive will only ever get bigger, at an increasing rate, storage is a sizable concern. Current solutions are to use data centers and dedicated storage machines. The Internet Archive have developed a storage device called a Petabox that they are hoping to use to store their archive. Most storage solutions are centralised, there are few computers that hold the data and they tend to be located close to one another. This allows for fast data re-location and quicker access times. It may lead to security issues as there are limited data locations that are therefore prime targets for attacks. Non-malicious dangers, such as earthquakes, can also damage centralised data.

    Note: This section will be updated as I cover more material


## Access

The access phase is the end-use phase, where users use the archive to learn things about the past.

    Note: This section will be updated as I cover more material

## Preservation

Preservation deals with archive data in such a way as to make sure it lasts the test of time. It is involved in previous phases as it ensures that data selected/collected/stored is in a format suitable for long-term use.

    Note: This section will be updated as I cover more material
