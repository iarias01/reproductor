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
    const coreo = {
      name: 'Salsa - IMPETU al 100.wav',
      url: './assets/musica/Salsa - IMPETU al 100.wav',
    };
    const coreo95 = {
      name: 'Salsa - IMPETU al 95.mp3',
      url: './assets/musica/Salsa - IMPETU al 95.mp3',
    };
    const coreo1 = {
      name: 'Cris Gomez --COREO-- Me Negó.mp3',
      url: './assets/musica/Cris Gomez --COREO-- Me Negó.mp3',
    };
    const calel13 = {
      name: 'Calle 13 - Suave.mp3',
      url: './assets/musica/Calle 13 - Suave.mp3',
    };

    this.files = [coreo, coreo95];
    //this.selectFile(this.files[0]);
    //this.selectedSong = this.files[0].url;
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
    console.log('this.volume', this.volume);
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
}
