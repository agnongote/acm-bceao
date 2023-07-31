import { ApplicationRef, EventEmitter, Injectable, Injector, Type } from '@angular/core';

import { ActiveModal, ModalContainerComponent, ModalOptions, ModalRef, buildModalClass } from './modal.model';
import { Utilities } from '../utilities.service';

@Injectable({ providedIn: 'root' })
export class ModalService {
	private modalRefs: ModalRef[] = [];
	private activeInstances: EventEmitter<ModalRef[]> = new EventEmitter();
	private modalContainer!: HTMLElement;
	
	constructor(private appRef: ApplicationRef, private _injector: Injector, private _util: Utilities) {}

	open<T>(component: Type<T>, options?: ModalOptions): ModalRef {
		// create a container for modal
		this.modalContainer = document.createElement('div');
		document.getElementsByTagName('body')[0].appendChild(this.modalContainer);

		const _activeModal = new ActiveModal();

		// Insert container component in modal container DOM element
		const modalContainerRef = this.appRef.bootstrap(ModalContainerComponent, this.modalContainer);

		const _cssClass = buildModalClass(options);

		modalContainerRef.instance.modalClass = _cssClass.modalClass;
		modalContainerRef.instance.modalBoxClass = _cssClass.modalBoxClass;
		modalContainerRef.changeDetectorRef.detectChanges();

		const modalComponentRef = modalContainerRef.instance.createModal(component, this._injector, _activeModal);

		const modalRef = new ModalRef(modalContainerRef, modalComponentRef);

		_activeModal.close = (result: any) => {
			modalRef.close(result);
		};
		_activeModal.dismiss = (reason: any) => {
			modalRef.dismiss(reason);
		};

		this._registerModalRef(modalRef);
		return modalRef;
	}

	private _registerModalRef(modalRef: ModalRef) {
		const unregisterModalRef = () => {
			const index = this.modalRefs.indexOf(modalRef);
			if (index > -1) {
				this.modalRefs.splice(index, 1);
				this.activeInstances.emit(this.modalRefs);
			}
		};
		const handleError = (err: any) => {console.log("error", err);}
		this.modalRefs.push(modalRef);
		this.activeInstances.emit(this.modalRefs);
		modalRef.result.then(unregisterModalRef).catch(handleError);
	}
}
