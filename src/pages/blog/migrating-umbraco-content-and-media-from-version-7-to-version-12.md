---
layout: '../../layouts/BlogPostLayout.astro'
title: 'From Umbraco 7 to 12 with uSync in two days'
teaser: 'How I migrated an Umbraco website with over 10k members in two days'
pubDate: 2023-09-15
description: 'This is the first post of my new Astro blog.'
author: 'Bjørn Fridal'
image:
  url: 'https://docs.astro.build/assets/full-logo-light.png'
  alt: 'The full Astro logo.'
tags: ['umbraco', 'content', 'usync']
---

#### As the clock ticks towards the End-of-Life (EOL) for Umbraco 7, a lot of developers will be faced with the gruelling task of migrating an ancient website. After spending days navigating such a migration, I'm here to share the lessons I've learned.

<!--
![](../../assets/migrating-umbraco-content-with-usync.png)
<p class="text-rose-200 text-center text-sm font-bold">The TLDR; Migration Diagram</p>
-->

## Setting the Scene

To help you relate, here's a snapshot of the website I have been migrating for the last week. The website is a catalog of food videos and recipes. Some of the recipes are free, but the majority of them are behind a paywall. If you want access to the full recipe catalog you have to become a paying member.

A bit on the technical side:

- Approximately 500 pages, 5.000 images and 10.000+ members.
- Single language website (no dictionary etc).
- Several custom forms (no Umbraco Forms).
- Several custom property editors and custom dashboards.
- Several API integrations specific to the project.

And a small note: I developed this website from scratch and have managed it for the past seven years, so I'm intimately familiar with its intricacies.

### uSync to the Rescue?

Though Umbraco supports sequential migrations (7 to 8, then 8 to 10, and 10 to 12), I wasn't keen on this multi-step process. Instead, I hinged my hopes on uSync to directly export content, media, and members from version 7 and import them into version 12. Simple, right?

### The Hurdle

As you may have guessed, it wasn’t that straightforward. While I managed to export content and media using uSync from the old site, there were compatibility issues with the formats for the new version. The files exported from the old website were in a different XML format than what the new website expected.

This is expected: different uSync versions are designed for their respective Umbraco versions, and they aren’t always cross-compatible.

Additionally, the uSync.PeopleEdition add-on for syncing members wasn't supported on my older website, so I couldn't use it to export the members.

### The Solution - An Old Friend

Even though I couldn't directly export and import my data using uSync I had still managed to export all of the content and media to disk which was a huge step in the right direction!

I wrote up a small SQL script that would get all of the members with some additional data. Using Azure Data Studio I was able to select all of the members and export them as an XML file.

Now I had all of the data from the old website exported to disk as XML files. It wasn't in a format the uSync could parse, but I thought I has an idea of how to remedy that.

I have been working with Umbraco since version 3. Back then in the good ol' days the sun was always shining, we would get our milk directly from the cows and we would write our Umbraco views using XSLT.

If you haven't heard about XSLT it's a language used to transform XML documents into other formats such as HTML or into other XML documents. That was exactly what I needed!

I created a few pieces of content on the new Umbraco 12 website and exported that content using uSync. Those exports would serve as my reference point, so I knew that the XSLT I was writing would convert the old uSync files into a format the new uSync would be able to work with.

Again using XSLT I also converted the members I had exporting from the database into a format that uSync would be happy with.

### Wrangling Legacy Property Editors

One of the things that I was most happy to see was that all of the internal references in the imported content still worked. That is, content selected with content pickers, media pickers, multinode treepickers etc. All of those references remained intact in the new website.

However, there were some bumps. Older property editors like Umbraco.Grid presented challenges with their cumbersome JSON data. Again, XSLT proved to be a big help. Newer versions of XSLT comes with the handy json-to-xml and xml-to-json functions. Those functions allowed me to parse JSON and transform into a format compatible with uSync.

:::note
Huge shout out to uSync
:::
