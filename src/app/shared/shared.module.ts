import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatNativeDateModule,
  MatExpansionModule,
  MatStepperModule,
  MatSnackBarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatDividerModule,
  MatSelectModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatPaginatorModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatChipsModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatTabsModule
} from "@angular/material";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from '@angular/http';
import { Pagination } from "../components/pagination/pagination.component";

@NgModule({
  imports: [
    CommonModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatStepperModule,
    MatSnackBarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatTabsModule,
  ],
  declarations: [
    Pagination
  ],
  providers: [
    Pagination
  ],
  exports: [
    CommonModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatStepperModule,
    MatSnackBarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    HttpModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    Pagination
  ]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
