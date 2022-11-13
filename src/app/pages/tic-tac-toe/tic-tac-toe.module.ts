import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { TicTacToeComponent } from './tic-tac-toe.component';
import { TicTacToeRoutingModule } from './tic-tac-toe.routing';

@NgModule({
    imports: [SharedModule, TicTacToeRoutingModule, TranslateModule.forChild()],
    exports: [],
    declarations: [TicTacToeComponent],
    providers: [TicTacToeComponent],
})
export class TicTacToeModule { }
