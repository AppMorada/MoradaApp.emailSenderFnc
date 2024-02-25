import { initializeApp } from 'firebase-admin/app';
import { Firestore } from 'firebase-admin/firestore';
import admin from 'firebase-admin';
import { injectable } from 'inversify';

interface IFirestoreContainer {
	INSTANCE: undefined | Firestore;
}

export const firestoreServiceId = Symbol.for('__firestore_service__');
const FIRESTORE: IFirestoreContainer = {
	INSTANCE: undefined,
};

@injectable()
export class FirestoreService {
	private readonly ref: Firestore;

	constructor() {
		if (!FIRESTORE.INSTANCE) {
			initializeApp({
				projectId: process.env.GCP_PROJECT,
			});

			FIRESTORE.INSTANCE = admin.firestore();
			FIRESTORE.INSTANCE.settings({
				ignoreUndefinedProperties: true,
			});
		}

		this.ref = FIRESTORE.INSTANCE;
		console.log('Connected!');
	}

	get instance(): Firestore {
		return this.ref;
	}

	async close() {
		await this.ref.terminate();
	}
}
