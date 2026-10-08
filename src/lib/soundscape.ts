// Generative ambient soundscape using Web Audio API
// Self-contained, zero external asset dependencies, smooth fade-in/fade-out

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private filter: BiquadFilterNode | null = null;
  private isPlaying: boolean = false;
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private listeners: Set<(playing: boolean) => void> = new Set();

  private init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();

    // Master gain with smooth ramp
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Filter for warm analog feel
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = "lowpass";
    this.filter.frequency.setValueAtTime(440, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(2.5, this.ctx.currentTime);
    this.filter.connect(this.masterGain);

    // Subtle LFO filter sweep (breathing effect)
    this.lfo = this.ctx.createOscillator();
    this.lfo.frequency.setValueAtTime(0.08, this.ctx.currentTime); // very slow breath
    this.lfoGain = this.ctx.createGain();
    this.lfoGain.gain.setValueAtTime(180, this.ctx.currentTime);
    this.lfo.connect(this.lfoGain);
    this.lfoGain.connect(this.filter.frequency);
    this.lfo.start();

    // Warm ambient chord: F# minor 9th (F#2, C#3, E3, G#3, C#4)
    const freqs = [92.5, 138.6, 164.81, 207.65, 277.18];

    freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.filter) return;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      // Alternate between sine and soft triangle for warmth
      osc.type = idx % 2 === 0 ? "sine" : "triangle";
      // Slight detune for organic chorus
      const detune = (idx - 2) * 4.2;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.detune.setValueAtTime(detune, this.ctx.currentTime);

      const individualGain = 0.08 / freqs.length;
      oscGain.gain.setValueAtTime(individualGain, this.ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(this.filter);
      osc.start();
      this.oscillators.push(osc);
    });
  }

  public toggle(): boolean {
    if (!this.ctx) {
      this.init();
    }

    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }

    return this.isPlaying;
  }

  public play() {
    if (!this.ctx) this.init();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    // Smooth fade in over 2.5 seconds
    this.masterGain.gain.linearRampToValueAtTime(0.25, now + 2.5);

    this.isPlaying = true;
    this.notify();
  }

  public pause() {
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    // Smooth fade out over 1.2 seconds
    this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 1.2);

    this.isPlaying = false;
    this.notify();
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public subscribe(fn: (playing: boolean) => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying));
  }
}

export const soundscape = typeof window !== "undefined" ? new SoundscapeEngine() : null;
