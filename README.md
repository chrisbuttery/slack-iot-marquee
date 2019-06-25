# slack-iot-marquee

Scripts for node api + particle IOT device

> Use Slack slash commands to send text to a scrolling marquee!

Project: [https://www.hackster.io/buttahz/slack-iot-marquee-459399](https://www.hackster.io/buttahz/slack-iot-marquee-459399)

![alt tag](https://github.com/chrisbuttery/slack-iot-marquee/blob/master/marquee.png)

This example using a Particle.io [Photon](https://store.particle.io/collections/wifi), however the [Argon or Boron](https://store.particle.io/collections/cellular) will work fine as well.

# now

This example project uses [now](https://zeit.co/now "Now — Global Serverless Deployments") to host the nodeJS api.  

You do not need to use **now**, but I have included the `now.json` manifest if you wish to do so.  
The manifest exposes the 2 available routes of the api (`/hr` and `/display`), and also references the same *secret* variable values as listed in the following `.env` file.

# .env

Keep your secrets safe!  
This example references environment variables, so if you wish to use this api locally, you should create an `.env` file and include your secret credentials.

The Slack slash commands are each assigned an `id` which is passed along in the payload. For some added security, our api checks if we have the correct `HRKEY` and `DISPLAYKEY` values.

```
PDEVICE=particle_device_id
PUSER=particle_user
PPASS=particle_password
HRKEY=slack_hr_slash_command_id
DISPLAYKEY=slack_display_slash_command_id
```

# Slack
If you wish to recreate this project, you'll need a [Slack](https://slack.com) app. 

Once created, you will need to allow the slash command integrations. `Administrations > Manage apps > custom-integrations`.

Once enabled, create the following integrations:

```
Command: /hr
URL: path_to_your_server/api/hr
Token: Take note of this value and store it in your .env file
```

```
Command: /display
URL: path_to_your_server/api/display
Token: Take note of this value and store it in your .env file
```

Once created, you should be able to use the slash commands like so:

```
/hr Pete

Pete is required by HR.

/display Where are we going for lunch today?

Now displaying: Where are we going for lunch today?
```

### You do not have to use Slack

You can get away with just using an app like [Postman](https://www.getpostman.com/) or cURL.

You will just need to make sure the body contains `text` and the correct slash command `token`.

```
curl -d '{ "text": "Pete", "token": "your_slash_command_token" }' -H "Content-Type: application/json" -X POST https://path_to_your_server/api/hr

Pete is required by HR.%
```
