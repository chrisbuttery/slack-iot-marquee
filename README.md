# slack-iot-marquee

Scripts for node api + particle IOT device

> Use Slack slash commands to send tect to a scrolling marquee!

![alt tag](https://github.com/chrisbuttery/slack-iot-marquee/blob/master/marquee.gif)

# now

This example project uses [now](https://zeit.co/now "Now — Global Serverless Deployments") to host the nodeJS api.  

You do not need to use **now**, but I have included the `now.json` manifest if you wish to do so.  
The manifest exposes the 2 available routes of the api (`/hr` and `/display`), and also references the same *secret* variable values as listed in the following `.env` file.

# .env

Keep your secrets safe!  
This example references environment variables, so if you wish to use this api locally, you shoudl created an `.env` file and include your secret credentials.

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

Once enabled, create teh following integrations:

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
curl -X POST \
  https://path_to_your_server/api/hr \
  -H 'Accept: */*' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -d '{ "text": "Pete", "token": "vUffGYMsJtrLYx5K9O52DSjM" }'
```

curl -X POST \
  https://slack-iot-marquee.chrisbuttery.now.sh/api/hr \
  -H 'Accept: */*' \
  -H 'Cache-Control: no-cache' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -H 'Host: slack-iot-marquee.chrisbuttery.now.sh' \
  -H 'Postman-Token: fcabec8f-ac4d-43bb-bf76-53d9ef501e95,ac702526-96a8-4bed-ba64-b6cfe26f9321' \
  -H 'User-Agent: PostmanRuntime/7.13.0' \
  -H 'accept-encoding: gzip, deflate' \
  -H 'cache-control: no-cache' \
  -H 'content-length: 55' \
  -d '{ "text": "Pete", "token": "vUffGYMsJtrLYx5K9O52DSjM" }'

  # Device

Here is a schematic for the [Particle.io Photon](https://store.particle.io/products/photon) I used for this demo.

