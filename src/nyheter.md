---
layout: base.njk
title: Nyheter
description: Aktuella nyheter från Föreningen Sicklaslussen
---

<h1>Nyheter</h1>

<img class="lead-img" src="{{ '/static/images/nyheter/Nyheter_001.jpg' | url }}" alt="Sicklaslussen">

<div class="card">
  <h2 class="card-title">Kalendarium 2026</h2>
  <p>Sicklaslussen är öppet för slussning 10 maj – 27 sep. Under denna period gratis drop-in-slussning lördagar kl 10:30–11:30 och kl 16:00–17:00. Övrig tid slussning efter beställning på föreningens slusstelefon <a href="tel:+46707816547">070-7816547</a>.</p>
  <p>Sicklaslussens slussdagar: <strong>23 maj &amp; 30 aug</strong>, då med gratis slussning kl 10–16.</p>
</div>

<ul class="news-list">
{% for post in collections.news | reverse %}
  <li>
    <h2 class="news-title"><a href="{{ post.url | url }}">{{ post.data.title }}</a></h2>
    <p><span class="newsdate">{{ post.date | shortDate }}</span></p>
    {% if post.data.summary %}<p>{{ post.data.summary }}</p>{% endif %}
    <p class="readmore"><a href="{{ post.url | url }}">Läs mer …</a></p>
  </li>
{% endfor %}
</ul>

<hr class="rule">

<p class="readmore"><a href="{{ '/' | url }}">Tillbaka till startsidan</a></p>