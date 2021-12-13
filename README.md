`npm run start` to build css with postcss and tailwind

---
notes
button for strife player to call contest
roll all gathered names
    search each log for ref to contest message, stop at next contest roll
have public chat summarizing suffers, prevails, and best?
have whispers to each hero with prompts to Recite Deeds

game.messages.filter(message => message.getFlag('agon', 'relatedContest') === <id> )
game.messages.get(<id>)
message.setFlag('agon', 'relatedContest', <id>)

---
Bug: boons don't trigger properly when multiple hero sheets open
