import { Component, input } from '@angular/core';
import { PodiumRank } from '../../../../models/podium-rank.enum';
import { RankedCat } from '../../../../models/ranked-cat.model';
import { getCatPictureUrl } from '../../../../../../shared/tools/url.tool';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-podium-card',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './podium-card.component.html',
  styleUrl: './podium-card.component.scss'
})
export class PodiumCardComponent {

  public PodiumRank = PodiumRank
  public getCatPictureUrl = getCatPictureUrl

  rankedCat = input.required<RankedCat>();
  rank = input.required<PodiumRank>();

  constructor() { }



}
