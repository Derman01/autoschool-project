import create from 'zustand';
import { FC } from 'react';

export interface PopupConfig {
	id: string;
	Popup: FC;
}

interface PopupState {
	popups: PopupConfig[],
	openPopup: (config: PopupConfig) => string;
	closePopup: (id: string) => void;
}

export const usePopup = create<PopupState>(setState => ({
	popups: [],
	openPopup: ({id, Popup}: PopupConfig) => {
		setState(state => ({
			popups: [
				...state.popups,
				{
					id,
					Popup
				}
			]
		}));
		return id;
	},
	closePopup: (id: string) => setState(state => ({
		popups: state.popups.filter(popup => popup.id !== id)
	}))
}));