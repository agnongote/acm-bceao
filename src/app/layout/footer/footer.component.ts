import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  year:string = new Date().getFullYear() == 2023 ? '2023' : `2023 ${new Date().getFullYear()}`;
  copyright: string = 'Orange CI'

  constructor() {
  }

  ngOnInit(): void {}
}
