---
layout: post
title: Possible Technical Approaches to Storage
tags: [storage]
js: [/js/20130712a.js]
ngapp: true
---

This post considers the problem of how to store the vast quantities of data that a web archive will require. Several possible solutions are explored.

## The Problem

The sheer size of the web and the speed and acceleration of its growth mean that any archive of web documents will be vast. An attempt to archive the entire web will necessarily involve storing billions of web pages and petabytes of data. Current archiving programmes store their collection in central data centres. This places a large burden on these data centres that they may not always be able to cope with. There may be too many eggs in too few baskets, as the saying goes. An alternative to centralised storage is distributed 'cloud' storage. With a distributed system there is a network of computers that all work together. In this case the network can provide a large storage capacity by asking each computer to provide a fraction of the total.

There are several options for distributed (or decentralised) networks. This post explores possible options and looks at the strenghts and weaknesses of each. Solutions are compared according to their ability to achieve the following goals:

1. enable document lookup (i.e. given a url and a timestamp, return a matching page)
2. enable document search (i.e. given some query terms return matching URLs)
3. store for a long time
4. be resilient to failure
5. be resilient to attack

## The Parameters

There are four parameters to the problem that should be considered. These parameters are 'global' to every solution as each must solve the problem under the same conditions. Feel free to change the parameters to explore how the solutions hold up in different environments.

- Network size: There are <input type="text" ng-model="networkSize"/> nodes in the network
- Collection size: There are <input type="text" ng-model="collectionSize"/> document in the collection
- Document size: Each document is <input type="text" ng-model="documentSize"/> bytes, on average
- Replication: There should be at least <input type="text" ng-model="replication"/> copies of each document

## The Solutions

The solutions are not mutually exclusive, indeed there is likely to be great benefit in combining some of these solutions. In the following discussion, however, each solution is considered as it would individually apply to the problem.

### Probably Approximately Correct Search

Probably Approximately Correct (PAC) Search is a method of information retrieval that works over unstructured, peer-to-peer networks. This means that there is no explicit organisation to the nodes in the network or the distribution of data across them. See the discussion on the DHT solution for a structured, peer-to-peer approach.

In a PAC Search web archive system each node operates largely independently. Each node crawls the web by taking an independent random sample of the possible URLs. In the following analysis it is assumed that every URL is crawled and that replication of data is achieved by having multiple nodes sample the same URL. In fact, it is assumed that every URL is crawled exactly the number of times required to meet the replication requirements and no more.

Because the data is randomly distributed across the network, there is no deterministic means of discovery. Instead, information retrieval (be that lookup or search) is achieved by having a node randomly sample a set of nodes in the network and query them for the desired data. The nodes will return a list of the URLs in their local indexes that matched the query. The responses from all of the nodes are collated and considered. If the result is insufficient then the search can be performed again, using a different random sample of nodes.

There are some PAC-specific parameters to consider:

- Index size: Each node stores <input type="text" ng-model="pacIndexSize"/> documents in its local index
- Query size: <input type="text" ng-model="pacQuerySize"/> nodes are randomly sampled each time a search query is issued

Under these conditions a PAC-based archive:

- Would require that each node provide {% raw %}{{ (pacIndexSize * documentSize) / 1000000000 | number:0}}{% endraw %} gigabytes of storage space
- Would be able to provide a replication factor of {% raw %}{{ pacIndexSize * networkSize / collectionSize | number:2}}{% endraw %} ({% raw %}{{ 100*(((pacIndexSize * networkSize) / collectionSize)/replication) | number:0}}{% endraw %}% of the desired replication)
- Would have a {% raw %}{{ 100 * (1 - Math.pow(1-(pacIndexSize / collectionSize), pacQuerySize)) | number:4}}{% endraw %}% probability of a lookup being successful
- Would require a lookup query to be repeated {% raw %}{{ 1 / (1 - Math.pow(1-(pacIndexSize / collectionSize), pacQuerySize)) | number:0}}{% endraw %} times before success is likely


