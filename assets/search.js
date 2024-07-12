window.onload = function () {
    const location = window.location.href;
    const url = new URL(location);
    const search_params = new URLSearchParams(url.search);

    if (!search_params.has('q') || search_params.get('q') === "") {
        window.location.href = './';
        return;
    }

    const searchQuery = document.getElementById('search_query').innerText = search_params.get('q'); // Retrieve search_query element's inner text
    

    fetch(`https://api.unsplash.com/search/photos?per_page=25&query=${search_params.get('q')}&client_id=${API_KEY}`)
        .then(response => response.json())
        .then(data => generateCards(data.results)); // Use 'data.results' as search endpoint returns results in 'results' property
};

function generateCards(data) {
    const container = document.getElementById('result_container');
    container.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
        const single_item = data[i];
        const card = document.createElement('div');
        const anchor = document.createElement('a');
        const img = document.createElement('img');

        card.classList.add('item');
        anchor.href = `./detail.html?id=${single_item.id}`;
        card.style.backgroundColor = single_item.color;
        img.src = single_item.urls.thumb;

        anchor.appendChild(img);
        card.appendChild(anchor);
        container.appendChild(card);
    }
}

