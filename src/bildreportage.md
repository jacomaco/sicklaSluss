---
layout: base.njk
title: Bildreportage
description: Bildreportage från Sicklaslussen – album läggs upp fortlöpande
---

<h1>Sicklaslussen bildreportage</h1>

<p>Här samlas bildreportage från slussdagar, vårmönstringar, medlemsresor och annat som händer kring Sicklaslussen. Klicka på ett album för att se bilderna.</p>

{% if collections.album | length > 0 %}
<ul class="articles">
  {% for album in collections.album | reverse %}
  <li><a href="{{ album.url | url }}">{{ album.data.title }}</a></li>
  {% endfor %}
</ul>
{% endif %}

<p><em>Vill du bidra med bilder från slussens aktiviteter – hör av dig till <a href="mailto:webmaster@sicklasluss.se">webmaster@sicklasluss.se</a>.</em></p>