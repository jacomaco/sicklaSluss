---
layout: base.njk
title: Artiklar
description: Artikelarkiv om Sicklaslussen – historiska och vetenskapliga artiklar, information och pressklipp
---

<h1>Artiklar om Sicklaslussen</h1>

<p>Här samlas artiklar av historiskt eller vetenskapligt intresse, information och skrivelser samt pressklipp om Sicklaslussen och våra sjöar.</p>

<p><em>Teckenförklaringar:</em></p>
<ul class="legend">
  <li><strong>[A]</strong> Artikel av historiskt eller vetenskapligt intresse</li>
  <li><strong>[I]</strong> Information och skrivelser</li>
  <li><strong>[N]</strong> Nyhetsartikel press</li>
</ul>

<hr class="rule">

<h2>Nyare artiklar</h2>

<ul class="articles">
{% for post in collections.artikel | sort(true, true, "data.date") %}
  {% if post.data.group == "ny" %}
  <li>
    <strong>{{ post.data.label }}</strong> [{{ post.data.type }}]
    {% if post.data.file %}<a href="{{ post.data.file | url | replace(' ', '%20') }}">{{ post.data.title }}</a>
    {% elseif post.data.link %}<a href="{{ post.data.link }}" target="_blank" rel="noopener">{{ post.data.title }}</a>
    {% else %}{{ post.data.title }}{% endif %}
    {% if post.data.pdf %} <a href="{{ post.data.pdf | url | replace(' ', '%20') }}">[som pdf]</a>{% endif %}
    {% if post.data.attr %} – {{ post.data.attr }}{% endif %}
  </li>
  {% endif %}
{% endfor %}
</ul>

<hr class="rule">

<h2>Historiska artiklar (arkiv)</h2>

<ul class="articles">
{% for post in collections.artikel | sort(true, true, "data.date") %}
  {% if post.data.group == "ark" %}
  <li>
    <strong>{{ post.data.label }}</strong> [{{ post.data.type }}]
    {% if post.data.file %}<a href="{{ post.data.file | url | replace(' ', '%20') }}">{{ post.data.title }}</a>
    {% elseif post.data.link %}<a href="{{ post.data.link }}" target="_blank" rel="noopener">{{ post.data.title }}</a>
    {% else %}{{ post.data.title }}{% endif %}
    {% if post.data.pdf %} <a href="{{ post.data.pdf | url | replace(' ', '%20') }}">[som pdf]</a>{% endif %}
    {% if post.data.attr %} – {{ post.data.attr }}{% endif %}
  </li>
  {% endif %}
{% endfor %}
</ul>

<p><em>Tips: de flesta artiklarna finns i digital form som PDF. Saknas en länk du letar efter – kontakta <a href="mailto:webmaster@sicklasluss.se">webmaster@sicklasluss.se</a>.</em></p>