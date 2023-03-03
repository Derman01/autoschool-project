import { nanoid } from 'nanoid';

type SubscribeCallback = (...params: any) => void;

interface Subscribe {
	id: string;
	callback: SubscribeCallback;
}

export class Store {
	private $subscribes: Map<string, Subscribe[]> = new Map();
	private $id_name: Map<string, string> = new Map();
	private static $instance: Store;

	public subscribe(command: string, callback: SubscribeCallback): string {
		const id = nanoid();
		const newSubscribe = {
			id,
			callback
		};
		const listSubscribes = this.$subscribes.get(command);
		if (listSubscribes) {
			listSubscribes.push(newSubscribe)
		} else {
			this.$subscribes.set(command, [newSubscribe]);
		}
		this.$id_name.set(command, id);
		return id;
	}

	public unsubscribe(id: string): void {
		const command = this.$id_name.get(id);
		if (command) {
			const subscribes = this.$subscribes.get(command);
			this.$subscribes.set(
				command,
				subscribes.filter((sub) => sub.id !== id)
			);
			this.$id_name.delete(id);
		}
	}

	public sendCommand(command: string, ...params: any): void {
		const subscribes = this.$subscribes.get(command);
		if (subscribes) {
			subscribes.forEach(({callback}) => {
				callback(...params);
			});
		}
	}

	 static get Instance() {
		return this.$instance || (this.$instance = new this());
	}

	private constructor() {}
}