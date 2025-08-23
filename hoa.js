document.addEventListener('DOMContentLoaded', () => {
    const entriesContainer = document.getElementById('entries');
    
    fetch('data.json')
        .then(handleResponse)
        .then(processData)
        .catch(handleError);
    
    function handleResponse(response) {
        if (!response.ok) {
            throw new Error(`error, status: ${response.status}`);
        }
        return response.json();
    }
    
    function processData(data) {
        entriesContainer.innerHTML = '';
        
        const entries = Array.isArray(data) ? data : Object.values(data);
        
        if (entries.length === 0) {
            entriesContainer.innerHTML = '<div class="error">no entries found</div>';
            return;
        }
        
        entries.forEach(entry => {
            const card = createEntryCard(entry);
            entriesContainer.appendChild(card);
        });
    }
    
    function createEntryCard(entry) {
        const card = document.createElement('div');
        card.className = 'entry-card';
        
        const img = document.createElement('img');
        img.className = 'entry-image';
        img.src = entry.image_url;
        img.alt = entry.title;
        img.loading = 'lazy';
        
        const title = document.createElement('h2');
        title.className = 'entry-title rainbow';
        title.textContent = entry.title;
        
        const content = document.createElement('div');
        content.className = 'entry-description';
        content.innerHTML = entry.content;
        
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(content);
        
        return card;
    }
    
    function handleError(error) {
        console.error('Error loading entries:', error);
        entriesContainer.innerHTML = `
                failed to load entries
                <div style="margin-top: 10px; font-size: 0.9em; color: #aaa;">${error.message}</div>
        `;
    }
});

function overlayStuff() {
    const overlay = document.querySelector('.overlay');
    const container = document.querySelector('.container');
    const audio = document.getElementById('hoa-audio');
    container.style.display = 'block';
    container.style.opacity = 1;
    audio.volume = 0.5;
    audio.play();
    const duration = 800;
    const start = performance.now();
    function step(now) {
        const t = Math.min((now - start) / duration, 1);
        overlay.style.opacity = 1 - t;
        if (t < 1) requestAnimationFrame(step); else overlay.style.display = 'none';
    }
    requestAnimationFrame(step);
}