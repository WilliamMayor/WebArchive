---
layout: default
title: Blog
name: blog
---

# {{ page.title }}

Here's every blog post so far:

{% for post in site.posts %}
*    {{ post.date | date_to_string }} [{{ post.title }}]({{ post.url }})
{% endfor %}
