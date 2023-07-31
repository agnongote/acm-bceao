import { Component, ComponentRef, Injector, Input, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * container class component
 */
@Component({
	template: `
		<input type="checkbox" id="view-facture" class="modal-toggle" [checked]="true" />
		<div class="modal {{ modalClass }}">
			<div class="modal-box !rounded-t-md !rounded-b-md p-2 {{ modalBoxClass }}">
				<ng-template #modalContainer></ng-template>
			</div>
		</div>
	`,
	styles: [
		`
			@media (max-height: 480px) {
				.modal {
					align-items: start !important;
				}
			}
			.modal.scrollable {
				background-color: red !important;
			}
			.modal:not(.scrollable) {
				overflow: auto;
				/* padding-top: 5vh; */
			}
			.modal:not(.scrollable) > .modal-box {
				/* max-height: max-content !important; */
				max-height: 90vh;
				overflow: auto;

			}

			.modal:not(.scrollable) > .modal-box.modal-header {
					position: fixed;
				}
			
		`
	]
})
export class ModalContainerComponent implements OnInit {
	//
	@ViewChild('modalContainer', { read: ViewContainerRef }) private modalContainer!: ViewContainerRef;
	//
	@Input() modalClass?: string | '';
	@Input() modalBoxClass?: string | '';
	@Input() options?: ModalOptions;
	/**
	 *
	 */
	constructor() {}
	/**
	 *
	 */
	ngOnInit() {}
	/**
	 *
	 * @param component
	 * @param contentInjector
	 * @param _activeModal
	 * @returns
	 */
	createModal<T>(component: Type<T>, contentInjector: Injector, _activeModal: ActiveModal): ComponentRef<T> {
		this.modalContainer.clear();
		const _injector: Injector = Injector.create({ providers: [{ provide: ActiveModal, useValue: _activeModal }], parent: contentInjector });

		return this.modalContainer.createComponent(component, {
			injector: _injector
		});
	}
}

/**
 * A reference to the newly opened modal returned by the `ModalService.open()` method.
 */
export class ModalRef {
	private _closed = new Subject<any>();
	private _dismissed = new Subject<any>();
	// private _hidden = new Subject<void>();
	private _resolve!: (result?: any) => void;
	private _reject!: (reason?: any) => void;

	/**
	 * The instance of a component used for the modal content.
	 *
	 * When a `TemplateRef` is used as the content or when the modal is closed, will return `undefined`.
	 */
	get componentInstance(): any {
		if (this.modal) {
			return this.modal.instance;
		}
	}

	/**
	 * The promise that is resolved when the modal is closed and rejected when the modal is dismissed.
	 */
	result: Promise<any>;

	constructor(private modalContainer: ComponentRef<ModalContainerComponent>, private modal: ComponentRef<any>) {
		this.modal.instance.modalInstance = this;

		this.result = new Promise((resolve, reject) => {
			this._resolve = resolve;
			this._reject = reject;
		});
		this.result.then(null, () => {});
	}

	close(result?: any): void {
		if (this.modalContainer) {
			this._closed.next(result);
			this._resolve(result);
			this._removeModal();
		}
	}

	private _dismiss(reason?: any) {
		this._dismissed.next(reason);
		this._reject(reason);
		this._removeModal();
	}

	dismiss(reason?: any): void {
		if (this.modalContainer) {
			this._dismiss(reason);
		}
	}

	private _removeModal() {
		this.modalContainer.destroy();
	}
}

/**
 * A reference to the currently opened (active) modal.
 *
 * Instances of this class can be injected into your component passed as modal content.
 * So you can `.close()` or `.dismiss()` the modal window from your component.
 */
export class ActiveModal {
	/**
	 * Closes the modal with an optional `result` value.
	 *
	 * The `NgbModalRef.result` promise will be resolved with the provided value.
	 */
	close(result?: any): void {}

	/**
	 * Dismisses the modal with an optional `reason` value.
	 *
	 * The `NgbModalRef.result` promise will be rejected with the provided value.
	 */
	dismiss(reason?: any): void {}
}

/**
 * Options available when opening new modal windows with `ModalService.open()` method.
 */
export interface ModalOptions {
	/**
	 * Size of a new modal window.
	 */
	size?: 'sm' | 'md' | 'lg' | 'xl' | string;
	/**
	 * Display modal on bottom when we are on mobile device
	 */
	modalOnBottom?: 'sm' | 'md' | 'lg' | 'xl' | false;
	/**
	 * Scrollable modal content (false by default).
	 */
	scrollable?: boolean;
}

export function buildModalClass(options: ModalOptions | undefined): any {
	const _defaultSize: string = options?.modalOnBottom ? options.modalOnBottom : 'sm';
	const size: string = options?.size ? options.size : 'sm';
	let _widthClass: string = WIDTH_TAILWIND_CSS_CLASS[size];

	if (!options || Object.keys(options).length === 0) {
		return {
			notCalc: 'default options...',
			modalClass: 'modal-bottom ' + _defaultSize + ':modal-middle ',
			modalBoxClass: _widthClass
		};
	}
	//

	let _modalOnBottomClass: string = 'modal-bottom ' + _defaultSize + ':modal-middle';
	if (options.modalOnBottom === false) {
		_modalOnBottomClass = 'modal-middle';
	}
	//
	return {
		modalClass: _modalOnBottomClass,
		modalBoxClass: _widthClass
	};
}

const WIDTH_TAILWIND_CSS_CLASS: any = {
	xs: '!max-w-[28rem]',
	sm: '!max-w-[36rem]',
	md: '!max-w-[48rem]',
	lg: '!max-w-[64rem]',
	xl: '!max-w-[80rem]'
};
