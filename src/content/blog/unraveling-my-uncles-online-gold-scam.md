---
title: "Unraveling My Uncle's Online Gold Scam"
preTitle: 'Beware the Glitter'
pubDate: 2023-11-18
description: 'My encounter with online scammers and my attempt to hack their website.'
teaser: 'My encounter with online scammers and my attempt to hack their website.'
author: 'Bjørn Fridal'
image: './files/gold-bar.jpg'
imageAlt: 'Fake gold bar'
ogImage: './files/gold-bar.jpg'
tags: ['developer']
---

#### Online scamming is a serious problem with real victims. The victims stand to loose money, struggle with shame and may become isolated from their relatives in the process. I hope that my story may present some ideas on how to expose the scam and help the victim.


## Forword
The medias is overflowing with stories of people getting scammed. Romance scams, investment scams, charity scams, sextortion and the list goes on. As a tech savvy person it is often easy to spot the difference between a genuine email from the bank and a fake phising email from a scammer. However even people in the IT industry can fall victim to scammers. It's no suprise then that individuals without a solid understanding of the internet are easier mislead and become more susceptible to online scams.

I have changed certain details in the story to protect the identities of those involved.

## The Victim
A close relative of mine, lets say my uncle, had over the past year made a few remarks about some "secret investments" he was making. At first he was very withholding as to the nature of these investments, but after pressing him on the matter, my fears were confirmed.

He had met a young woman online. They had never met in real life, but they had quickly struck up a romantic relationship. Only the young woman was in a dirre situation. She had a substantial inheritance in gold awaiting, but she couldn't access the gold before she paid a "retrival fee" of several thousand dollars. To my horror, my uncle had paid the fee, only to find out, that other larger fees now had to be paid.

By this point all of your spider senses should be going off by now! It has all of the trademarks of a romance scam written all over it. In fact I was surprised by how unoriginal the story was. Wouldn't the scammers have more luck if they came up with a few new ideas?

However, the story didn't matter so much as my uncles situation did. He is elderly, without a spouse, with too much time on his hands and with retirement money in the bank. He is the perfect target. Even though he is sceptical by nature, over the months the scammers lured him slowly into their world. An exciting world where a young woman needed his help, where gold had to be smuggled out of African countries, corrupt policemen had to be bribed, and a myriad of other struggles had to be overcome. 

From the outside, it sounded like a cheap crime novel with my uncle as the unlikely protagonist, unwittingly entangled in a web of intrigue and romance.

## Our Failed Attempts at Reasoning
As you may imagine, once my uncle's story spread throughout the family, many concerned relatives reached out to him. To my surprise, all attempts to get through to him were in vain. He simply laughed at our warnings. When we pointed out the fallacies in the scammers' stories, he would just reply with 'you don't understand'. I came to realize that the scammers had instilled in him a distrust of his own family, effectively isolating him from our concern and advice.

## With Great Risk Comes Great Reward
Months had passed since I first learned about my uncles investments. I was afraid to push him further away if I kept insisting that he was a victim of a scam, but sitting idle on the sideline while he was being conned didn't sit well with me. One day a text from my uncle popped in: "With great risk comes great reward :)" and accompanying the text was a screendump of a bank balance with a very impression number.

Finally, I thought! This was the opportunity I had been looking for. If I could get access to something the scammers had created, then I might be able to prove it's fraudulent and use it against them. I kindly asked my uncle if he would send me the bank's website address. He did and it was everything I had hoped it would be!

### 1. The fake looking banking website
The banking website was absurdly poor built. It used a cheap WordPress theme and several of the pages still had the original "Lorem ipsum..." text that the theme came with! The bank's logo, name and color scheme had been ripped from a real bank in the UK. Piggy bagging off of a real bank was a smart move, but to a developer the website looked every bit as fake as it was.

### 2. The clue in the SSL certificate
I looked up the registrar of the domain, but all contact details where hidden. However the website had a Let's Encrypt SSL certificate, though it's Common Name (CN) was issued to a Nigerian Hotel. Strange for a bank located in the UK, but lucky for me. With the name of the Nigerian Hotel I was able to find another fake website using the same WordPress theme, but this time fitted for a hotel. I never did figure out what scam the hotel website had been used for, but when I looked up the domain registrar I hit jackpot! The registrars name and email address stood there in plain text!

