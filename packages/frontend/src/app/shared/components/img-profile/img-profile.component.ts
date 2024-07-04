import { Component, effect, input } from '@angular/core';

@Component({
  selector: 'app-img-profile',
  standalone: true,
  imports: [],
  templateUrl: './img-profile.component.html',
  styleUrl: './img-profile.component.scss'
})
export class ImgProfileComponent {

  src = input.required<string>();
  imgclass = input<string>("");

  pulse = true

  constructor(){
    effect(() => {
      //Call this.src() to trigger the effect
      this.src()
      this.setPulse(true)
    })
  }

  setPulse(value: boolean) {
    this.pulse = value
  }
}
