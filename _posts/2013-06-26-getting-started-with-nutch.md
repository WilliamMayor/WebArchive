---
layout: post
title: Getting Started with Nutch (on Linux)
tags: [crawling]
---
As part of the exploration of open source web crawlers we looked at the Apache offering in [nutch](http://nutch.apache.org/). I found the installation guide for nutch to be lacking (especially for version 2). So, here's the list of things I had to do to get nutch up and running.

## Dependencies

I'm using a virtual machine (VM) kindly provided by UCL's Computer Science Department. The VM runs Scientific Linux (SL) so that's what I'm using. SL comes with the `yum` package manager that can help make installing things nice and easy. Unfortunately, the versions of some software that yum has access to are too old for nutch. So I'm having to install things from source. The one thing I'm using from yum? The JDK:

    sudo yum install java-1.7.0-openjdk-devel

In order to compile nutch (and solr) we'll need `ant` and `ivy`. In order to install these we need to set the `JAVA_HOME` environment variable. It's not immediately obvious to me where the `JAVA_HOME` should point to, in the end I followed symlinks back to something that sounded specific enough to be useful but broad enough that I wouldn't need to keep changing the path after every update:

    $ which java
    /usr/bin/java
    $ ls -l /usr/bin | grep java
    lrwxrwxrwx    1 root root          22 Jun 27 12:48 java -> /etc/alternatives/java
    lrwxrwxrwx    1 root root          23 Jun 22 04:37 javac -> /etc/alternatives/javac
    lrwxrwxrwx    1 root root          25 Jun 22 04:37 javadoc -> /etc/alternatives/javadoc
    lrwxrwxrwx    1 root root          23 Jun 22 04:37 javah -> /etc/alternatives/javah
    lrwxrwxrwx    1 root root          23 Jun 22 04:37 javap -> /etc/alternatives/javap
    $ ls -l /etc/alternatives/ | grep java
    ...
    lrwxrwxrwx  1 root root 46 Jun 27 12:48 java -> /usr/lib/jvm/jre-1.7.0-openjdk.x86_64/bin/java
    ...

Inside the `/usr/lib/jvm` directory is another symlink called `/usr/lib/jvm/java/` that points back to one of the alternatives for the java_sdk. I picked this path to be my `JAVA_HOME`. I set the `JAVA_HOME` by editing the `/etc/profile` file:

    $ sudo echo 'export JAVA_HOME=/usr/lib/jvm/java/' >> /etc/profile
    $ source /etc/profile

Now let's get ant. Find the latest distribution from [the website](http://ant.apache.org/), download, and unpack:

    $ cd
    $ wget http://apache.mirrors.timporter.net//ant/source/apache-ant-1.9.1-src.tar.gz
    $ tar -xvf apache-ant-1.9.1-src.tar.gz

At this point I had to manually download [JUnit](http://junit.org/) and place it in the ant lib directory:

    $ cd
    $ wget http://search.maven.org/remotecontent?filepath=junit/junit/4.11/junit-4.11.jar
    $ mv remotecontent\?filepath\=junit%2Fjunit%2F4.11%2Fjunit-4.11.jar apache-ant-1.9.1/lib/optional/junit-4.11.jar

Now I could build ant using:

    $ cd apache-ant-1.9.1
    $ sh build.sh -Ddist.dir=build dist

When that finished, I set the `ANT_HOME` environment variable and installed ant into it so other users could use ant:

    $ sudo echo 'export ANT_HOME=/usr/lib/ant/' >> /etc/profile
    $ source /etc/profile
    $ sudo sh build.sh -Dant.install=$ANT_HOME install

I needed to install [http://ant.apache.org/ivy/](Ivy) into the ant distribution, things get a little easier now ant is installed. Just grab the source code and use ant to compile it. I then move Ivy into the ant library directory so any can take advantage of it:

    $ cd
    $ wget http://mirror.gopotato.co.uk/apache//ant/ivy/2.3.0/apache-ivy-2.3.0-src.tar.gz
    $ tar -xvf apache-ivy-2.3.0-src.tar.gz 
    $ cd apache-ivy-2.3.0/
    $ ant jar
    $ cp build/artifact/jars/ivy.jar $ANT_HOME/lib/

## Solr and nutch

nutch uses Solr to index the pages that it finds. You have to install both simultaneously as they both (sort of) rely on one another. First let's grab the source code for both. I'm using the latest version of Solr that I can find but version 1.7 of nutch. The reason for this is that I couldn't get version 2 to work, no matter how hard I tried. 

    $ cd
    $ wget http://mirror.catn.com/pub/apache/lucene/solr/4.3.1/solr-4.3.1-src.tgz
    $ tar -xvf solr-4.3.1-src.tgz
    $ wget http://mirror.gopotato.co.uk/apache/nutch/1.7/apache-nutch-1.7-src.tar.gz
    $ tar -xvf apache-nutch-1.7-src.tar.gz

We'll start by compiling everything:

    $ cd solr-4.3.1/solr
    $ ant dist
    $ cd ~/apache-nutch-1.7
    $ ant runtime

Pretty easy actually, now we have to set up a Solr instance to use. Solr comes with an example instance that's almost ready to go. We just have to copy the recently compiled Solr and nutch's data schema to the right places:

    $ cp ~/solr-4.3.1/solr/dist/solr-4.3.1-SNAPSHOT.war ~/solr-4.3.1/solr/example/webapps/solr.war
    $ cp ~/apache-nutch-1.7/runtime/local/conf/schema-solr4.xml ~/solr-4.3.1/solr/example/solr/collection1/conf/schema.xml

At this point I had to modify the schema.xml file that we just copied over to include a `_version_` field. The version field apparently enables transaction logs, so you could also turn off the features that require a version field. Here's the command:

    $ vim ~/solr-4.3.1/solr/example/solr/collection1/conf/schema.xml

Just update the fields section to now include the following:

    <fields>
        ...
        <field name="_version_" type="long" indexed="true" stored="true" multiValued="false"/>
        ...
    </fields>

The next thing I wanted to do was make sure that the Solr data was going to my larger network drive rather than stay on the VM. You just have to change the `dataDir` property in `~/solr-4.3.1/solr/example/solr/collection1/conf/solrconfig.xml`.

Now we can run Solr:

    $ nohup java -jar ~/solr-4.3.1/solr/example/start.jar > /dev/null 2>&1 &

I've used nohup here so I don't have to remain logged in order for Solr to run. I've also pushed everything that Solr outputs to `/dev/null` because I found that I was collecting very large output files. It might be possible to suppress this output (or at least increase the log level) but I don't know how.

With Solr running, let's get nutch configured:

    $ cd ~/apache-nutch-1.7/runtime/local/
    $ mkdir urls
    $ vim urls/seed.txt

In the `seed.txt` file put each URL that you want to nutch to start from on it's own line. I did a test crawl of the CS domain at UCL so my seed file looked like:

    http://www.cs.ucl.ac.uk

If you want to restrict nutch so that it doesn't go about crawling the whole web you can use the regexp filters to discard URLs. I set up mine to only consider URLs within the cs.ucl.ac.uk domain:

    $ vim ~/apache-nutch-1.7/runtime/local/conf/regex-urlfilter.txt

My URL filter looks like this:

    ...
    # skip file: ftp: and mailto: urls
    -^(file|ftp|mailto):

    # skip image and other suffixes we can't yet parse
    # for a more extensive coverage use the urlfilter-suffix plugin
    -\.(gif|GIF|jpg|JPG|png|PNG|ico|ICO|css|CSS|sit|SIT|eps|EPS|wmf|WMF|zip|ZIP|ppt|PPT|mpg|MPG|xls|XLS|gz|GZ|rpm|RPM|tgz|TGZ|mov|MOV|exe|EXE|jpeg|JPEG|bmp|BMP|js|JS)$

    # skip URLs containing certain characters as probable queries, etc.
    -[?*!@=]

    # skip URLs with slash-delimited segment that repeats 3+ times, to break loops
    -.*(/[^/]+)/[^/]+\1/[^/]+\1/

    # accept anything else
    +^http(s)?://([a-z0-9]*\.)*cs.ucl.ac.uk/

The only change is at the bottom where I've said to match secure HTTP pages and then anything that falls under the CS domain.

With that done let's (finally) get nutch started:

    $ cd ~/apache-nutch-1.7/runtime/local/
    $ bin/crawl urls/seed.txt <path/to/data> http://localhost:8983/solr/ 1

The crawl script takes a number of parameters. The first is the location of the seed URLs (which we created earlier). The second is a path (that nutch will create) to where nutch should store the data. The third is the URL to Solr. The fourth is the number of rounds nutch should perform.

nutch will perform a breadth first search of the pages in its current segment (the first segment contains the seed URLs). Any subsequent URLs found are pushed into the next segment. A round is a complete crawl and parse of a segment.

The command above will perform a single round. When it finishes you could run the command again to collect a second segment. You could also increase the number of rounds performed and let it run for longer.

