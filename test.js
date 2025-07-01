window.onload = function() {
    fetch('preguntas.json')
        .then(response => response.json())
        .then(data => {
            const accordion = document.getElementById('accordion');
            data.forEach((question, index) => {
                const accordionItem = document.createElement('div');
                accordionItem.classList.add('accordion-item');
                accordionItem.innerHTML = `
                    <label for="q${index}">${question.question}</label>
                    <div class="options">
                        <label><input type="radio" name="q${index}" value="1"> Nunca</label>
                        <label><input type="radio" name="q${index}" value="2"> Casi nunca</label>
                        <label><input type="radio" name="q${index}" value="3"> A veces</label>
                        <label><input type="radio" name="q${index}" value="4"> Casi siempre</label>
                        <label><input type="radio" name="q${index}" value="5"> Siempre</label>
                    </div>
                `;
                accordion.appendChild(accordionItem);
            });

            const form = document.getElementById('questionnaireForm');
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                let totalScore = 0;
                data.forEach((question, index) => {
                    const answer = document.querySelector(`input[name="q${index}"]:checked`);
                    if (answer) {
                        totalScore += parseInt(answer.value);
                    }
                });

                localStorage.setItem('totalScore', totalScore);
                window.location.href = "resultados.html";
            });
        });
};
