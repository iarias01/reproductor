import { animation } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  Renderer2,
  inject,
  Inject,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { IonInput } from '@ionic/angular';
import { LocationService } from 'src/app/services/location/location.service';
import { environment } from 'src/environments/environment';
declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements AfterViewInit {
  @Input() searcheable = true;
  @Output() searchPostion = new EventEmitter();
  @ViewChild('map') mapElement!: ElementRef;
  @ViewChild('autocomplete', { static: true }) autocompleteInput!: IonInput;

  mapsLoaded = false;
  map: any;
  positionSet: any;
  marker: any;
  infowindow: any;
  apiKey = environment.mapsApiKey;
  mapUrl: string = 'https://maps.app.goo.gl/';
  urlApiKey: string = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}`;

  constructor(
    private renderer2: Renderer2,
    private locationService: LocationService,
    @Inject(DOCUMENT) private document
  ) {}

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    new Promise((resolve) => {
      if (this.mapsLoaded) {
        resolve(true);
        return;
      }

      const script = this.renderer2.createElement('script');
      script.id = 'googleMaps';
      window['mapInit'] = () => {
        this.mapsLoaded = true;
        if (!google) {
          console.log('google is not defined');
        }
        resolve(true);
        return;
      };
      script.src = this.urlApiKey + '&callback=mapInit&libraries=places';
      this.renderer2.appendChild(this.document.body, script);
    })
      .then(() => {
        this.initMap();
      })
      .catch((err) => {
        console.log('error', err);
      });
  }

  async initMap() {
    const { lat, lng } = this.locationService.getMyPosition();
    const country = await this.locationService.reverseGeocode(lat, lng);
    const position = {
      lat,
      lng,
    };
    let latLng = new google.maps.LatLng(position.lat, position.lng);
    const mapOptions = {
      center: latLng,
      zoom: 15,
      disableDefaultUI: true,
      clickableIcons: false,
      types: ['address'],
      componentRestrictions: { country },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      draggable: this.searcheable,
    });
    if (this.searcheable) {
      this.initializeAutocomplete();
    }
    /* 
    
    const label = {
      titulo: 'Ubicación',
      subtitulo: 'Mi Ubicación de envío',
    };
     this.map.addListener('place_changed', () => {
      const place = this.map.getPlace();
      if (place.geometry) {
        const latitude = place.geometry.location.lat();
        const longitude = place.geometry.location.lng();
        console.log('Latitud:', latitude, 'Longitud:', longitude);
      }
    }); */
    /* this.clickHandleEvent();
    this.infowindow = new google.maps.InfoWindow(); */

    this.addMarker(position);
    //this.setInfoWindow(this.marker, label.titulo, label.subtitulo);

    // Cargar el mapa desde la URL proporcionada
    //this.loadMapFromUrl(this.mapUrl);
  }

  addMarker(position) {
    let latLng = new google.maps.LatLng(position.lat, position.lng);
    this.marker.setPosition(latLng);
    this.map.panTo(position);
    //this.positionSet = position;
  }

  async initializeAutocomplete() {
    try {
      const { lat, lng } = this.locationService.getMyPosition();
      const country = await this.locationService.reverseGeocode(lat, lng);

      const inputElement = await this.autocompleteInput.getInputElement();
      const autocomplete = new google.maps.places.Autocomplete(inputElement, {
        types: ['address'],
        //componentRestrictions: { country },
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          //console.log('place', place);
          const latitude = place.geometry.location.lat();
          const longitude = place.geometry.location.lng();
          const position = { lat: latitude, lng: longitude };
          this.addMarker(position);
          this.searchPostion.emit({
            position,
            link: this.getUrl(place.url),
            address: place.formatted_address,
          });
        }
      });
    } catch (error) {
      console.error('Error obteniendo la ubicación del usuario', error);
    }
  }

  getUrl(url) {
    return url.split('com/?')[1];
  }
}
