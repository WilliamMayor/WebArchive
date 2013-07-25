---
layout: post
title: Possible Technical Approaches to Storage
tags: [storage]
js: [/js/jquery.min.js, /js/jquery.flot.min.js, /js/jquery.flot.axislabels.js, /js/20130712a.js]
css: [/css/20130712a.css]
ngapp: true
---

This post considers the problem of how to store the vast quantities of data that a web archive will require. Several possible solutions are explored.

## The Problem

The sheer size of the web and the speed and acceleration of its growth mean that any archive of web documents will be vast. An attempt to archive the entire web will necessarily involve storing billions of web pages and petabytes of data. Current archiving programmes store their collection in central data centres. This places a large burden on these data centres that they may not always be able to cope with. There may be too many eggs in too few baskets, as the saying goes. An alternative to centralised storage is distributed 'cloud' storage. With a distributed system there is a network of computers that all work together. In this case the network can provide a large storage capacity by asking each computer to provide a fraction of the total.

There are several options for distributed (or decentralised) networks. This post explores possible options and looks at the strengths and weaknesses of each. Solutions are compared according to their ability to achieve the following goals:

1. enable document lookup (i.e. given a url and a timestamp, return a matching page)
2. enable document search (i.e. given some query terms return matching URLs)
3. store for a long time
4. be resilient to failure
5. be resilient to attack

## The Parameters

There are four parameters to the problem that should be considered. These parameters are 'global constants' to every solution as each must solve the problem under the same conditions. Feel free to change the parameters to explore how the solutions hold up in different environments.

<table>
	<tr>
		<th>Parameter</th>
		<th>Description</th>
		<th>Value</th>
	</tr>
	<tr>
		<td>Network Size</td>
		<td>The number of computers in the network</td>
		<td><input type="text" ng-change="changed()" ng-model="networkSize"/></td>
	</tr>
	<tr>
		<td>Collection Size</td>
		<td>The number of documents in the archive</td>
		<td><input type="text" ng-change="changed()" ng-model="collectionSize"/></td>
	</tr>
	<tr>
		<td>Document Size</td>
		<td>The average size (in bytes) of a document in the archive</td>
		<td><input type="text" ng-change="changed()" ng-model="documentSize"/></td>
	</tr>
	<tr>
		<td>Replication</td>
		<td>The number of copies of each document that should be held in the archive</td>
		<td><input type="text" ng-change="changed()" ng-model="replication"/></td>
	</tr>
</table>

## The Solutions

The solutions are not mutually exclusive, indeed there is likely to be great benefit in combining some of these solutions. In the following discussion, however, each solution is considered as it would individually apply to the problem.

### Probably Approximately Correct Search

Probably Approximately Correct (PAC) Search is a method of information retrieval that works over unstructured, peer-to-peer networks. This means that there is no explicit organisation to the nodes in the network or the distribution of data across them. See the discussion on the DHT solution for a structured, peer-to-peer approach.

The archive data is randomly distributed across the network, and so there is no deterministic means of discovery. Instead, information retrieval (be that lookup or search) is achieved by having a node randomly sample a set of nodes in the network and query them for the desired data. The nodes will return a list of the URLs in their local indexes that matched the query. The responses from all of the nodes are collated and considered. If the result is insufficient then the search can be performed again, using a different random sample of nodes.

