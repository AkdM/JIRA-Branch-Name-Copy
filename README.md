# JIRA Branch Name Copy

A tiny userscript that adds a handy button on your JIRA tickets to copy a properly formatted Git branch name — no more manual typing!

## ✨ Features

- Adds a `📋 Copy branch name` button directly to the ticket view
- Auto-generates branch names using the ticket ID and kebab-cased title:
  - Bugs ➜ `fix/TICKET-ID-title-of-the-ticket`
  - Features ➜ `feature/TICKET-ID-title-of-the-ticket`
- Hold `ALT` to copy the full Git command:  
  `git checkout -b fix/TICKET-ID-title-of-the-ticket`

## 📦 How to install

1. Install a userscript manager ([check here](#-browser-extensions))
2. [Click here to copy the script](https://raw.githubusercontent.com/AkdM/JIRA-Branch-Name-Copy/refs/heads/main/jira-git-branch-copy.user.js)
3. Create a new userscript, paste it, make sure it matches your JIRA domain (`@match` in the header of the script) and is enabled

## 🚀 How to use

1. Open any JIRA ticket
2. Click the `📋 Copy branch name` button added near the title
3. Paste in your terminal or Git client


> [!TIP]
> 💡 Hold `ALT` while clicking to copy the full `git checkout -b ...` command


## 🧩 Browser extensions

- Chromium-based (Chrome, Chromium, Edge, etc), Firefox: [ViolentMonkey](https://violentmonkey.github.io)
- Safari: [UserScripts](https://apps.apple.com/en/app/userscripts/id1463298887)

## 📜 Changelog

### [1.1.0]
- Ability to use ALT+click at the same time to prepend `git checkout -b`
 
### [1.0.0]
- Initial release 🎉
