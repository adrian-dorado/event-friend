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
            option.value = events.id;
            conferenceTag.appendChild(option)
        }
        const formTag = document.getElementById('create-presentation-form');
        console.log(formTag)
        formTag.addEventListener('submit', async event => {
            event.preventDefault();
            const formData = new FormData(formTag);
            const json = JSON.stringify(Object.fromEntries(formData));
            const confId = formData.get('conference')
            const presentationURL = `http://localhost:8000/api/conferences/${confId}/presentations/`;
            const fetchConfig = {
                method: "post",
                body: json,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const response = await fetch(presentationURL, fetchConfig);
            if (response.ok) {
                formTag.reset();
                const newPresentation = await response.json();
                console.log(newPresentation);
            }
        })
    }
})