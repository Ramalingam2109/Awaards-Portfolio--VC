class SoundFX {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private getContext(): AudioContext | null {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playHover() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {
      // Ignore
    }
  }

  playClick() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.06);
      
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {
      // Ignore
    }
  }

  playSuccess() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      
      const freqs = [523.25, 659.25, 783.99, 1046.50];
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime + idx * 0.05);
        
        gain.gain.setValueAtTime(0.02, ctx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.05 + 0.12);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(ctx.currentTime + idx * 0.05);
        osc.stop(ctx.currentTime + idx * 0.05 + 0.12);
      });
    } catch (e) {
      // Ignore
    }
  }
}

export const soundFX = new SoundFX();
