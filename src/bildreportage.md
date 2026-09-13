---
layout: base.njk
title: Bildreportage
description: Bildreportage från Sicklaslussen – album läggs upp fortlöpande
---

<h1>Sicklaslussen bildreportage</h1>

<p>Här samlas bildreportage från slussdagar, vårmönstringar, medlemsresor och annat som händer kring Sicklaslussen. Flikarna under byggs ut allteftersom – nya album publiceras fortlöpande.</p>

{% if collections.albums | length > 0 %}
<ul class="news-list">
{% for album in collections.albums | reverse %}
  <li>
    <h2 class="news-title"><a href="{{ album.url }}">{{ album.data.title }}</a></h2>
    <p><span class="newsdate">{{ album.date | shortDate }}</span></p>
  </li>
{% endfor %}
</ul>
{% else %}
<p><em>Äldre album från den tidigare webbplatsen flyttas hit successivt. Vill du vara med och publicera bilder – hör av dig till <a href="mailto:webmaster@sicklasluss.se">webmaster@sicklasluss.se</a>.</em></p>
{% endif %}

<hr class="rule">

<h2>Tidigare album (förs över successivt)</h2>

<ul class="articles">
  <li>2024-06-15 Exklusiv försommarkryssning M/Y Independance</li>
  <li>2023-08-27 Sicklaslussens dag 2023</li>
  <li>2023-06-10 Vårmönstring</li>
  <li>2022-08-14 Slussåret 2022</li>
  <li>2021-08-12 Slussdag och Boccia</li>
  <li>2020-08-09 Sickla Slussdag 2020</li>
  <li>2020-07-14 SLUSSFROSSA: Surahammars dubbelsluss, Strömsholms kanal</li>
  <li>2019-12-04 Sicklagruvan</li>
  <li>2019-09-28 Ran medlemsresa till Museet Hamn</li>
  <li>2019-08-25 Sickla Slussdag 2019</li>
  <li>2019-06-10 Traditionsenlig vårmönstring</li>
  <li>2018-08-26 M/Y Loris vid Sicklaslussens dag</li>
  <li>2018-08-12 KANALFROSSA: Strömma Kanal</li>
  <li>2018-08-12 Nordic island adventure race</li>
  <li>2018-06-09 Vårmönstring i Järlasjön</li>
  <li>2018-05-26 Kyrkviken</li>
  <li>2017-09-02 SLUSSFROSSA: Medlemsresa Åkers Kanal</li>
  <li>2017-08-20 Sickla Slussdag 2017</li>
  <li>2017-08-02 Städdag</li>
  <li>2016-08-20 Sickla Slussdag 2016</li>
  <li>2016-06-04 Vårmönstring 2016</li>
  <li>2015-08-22 Sickla Slussdag</li>
  <li>2015-05-09 SLUSSFROSSA: Basingstoke Canal, England</li>
  <li>2015-03-28 SLUSSFROSSA: River Wey, England</li>
  <li>2014-09-21 Medlemsresa – tre slussar plus en</li>
  <li>2014-08-23 Sickla Slussdag</li>
  <li>2014-06-08 Vårmönstring</li>
  <li>2013-08-31 Slussåret 2013</li>
  <li>2013-08-21 Städdag</li>
  <li>2013-04-30 Valborg vid Sickla Strand</li>
  <li>2013-04-27 Bäver vid Sicklaslussen</li>
  <li>2012-08-25 Sickla Slussdag</li>
  <li>2010-08-29 Medlemsresa Hjälmare kanal</li>
  <li>2010-08-21 Slussdag</li>
  <li>2009-05-09 Utbildning av Slussfunktionärer</li>
  <li>2007-08-18 Sickla Slussdag</li>
  <li>2007-02-10 Slussreparation och Vinterdag</li>
  <li>2006-08-19 Sickla Slussdag</li>
  <li>2005-08-20 Sickla Slussdag</li>
  <li>2005-05-07 Säsongsinvigning</li>
  <li>2004-08-21 Sickla Slussdag</li>
  <li>2003-08-24 Sickla Slussdag</li>
  <li>2003-05-11 Nyinvigning av Sickla slussar</li>
  <li>2000–2002 Slussens ombyggnad</li>
  <li>1900–1950 Vykort</li>
  <li>1817 Karta över Belägenheten omkring Stockholm</li>
  <li>1774 Karta över Sicklaön</li>
  <li>1750 Karta över Stockholm</li>
  <li>1642 Hela Staden</li>
</ul>