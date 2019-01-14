# ngrok slack command testing

This repository contains a skeleton server set up to be used with ngrok
to gateway Slack slash commands back to a local server. This code is based
on the code at https://api.slack.com/tutorials/tunneling-with-ngrok.

To use it as a base for developing a Slack slash command:

 - Follow the instructions to install `ngrok`. Mac users can `brew cask install ngrok`.
 - Run `ngrok` and note the https: forwarding URL.
 - Go to https://api.slack.com/apps
 - Click on Create new App on the top-right hand-side.
 - Set the command to `/ngrok`
 - Set the request URL to the forwarding url + `/command`.
 - Add a description, whatever you like.
 - Scroll down to the `Create App` button and click it.
 - Click on `Slash Commands > Create New Command` in the left menu.
 - Set the command to `/ngrok`.
 - Set the request URL to the forwarding URL + `/command`.
 - Add the description again.
 - Click on `Basic Info` in the left column and copy the Client ID.
 - `export CLIENT_ID=`_your client id_.
 - `export CLIENT_SECRET=`_your client secret_.
 - `yarn install`
 - `node run index.js`
 - Go to `https://api.slack.com/docs/slack-button`.
 - Scroll down to `Add the Slack Button`.
 - Select the app in the pulldown menu.
 - Check the `commands` checkbox.
 - Click the `Add to Slack` button. You should see a screen something like this:

 ```
 "{\"ok\":true,\"access_token\":\"xoxp-XXXXXXXXXXX-XXXXXXXXXXX-XXXXXXXXXXXX-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"scope\":\"identify,commands\",\"user_id\":\"UUUUUUUUU\",\"team_name\":\"tttttt\",\"team_id\":\"TTTTTTTTT\"}"
 ```

 You can now go to any channel in your Slack and enter the `/ngrok` command and see its output:

![Slack output example](https://a.slack-edge.com/1877/img/api/articles/ngrok-ending-well.png "Slack output example")


You can now modify `index.js` to create your slash command.
