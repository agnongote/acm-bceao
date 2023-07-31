import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShortNumberPipe } from './pipes/short-number.pipe';
import { OtpFieldInputComponent } from './components/otp-field-input/otp-field-input.component';
// import { TailwindPaginationComponent } from './components/tailwind-pagination/tailwind-pagination.component';
import { ModalServiceModule } from './services/modal-service/modal-service.module';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { MonthPickerComponent } from './components/month-picker/month-picker.component';

@NgModule({
	declarations: [ShortNumberPipe, OtpFieldInputComponent,
		// TailwindPaginationComponent,
		DatePickerComponent, MonthPickerComponent],
	imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, ],
	exports: [
		ShortNumberPipe,
		OtpFieldInputComponent,
		// TailwindPaginationComponent,
		DatePickerComponent,
		MonthPickerComponent,
		ModalServiceModule
	]
})
export class SharedModule {}
