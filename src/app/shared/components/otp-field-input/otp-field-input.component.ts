import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'otp-field-input',
  templateUrl: './otp-field-input.component.html',
  styleUrls: ['./otp-field-input.component.scss']
})
export class OtpFieldInputComponent  implements OnInit, AfterViewInit {
  /**
   * 
   */
  @Input() codeLength: number = 4;
  @Input() onlyNumber: boolean = true;
  @Output() onUpdateValue: EventEmitter<string> = new EventEmitter();
  @ViewChild('otpWrapper') otpWrapper!: ElementRef<HTMLDivElement>;

  value: any[] = [];
  /**
   * 
   */
  constructor() {

  }
  /**
   * 
   */
  ngOnInit(): void {

  }
  /**
   * 
   */
	ngAfterViewInit(): void {
		if (this.otpWrapper) {
			const childList : NodeListOf<ChildNode> = this.otpWrapper.nativeElement.childNodes;
			childList.forEach((child : ChildNode,  i:number) =>{
        this.value[i] = "";
				const input : HTMLInputElement | null = <HTMLInputElement>child.firstChild;
        //
				if(!this.isNullOrEmpty(input)) {
					input.addEventListener('keyup', ($event : any) => {
            const _keyCode : string = $event.code;
            //
            input.value = $event.key;
            if(new RegExp('[0-9]').test($event.target.value) === false) {
              input.value = '';
            }
            const _digitOrLetter = ['digit', 'key'].some(el => _keyCode.toLowerCase().includes(el));
						if(_keyCode === "Backspace" && this.isNullOrEmpty($event.target.value)) {
              //delete and focus to the previous child
              if(i > 0) {
                const previousInput : HTMLElement = <HTMLInputElement>childList[i-1].firstChild;
                previousInput.focus();
              }
						} else if(_digitOrLetter && $event.target.value && i < this.codeLength -1 ) {
                const nextInput : HTMLElement = <HTMLInputElement>childList[i+1].firstChild;
                nextInput.focus();
						}
            this.value[i] = input.value;
            this.onUpdateValue.emit(this.value.join("").toString());
					})
				}
			})
		}
	}

  /**
   * Check if value is null or empty
   * @param value 
   * @returns 
   */
	isNullOrEmpty(value: any): boolean {
		if (value && typeof value === 'object') {
			return Object.entries(value).length === 0 && value.constructor === Object;
		} else {
			return value === null || value === '' || value === undefined || value.length === 0;
		}
	}
  /**
   * Check if value is number
   * @param value 
   * @returns 
   */
	isNum(value:any) {
		return typeof value === 'number'
	}
  /**
   * 
   */
}
