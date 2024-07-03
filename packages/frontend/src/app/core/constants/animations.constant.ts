import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const modalAnimation = trigger('modalAnimation', [
    transition(':enter', [
        group([
            query('.dialog-backdrop', [
                style({ 
                    opacity: 0
                 }),
                animate('200ms ease', style({ 
                    opacity: 1 
                }))
            ]),
            query('.dialog-container', [
                style({
                    opacity: 0,
                    transform: 'translateY(4px) scale(0.95)',
                }),
                animate('200ms ease-out', style({
                    opacity: 1,
                    transform: 'translateY(0) scale(1)',
                })),
            ]),
        ]),
    ]),
    transition(':leave', [
        group([
            query('.dialog-backdrop', [
                style({ 
                    opacity: 1 
                }), 
                animate('200ms ease-out', style({ 
                    opacity: 0 
                }))
            ]),
            query('.dialog-container', [
                style({
                    opacity: 1,
                    transform: 'translateY(0) scale(1)',
                }),
                animate('100ms ease-in', style({
                    opacity: 0,
                    transform: 'translateY(4px) scale(0.95)',
                })),
            ]),
        ]),
    ]),
])