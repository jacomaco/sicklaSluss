---
layout: base.njk
title: Nyheter
description: Aktuella nyheter från Föreningen Sicklaslussen
---

<h1>Nyheter</h1>

<img class="lead-img" src="{{ '/static/images/nyheter/Nyheter_001.jpg' | url }}" alt="Sicklaslussen" width="200" height="150" decoding="async" fetchpriority="high">

<div class="card">
  <h2 class="card-title">Kalendarium {{ kalendarium.year }}</h2>
  <p>Sicklaslussen är öppet för slussning {{ kalendarium.seasonStart }} – {{ kalendarium.seasonEnd }}. Under denna period gratis drop-in-slussning {{ kalendarium.openingHours }}. Övrig tid slussning efter beställning på föreningens slusstelefon <a href="tel:+46707816547">070-7816547</a>.</p>
  <p>Sicklaslussens slussdagar:</p>
  <ul class="calendar-list">
  {% for event in kalendarium.events %}<li><strong>{{ event.date }}</strong> – {{ event.text }}</li>{% endfor %}
  </ul>
</div>

<ul class="news-list">
{% for post in collections.news | reverse %}
  <li>
    <h2 class="news-title"><a href="{{ post.url | url }}">{{ post.data.title }}</a></h2>
    <p><time class="newsdate" datetime="{{ post.date | dateToISO }}">{{ post.date | shortDate }}</time></p>
    {% if post.data.summary %}<p>{{ post.data.summary }}</p>{% endif %}
    <p class="readmore"><a href="{{ post.url | url }}">Läs mer …</a></p>
  </li>
{% endfor %}
</ul>

<hr class="rule">

<p class="readmore"><a href="{{ '/' | url }}">Tillbaka till startsidan</a></p>