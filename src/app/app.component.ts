import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { UiThemeService } from './shared/services/ui-theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'acm-bceao';
  constructor(private contexts: ChildrenOutletContexts, public _uiThemeService: UiThemeService) {
		// this._uiThemeService.handleThemePreference();
	}
	getRouteAnimationData() {
		return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
	}
}
