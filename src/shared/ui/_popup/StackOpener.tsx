import { nanoid } from 'nanoid';
import { StackOpenerOptions } from './Interface';
import { Stack } from 'shared/ui/_popup/Stack';
import { PopupConfig } from 'shared/hooks/usePopup';


export class StackOpener {
	private $id: string;

	create(options: StackOpenerOptions): PopupConfig {
		const id = nanoid();
		return {
			id,
			Popup: () => <Stack id={id} {...options.templateOptions}/>
		}
	}

}