import { Component } from '@angular/core';

@Component({
  selector: 'chat-loading',
  template: `<div class="loading">
    <div class="loading-circle circle1"></div>
    <div class="loading-circle circle2"></div>
    <div class="loading-circle circle3"></div>
  </div>`,
  styleUrl: './style.css',
})
export class ChatLoading {}
