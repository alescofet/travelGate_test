import { Component, Input, OnInit } from '@angular/core';
import { NormalisedHotel } from '../../util-models/normalised-hotel.model';

@Component({
  selector: 'app-plain-json',
  templateUrl: './plain-json.component.html',
  styleUrls: ['./plain-json.component.scss']
})
export class PlainJsonComponent implements OnInit {
  @Input() hotel: NormalisedHotel | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