### 3. The amateur web developer
With the name and email address of the domain registrar I was able to find a string of expired domains the registrar had previously owner. 113 domains to be exact! Many of the domains sounded like banking websites, exchange websites or investments websites. It was all to easy to imagine how they could have been used for scams similar to my uncles.

I used [Reverse Contact](https://www.reversecontact.com/) to search for the registrar and came up with a LinkedIn and Facebook profile belonging to a Nigerian software developer. I also found the software developer's name in some picture's exif data. It seem very likely that this is indeed the person behind the websites, but I suspect that he is just a single piece of a bigger operation.

### 4. The fake and the real gold trader
My internet detective skills had brought up some solid findings, but I wasn't prepared to present it to my uncle yet. He had recently told me about a gold trader who overlooked the sale of my uncles gold investments. This time I asked my uncle for the name, email and website of the gold trader. This time the person and the website seemed genuine authentic. There was a registered gold trader with that name in the country mentioned on the website. However the email address my uncle has was a GMail address. Definitely something I had to look into.

I sent a message to the official email address displayed on the website. I explained the situation without given away any sensitive details. Honestly I thought that my message might end up in a spam folder, if I used words like Nigerian and Scam and I had already planned on calling up the trader the next day.

To my surprise the real gold trader replied within a day. This was not the first time someone misused his name to commit fraud in far-away countries. The trader was very polite, but obviously also obset and angy.

### 5. The Developer Turned Hacker
By now I had a good pile of indications and evidence. At the same time I was sure that the fake banking website contained more information. Like any other web developer would have, I attempted to guess the login to the WordPress administration. That didn't work and my IP address was banned for an hour. Now, I don't dislike WordPress per se, but the CMS does carry around some legacy code.

I wondered if I could extract a username from the website. After some Googling I saw that the WordPress REST API appearently let's anybody fetch the WP users. Really? I pointed my browser at:

~~~
https://fakebank.com/wp-json/wp/v2/users
~~~

And it instantly returned the following:

~~~json
[
   {
      "id":2,
      "link":"https://fakebank.com/author/nimda/",
      "slug":"nimda",
      ...
   }
]
~~~

Okay, so it looks like WordPress just gave me the administrator username - `nimda` is `admin` spelled backwards! If the username is that weak could the password perhaps be just as weak? Or even worse, could the password be the same as the username? The answer is **YES**!

_I realize that this may be a bit controversial and that some readers will feel that I have overstepped my mark here. My justification is that the potential to prevent an ongoing scam outweighs the breach of digital etiquette. I am not endorsing hacking, I am using my technical knowledge in a responsible way to fight back against a harmful deception._

Logging into the administration of the fake banking website gave me access to everything the scammers had access to on the website. It was plain to see that the sole purpose of this website was to defraud my uncle and only him. Whenever my uncle had "traded" gold someone would manually log into the WordPress administration and update his "bank deposit" and "bank statement".

I made other observations as to how the website operates, but I won't go into too many details here to avoid making it obvious to the wrong people.

I made sure not to change anything on the website or leave obvious clues to me logging in. Instead I took screendumps of all of my findings. This, I hoped, would be the final nail in the coffin!

**Sidenote** If you are running a WordPress website I recommend disabling the REST API or only allowing the necessary endpoints to stay open.

## Presenting the evidence to my uncle
Armed with all the screendumps and my correspondace with the real gold trader, I went to see my uncle. We had a long talk. We went back and forth over the details. I did my utmost to make my technical findings meaingful to him. After an hour I felt that the tides were changing and that my points were finally hitting home with him. Still, I was trying to undo fancyful stories and lies told to him over an entire year! He had been in contact with the scammers throughout most of the days. Even while he were talking messages kept beeping in on his phone. Needless to say, it was a lot to take in and to accept.

## What happens after the lie is exposed?
Even as I was gathering evidence against the scammers I was at the same time fearful of what might happen if I managed to convice my uncle of the scam. I would be taking something away from an elderly man. The people he talked the most to these days where the scammers, not his family. Almost everything exciting in his life came from the stories they told him. Not even to mention the romance and money that would be his ever so soon.

Honestly this was the hardest part and still is. Before I even went to see my uncle I had talked to several relatives and informed that of what I was doing. I wanted to let them know that my uncle could use our support now more than ever. We didn't think less of him because he had lost a lot of money on his "investments". Those investments he had bragged about months earlier. It didn't matter that he had isolated himself, his place was still right here with his family.