export interface ValentineConfig {
    valentineName: string;
    pageTitle: string;
    floatingEmojis: {
        hearts: string[];
        bears: string[];
    };
    questions: {
        first: {
            text: string;
            yesBtn: string;
            noBtn: string;
            secretAnswer: string;
        };
        second: {
            text: string;
            startText: string;
            nextBtn: string;
        };
        third: {
            text: string;
            yesBtn: string;
            noBtn: string;
        };
    };
    loveMessages: {
        extreme: string;
        high: string;
        normal: string;
    };
    celebration: {
        title: string;
        message: string;
        emojis: string;
    };
    colors: {
        backgroundStart: string;
        backgroundEnd: string;
        buttonBackground: string;
        buttonHover: string;
        textColor: string;
    };
    animations: {
        floatDuration: string;
        floatDistance: string;
        bounceSpeed: string;
        heartExplosionSize: number;
    };
    music: {
        enabled: boolean;
        autoplay: boolean;
        musicUrl: string;
        startText: string;
        stopText: string;
        volume: number;
    };
}

declare global {
    interface Window {
        VALENTINE_CONFIG: ValentineConfig;
        moveButton: (button: HTMLButtonElement) => void;
        showNextQuestion: (questionNumber: number) => void;
        celebrate: () => void;
    }
}

const CONFIG: ValentineConfig = {
    valentineName: "Này Cậu",

    // The title that appears in the browser tab
    // You can use emojis! 💝 💖 💗 💓 💞 💕
    pageTitle: "Hôm nay là ngày Valentine của chúng ta 💝",

    // Floating emojis that appear in the background
    // Find more emojis at: https://emojipedia.org
    floatingEmojis: {
        hearts: ['❤️', '💖', '💝', '💗', '💓'],  // Heart emojis
        bears: ['🧸', '🐻']                       // Cute bear emojis
    },

    // Questions and answers
    // Customize each question and its possible responses
    questions: {
        first: {
            text: "Bạn có thích chứ",                                    // First interaction
            yesBtn: "Yes",                                             // Text for "Yes" button
            noBtn: "No",                                               // Text for "No" button
            secretAnswer: "Tớ không thích cậu, Tớ rất iu cậu đấy ❤️"           // Secret hover message
        },
        second: {
            text: "Bạn yêu tôi đến mức nào?",                          // For the love meter
            startText: "Quá nhìu roài đấy!",                                   // Text before the percentage
            nextBtn: "Tiếp đi nào ❤️"                                         // Text for the next button
        },
        third: {
            text: "Bạn đồng ý hẹn hò với mình vào 14 - 02 - 2026 chứ 🌹", // The big question!
            yesBtn: "Yes!",                                             // Text for "Yes" button
            noBtn: "No"                                                 // Text for "No" button
        }
    },

    // Love meter messages
    // They show up depending on how far they slide the meter
    loveMessages: {
        extreme: "WOOOOW Bạn yêu tôi nhiều đến thế cơ à?? 🥰🚀💝",  // Shows when they go past 5000%
        high: "Bạn thật tuyệt vời! 🚀💝",              // Shows when they go past 1000%
        normal: "Thật tốt nhỉ! 🥰"                           // Shows when they go past 100%
    },

    // Messages that appear after they say "Yes!"
    celebration: {
        title: "Yassss! Chúng ta là một đôi hạnh phúc 🎉💝💖💝💓",
        message: "Thay cho món quà này, Đó là một ngàn cái ôm dành cho cậu!",
        emojis: "🎁💖🤗💝💋❤️💕"  // These will bounce around
    },

    // Color scheme for the website
    // Use https://colorhunt.co or https://coolors.co to find beautiful color combinations
    colors: {
        backgroundStart: "#ffafbd",      // Gradient start (try pastel colors for a soft look)
        backgroundEnd: "#ffc3a0",        // Gradient end (should complement backgroundStart)
        buttonBackground: "#ff6b6b",     // Button color (should stand out against the background)
        buttonHover: "#ff8787",          // Button hover color (slightly lighter than buttonBackground)
        textColor: "#ff4757"             // Text color (make sure it's readable!)
    },

    // Animation settings
    // Adjust these if you want faster/slower animations
    animations: {
        floatDuration: "15s",           // How long it takes hearts to float up (10-20s recommended)
        floatDistance: "50px",          // How far hearts move sideways (30-70px recommended)
        bounceSpeed: "0.5s",            // Speed of bouncing animations (0.3-0.7s recommended)
        heartExplosionSize: 1.5         // Size of heart explosion effect (1.2-2.0 recommended)
    },

    // Background Music (Optional)
    // Add your own music URL after getting proper licenses
    music: {
        enabled: true,                     // Music feature is enabled
        autoplay: true,                    // Try to autoplay (note: some browsers may block this)
        musicUrl: "https://res.cloudinary.com/dfkhdorr0/video/upload/v1770918046/audio_uploads/audio_20260213_004043.mp3", // Music streaming URL
        startText: "🎵 Play Music",        // Button text to start music
        stopText: "🔇 Stop Music",         // Button text to stop music
        volume: 0.5                        // Volume level (0.0 to 1.0)
    }
};

// Don't modify anything below this line unless you know what you're doing
window.VALENTINE_CONFIG = CONFIG;

export default CONFIG;