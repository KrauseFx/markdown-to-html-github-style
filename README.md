# StayInTouch

Staying in touch with close friends requires more effort when everybody lives somewhere else on the planet. Scheduling calls to catch up certainly works, but it requires time-commitment, and time zones make scheduling unnecessarily complicated.

After living in NYC for a year, I ended up doing the following: If I walk somewhere for about 30 minutes, I'd text 2 friends or family members, asking if they're available for a chat. Often one of them would end up calling me. This way, no prior planning was necessary, things felt more spontaneous and I was able to use my NYC walking time, a city in which I walk 20,000 steps a day on average.

**The problems**: 

- If I text a friend `Hey X, are you free for a call?`, chances are they're at work, asleep, with friends or don't look at their phone. They'd see my message 2 hours later and reply `Yep, sure, calling you now`. The problem here is that by that time I'm unavailable, as the message is from 2 hours ago. 
- If a friend doesn't know about this setup, they'd think I want to discuss something specific or urgent, however those kinds of calls are just to catch up and stay in touch.
- Often, either none of my friends were available, or multiple responded, so it was always a tricky balance on how many friends I'd text, with the risk of both of them replying `Yep, I'm free now`
- If one friend is never available, you kind of "forget" to text them, as you already assume subconsciously that they won't be available

**The solution**: A Telegam bot that manages the communication for me and revokes messages as soon as I'm unavailable again. 

**How does it work**:

1. You add all the Telegram contacts using `/newcontact [username]`
1. You type `/free` to mark yourself as available
1. You tell the bot how many minutes you'll be free (this number will be sent as part of the message to your friends)
  1. The bot now sends out messages to all your friends in your contact list, one message every 20 seconds
  1. The order in which the messages are sent is based on when you last had a call with them, to prefer people you haven't chatted in a while
1. As soon as your first friend hits the `/confirm` button
  1. You and your friend will be connected
  1. All other invites will be revoked, meaning if e.g. the friend was sleeping during that time, they won't even see that there ever was a message

**Why Telegram?**

- It works on every major platform, including iOS, Android and macOS
- It supports revoking of messages and notifications, even from the lock screen
- They have a solid bots API

<table>
  <tr>
    <td>
      <img src="assets/screenshot1_framed.png">
    </td>
    <td>
      <img src="assets/screenshot2_framed.png">
    </td>
    <td>
      <img src="assets/screenshot3_framed.png">
    </td>
  </tr>
</table>

### [Start using t.me/WalkWithFriendsBot](https://t.me/WalkWithFriendsBot)

## How to use it

You'll have to setup a few things

- Create a Telegram bot using @BotFather and get the API key
- Provide those values using `TELEGRAM_TOKEN`
- Host it on any server, like Heroku
- Make sure the Heroku worker is enabled

## Telegram commands

```
free - available for a call
stop - mark yourself as unavailable for a call
newcontact - [name] Add a new contact
removecontact - [name] Remove an existing contact
contacts - list all your contacts
track - manually track a call if you hung out IRL
stats - print basic stats about the bot
help - print help screen
```

## Development

### Dependencies

```
bundle install
```

```
bundle exec ruby worker.rb
```

### Environment variables

```
TELEGRAM_TOKEN
DATABASE_URL
```
