// ==UserScript==
// @name         JIRA Git Branch Copy
// @namespace    https://damota.me
// @version      1.1
// @description  JIRA branch name button
// @author       Anthony Da Mota
// @match        https://put your domain here/browse/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=atlassian.com
// @grant        none
// ==/UserScript==

(function () {
  function waitForElm(selector) {
    return new Promise(resolve => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
        if (document.querySelector(selector)) {
          observer.disconnect();
          resolve(document.querySelector(selector));
        }
      });

      // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }

  const kebabize = str => {
    return str.replace(/\W+/g, '-').toLowerCase();
  }

  waitForElm('.aui-toolbar2-secondary').then((toolbar) => {
    // Create the button
    const button = document.createElement('a')
    const body = document.querySelector('body')
    button.id = 'jira-branchname-trigger'
    button.role = 'button'
    button.className = 'aui-button toolbar-trigger viewissue-share'
    button.href = '#'
    button.setAttribute('aria-describedby', 'aui-tooltip')
    button.innerHTML = '<span class="icon aui-icon aui-icon-small aui-iconfont-copy"></span> <span class="trigger-label">Copy Branch name</span><p class="assistive">Copy branch name</p>'
    toolbar.appendChild(button)

    // Copy the branchname to clipboard
    button.addEventListener('click', async (event) => {
      event.stopPropagation()
      event.preventDefault()

      // get the ticket id
      const ticketId = document.querySelector('#key-val').textContent.trim()

      // get the ticket name
      const ticketName = kebabize(document.querySelector('#summary-val').textContent.trim())

      // get the ticket prefix from the #type-val.textContent, if the text inside is:
      // `Bug` => `fix`
      // other => `feature`
      const ticketType = document.querySelector('#type-val').textContent.trim()
      let ticketPrefix = 'feature'
      if (ticketType.toLowerCase() === 'bug') ticketPrefix = 'fix'

      // create the branchname
      const branchName = `${ticketPrefix}/${ticketId}-${ticketName}`
      // When the user holds the ALT button at the same time, it prepends the `git checkout -b` command
      const stringToCopy = event.altKey ? `git checkout -b ${branchName}` : branchName

      // Copy the branchname to clipboard
      await navigator.clipboard.writeText(stringToCopy)

      // Add a notification that the branchname has been copied
      const notification = document.createElement('div')
      notification.className = 'aui-message aui-message-success'
      notification.innerHTML = `<p class="title">Branch name copied</p><p>${stringToCopy}</p>`
      notification.style.position = 'absolute'
      notification.style.top = '60px'
      notification.style.right = '20px'
      notification.style.zIndex = '9999'
      notification.style.backgroundColor = '#fff'
      notification.style.border = '1px solid #ccc'
      notification.style.padding = '10px'
      notification.style.borderRadius = '5px'
      notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)'
      // add margin left to the title
      notification.querySelector('.title').style.paddingLeft = '30px'
      notification.querySelector('.title').style.paddingTop = '5px'
      body.appendChild(notification)
      setTimeout(() => {
        notification.remove()
      }, 3000)
    })
  })
})();
