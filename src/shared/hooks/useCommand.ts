import { Store } from 'shared/lib/helpers';

export const useCommand = {
	subscribe: Store.Instance.subscribe.bind(Store.Instance),
	unsubscribe: Store.Instance.unsubscribe.bind(Store.Instance),
	sendCommand: Store.Instance.sendCommand.bind(Store.Instance),
};