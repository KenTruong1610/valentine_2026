import './config';
import './theme';

const config = window.VALENTINE_CONFIG;

interface ColorDefaults {
    backgroundStart: string;
    backgroundEnd: string;
    buttonBackground: string;
    buttonHover: string;
    textColor: string;
}

interface FloatingElement extends HTMLDivElement {
    style: CSSStyleDeclaration;
}

// Helper function to get element with type
function getElement<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id);
    if (!element) throw new Error(`Element with id "${id}" not found`);
    return element as T;
}

// Helper function to query selector with type
function querySelector<T extends Element>(selector: string): T {
    const element = document.querySelector(selector);
    if (!element) throw new Error(`Element with selector "${selector}" not found`);
    return element as T;
}

// Validate configuration
function validateConfig(): void {
    const warnings: string[] = [];

    // Check required fields
    if (!config.valentineName) {
        warnings.push("Valentine's name is not set! Using default.");
        config.valentineName = "tình iu của tớ";
    }

    // Validate colors
    const isValidHex = (hex: string): boolean => /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    
    Object.entries(config.colors).forEach(([key, value]) => {
        if (!isValidHex(value)) {
            warnings.push(`Invalid color for ${key}! Using default.`);
            (config.colors as Record<string, string>)[key] = getDefaultColor(key);
        }
    });

    // Validate animation values
    const floatDuration = parseFloat(config.animations.floatDuration);
    if (floatDuration < 5) {
        warnings.push("Float duration too short! Setting to 5s minimum.");
        config.animations.floatDuration = "5s";
    }

    if (config.animations.heartExplosionSize < 1 || config.animations.heartExplosionSize > 3) {
        warnings.push("Heart explosion size should be between 1 and 3! Using default.");
        config.animations.heartExplosionSize = 1.5;
    }

    // Log warnings if any
    if (warnings.length > 0) {
        console.warn("⚠️ Configuration Warnings:");
        warnings.forEach(warning => console.warn("- " + warning));
    }
}

// Default color values
function getDefaultColor(key: string): string {
    const defaults: ColorDefaults = {
        backgroundStart: "#ffafbd",
        backgroundEnd: "#ffc3a0",
        buttonBackground: "#ff6b6b",
        buttonHover: "#ff8787",
        textColor: "#ff4757"
    };
    return defaults[key as keyof ColorDefaults];
}

// Set page title
document.title = config.pageTitle;

// Initialize the page content when DOM is loaded
window.addEventListener('DOMContentLoaded', (): void => {
    // Validate configuration first
    validateConfig();

    // Set texts from config
    getElement<HTMLHeadingElement>('valentineTitle').textContent = `${config.valentineName}, tình iu của tớ...`;
    
    // Set first question texts
    getElement<HTMLHeadingElement>('question1Text').textContent = config.questions.first.text;
    getElement<HTMLButtonElement>('yesBtn1').textContent = config.questions.first.yesBtn;
    getElement<HTMLButtonElement>('noBtn1').textContent = config.questions.first.noBtn;
    getElement<HTMLButtonElement>('secretAnswerBtn').textContent = config.questions.first.secretAnswer;
    
    // Set second question texts
    getElement<HTMLHeadingElement>('question2Text').textContent = config.questions.second.text;
    getElement<HTMLSpanElement>('startText').textContent = config.questions.second.startText;
    getElement<HTMLButtonElement>('nextBtn').textContent = config.questions.second.nextBtn;
    
    // Set third question texts
    getElement<HTMLHeadingElement>('question3Text').textContent = config.questions.third.text;
    getElement<HTMLButtonElement>('yesBtn3').textContent = config.questions.third.yesBtn;
    getElement<HTMLButtonElement>('noBtn3').textContent = config.questions.third.noBtn;

    // Create initial floating elements
    createFloatingElements();

    // Setup music player
    setupMusicPlayer();
});

// Create floating hearts and bears
function createFloatingElements(): void {
    const container = querySelector<HTMLDivElement>('.floating-elements');

    // Create hearts
    config.floatingEmojis.hearts.forEach((heart: string) => {
        const div = document.createElement('div') as FloatingElement;
        div.className = 'heart';
        div.innerHTML = heart;
        setRandomPosition(div);
        container.appendChild(div);
    });

    // Create bears
    config.floatingEmojis.bears.forEach((bear: string) => {
        const div = document.createElement('div') as FloatingElement;
        div.className = 'bear';
        div.innerHTML = bear;
        setRandomPosition(div);
        container.appendChild(div);
    });
}

// Set random position for floating elements
function setRandomPosition(element: FloatingElement): void {
    element.style.left = Math.random() * 100 + 'vw';
    element.style.animationDelay = Math.random() * 5 + 's';
    element.style.animationDuration = 10 + Math.random() * 20 + 's';
}

// Function to show next question
function showNextQuestion(questionNumber: number): void {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    const nextQuestion = document.getElementById(`question${questionNumber}`);
    if (nextQuestion) {
        nextQuestion.classList.remove('hidden');
    }
}

