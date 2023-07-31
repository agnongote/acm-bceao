import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';

export const slideAnimation2 = trigger('routeAnimations', [
	state('in', style({ transform: 'translateX(0)' })),
	transition('void => *', [style({ transform: 'translateX(-100%)' }), animate(300)]),
	transition('* => *', [animate(300, style({ transform: 'translateX(100%)' }))])
]);

export const slideAnimation = trigger('routeAnimations', [
	transition('void => *', animate(0)),
	transition('* => AUTH', [
		style({ position: 'relative' }),
		query(
			':enter, :leave',
			[
				style({
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%'
				})
			],
			{ optional: true }
		),
		query(':enter', [style({ left: '-100%' })]),
		query(':leave', animateChild(), { optional: true }),
		group([
			query(':leave', [animate('300ms ease-out', style({ left: '100%' }))], { optional: true }),
			query(':enter', [animate('300ms ease-out', style({ left: '0%' }))])
		])
	]),
	transition('* => *', [
		style({ position: 'relative' }),
		query(
			':enter, :leave',
			[
				style({
					position: 'absolute',
					top: 0,
					right: 0,
					width: '100%'
				})
			],
			{ optional: true }
		),
		query(':enter', [style({ right: '-100%' })]),
		query(':leave', animateChild()),
		group([
			query(':leave', [animate('300ms ease-out', style({ right: '100%', opacity: 0 }))]),
			query(':enter', [animate('400ms ease-out', style({ right: '0%' }))]),
			query('@*', animateChild(), {optional : true})
		])
	])
]);
