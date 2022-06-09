window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/conferences/'
    const response = await fetch(url);

    if (!(response.ok)) {
        throw new Error('Response just.. wow, this is bad.')
    } else {
        const data = await response.json();
        console.log(data);

        const conferenceTag = document.getElementById('conference');
        console.log(conferenceTag)
        for (let events of data.conferences) {
            const option = document.createElement('option');
            option.innerHTML = events.name;
            option.value = events.href;
            conferenceTag.appendChild(option)
        }
        let showLoad = conferenceTag.classList.add("d none")
    }

});