// Function to move the "No" button when clicked
function moveButton(button: HTMLButtonElement): void {
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    button.style.position = 'fixed';
    button.style.left = x + 'px';
    button.style.top = y + 'px';
}

// Love meter functionality
const loveMeter = document.getElementById('loveMeter') as HTMLInputElement | null;
const loveValue = document.getElementById('loveValue') as HTMLSpanElement | null;
const extraLove = document.getElementById('extraLove') as HTMLSpanElement | null;

function setInitialPosition(): void {
    if (loveMeter && loveValue) {
        loveMeter.value = '100';
        loveValue.textContent = '100';
        loveMeter.style.width = '100%';
    }
}

if (loveMeter) {
    loveMeter.addEventListener('input', (): void => {
        const value = parseInt(loveMeter.value, 10);
        if (loveValue) loveValue.textContent = value.toString();
        
        if (value > 100 && extraLove) {
            extraLove.classList.remove('hidden');
            const overflowPercentage = (value - 100) / 9900;
            const extraWidth = overflowPercentage * window.innerWidth * 0.8;
            loveMeter.style.width = `calc(100% + ${extraWidth}px)`;
            loveMeter.style.transition = 'width 0.3s';
            
            // Show different messages based on the value
            if (value >= 5000) {
                extraLove.classList.add('super-love');
                extraLove.textContent = config.loveMessages.extreme;
            } else if (value > 1000) {
                extraLove.classList.remove('super-love');
                extraLove.textContent = config.loveMessages.high;
            } else {
                extraLove.classList.remove('super-love');
                extraLove.textContent = config.loveMessages.normal;
            }
        } else if (extraLove) {
            extraLove.classList.add('hidden');
            extraLove.classList.remove('super-love');
            loveMeter.style.width = '100%';
        }
    });
}

// Initialize love meter
window.addEventListener('DOMContentLoaded', setInitialPosition);
window.addEventListener('load', setInitialPosition);

// Celebration function
function celebrate(): void {
    document.querySelectorAll('.question-section').forEach(q => q.classList.add('hidden'));
    const celebration = document.getElementById('celebration');
    if (celebration) {
        celebration.classList.remove('hidden');
        
        // Set celebration messages
        const celebrationTitle = document.getElementById('celebrationTitle');
        const celebrationMessage = document.getElementById('celebrationMessage');
        const celebrationEmojis = document.getElementById('celebrationEmojis');
        
        if (celebrationTitle) celebrationTitle.textContent = config.celebration.title;
        if (celebrationMessage) celebrationMessage.textContent = config.celebration.message;
        if (celebrationEmojis) celebrationEmojis.textContent = config.celebration.emojis;
        
        // Create heart explosion effect
        createHeartExplosion();
    }
}

// Create heart explosion animation
function createHeartExplosion(): void {
    const container = document.querySelector('.floating-elements');
    if (!container) return;
    
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div') as FloatingElement;
        const randomHeart = config.floatingEmojis.hearts[Math.floor(Math.random() * config.floatingEmojis.hearts.length)];
        heart.innerHTML = randomHeart;
        heart.className = 'heart';
        container.appendChild(heart);
        setRandomPosition(heart);
    }
}

// Music Player Setup
function setupMusicPlayer(): void {
    const musicControls = document.getElementById('musicControls');
    const musicToggle = document.getElementById('musicToggle') as HTMLButtonElement | null;
    const bgMusic = document.getElementById('bgMusic') as HTMLAudioElement | null;
    const musicSource = document.getElementById('musicSource') as HTMLSourceElement | null;

    // Only show controls if music is enabled in config
    if (!config.music.enabled && musicControls) {
        musicControls.style.display = 'none';
        return;
    }

    // Set music source and volume
    if (musicSource && bgMusic) {
        musicSource.src = config.music.musicUrl;
        bgMusic.volume = config.music.volume || 0.5;
        bgMusic.load();
    }

    // Try autoplay if enabled
    if (config.music.autoplay && bgMusic) {
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.catch((error: Error) => {
                console.log("Autoplay prevented by browser");
                if (musicToggle) musicToggle.textContent = config.music.startText;
            });
        }
    }

    // Toggle music on button click
    if (musicToggle && bgMusic) {
        musicToggle.addEventListener('click', (): void => {
            if (bgMusic.paused) {
                bgMusic.play();
                musicToggle.textContent = config.music.stopText;
            } else {
                bgMusic.pause();
                musicToggle.textContent = config.music.startText;
            }
        });
    }
}

// Make functions globally available for onclick handlers
window.moveButton = moveButton;
window.showNextQuestion = showNextQuestion;
window.celebrate = celebrate;

export {
    validateConfig,
    createFloatingElements,
    setRandomPosition,
    showNextQuestion,
    moveButton,
    celebrate,
    createHeartExplosion,
    setupMusicPlayer
};