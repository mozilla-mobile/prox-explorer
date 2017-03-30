'use strict';

window.onload = () => {
  for (let provider of [eventbrite, eventful]) {
    getEvents(provider.endpoint, 1).then(response => {
      addEvents(response, provider);

      let pageCount = provider.pageCount(response);
      for (let i = 2; i <= pageCount; i++) {
        getEvents(provider.endpoint, i).then(response => addEvents(response, provider));
      }
    });
  }
};

function getEvents(endpoint, page) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'events/' + endpoint + '?lat=41.892455&long=-87.63397&radius=1&page=' + page, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
      resolve(this.response);
    };
    xhr.send();
  });
}

function addEvents(response, provider) {
  let events = provider.events(response);
  let list = document.getElementById('nav');
  for (let event of events) {
    event = provider.wrap(event);
    let a = document.createElement('a');
    a.textContent = event.name;
    a.href = 'javascript:void(0);';
    a.onclick = () => loadEvent(event.data);
    let li = document.createElement('li');
    li.appendChild(a);
    list.appendChild(li);
  }

  Array.from(list.children)
    .sort((a, b) => a.textContent < b.textContent)
    .reduce((prev, el) => list.insertBefore(el, prev));
}

function loadEvent(event) {
  console.log(event);

  // Clear existing data.
  let data = document.getElementById('data');
  while (data.hasChildNodes()) {
    data.removeChild(data.lastChild);
  }

  for (let field in event) {
    let row = document.createElement('tr');
    let label = document.createElement('td');
    label.textContent = field;
    row.appendChild(label);
    let value = document.createElement('td');
    value.textContent = event[field];

    row.appendChild(value);
    data.appendChild(row);
  }
}

let eventbrite = {
  endpoint: 'eventbrite',
  events: response => {
    let events = response.events;
    if (!events) throw reponse;
    return events;
  },
  wrap: event => {
    event.name = event.name && event.name.text;
    event.description = event.description && event.description.text;
    event.start = event.start && event.start.local;
    event.end = event.end && event.end.local;
    return {
      name: event.name,
      data: event,
    };
  },
  pageCount: response => response.pagination.page_count,
};

let eventful = {
  endpoint: 'eventful',
  events: response => {
    let events = response.events && response.events.event;
    if (!events) throw reponse;
    return events;
  },
  wrap: event => {
    event.categories = event.categories.category.map(el => el.name.replace('&amp;', '&')).join(', ');
    return {
      name: event.title,
      data: event,
    };
  },
  pageCount: response => response.page_count,
};
