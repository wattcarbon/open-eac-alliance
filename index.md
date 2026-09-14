---
layout: default
---

{% include_relative README.md %}

{% comment %}
Every table below is built from the front matter of the pages in _pages. A
methodology is therefore published by adding one file, and its status is stated
in one place. A page with no `category` is reachable by its permalink but is not
advertised here, which is how it was before these tables were generated.

Liquid only, no plugin: GitHub Pages builds this repository with its legacy
pipeline, which runs a fixed plugin list.
{% endcomment %}
{% assign methodologies = site.pages | where_exp: "p", "p.category" | sort: "published" %}

## Methodologies

### Standard M&V Methodologies

| Methodology | External Entity | URL |
| ------------------ | ------------------ | ------------ |
{% for p in methodologies %}{% if p.category == "standard" %}| {{ p.title }} | [{{ p.entity_name }}]({{ p.entity_url }}) | [link]({{ site.baseurl }}{{ p.permalink }}) |
{% endif %}{% endfor %}

### Metered M&V Methodologies

The impact is measured from the meter or the sensors of the Asset itself, and
the Counterfactual is adjusted for the weather that occurred.

 An asterisk (\*) Represents that the methodology is within the comment period.

| Methodology | Granularity | Published Date | URL |
| ------------------ | ------------------------------------------------ | ------------  | ------------ |
{% for p in methodologies %}{% if p.category == "custom" and p.evidence != "modeled" %}| {{ p.title }} | {{ p.granularity }} | {{ p.published }}{% if p.status == "comment" %}*{% endif %} | [link]({{ site.baseurl }}{{ p.permalink }}) |
{% endif %}{% endfor %}

### Modeled M&V Methodologies

The Asset carries no meter data for the end use, so the impact is derived from
the attributes of the building and a reference load profile. A methodology here
applies where no metered methodology can.

 An asterisk (\*) Represents that the methodology is within the comment period.

| Methodology | Granularity | Published Date | URL |
| ------------------ | ------------------------------------------------ | ------------  | ------------ |
{% for p in methodologies %}{% if p.category == "custom" and p.evidence == "modeled" %}| {{ p.title }} | {{ p.granularity }} | {{ p.published }}{% if p.status == "comment" %}*{% endif %} | [link]({{ site.baseurl }}{{ p.permalink }}) |
{% endif %}{% endfor %}

### Related Methodologies

| Methodology | Published Date | URL |
| ------------------ | ------------  | ------------ |
{% for p in methodologies %}{% if p.category == "related" %}| {{ p.title }} | {{ p.published }}{% if p.status == "comment" %}*{% endif %} | [link]({{ site.baseurl }}{{ p.permalink }}) |
{% endif %}{% endfor %}

## Meeting Presentations

| Date | Topic | Format |
| ---- | ----- | ------ |
| 2026 Q3 | DERs and the Grid | [pdf]({{ site.baseurl }}/meetings/2026-Q3_DERs_and_the_Grid.pdf), [demo]({{ site.baseurl }}/meetings/2026-Q3_Putting_a_Building_on_the_Grid.html) |
| 2026 Q2 | Grid Score & Carbon Score | [slides]({{ site.baseurl }}/meetings/2026-Q2_GridScore_CarbonScore.html) |
| 2026 Q1 | DER Capacity | [pdf]({{ site.baseurl }}/meetings/2026-Q1_DER_Capacity.pdf) |
| 2025 Q4 | Load Shifting & Demand Response | [pdf]({{ site.baseurl }}/meetings/2025-Q4_LoadShifting_DemandResponse.pdf) |

{% include_relative MAINTAINERS.md %}
