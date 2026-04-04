const date = document.getElementById("date");
const time = document.getElementById("time");
const currentTime = new Date();

function formattedDateEU(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function formattedTime(time) {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

date.value = formattedDateEU(currentTime);
time.value = formattedTime(currentTime);

document.getElementById("customTimeForm").addEventListener("submit", () => {
    const dateStr = document.getElementById("date").value;
    const timeStr = document.getElementById("time").value;
    
    const dateParts = dateStr.split('/');
    const timeParts = timeStr.split(':');
    
    if (dateParts.length !== 3 || timeParts.length !== 2) {
        alert("Invalid date or time format");
        return;
    }
    
    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // JS months are 0-based
    const year = parseInt(dateParts[2]);
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    
    var alarmTime = new Date(year, month, day, hours, minutes);
    
    if (isNaN(alarmTime.getTime())) {
        alert("Invalid date or time");
        return;
    }
    
    if (alarmTime < currentTime) {
        alert("It is not possible to snooze tabs in the past");
        return;
    }
    
    browser.runtime.sendMessage({ op: "snooze", args: { time: alarmTime.getTime(), type: "custom", recurring: false } });
    window.close();
});
