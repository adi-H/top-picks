import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
	// this is a singletone class that allows u to have only
	// one instanse of a Stan connected in the microservice

	private _client?: Stan;

	get client() {
		if (!this._client) {
			throw new Error('cant access nats before client connects');
		}

		return this._client;
	}

	connect(clusterId: string, clientId: string, url: string) {
		this._client = nats.connect(clusterId, clientId, { url });

		return new Promise<void>((resolve, reject) => {
			this._client!.on('connect', () => {
				console.log('Connected to NATS');
				resolve();
			});
			this._client!.on('error', (err) => {
				reject(err);
			});
		});
	}
}

export const natsWrapper = new NatsWrapper();
