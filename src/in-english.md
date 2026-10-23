---
layout: base.njk
lang: en
title: In English
description: Welcome to Sicklaslussen – a hand-operated canal lock in Stockholm
h1: Welcome to Sicklaslussen
leadImage: /static/images/in-english/Lock_001.jpg
leadImageAlt: Sicklaslussen
leadImageWidth: 350
leadImageHeight: 134
---

Sicklaslussen is a historic, hand-operated canal lock in Stockholm that connects Hammarby Sjö / Saltsjön with Sicklasjön and Järlasjön. The waterway – known as "Järlaleden" – has been used by boaters since the Viking age.

The lock is open for boating **{{ kalendarium.english.seasonStart }} – {{ kalendarium.english.seasonEnd }}**. During this period there is free drop-in passage on {{ kalendarium.english.openingHours }}. At other times passage can be booked on our lock telephone: [070-7816547](tel:+46707816547).

## Exhibition days (Slussdagar)

<ul class="calendar-list">
{% for event in kalendarium.english.events %}<li><strong>{{ event.date }}</strong> – {{ event.text }}</li>{% endfor %}
</ul>

## More information

- › [Att slussa]({{ '/att-slussa/' | url }}) – opening hours, fees and dimensions (in Swedish)
- › [Historik]({{ '/historik/' | url }}) – the history of the lock (in Swedish)
- › [Nyheter]({{ '/nyheter/' | url }}) – news and calendar (in Swedish)
- › [Om föreningen]({{ '/om-foreningen/' | url }}) – about the association (in Swedish)

The lock is owned by the City of Stockholm and Nacka Municipality and operated on a voluntary basis by **Föreningen Sicklaslussen**.

Contact: [webmaster@sicklasluss.se](mailto:webmaster@sicklasluss.se)
