import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})

export class TagComponent implements OnInit {
  tag: any;
  tags: any[] = [];

  constructor() { }

  ngOnInit() {
    this.tags = [
      { text: '标签一', type: 'gray' },
      { text: '标签二', type: 'primary' },
      { text: '标签三', type: 'success' },
      { text: '标签四', type: 'warning' },
      { text: '标签四', type: 'danger' }
    ];
  }

  closeTag(index: any) {
    this.tags.splice(index, 1);
  }

  clickTag(event: any) {
    this.tag = `text:${event.text}; type:${event.type}`;
  }

}
