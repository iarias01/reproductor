import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Renderer2,
  NgZone,
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;

  files: { name: string; url: string }[] = [];
  selectedFile: { name: string; url: string } | null = null;
  audioURL: string | null = null;
  playbackRate: number = 1;
  currentTime: number = 0;
  duration: number = 0;
  volume: number = 1;
  selectedSong = '';
  deleteElement = false;
  withDelay = false;
  loop = false;

  inputVar: any = null;

  speeds: number[] = [];

  regresiveCount = 0;
  showCounter = false;
  disabledPlay = false;

  constructor(private renderer: Renderer2, private ngZone: NgZone) {
    //const storedVolume = localStorage.getItem('volume');
    //this.volume = storedVolume ? parseFloat(storedVolume) : 1;
    this.speeds = this.generarArray();
  }

  ngOnInit() {
    //localStorage.clear();
    this.addPassiveEventListeners();
    setTimeout(() => {
      //this.loadFilesFromLocalStorage();
      this.loadFilesCoreo();
    }, 1000);
  }

  addPassiveEventListeners() {
    this.ngZone.runOutsideAngular(() => {
      if (this.audioPlayerRef && this.audioPlayerRef.nativeElement) {
        this.audioPlayerRef.nativeElement.addEventListener(
          'touchstart',
          (event) => {
            event.preventDefault();
          },
          { passive: true }
        );
      }
    });
  }

  setLoop() {
    if (this.audioPlayerRef && this.audioPlayerRef.nativeElement) {
      this.audioPlayerRef.nativeElement.addEventListener('ended', () => {
        if (this.loop) {
          this.audioPlayerRef.nativeElement.currentTime = 0;
          this.audioPlayerRef.nativeElement.play();
        }
      });
    }
  }

  generarArray(): number[] {
    const array: number[] = [];
    for (let i = 0.5; i <= 2.01; i += 0.01) {
      array.push(Number(i.toFixed(2)));
    }
    return array;
  }

  loadFilesFromLocalStorage() {
    const storedFiles = JSON.parse(localStorage.getItem('files') || '[]');

    this.files = storedFiles;
    this.selectFile(this.files[0]);
    this.selectedSong = this.files[0].url;
  }

  loadFilesCoreo() {
    const grupo100Mp3 = {
      name: 'Grupo Ímpetu 100% MP3.mp3',
      url: './assets/musica/grupo_impetu_100_MP3.mp3',
    };
    const grupo95Mp3 = {
      name: 'Grupo Ímpetu 95% MP3.mp3',
      url: './assets/musica/grupo_impetu_95_MP3.mp3',
    };
    const grupo100Wav = {
      name: 'Grupo Ímpetu 100% WAV.wav',
      url: './assets/musica/grupo_impetu_100_WAV.wav',
    };
    const grupo95Wav = {
      name: 'Grupo Ímpetu 95% WAV.wav',
      url: './assets/musica/grupo_impetu_95_WAV.wav',
    };
    const nicoDayWav = {
      name: 'Nico y Day WAV.wav',
      url: './assets/musica/nico_day_WAV.wav',
    };
    const nicoDayMp3 = {
      name: 'Nico y Day MP3.mp3',
      url: './assets/musica/nico_y_day_MP3.mp3',
    };
    const pabloAgusMp3 = {
      name: 'Pablo y Agus MP3.mp3',
      url: './assets/musica/pablo_y_agus_MP3.mp3',
    };
    const pabloAgusWav = {
      name: 'Pablo y Agus WAV.wav',
      url: './assets/musica/pablo_y_agus_WAV.wav',
    };
    const shineMixtoMp3 = {
      name: 'Shine Mixto MP3.mp3',
      url: './assets/musica/shine_mixto_MP3.mp3',
    };
    const shineMixtoWav = {
      name: 'Shine Mixto WAV.wav',
      url: './assets/musica/shine_mixto_WAV.wav',
    };
    const solistaPabloMp3 = {
      name: 'Solista Pablo MP3.mp3',
      url: './assets/musica/solista_pablo_MP3.mp3',
    };
    const solistaPabloWav = {
      name: 'Solista Pablo WAV.wav',
      url: './assets/musica/solista_pablo_WAV.wav',
    };

    this.files = [
      grupo95Mp3,
      nicoDayMp3,
      pabloAgusMp3,
      shineMixtoMp3,
      solistaPabloMp3,
      grupo95Wav,
      nicoDayWav,
      pabloAgusWav,
      shineMixtoWav,
      solistaPabloWav,
    ];
  }

  saveFilesToLocalStorage() {
    localStorage.setItem('files', JSON.stringify(this.files));
  }

  handleFileUpload(event: any) {
    this.ngZone.run(() => {
      const newFiles: File[] = Array.from(event.target.files);

      const audioFiles = newFiles.filter((file) =>
        file.type.startsWith('audio/')
      );

      if (audioFiles.length > 0) {
        audioFiles.forEach((file) => {
          const fileURL = URL.createObjectURL(file);
          this.files.push({ name: file.name, url: fileURL });
        });
        this.saveFilesToLocalStorage();
        const final = this.files.length - 1;
        this.selectFile(this.files[final]);
        this.selectedSong = this.files[final].url;
        return;
      }

      alert('No es un archivo de audio');
    });
  }

  selectFile(file: { name: string; url: string }) {
    this.selectedFile = file;
    this.audioURL = file.url;
    this.selectedSong = file.url;
    this.deleteElement = true;
    if (this.audioPlayerRef && this.audioPlayerRef.nativeElement) {
      this.disconnect(this.audioURL);
      //this.audioPlayerRef.nativeElement.src = this.audioURL;
      //this.audioPlayerRef.nativeElement.load();
      this.setLoop();
    } else {
      console.error('Audio player element not found');
    }
    this.reset();
  }

  disconnect(url: string) {
    // Antes de cambiar de tema:
    const audioPlayer = this.audioPlayerRef.nativeElement;
    if (audioPlayer) {
      if (!audioPlayer.paused) {
        audioPlayer.pause();
      }
      // Crea un nuevo elemento de audio
      const newAudioPlayer = new Audio();
      newAudioPlayer.src = url; // Cambia esto con la URL correcta
      newAudioPlayer.load();

      // Reemplaza el elemento de audio anterior con el nuevo
      if (audioPlayer.parentNode)
        audioPlayer.parentNode.replaceChild(
          newAudioPlayer,
          this.audioPlayerRef.nativeElement
        );
      newAudioPlayer.addEventListener('loadedmetadata', () => {
        this.updateTime();
      });
      newAudioPlayer.addEventListener('timeupdate', () => {
        this.updateTime();
      });
      this.audioPlayerRef.nativeElement = newAudioPlayer;
    }
  }

  play() {
    if (this.audioPlayerRef && this.audioPlayerRef.nativeElement) {
      this.disabledPlay = true;
      if (this.withDelay) {
        this.startDecrementing();
        setTimeout(() => {
          this.audioPlayerRef.nativeElement.play();
          this.disabledPlay = false;
        }, 5000);
        return;
      }

      this.audioPlayerRef.nativeElement.play();
      this.disabledPlay = false;
    }
  }
  updateCounter() {
    this.showCounter = true;
    setTimeout(() => {
      this.showCounter = false;
    }, 300);
  }

  startDecrementing() {
    this.regresiveCount = 5;
    this.showCounter = true;
    setTimeout(() => {
      this.showCounter = false;
    }, 400);
    const intervalId = window.setInterval(() => {
      this.regresiveCount--;
      this.updateCounter();
      if (this.regresiveCount === 0) {
        clearInterval(intervalId);
      }
    }, 1000);
  }

  pause() {
    if (this.audioPlayerRef && this.audioPlayerRef.nativeElement) {
      this.audioPlayerRef.nativeElement.pause();
    }
  }

  rewind() {
    if (this.audioPlayerRef && this.audioPlayerRef.nativeElement) {
      this.audioPlayerRef.nativeElement.currentTime -= 10;
    }
  }

  forward() {
    if (this.audioPlayerRef && this.audioPlayerRef.nativeElement) {
      this.audioPlayerRef.nativeElement.currentTime += 10;
    }
  }

  updatePlaybackRate() {
    if (this.audioPlayerRef && this.audioPlayerRef.nativeElement) {
      this.audioPlayerRef.nativeElement.playbackRate = this.playbackRate;
    }
  }

  updateTime() {
    if (this.audioPlayerRef && this.audioPlayerRef.nativeElement) {
      this.currentTime = this.audioPlayerRef.nativeElement.currentTime;
      const duration = this.audioPlayerRef.nativeElement.duration;
      this.duration = duration ? duration : 0;
    }
  }

  formatSecondsToMinutes(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.trunc(seconds % 60);
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
  }

  updateVolume() {
    if (this.audioPlayerRef && this.audioPlayerRef.nativeElement) {
      this.audioPlayerRef.nativeElement.volume = this.volume;
      //localStorage.setItem('volume', this.volume.toString());
    }
  }

  changeTime(event: any) {
    if (this.audioPlayerRef && this.audioPlayerRef.nativeElement) {
      this.audioPlayerRef.nativeElement.currentTime = event.target.value;
    }
  }

  deleteFile(url: string) {
    const index = this.files.findIndex((obj) => obj.url === url);
    this.files.splice(index, 1);
    //this.saveFilesToLocalStorage();

    if (this.files.length === 0) {
      this.selectedFile = null;
      this.audioURL = null;
      if (this.audioPlayerRef && this.audioPlayerRef.nativeElement) {
        this.audioPlayerRef.nativeElement.src = '';
      }
      this.inputVar = null;
    }
  }

  clearFiles() {
    this.files = [];
    //this.saveFilesToLocalStorage();
    this.selectedFile = null;
    this.audioURL = null;
    if (this.audioPlayerRef && this.audioPlayerRef.nativeElement) {
      this.audioPlayerRef.nativeElement.src = '';
    }
  }

  get isPlaying(): boolean {
    if (this.audioPlayerRef && this.audioPlayerRef.nativeElement) {
      return !this.audioPlayerRef.nativeElement.paused;
    }
    return false;
  }

  stop() {
    if (this.audioPlayerRef && this.audioPlayerRef.nativeElement) {
      this.audioPlayerRef.nativeElement.pause();
      this.audioPlayerRef.nativeElement.currentTime = 0;
    }
  }

  reset() {
    this.playbackRate = 1;
    this.currentTime = 0;
    this.duration = 0;
    this.updateVolume();
    this.updateTime();
    this.restoreTime();
  }

  restoreTime() {
    this.deleteElement = true;
    setTimeout(() => {
      this.deleteElement = false;
    }, 300);
  }

  get getValidateExisteFiles() {
    return this.inputVar || this.files.length > 0;
  }
  exportAudio() {
    if (!this.selectedFile) return;

    const { url, name } = this.selectedFile;

    // Si el archivo viene de assets o URL local
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = name; // Mantiene nombre y extensión
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      })
      .catch((err) => console.error('Error exportando el audio:', err));
  }
}
