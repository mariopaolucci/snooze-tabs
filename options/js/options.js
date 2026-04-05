document.getElementById("laterHoursHelpBtn").addEventListener("click", (e) => {
    var modal = document.getElementById("laterHoursModal");
    modal.style.display="block"
})

document.getElementById("closelaterHoursModal").addEventListener("click", (e) => {
    var modal = document.getElementById("laterHoursModal");
    modal.style.display="none";
})


document.getElementById("timeOfDayHelpBtn").addEventListener("click", (e) => {
    var modal = document.getElementById("timeOfDayModal");
    modal.style.display="block"
})

document.getElementById("closetimeOfDayModal").addEventListener("click", (e) => {
    var modal = document.getElementById("timeOfDayModal");
    modal.style.display="none";
})


document.getElementById("laterHours").addEventListener("change", (e) => { 
    browser.runtime.sendMessage({ op: 'setPreferences', args: { hours: parseInt(e.target.value) } });
})

document.getElementById("timeOfDay").addEventListener("change", (e) => { 
    var split = e.target.value.split(":");
    browser.runtime.sendMessage({ op: 'setPreferences', args: { TimeOfDay: { hours: parseInt(split[0]), minutes: parseInt(split[1]) } } });
})


browser.runtime.sendMessage({op: "getPreferences"}).then((preferenceStore) => {
    const preferences = preferenceStore.preferences;
    var hours = (preferences.TimeOfDay.hours < 10) ? ("0" + preferences.TimeOfDay.hours.toString()) : preferences.TimeOfDay.hours.toString();
    var minutes = (preferences.TimeOfDay.minutes < 10) ? ("0" + preferences.TimeOfDay.minutes.toString()) : preferences.TimeOfDay.minutes.toString();
    document.getElementById("laterHours").setAttribute("value", preferences.hours);
    document.getElementById("timeOfDay").setAttribute("value", `${hours}:${minutes}`);
  });

document.getElementById("exportAlarms").addEventListener("click", async () => {
  const result = await browser.storage.local.get("alarms");
  const alarms = result.alarms || [];
  const dataStr = JSON.stringify(alarms, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'snoozed-tabs.json';
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById("importButton").addEventListener("click", () => {
  const fileInput = document.getElementById("importAlarms");
  const file = fileInput.files[0];
  if (!file) {
    alert("Please select a file to import.");
    return;
  }
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const importedAlarms = JSON.parse(e.target.result);
      if (!Array.isArray(importedAlarms)) {
        throw new Error("Invalid file format. Expected an array of alarms.");
      }
      // Basic validation: check if objects have required fields
      for (const alarm of importedAlarms) {
        if (!alarm.url || !alarm.delay) {
          throw new Error("Invalid alarm data. Missing url or delay.");
        }
      }
      await browser.storage.local.set({ alarms: importedAlarms });
      browser.runtime.sendMessage({ op: "recreateAlarms" });
      alert("Snoozed tabs imported successfully!");
      fileInput.value = ''; // Clear the file input
    } catch (err) {
      alert("Import failed: " + err.message);
    }
  };
  reader.readAsText(file);
});

