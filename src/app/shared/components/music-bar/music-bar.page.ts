import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-music-bar',
  templateUrl: './music-bar.page.html',
  styleUrls: ['./music-bar.page.scss'],
})
export class MusicBarPage implements AfterViewInit, OnChanges {
  @ViewChild('audioElement', { static: true })
  audioElement!: ElementRef<HTMLAudioElement>;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D | null = null;
  @Input() volume = 0.2;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.audioElement.nativeElement.volume = this.volume;
  }

  ngAfterViewInit(): void {
    this.initAudio();
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    //this.audioElement.nativeElement.play();
  }

  initAudio() {
    const audio = this.audioElement.nativeElement;
    audio.loop = true;
    audio.src = './assets/musica/tema2.mp3';
    audio.volume = 0.2;
    audio.load();
    audio.addEventListener('canplay', () => {
      this.initAnalyser();
      audio.play();
    });
  }

  async initAnalyser() {
    const audio = this.audioElement.nativeElement;
    const context = new AudioContext();
    const src = context.createMediaElementSource(audio);
    const analyser = context.createAnalyser();
    src.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 256;
    await this.drawAudio(analyser);
  }

  async drawAudio(analyser: AnalyserNode) {
    const ctx = this.ctx!;
    const WIDTH = this.canvas.nativeElement.width;
    const HEIGHT = this.canvas.nativeElement.height;
    requestAnimationFrame(() => this.drawAudio(analyser));
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const barWidth = (WIDTH / bufferLength) * 3;
    let x = 0;
    analyser.getByteFrequencyData(dataArray);
    ctx.fillStyle = '#111111';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // all the magic
    dataArray.forEach((decibel, index) => {
      const c = index / bufferLength;
      const r = decibel + 25 * c;
      const g = 250 * c;
      const b = 250;
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x, HEIGHT - decibel, barWidth, decibel);
      x += barWidth + 1;
    });
  }
}
