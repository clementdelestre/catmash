import { Component, ComponentRef, TemplateRef, ViewChild, signal } from '@angular/core';
import { ApiService } from '../../../../../../core/http/api.service';
import { ModalService } from '../../../../../../core/services/modal.service';
import { Order } from '../../../../../../shared/constants/order.constant';
import { PageMetaDto } from '../../../../../../shared/dto/page-meta.dto';
import { PageOptionsDto } from '../../../../../../shared/dto/page-options.dto';
import { RankedCat } from '../../../../models/ranked-cat.model';
import { PageDto } from '../../../../../../shared/dto/page.dto';
import { firstValueFrom } from 'rxjs';
import { getCatPictureUrl } from '../../../../../../shared/tools/url.tool';
import { ImgProfileComponent } from '../../../../../../shared/components/img-profile/img-profile.component';

@Component({
  selector: 'app-novote',
  standalone: true,
  imports: [ImgProfileComponent],
  templateUrl: './novote.component.html',
  styleUrl: './novote.component.scss'
})
export class NovoteModalComponent {

  public getCatPictureUrl = getCatPictureUrl;
  isLoading = signal(false);

  noVoteModalComponent?: ComponentRef<any>
  @ViewChild('noVoteModalBody') noVoteModalBody!: TemplateRef<any>;

  pageMeta?: PageMetaDto;

  pagination: PageOptionsDto = {
    page: 1,
    take: 10,
    order: Order.DESC,
  };

  rankedCats = signal<RankedCat[]>([]);

  constructor(private readonly apiService: ApiService, private readonly modalService: ModalService) { }

  ngOnInit() {
  } 

  showNoVoteModal() {
    this.rankedCats.set([]);
    this.pagination.page = 1;
    this.getNoVote();
  }

  getNoVote() {
    this.isLoading.set(true);

    firstValueFrom(
      this.apiService.get<PageDto<RankedCat>>('score/novote', this.pagination),
    ).then((page) => {
      console.log(page);
      this.rankedCats.update((v) => [...v, ...page.data]);
      this.pageMeta = page.meta;
      this.isLoading.set(false);

      if(!this.noVoteModalComponent){
        this.noVoteModalComponent = this.modalService.showModal(`Chats sans vote (${ page.meta.itemCount })`, this.noVoteModalBody);
        this.noVoteModalComponent.onDestroy(() => { this.noVoteModalComponent = undefined})
      }
    });
  }

  loadMore() {
    this.pagination.page++;
    this.getNoVote();
  }

}
