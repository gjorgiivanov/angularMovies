import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import {
  latLng,
  LeafletMouseEvent,
  icon,
  Marker,
  tileLayer,
  marker,
} from 'leaflet';
import { coordinatesMap, coordinatesMapWithMessage } from './coordinate';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  ngOnInit(): void {
    this.layers = this.initialCoordinates.map((coordinate) => {
      const m = marker([coordinate.latitude, coordinate.longitude]);

      if (coordinate.message) {
        m.bindPopup(coordinate.message, { autoClose: false, autoPan: false });
      }

      return m;
    });
  }

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Angular Movies',
      }),
    ],
    zoom: 13,
    center: latLng(41.995359905903676, 21.424581438640477),
    worldCopyJump: true,
  };

  layers: Marker<any>[] = [];

  @Input()
  initialCoordinates: coordinatesMapWithMessage[] = [];

  @Input()
  editMode: boolean = true;

  @Output()
  onSelectLocation = new EventEmitter<coordinatesMap>();

  handleClick(event: LeafletMouseEvent): void {
    if (this.editMode) {
      const latitude = event.latlng.lat;
      const longitude = event.latlng.lng;

      this.layers = [];
      this.layers.push(new Marker([latitude, longitude]));
      this.onSelectLocation.emit({ latitude: latitude, longitude: longitude });
    }
  }
}
