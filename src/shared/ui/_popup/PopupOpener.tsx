import { nanoid } from 'nanoid';
import { PopupOpenerOptions, PopupOptions } from './Interface';
import { Stack } from 'shared/ui/_popup/Stack';
import { PopupConfig } from 'shared/hooks/usePopup';
import { Modal } from 'shared/ui/_popup/Modal';
import { FC } from 'react';
import { useCommand } from 'shared/hooks/useCommand';


export class PopupOpener {

	private static createPopup(options: PopupOpenerOptions, Popup: FC<PopupOptions>) {
		const id = nanoid();
		const config = {
			id,
			Popup: () => <Popup id={id} {...options.templateOptions}/>
		};
		useCommand.sendCommand('openPopup', config);
		return config;
	}

	static createStack(options: PopupOpenerOptions): PopupConfig {
		return PopupOpener.createPopup(options, Stack)
	}

	static createModal(options: PopupOpenerOptions): PopupConfig {
		return PopupOpener.createPopup(options, Modal)
	}
}