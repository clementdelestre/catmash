import { Component, input, output } from '@angular/core';
import { Cat } from '../../../../../../core/models/cat.model';
import { ApiService } from '../../../../../../core/http/api.service';
import { firstValueFrom } from 'rxjs';
import { getCatPictureUrl } from '../../../../../../shared/tools/url.tool';
import { ImgProfileComponent } from '../../../../../../shared/components/img-profile/img-profile.component';

@Component({
  selector: 'app-vote-card',
  standalone: true,
  imports: [ImgProfileComponent],
  templateUrl: './vote-card.component.html',
  styleUrl: './vote-card.component.scss',
})
export class VoteCardComponent {

  public getCatPictureUrl = getCatPictureUrl

  cat = input.required<Cat>();
  onVote = output<void>();

  constructor(private readonly apiService: ApiService) {}

  vote() {
    firstValueFrom(this.apiService.post('vote', { catId: this.cat().id })).then(() => {
      this.onVote.emit();
    });
  }

}
