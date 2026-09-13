---
layout: base.njk
title: Startsida
description: Sicklaslussen – vattenförbindelsen till Sickla och Järlasjön. En handmanövrerad sluss som förbinder Hammarby Sjö/Saltsjön med Sicklasjön och Järlasjön.
---

<h1>Sicklaslussen<br>
<small>vattenförbindelsen till Sickla och Järlasjön</small></h1>

<img class="lead-img" src="{{ '/static/images/Slussbild_009.jpg' | url }}" alt="Sicklaslussen">

<p>Sicklaslussen är en handmanövrerad sluss som förbinder Hammarby Sjö / Saltsjön med Sicklasjön och Järlasjön.</p>

<hr class="rule">

<h2>Nyheter</h2>

<ul class="news-list">
{% for post in collections.news | reverse | limit(3) %}
  <li>
    <h3 class="news-title"><a href="{{ post.url | url }}">{{ post.data.title }}</a></h3>
    <p><span class="newsdate">{{ post.date | shortDate }}</span></p>
    {% if post.data.summary %}<p>{{ post.data.summary }}</p>{% endif %}
    <p class="readmore"><a href="{{ post.url | url }}">Läs mer …</a></p>
  </li>
{% endfor %}
</ul>

<p class="readmore"><a href="{{ '/nyheter/' | url }}">&gt;&gt; Fler nyheter ...</a></p>