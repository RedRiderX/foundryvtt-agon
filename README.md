# Agon System for Foundry VTT

> Note: Still pretty unfinished, sheets look nice but custom rolls don't fully work.

`npm run start` to build css with postcss and tailwind

Todo
---
* add "Accept Sacrifice" path
* add "Challenge Leadership" path
* add "Answer the Call" path
* add "Test Their Fortune" button for Strife player

Notes
---
Goal for roll process
1. button for strife player to call contest
2. roll all gathered names
    1. search each log for ref to contest message, stop at next contest roll
3. have public chat summarizing suffers, prevails, and best?
4. have whispers to each hero with prompts to Recite Deeds

`game.messages.filter(message => message.getFlag('agon', 'relatedContest') === <id> )`

`game.messages.get(<id>)`

`message.setFlag('agon', 'relatedContest', <id>)`



Bugs
---

* boons don't trigger properly when multiple hero sheets open
