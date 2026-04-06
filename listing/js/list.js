function clearAlarm(e) {
  var child = e.target;
  browser.runtime.sendMessage({ op: "clearAlarm", args: e.target.value })
  window.location.reload();

}

function listAlarms(alarms) {
  var list = document.getElementById('list');
  if (!list) {
    return;
  }

  list.textContent = '';
  if (!Array.isArray(alarms) || alarms.length === 0) {
    list.textContent = 'No snoozed tabs found.';
    return;
  }

  var template = document.getElementById("alarm-card");
  if (!template) {
    list.textContent = 'Unable to load the alarm template.';
    return;
  }

  var validAlarms = alarms.filter(function (alarm) {
    return alarm && typeof alarm.url === 'string' && alarm.url.trim().length > 0;
  });

  if (validAlarms.length === 0) {
    list.textContent = 'No valid snoozed tabs found.';
    return;
  }

  validAlarms.forEach(function (alarm) {
    try {
      new URL(alarm.url);
    } catch (err) {
      return;
    }

    var clone = document.importNode(template.content, true);
    var url = clone.querySelector("#url");
    var domainText = clone.querySelector("#domainText");
    var datetime = clone.querySelector("#datetime");
    var deleteButton = clone.querySelector("#deleteButton");

    if (!url || !domainText || !datetime || !deleteButton) {
      return;
    }

    var uri = new URL(alarm.url);
    domainText.textContent = uri.origin;
    url.setAttribute("href", alarm.url);

    var time = Number(alarm.delay);
    var date = new Date(Number.isFinite(time) ? time : alarm.delay);
    datetime.textContent = !isNaN(date.getTime()) ? formattedDate(date) : 'Unknown time';

    deleteButton.setAttribute("value", alarm.url);
    list.appendChild(clone);
  });

  var buttons = document.getElementsByClassName("danger-button");
  for (var index = 0; index < buttons.length; index++) {
    var element = buttons[index];
    element.addEventListener("click", clearAlarm);
  }
}

function formattedDate(time) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour12: true };
  return time.toLocaleTimeString(navigator.language, options);
}

function loadAlarms() {
  removeIrrelevantButtons();
  browser.storage.local.get({ alarms: [] }).then(function (items) {
    listAlarms(items.alarms || []);
  });
}

document.addEventListener('DOMContentLoaded', loadAlarms);

document.getElementById("refreshButton").addEventListener("click", function () {
  window.location.reload();
});

document.getElementById("goBackButton").addEventListener("click", function () {
  window.location.href = browser.runtime.getURL("/popup/index.html");;
});

function removeIrrelevantButtons() {
  if(/sidebar/.test(window.location.search)){
    document.getElementById("goBackButton").remove();
  }
  else if(/popup/.test(window.location.search)){
    document.getElementById("refreshButton").remove();
  }
}