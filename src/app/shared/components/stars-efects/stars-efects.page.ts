import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  Input,
  OnChanges,
} from '@angular/core';
import { Router } from '@angular/router';

type Star = {
  x: number;
  y: number;
  z: number;
};

@Component({
  selector: 'app-stars-efects',
  templateUrl: './stars-efects.page.html',
  styleUrls: ['./stars-efects.page.scss'],
})
export class StarsEfectsPage implements AfterViewInit, OnDestroy, OnChanges {
  @Input() changeVelocity = 0.01;
  STAR_COLOR = '#fff'; //#9F1C1C
  STAR_SIZE = 3;
  STAR_MIN_SCALE = 0.2;
  OVERFLOW_THRESHOLD = 50;
  STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;

  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef;
  context: CanvasRenderingContext2D | null = null;

  scale = 1;
  width = 0;
  height = 0;
  stars: Star[] = [];
  pointerX!: number | null;
  pointerY!: number | null;
  velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.01 }; // Se incrementó el valor de z
  touchInput = false;
  accelerating = false;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.initializeCanvas();
    setTimeout(() => {}, 1000);
  }

  ngOnChanges(): void {
    this.accelerateAnimation();
  }

  initializeCanvas() {
    this.context = this.canvasRef.nativeElement.getContext('2d');
    this.generate();
    this.resize();
    this.step();
    window.onresize = () => this.resize();
    this.canvasRef.nativeElement.onmousemove = (event: MouseEvent) =>
      this.onMouseMove(event);
    this.canvasRef.nativeElement.ontouchmove = (event: TouchEvent) =>
      this.onTouchMove(event);
    this.canvasRef.nativeElement.ontouchend = () => this.onMouseLeave();
    document.onmouseleave = () => this.onMouseLeave();
  }

  ngOnDestroy(): void {
    window.onresize = null;
    document.onmouseleave = null;
    this.accelerating = false;
    this.velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.001 };
    this.STAR_SIZE = 3;
  }

  generate() {
    this.stars = Array.from({ length: this.STAR_COUNT }, () => ({
      x: 0,
      y: 0,
      z: this.STAR_MIN_SCALE + Math.random() * (1 - this.STAR_MIN_SCALE),
    }));
  }

  placeStar(star: Star) {
    star.x = Math.random() * this.width;
    star.y = Math.random() * this.height;
  }

  recycleStar(star: Star) {
    let direction = 'z';
    let vx = Math.abs(this.velocity.x);
    let vy = Math.abs(this.velocity.y);
    if (vx > 1 || vy > 1) {
      let axis;
      if (vx > vy) {
        axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
      } else {
        axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
      }
      if (axis === 'h') {
        direction = this.velocity.x > 0 ? 'l' : 'r';
      } else {
        direction = this.velocity.y > 0 ? 't' : 'b';
      }
    }
    star.z = this.STAR_MIN_SCALE + Math.random() * (1 - this.STAR_MIN_SCALE);
    if (direction === 'z') {
      star.z = 0.1;
      star.x = Math.random() * this.width;
      star.y = Math.random() * this.height;
    } else if (direction === 'l') {
      star.x = -this.OVERFLOW_THRESHOLD;
      star.y = this.height * Math.random();
    } else if (direction === 'r') {
      star.x = this.width + this.OVERFLOW_THRESHOLD;
      star.y = this.height * Math.random();
    } else if (direction === 't') {
      star.x = this.width * Math.random();
      star.y = -this.OVERFLOW_THRESHOLD;
    } else if (direction === 'b') {
      star.x = this.width * Math.random();
      star.y = this.height + this.OVERFLOW_THRESHOLD;
    }
  }

  resize() {
    this.scale = window.devicePixelRatio || 1;
    this.width = window.innerWidth * this.scale;
    this.height = window.innerHeight * this.scale;

    this.canvasRef.nativeElement.width = this.width;
    this.canvasRef.nativeElement.height = this.height;
    this.stars.forEach((star) => this.placeStar(star));
  }

  step() {
    this.context!.clearRect(0, 0, this.width, this.height);
    this.update();
    this.render();
    requestAnimationFrame(() => this.step());
  }

  update() {
    this.velocity.tx *= 0.96;
    this.velocity.ty *= 0.96;

    this.velocity.x += (this.velocity.tx - this.velocity.x) * 0.8;
    this.velocity.y += (this.velocity.ty - this.velocity.y) * 0.8;

    this.stars.forEach((star) => {
      star.x += this.velocity.x * star.z;
      star.y += this.velocity.y * star.z;

      star.x += (star.x - this.width / 2) * this.velocity.z * star.z;
      star.y += (star.y - this.height / 2) * this.velocity.z * star.z;
      star.z += this.velocity.z;

      if (
        star.x < -this.OVERFLOW_THRESHOLD ||
        star.x > this.width + this.OVERFLOW_THRESHOLD ||
        star.y < -this.OVERFLOW_THRESHOLD ||
        star.y > this.height + this.OVERFLOW_THRESHOLD
      ) {
        this.recycleStar(star);
      }
    });
  }

  render() {
    this.stars.forEach((star) => {
      this.context!.beginPath();
      this.context!.beginPath();
      this.context!.lineCap = 'round';
      this.context!.lineWidth = this.STAR_SIZE * star.z * this.scale;
      this.context!.globalAlpha = 0.5 + 0.5 + Math.random();
      this.context!.strokeStyle = this.STAR_COLOR;

      this.context!.beginPath();
      this.context!.moveTo(star.x, star.y);

      let tailX = this.velocity.x * 2;
      let tailY = this.velocity.y * 2;

      if (Math.abs(tailX) < 0.1) tailX = 0.5;
      if (Math.abs(tailY) < 0.1) tailY = 0.5;

      this.context!.lineTo(star.x + tailX, star.y + tailY);
      this.context!.stroke();
    });
  }

  movePointer(x: number, y: number) {
    if (!this.pointerX || !this.pointerY) {
      this.pointerX = x;
      this.pointerY = y;
      return;
    }
    let ox = x - this.pointerX;
    let oy = y - this.pointerY;
    this.velocity.tx =
      this.velocity.tx + (ox / 8) * this.scale * (this.touchInput ? 1 : -1);
    this.velocity.ty =
      this.velocity.ty + (oy / 8) * this.scale * (this.touchInput ? 1 : -1);
    this.pointerX = x;
    this.pointerY = y;
  }

  onMouseMove(event: MouseEvent) {
    this.touchInput = false;
    this.movePointer(event.clientX, event.clientY);
  }

  onTouchMove(event: TouchEvent) {
    event.preventDefault();
    this.touchInput = true;
    this.movePointer(event.touches[0].clientX, event.touches[0].clientY);
  }

  onMouseLeave() {
    this.pointerX = null;
    this.pointerY = null;
  }

  accelerateAnimation() {
    this.accelerating = true;
    //this.velocity.z = 0.475;
    this.velocity.z = 0.01 * this.changeVelocity * this.changeVelocity;
    if (this.changeVelocity > 1.49)
      this.velocity.z = 0.03 * this.changeVelocity;
    this.STAR_SIZE = 5;
  }
}
