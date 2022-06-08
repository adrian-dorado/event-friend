function createCard(name, description, pictureUrl, starts, ends, location) {
    return `
    <div class="d-inline-block" style="max-width: 33%;">
        <div class="d-grid gap-5">
            <div class="card shadow p-3 mb-5 bg-body rounded">
                <img src="${pictureUrl}" class="card-img-top">
                <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
                <p class="card-text placeholder-glow">${description}</p>
            </div>
            <div class="card-footer text-muted">
                ${starts} - ${ends}
            </div>
        </div>
    `;
}

window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('response is not.. okay.')
        } else {
            const data = await response.json();

            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    const title = details.conference.name;
                    const startDate = new Date(details.conference.starts).toDateString()
                    const endDate = new Date(details.conference.ends).toDateString()
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    const location = details.conference.location.name
                    const html = createCard(title, description, pictureUrl, startDate, endDate, location);
                    const column = document.querySelector('.col');
                    column.innerHTML += html;
                }
            }

        }
    } catch (e) {
        console.error('error', e)
    }

});