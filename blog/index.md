---
layout: default
title: Blog
name: blog
---

# {{ page.title }}

Here's a list of blog posts by tag. Enjoy.

{% for tag in site.tags %}
## {{ tag[0] }}
{% for post in tag[1] %}
*    {{ post.date | date_to_string }} [{{ post.title }}]({{ post.url }})
{% endfor %}
{% endfor %}
