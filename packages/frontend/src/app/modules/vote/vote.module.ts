import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoteRoutingModule } from './vote-routing.module';
import { CoreModule } from '../../core/core.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreModule,
    VoteRoutingModule
  ]
})
export class VoteModule { }
