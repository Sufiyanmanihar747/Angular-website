import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [ngClass]="{ 'visible': show, 'hidden': !show }" class="fixed top-20 right-4 bg-green-500 text-white p-4 rounded shadow">
      {{ message }}
    </div>
  `,
})
export class ToastComponent {

  @Input() message: string = '';
  show: boolean = false;

  showToast(message: string) {
    this.message = message;
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 3000); // Toast will disappear after 3 seconds
  }
}
