window.addEventListener('DOMContentLoaded', async () => {
    const conferenceTag = document.getElementById('conference');
    const loadingIcon = document.getElementById('loading-conference-spinner')
    const successMessage = document.getElementById('success-message')
    const url = 'http://localhost:8000/api/conferences/'
    const response = await fetch(url);

    if (!(response.ok)) {
        throw new Error('Response just.. wow, this is bad.')
    } else {
        const data = await response.json();
        console.log(data);

        console.log(conferenceTag)
        for (let events of data.conferences) {
            const option = document.createElement('option');
            option.innerHTML = events.name;
            option.value = events.href;
            conferenceTag.appendChild(option)
        }
        const formTag = document.getElementById('create-attendee-form')
        formTag.addEventListener('submit', async event => {
            event.preventDefault();
            const formData = new FormData(formTag);
            const json = JSON.stringify(Object.fromEntries(formData));
            const attendConferenceURL = 'http://localhost:8001/api/attendees/';
            const fetchConfig = {
                method: 'post',
                body: json,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(attendConferenceURL, fetchConfig);
            if (response.ok) {
                formTag.classList.add("d-none")
                formTag.reset();
                const newAttendee = await response.json();
                console.log(newAttendee);
                successMessage.classList.remove("d-none")
            }   
        })
        loadingIcon.classList.add("d-none")
        conferenceTag.classList.remove("d-none")
    }
});