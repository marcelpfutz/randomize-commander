document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generateBtn');
    const resultDiv = document.getElementById('result');
    const cardImage = document.getElementById('cardImage');
    const cardTitle = document.getElementById('cardTitle');
    const cardDescription = document.getElementById('cardDescription');

    generateBtn.addEventListener('click', async function() {
        try {
            // Show loading state
            generateBtn.disabled = true;
            generateBtn.innerHTML = '<svg class="w-6 h-6 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>Gerando...';

            // Fetch from backend API
            const response = await fetch('http://localhost:8000/api/item');
            if (!response.ok) {
                throw new Error('Erro ao buscar comandante');
            }
            const data = await response.json();

            // Update DOM
            cardImage.src = data.image;
            cardImage.alt = data.title;
            cardTitle.textContent = data.title;
            cardDescription.textContent = data.description || 'Sem descrição disponível.';

            // Show result
            resultDiv.classList.remove('hidden');

            // Reset button
            generateBtn.disabled = false;
            generateBtn.innerHTML = '<svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>Gerar Outro Comandante';
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao conectar com o backend. Verifique se o servidor está rodando em http://localhost:8000');
            
            // Reset button on error
            generateBtn.disabled = false;
            generateBtn.innerHTML = '<svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>Gerar Comandante Aleatório';
        }
    });
});
