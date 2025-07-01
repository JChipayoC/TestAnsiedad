document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENTOS DEL DOM ---
    const guessBtn = document.getElementById('guess-btn');
    const userInput = document.getElementById('userInput');
    const gameMessage = document.getElementById('gameMessage');

    const memoryBoard = document.getElementById('memory-board');
    const memoryMessage = document.getElementById('memory-message');

    const videoCategory = document.getElementById('videoCategory');
    const videosContainer = document.getElementById('videos-container');

    const wellnessBtn = document.getElementById('wellness-btn');
    const wellnessTipEl = document.getElementById('wellness-tip');

    const audioPlayer = document.getElementById('audio-player');
    const playlistContainer = document.getElementById('playlist');
    const currentSongTitleEl = document.getElementById('current-song-title');

    const canvas = document.getElementById('mandala-canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    const colorInput = document.getElementById('mandala-color');
    const lineWidthInput = document.getElementById('mandala-linewidth');
    const clearBtn = document.getElementById('mandala-clear-btn');

    const bubbleContainer = document.getElementById('bubble-wrap-container');
    const bubbleResetBtn = document.getElementById('bubble-reset-btn');

    // --- JUEGO ADIVINA EL NÚMERO ---
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;

    function checkGuess() {
        const userGuess = parseInt(userInput.value, 10);
        if (isNaN(userGuess)) {
            gameMessage.textContent = "Por favor, ingresa un número válido.";
            gameMessage.style.color = "red";
            return;
        }
        attempts++;
        if (userGuess < randomNumber) {
            gameMessage.textContent = `Intento #${attempts}: Demasiado bajo. ¡Sigue intentando!`;
            gameMessage.style.color = "#e67e22";
        } else if (userGuess > randomNumber) {
            gameMessage.textContent = `Intento #${attempts}: Demasiado alto. ¡Casi lo tienes!`;
            gameMessage.style.color = "#e67e22";
        } else {
            gameMessage.textContent = `🎉 ¡Felicidades! Adivinaste el número en ${attempts} intentos. 🎉`;
            gameMessage.style.color = "green";
            randomNumber = Math.floor(Math.random() * 100) + 1;
            attempts = 0;
        }
        userInput.value = '';
        userInput.focus();
    }

    // --- JUEGO DE MEMORIA ---
    const cardEmojis = ['🍎', '🍌', '🍍', '🍒', '🍓', '🍇', '🍉', '🥝'];
    const cards = [...cardEmojis, ...cardEmojis];
    let flippedCards = [];
    let matchedPairs = 0;
    let boardLocked = false;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createMemoryBoard() {
        if (!memoryBoard) return;
        shuffleArray(cards);
        memoryBoard.innerHTML = '';
        memoryMessage.textContent = '';
        matchedPairs = 0;
        cards.forEach(emoji => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('memory-card');
            cardElement.dataset.emoji = emoji;
            cardElement.innerHTML = `
                <div class="card-face card-front"></div>
                <div class="card-face card-back">${emoji}</div>
            `;
            cardElement.addEventListener('click', flipCard);
            memoryBoard.appendChild(cardElement);
        });
    }

    function flipCard() {
        if (boardLocked || this.classList.contains('is-flipped') || flippedCards.includes(this)) {
            return;
        }
        this.classList.add('is-flipped');
        flippedCards.push(this);
        if (flippedCards.length === 2) {
            boardLocked = true;
            setTimeout(checkMatch, 1000);
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.dataset.emoji === card2.dataset.emoji) {
            matchedPairs++;
            card1.removeEventListener('click', flipCard);
            card2.removeEventListener('click', flipCard);
            if (matchedPairs === cardEmojis.length) {
                memoryMessage.textContent = '¡Felicidades! ¡Has encontrado todos los pares!';
                setTimeout(createMemoryBoard, 3000);
            }
        } else {
            card1.classList.remove('is-flipped');
            card2.classList.remove('is-flipped');
        }
        flippedCards = [];
        boardLocked = false;
    }

    // --- VIDEOS ---
    const videoCategories = {
        relajacion: [
            'https://www.youtube.com/embed/_lOpSbsm9y4', // Relajación en 5 min - ANANDA SHALA
            'https://www.youtube.com/embed/1ZYbU82GVz4'   // Música relajante para niños - Sleep Easy
        ],
        meditacion: [
            'https://www.youtube.com/embed/5lmGyxoiNgs',  // Meditación mindfulness para ansiedad (jun 2025)
            'https://www.youtube.com/embed/3fWVhjpaMIo'   // Meditación guiada con afirmaciones positivas (abril 2025)
        ],
        musica: [
            'https://www.youtube.com/embed/6NBAzks-2CM',  // Música suave y calmante para estudiar o dormir (niños)
            'https://www.youtube.com/embed/6CoMDwhfaew'   // Sonidos naturales para relajar mente y cuerpo
        ]
    };


    function changeVideoCategory() {
        if (!videoCategory || !videosContainer) return;
        const category = videoCategory.value;
        videosContainer.innerHTML = '';
        videoCategories[category].forEach(url => {
            const iframe = document.createElement('iframe');
            iframe.src = url;
            iframe.title = "YouTube video player";
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
            iframe.allowFullscreen = true;
            videosContainer.appendChild(iframe);
        });
    }

    // --- CONSEJOS DE BIENESTAR ---
    const wellnessTips = [
        'Busca ayuda profesional si lo necesitas. La ansiedad se puede tratar y mejorar con apoyo adecuado.',
        'Practica la respiración profunda: Inhala contando hasta 4, mantén contando hasta 4 y exhala contando hasta 6.',
        'Establece una rutina diaria. Los horarios regulares para dormir, comer y descansar dan seguridad a tu mente.',
        'Haz ejercicio físico: Actividades como caminar o bailar liberan tensiones y mejoran tu estado de ánimo.',
        'Dedica tiempo a actividades que disfrutes, como leer, escuchar música, dibujar o cualquier pasatiempo.',
        'Habla con alguien de confianza. Compartir tus sentimientos te puede ayudar a sentirte apoyada.',
        'Aprende a identificar y aceptar tus emociones sin juzgarte. Es el primer paso para manejarlos.',
        'Cuida tu sueño. Dormir bien es fundamental para tu salud mental. Evita pantallas antes de acostarte.'
    ];

    function showWellnessTip() {
        if (!wellnessTipEl) return;
        const randomTip = wellnessTips[Math.floor(Math.random() * wellnessTips.length)];
        wellnessTipEl.textContent = randomTip;
    }

    // --- LÓGICA DE LA LISTA DE REPRODUCCIÓN ---
    const songs = [
        { title: "Relaxing", src: "https://www.bensound.com/bensound-music/bensound-relaxing.mp3" },
        { title: "Tomorrow", src: "https://www.bensound.com/bensound-music/bensound-tomorrow.mp3" },
        { title: "Memories", src: "https://www.bensound.com/bensound-music/bensound-memories.mp3" },
        { title: "Quiet Time", src: "https://www.fesliyanstudios.com/musicfiles/2019-12-11_-_Quiet_Time_-_David_Fesliyan.mp3" },
        { title: "Creative Minds", src: "https://www.bensound.com/bensound-music/bensound-creativeminds.mp3" }
    ];
    let currentSongIndex = 0;

    function buildPlaylist() {
        if (!playlistContainer) return;
        playlistContainer.innerHTML = '';
        songs.forEach((song, index) => {
            const li = document.createElement('li');
            li.className = 'playlist-item';
            li.textContent = `${index + 1}. ${song.title}`;
            li.dataset.index = index;
            playlistContainer.appendChild(li);
        });
    }

    function playSong(index) {
        if (index < 0 || index >= songs.length) return;
        currentSongIndex = index;
        const song = songs[index];
        audioPlayer.src = song.src;
        currentSongTitleEl.textContent = song.title;
        audioPlayer.play();
        document.querySelectorAll('.playlist-item').forEach(item => {
            item.classList.remove('active-song');
        });
        document.querySelector(`.playlist-item[data-index="${index}"]`).classList.add('active-song');
    }

    // --- LÓGICA DE BURBUJAS PARA EXPLOTAR ---
    const BUBBLE_COUNT = 36;
    // ¡SONIDO CAMBIADO AQUÍ!
    const popSound = new Audio('https://orangefreesounds.com/wp-content/uploads/2021/04/Bubble-popping-sound-effect.mp3'); // Sonido de burbuja explotando

    function createBubbles() {
        if (!bubbleContainer) return;
        bubbleContainer.innerHTML = '';
        for (let i = 0; i < BUBBLE_COUNT; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            bubble.addEventListener('click', popBubble, { once: true });
            bubbleContainer.appendChild(bubble);
        }
    }

    function popBubble(e) {
        e.target.classList.add('popped');
        popSound.currentTime = 0;
        popSound.play();
    }

    // --- LÓGICA DEL CREADOR DE MANDALA ---
    const SYMMETRY_SIDES = 10;
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function resizeCanvas() {
        if (!canvas) return;
        const size = canvas.clientWidth;
        canvas.width = size;
        canvas.height = size;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    }

    function draw(e) {
        if (!isDrawing || !canvas) return;
        e.preventDefault();

        const rect = canvas.getBoundingClientRect();
        const currentX = (e.clientX || e.touches[0].clientX) - rect.left;
        const currentY = (e.clientY || e.touches[0].clientY) - rect.top;

        ctx.strokeStyle = colorInput.value;
        ctx.lineWidth = lineWidthInput.value;

        const angle = (Math.PI * 2) / SYMMETRY_SIDES;

        for (let i = 0; i < SYMMETRY_SIDES; i++) {
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(angle * i);

            ctx.beginPath();
            ctx.moveTo(lastX - canvas.width / 2, lastY - canvas.height / 2);
            ctx.lineTo(currentX - canvas.width / 2, currentY - canvas.height / 2);
            ctx.stroke();

            ctx.scale(-1, 1);
            ctx.beginPath();
            ctx.moveTo(lastX - canvas.width / 2, lastY - canvas.height / 2);
            ctx.lineTo(currentX - canvas.width / 2, currentY - canvas.height / 2);
            ctx.stroke();

            ctx.restore();
        }

        [lastX, lastY] = [currentX, currentY];
    }

    function handleStart(e) {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        [lastX, lastY] = [
            (e.clientX || e.touches[0].clientX) - rect.left,
            (e.clientY || e.touches[0].clientY) - rect.top
        ];
    }

    function handleEnd() {
        isDrawing = false;
    }

    function clearCanvas() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // --- INICIALIZACIÓN COMPLETA ---
    function init() {
        // Adivina el Número
        if (guessBtn) guessBtn.addEventListener('click', checkGuess);

        // Consejos de Bienestar
        if (wellnessBtn) wellnessBtn.addEventListener('click', showWellnessTip);
        showWellnessTip();

        // Videos
        if (videoCategory) {
            videoCategory.innerHTML = Object.keys(videoCategories).map(cat => `<option value="${cat}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</option>`).join('');
            videoCategory.addEventListener('change', changeVideoCategory);
            changeVideoCategory();
        }

        // Juego de Memoria
        createMemoryBoard();

        // Música
        if (playlistContainer) {
            playlistContainer.addEventListener('click', (e) => {
                if (e.target && e.target.matches('.playlist-item')) {
                    const index = parseInt(e.target.dataset.index, 10);
                    playSong(index);
                }
            });
            audioPlayer.addEventListener('ended', () => {
                const nextIndex = (currentSongIndex + 1) % songs.length;
                playSong(nextIndex);
            });
            buildPlaylist();
            currentSongTitleEl.textContent = songs[0].title;
            audioPlayer.src = songs[0].src;
            if (document.querySelector('.playlist-item[data-index="0"]')) {
                document.querySelector('.playlist-item[data-index="0"]').classList.add('active-song');
            }
        }

        // Burbujas
        if (bubbleContainer) {
            createBubbles();
            bubbleResetBtn.addEventListener('click', createBubbles);
        }

        // Mandala
        if (canvas) {
            window.addEventListener('resize', resizeCanvas);
            canvas.addEventListener('mousedown', handleStart);
            canvas.addEventListener('mousemove', draw);
            canvas.addEventListener('mouseup', handleEnd);
            canvas.addEventListener('mouseout', handleEnd);
            canvas.addEventListener('touchstart', handleStart);
            canvas.addEventListener('touchmove', draw);
            canvas.addEventListener('touchend', handleEnd);
            clearBtn.addEventListener('click', clearCanvas);
            resizeCanvas();
        }
    }

    // Iniciar todo
    init();
});