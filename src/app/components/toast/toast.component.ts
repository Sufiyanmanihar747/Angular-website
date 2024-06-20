import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="{ 'visible': show, 'hidden': !show }" class="fixed top-20 right-4 text-white p-4 rounded shadow" [class]="bgColor">
      {{ message }}
    </div>
  `,
})
export class ToastComponent {

  @Input() message: string = '';
  show: boolean = false;
  bgColor: string = 'bg-green-500';
  showToast(message: string, bgColor?: string) {
    this.message = message;
    this.bgColor = bgColor ? bgColor : 'bg-green-500';
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 3000); // Toast will disappear after 3 seconds
  }
}
