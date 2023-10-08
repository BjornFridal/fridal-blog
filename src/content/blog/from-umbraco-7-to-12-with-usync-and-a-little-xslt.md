---
title: 'From Umbraco 7 to 12 with uSync and a little XSLT'
teaser: 'How I migrated an old Umbraco website with 500 pages, 5.000 images and 10.000 members'
pubDate: 2023-10-06
description: 'How I migrated an old Umbraco website with 500 pages, 5.000 images and 10.000 members using uSync and XSLT'
author: 'Bjørn Fridal'
image: './usync-xslt-blender.png'
imageAlt: 'uSync and the XSLT blender'
tags: ['umbraco', 'xslt', 'usync']
---

#### As the clock ticks towards the End-of-Life (EOL) for Umbraco 7, a lot of developers will be faced with the gruelling task of migrating an archaic Umbraco website. Here's how I did it.

## The Situtation

Almost 10 years ago I developed a website for a client of mine. Even though the website was regularly upgraded, once we reached the end of Umbraco version 7 there wasn't anything really pushing for that next big upgrade. However with version 7's End-of-Life approaching we knew we had to do something.

With Approximately 500 pages, 5.000 images and 10.000+ members the website clearly had too much data to migrate it by hand (aka copy/paste). Even though Umbraco supports sequential migrations (7 to 8, then 8 to 10, and 10 to 12), in my experience that usually leads to a long game of whack-a-mole problems. I would rather spin up a fresh Umbraco installation and use uSync to migrate all the content from the old to the new website. Clean and simple, right?

## The Problem

As you may have guessed, it wasn’t all that straightforward. I did manage to export all content and media from the old site, but the exported uSync files where in a different XML format than what the modern uSync on the new Umbraco website expected.

Additionally, the uSync.PeopleEdition add-on for syncing members wasn't supported on my older website, so I couldn't use it to export the members.

To be fair uSync is meant to sync content between Umbraco websites running the _same_ version. I knew that, but I thought I might have an idea of how to remedy that.

## The Solution

I wrote up a small SQL script that fetched all the members directly from the database. That gave me a large XML document with all the member data including their hashed password.

Now I had all of the data from the old website exported to disk as XML files. Even though I couldn't directly import that data using the modern uSync, it was still an important step in the right direction!

I have been working with Umbraco since version 3. Back then in the good ol' days the sun was always shining, bees would bring us honey in the office and we would write our Umbraco views using XSLT.

If you haven't heard about XSLT it's a language used to transform XML documents into other formats such as HTML or into other XML documents. I could use XSLT to transform the old uSync files into a modern day uSync file format. That was exactly what I needed!

I logged into the new Umbraco 12 website, created a few pieces of content and exported it using uSync. Those exports would serve as my reference point. As I was writing up my XSLT I would compare my result to those exported files to ensure I was on the right track.

Using the same approach I used XSLT to convert the members I had exporting from the database into a format that uSync would be happy with.

In the end I had a several thousand small XML files ready to be imported by the modern uSync. After a few trial and errors uSync was steadily chugging along, importing each file into Umbraco.

One of the things that I was most happy to see was that all of the internal references in the imported content still worked. That is, content selected with content pickers, media pickers, multinode treepickers etc. All of those references remained intact in the new website 🙌

#### Handling Legacy Property Editors

There were some bumps. Older property editors like Umbraco.Grid presented challenges with their cumbersome JSON data. Again, XSLT proved to be a big help. Newer versions of XSLT (I used [XSLT3](https://www.npmjs.com/package/xslt3)) comes with the handy json-to-xml and xml-to-json functions. Those functions allowed me to parse the JSON from Umbraco.Grid and transform into a format compatible with uSync.

I guess I was so carried away by my XSLT nostalgia that I didn't realised that uSync actually comes with a content mapper for Umbraco.Grid 🙈

## Conclusion

Migrating old Umbraco websites is hardly glamorous. Even though later versions makes it a lot easier, it's still time consuming and requires a pretty good understanding of the ins and outs of Umbraco. Having uSync to lean on made the whole process sooo much easier. There's a reason why it's constantly one of the most popular add-ons for Umbraco.

Huge thanks to Kevin Jump for building and keeping uSync to such a high standard. Check out all the <a href="https://jumoo.co.uk/uSync/" target="_blank">uSync offerings here</a>.
