let express = require('express');
let app = express();
let request = require('request');

let eventbriteOAuth = process.env.EVENTBRITE_OAUTH;

app.use(express.static('public'));

app.get('/events/eventbrite', (eventRequest, eventResponse) => {
  let params = {
    'location.latitude': eventRequest.query['lat'],
    'location.longitude': eventRequest.query['long'],
    'location.within': eventRequest.query['radius'] + 'km',
    'start_date.keyword': 'next_week',
    'page': eventRequest.query['page'],
  };
  let query = Object.entries(params).map(val => val.join('=')).join('&');
  console.log(query);
  let options = {
    url: 'https://www.eventbriteapi.com/v3/events/search/?' + query,
    headers: {
      'Authorization': 'Bearer ' + eventbriteOAuth,
    },
  };

  request.get(options, (err, res, body) => {
    if (err) {
      eventResponse.send(err);
      return;
    }

    console.log(body || res);
    eventResponse.send(body || res);
  });
});

let port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`listening on *:${port}`);
  console.log(`running locally? try http://127.0.0.1:${port}`);
});