<table>
	<tr>
		<th>Parameter</th>
		<th>Fixed?</th>
		<th>Description</th>
		<th>Value</th>
	</tr>
	<tr>
		<td>Query Size</td>
		<td><div class="onoffswitch">
		    <input type="checkbox" class="onoffswitch-checkbox" id="pacQuerySizeSwitch" ng-change="pac.querySize.switched()" ng-model="pac.querySize.fixed" />
		    <label class="onoffswitch-label" for="pacQuerySizeSwitch">
		        <div class="onoffswitch-inner"></div>
		        <div class="onoffswitch-switch"></div>
		    </label>
		</div></td>
		<td>The number of computers contacted per query</td>
		<td><input ng-class="{error: pac.querySize.error}" ng-disabled="pac.querySize.fixed" type="text" ng-change="pac.querySize.changed()" ng-model="pac.querySize.value"/></td>
	</tr>
	<tr>
		<td>Index Size</td>
		<td><div class="onoffswitch">
		    <input type="checkbox" class="onoffswitch-checkbox" id="pacIndexSizeSwitch" ng-change="pac.replication.switched()" ng-model="pac.replication.fixed" />
		    <label class="onoffswitch-label" for="pacIndexSizeSwitch">
		        <div class="onoffswitch-inner"></div>
		        <div class="onoffswitch-switch"></div>
		    </label>
		</div></td>
		<td>The number of documents stored on each computer</td>
		<td><input ng-class="{error: pac.local.error}" ng-disabled="pac.replication.fixed" type="text" ng-change="pac.local.index.changed()" ng-model="pac.local.index.value"/></td>
	</tr>
	<tr>
		<td>Local Storage</td>
		<td><div class="onoffswitch">
		    <input type="checkbox" class="onoffswitch-checkbox" id="pacLocalStorageSwitch" ng-change="pac.replication.switched()" ng-model="pac.replication.fixed" />
		    <label class="onoffswitch-label" for="pacLocalStorageSwitch">
		        <div class="onoffswitch-inner"></div>
		        <div class="onoffswitch-switch"></div>
		    </label>
		</div></td>
		<td>The amount of local storage (in bytes) required on each computer</td>
		<td><input ng-class="{error: pac.local.error}" ng-disabled="pac.replication.fixed" type="text" ng-change="pac.local.storage.changed()" ng-model="pac.local.storage.value"/></td>
	</tr>
	<tr>
		<td>Replication</td>
		<td><div class="onoffswitch">
		    <input type="checkbox" class="onoffswitch-checkbox" id="pacReplicationSwitch" ng-change="pac.replication.switched()" ng-model="pac.replication.fixed" />
		    <label class="onoffswitch-label" for="pacReplicationSwitch">
		        <div class="onoffswitch-inner"></div>
		        <div class="onoffswitch-switch"></div>
		    </label>
		</div></td>
		<td>The number of times data is replicated in this system</td>
		<td><input ng-class="{error: pac.replication.error}" ng-disabled="pac.replication.fixed" type="text" ng-change="pac.replication.factor.changed()" ng-model="pac.replication.factor.value"/></td>
	</tr>
	<tr>
		<td>Replication Comparison</td>
		<td><div class="onoffswitch">
		    <input type="checkbox" class="onoffswitch-checkbox" id="pacReplicationComparisonSwitch" ng-change="pac.replication.switched()" ng-model="pac.replication.fixed" />
		    <label class="onoffswitch-label" for="pacReplicationComparisonSwitch">
		        <div class="onoffswitch-inner"></div>
		        <div class="onoffswitch-switch"></div>
		    </label>
		</div></td>
		<td>What percentage of the desired replication is met by this PAC system?</td>
		<td><input ng-class="{error: pac.replication.error}" ng-disabled="pac.replication.fixed" type="text" ng-change="pac.replication.comparison.changed()" ng-model="pac.replication.comparison.value"/></td>
	</tr>
	<tr>
		<td>Lookup Probability</td>
		<td><div class="onoffswitch">
		    <input type="checkbox" class="onoffswitch-checkbox" id="pacLookupProbabilitySwitch" ng-change="pac.lookup.switched()" ng-model="pac.lookup.fixed" />
		    <label class="onoffswitch-label" for="pacLookupProbabilitySwitch">
		        <div class="onoffswitch-inner"></div>
		        <div class="onoffswitch-switch"></div>
		    </label>
		</div></td>
		<td>The probability that a lookup query will be successful</td>
		<td><input ng-class="{error: pac.lookup.error}" ng-disabled="pac.lookup.fixed" type="text" ng-change="pac.lookup.probability.changed()" ng-model="pac.lookup.probability.value"/></td>
	</tr>
	<tr>
		<td>Lookup Repetition</td>
		<td><div class="onoffswitch">
		    <input type="checkbox" class="onoffswitch-checkbox" id="pacLookupRepetitionSwitch" ng-change="pac.lookup.switched()" ng-model="pac.lookup.fixed" />
		    <label class="onoffswitch-label" for="pacLookupRepetitionSwitch">
		        <div class="onoffswitch-inner"></div>
		        <div class="onoffswitch-switch"></div>
		    </label>
		</div></td>
		<td>The number of times a lookup query is expected to have to be repeated before success</td>
		<td><input ng-class="{error: pac.lookup.error}" ng-disabled="pac.lookup.fixed" type="text" ng-change="pac.lookup.repetition.changed()" ng-model="pac.lookup.repetition.value"/></td>
	</tr>
</table>

<div id="pacChartOptions">
	<div class="x">
		<p>X-axis</p>
		<ul>
			<li>
				<select name="pacChartXAxis" ng-model="pac.chart.x.selected" ng-options="o.name for o in pac.chart.x.options" ng-change="pac.chart(true)"></select>
			</li>
			<li>From: <input type="text" ng-model="pac.chart.x.from" ng-change="pac.chart(false)" /></li>
			<li>To: <input type="text" ng-model="pac.chart.x.to" ng-change="pac.chart(false)" /></li>
			<li>Step: <input type="text" ng-model="pac.chart.x.step" ng-change="pac.chart(false)" /></li>
		</ul>
	</div>
	<div class="y">
		<p>Y-axis</p>
		<ul>
			<li>
				<select name="pacChartYAxis" ng-model="pac.chart.y.selected" ng-options="o.name for o in pac.chart.y.options" ng-change="pac.chart(true)"></select>
			</li>
			<li>From: <input type="text" ng-model="pac.chart.y.from" ng-change="pac.chart(false)" /></li>
			<li>To: <input type="text" ng-model="pac.chart.y.to" ng-change="pac.chart(false)" /></li>
		</ul>
	</div>

</div>

<div id="pacChart"></div>