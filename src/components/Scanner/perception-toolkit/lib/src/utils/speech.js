import {clamp} from './clamp.js';


export class Speech {
    constructor() {
        this.message = '';
        this.autoplay = false;
        this.utterance = new SpeechSynthesisUtterance();
    }

    get voices() {
        return speechSynthesis.getVoices();
    }

    configure({voiceIndex = 0, volume = 1, rate = 1, pitch = 2, lang = 'en-US'} = {}) {
        voiceIndex = clamp(voiceIndex, 0, this.voices.length);
        volume = clamp(volume, 0, 1);
        rate = clamp(volume, 0.1, 10);
        pitch = clamp(volume, 0, 2);
        this.utterance.voice = this.voices[voiceIndex];
        this.utterance.volume = volume;
        this.utterance.rate = rate;
        this.utterance.pitch = pitch;
        this.utterance.lang = lang;
    }

    say(message) {
        if (message) {
            this.message = message;
        }
        this.utterance.text = this.message;
        speechSynthesis.cancel();
        speechSynthesis.speak(this.utterance);
    }
}

//# sourceMappingURL=speech.js.map
