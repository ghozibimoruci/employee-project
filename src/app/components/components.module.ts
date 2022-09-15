import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';
import { MatRadioModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatRadioModule,
    TranslateModule.forChild()
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ComponentsModule { }
