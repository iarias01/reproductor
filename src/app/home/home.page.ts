import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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
  selectedIndex = -1;
  deleteElement = false;

  input = null;

  speeds: number[] = [];

  regresiveCount = 5;
  showCounter = false;
  disabledPlay = false;

  constructor() {
    //const storedVolume = localStorage.getItem('volume');
    //this.volume = storedVolume ? parseFloat(storedVolume) : 1;
    this.speeds = this.generarArray();
  }

  ngOnInit() {
    //localStorage.clear();
    //this.loadFilesFromLocalStorage();
  }

  generarArray(): number[] {
    const array: number[] = [];
    for (let i = 0.7; i <= 1.25; i += 0.01) {
      array.push(Number(i.toFixed(2)));
    }
    return array;
  }

  loadFilesFromLocalStorage() {
    const storedFiles = JSON.parse(localStorage.getItem('files') || '[]');
    console.log(storedFiles);
    this.files = storedFiles;
    this.selectFile(this.files[0], 0);
    this.selectedIndex = 0;
  }

  saveFilesToLocalStorage() {
    console.log(JSON.stringify(this.files));
    localStorage.setItem('files', JSON.stringify(this.files));
  }

  handleFileUpload(event: any) {
    console.log('event', event.target.files);
    const newFiles: File[] = Array.from(event.target.files);

    const audioFiles = newFiles.filter((file) =>
      file.type.startsWith('audio/')
    );
    console.log('audioFiles', audioFiles);

    if (audioFiles.length > 0) {
      newFiles.forEach((file) => {
        const fileURL = URL.createObjectURL(file);
        this.files = [{ name: file.name, url: fileURL }];
      });
      this.saveFilesToLocalStorage();
      const final = this.files.length - 1;
      this.selectFile(this.files[final], final);
      this.selectedIndex = final;
      return;
    }

    alert('no es un archivo de audio');
  }

  selectFile(file: { name: string; url: string }, index: number) {
    this.selectedFile = file;
    this.audioURL = file.url;
    this.selectedIndex = index;
    if (this.audioPlayerRef && this.audioPlayerRef.nativeElement) {
      this.audioPlayerRef.nativeElement.src = this.audioURL;
      this.audioPlayerRef.nativeElement.load();
    } else {
      console.error('Audio player element not found');
    }
    this.reset();
  }

  play() {
    if (this.audioPlayerRef && this.audioPlayerRef.nativeElement) {
      this.disabledPlay = true;
      if (this.currentTime === 0) {
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
    console.log(this.playbackRate);
    if (this.audioPlayerRef && this.audioPlayerRef.nativeElement) {
      this.audioPlayerRef.nativeElement.playbackRate = this.playbackRate;
    }
  }

  updateTime() {
    if (this.audioPlayerRef && this.audioPlayerRef.nativeElement) {
      this.currentTime = this.audioPlayerRef.nativeElement.currentTime;
      this.duration = this.audioPlayerRef.nativeElement.duration;
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

  deleteFile(index: number) {
    this.files.splice(index, 1);
    //this.saveFilesToLocalStorage();

    if (this.selectedFile && index === this.files.indexOf(this.selectedFile)) {
      this.selectedFile = null;
      this.audioURL = null;
      if (this.audioPlayerRef && this.audioPlayerRef.nativeElement) {
        this.audioPlayerRef.nativeElement.src = '';
      }
    }

    if (this.files.length === 0) this.input = null;
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
    this.retoreTime();
  }

  retoreTime() {
    this.deleteElement = true;
    setTimeout(() => {
      this.deleteElement = false;
    }, 100);
  }
}
