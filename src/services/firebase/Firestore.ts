import { OrderByDirection } from '@firebase/firestore-types'
import { FieldUpdate, WhereFilter } from '@thetabox/services'
import delay from 'delay'
import {
	Firestore,
	collection,
	doc,
	setDoc,
	deleteDoc,
	writeBatch,
	getDoc,
	query,
	where,
	getDocs,
	orderBy,
	limit,
	startAt,
	updateDoc,
} from 'firebase/firestore'
import { firestore } from './Firebase'

export class Db {
	db: Firestore
	constructor(firestoreInstance: Firestore | any = firestore) {
		this.db = firestoreInstance
	}

	newId(): string {
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		let autoId = ''
		for (let i = 0; i < 40; i++) {
			autoId += chars.charAt(Math.floor(Math.random() * chars.length))
		}
		return autoId.toString()
	}

	async insertOne(path: string, newRecord: any, docId?: string): Promise<string | undefined> {
		try {
			const { id, ...newData } = newRecord
			if (docId !== undefined) {
				const addDoc = doc(this.db, path, docId)
				await setDoc(addDoc, newData)
				return docId
			}

			if (newRecord.id == undefined) {
				const addDoc = doc(this.db, path, this.newId())
				await setDoc(addDoc, newData)
				return
			}

			const oldDoc = doc(this.db, path, id)
			await setDoc(oldDoc, newData)
			return newData.id
		} catch (error) {
			console.error(`${error} during insert one with id ${docId}`)
			throw error
		}
	}

	chunk = <T>(arr: T[], size: number): T[][] => [...Array(Math.ceil(arr.length / size))].map((_, i) => arr.slice(size * i, size + size * i))

	/**
	 * upsert is overriding the old record
	 * @param path name of the path
	 * @param docs data
	 * @returns
	 */
	async insertMany<T extends { id: string; [x: string]: any }>(path: string, docs: T[]): Promise<any> {
		if (docs.length === 0) {
			console.info(`No docs to insert into ${path}`)
			return
		}

		try {
			const chunks = this.chunk(docs, 500)
			for (const chunk of chunks) {
				const batch = writeBatch(this.db)
				chunk.forEach((newDoc) => {
					const { id, ...newData } = newDoc
					if (newDoc.id !== undefined) {
						const addDoc = doc(this.db, path, newDoc.id)
						batch.set(addDoc, newData)
					} else {
						const addDoc = doc(this.db, path, id)
						batch.set(addDoc, newData)
					}
				})
				await batch.commit()
				await delay(1000)
			}
		} catch (error) {
			console.error(`${error} during insert many in path ${path}`)
		}
		return
	}

	async deleteMany(path: string, docs: any[]): Promise<any> {
		try {
			const batch = writeBatch(this.db)

			docs.forEach((delDoc) => {
				const toDeleteDoc = doc(this.db, path, delDoc.id)
				batch.delete(toDeleteDoc)
			})
			return await batch.commit()
		} catch (error) {
			console.error(`${error} during delete many in path ${path}`)
		}
		return
	}

	/**
	 *
	 * @param path
	 * @param id
	 * @returns A DocumentSnapshot which contains data read from a document in your Firestore database.
	 * The data can be extracted with .data() or .get(<field>) to get a specific field.
	 * For a DocumentSnapshot that points to a non-existing document, any data access will return 'undefined'.
	 * You can use the exists property to explicitly verify a document's existence.
	 */
	async findOneById<T>(path: string, id: string): Promise<T | undefined> {
		try {
			const findDoc = doc(this.db, path, id)
			const item = await getDoc(findDoc)

			if (!item.exists) {
				console.error(`Item not found with id ${id}`)
				return undefined
			}

			return item.data() as T
		} catch (error) {
			console.error(error)
		}
		return undefined
	}

	async deleteById(path: string, docPath: string): Promise<any> {
		try {
			const findDoc = doc(this.db, path, docPath)
			return await deleteDoc(findDoc)
		} catch (error) {
			console.error(error)
		}
		return
	}

	async find(path: string, filter: WhereFilter): Promise<any[]> {
		try {
			const { field, value, operator } = filter
			const q = query(collection(this.db, path), where(field, operator, value))
			const snapshot = await getDocs(q)

			if (snapshot.empty) {
				return []
			}

			return snapshot.docs.map((doc: any) => {
				return { ...doc.data(), id: doc.id }
			})
		} catch (error) {
			console.error(`${error} during find in ${path} with filter: ${JSON.stringify(filter)}`)
		}
		return []
	}

	async list(path: string): Promise<any[]> {
		try {
			const c = collection(this.db, path)
			const snapshot = await getDocs(c)
			if (snapshot.empty) {
				return []
			}

			return snapshot.docs.map((doc: any) => {
				return { ...doc.data(), id: doc.id }
			})
		} catch (error) {
			console.error(`${error} during list in ${path}`)
		}
		return []
	}

	/**
	 * list records smaller then
	 * @param path name of path
	 * @param field name of field
	 * @param value
	 * @returns list
	 */
	async listBy<T>(path: string, field: string, value: string | number): Promise<T[]> {
		try {
			const q = query(collection(this.db, path), where(field, '==', value))
			const snapshot = await getDocs(q)

			if (snapshot.empty) {
				return []
			}

			return snapshot.docs.map((doc: any) => {
				return { ...doc.data(), id: doc.id }
			})
		} catch (error) {
			console.error(`${error} during list by ${field} smaller then ${value} in ${path}`)
		}
		return []
	}

	/**
	 * list records smaller then
	 * @param path name of path
	 * @param field name of field
	 * @param value
	 * @returns list
	 */
	async listSmallerThen<T>(path: string, field: string, value: string | number): Promise<T[]> {
		try {
			const q = query(collection(this.db, path), where(field, '<', value))
			const snapshot = await getDocs(q)

			if (snapshot.empty) {
				return []
			}

			return snapshot.docs.map((doc: any) => {
				return { ...doc.data(), id: doc.id }
			})
		} catch (error) {
			console.error(`${error} during list ${field} smaller then ${value} in ${path}`)
		}
		return []
	}

	/**
	 * limited list
	 * @param path
	 * @param limit
	 * @param orderBy
	 * @param direction
	 * @returns
	 * https://firebase.google.com/docs/firestore/query-data/order-limit-data
	 */
	async limited(path: string, limitWith: number, order: string, direction?: OrderByDirection): Promise<any[]> {
		try {
			const q = query(collection(this.db, path), orderBy(order, direction), limit(limitWith))
			let snapshot = await getDocs(q)
			if (snapshot.empty) {
				return []
			}

			return snapshot.docs.map((doc: any) => {
				return { ...doc.data(), id: doc.id }
			})
		} catch (error) {
			console.error(error)
		}
		return []
	}

	async range(path: string, start: number, limitWith: number, order: string): Promise<any[]> {
		try {
			const q = query(collection(this.db, path), orderBy(order), startAt(start), limit(limitWith))
			let snapshot = await getDocs(q)
			if (snapshot.empty) {
				return []
			}

			return snapshot.docs.map((doc: any) => {
				return { ...doc.data(), id: doc.id }
			})
		} catch (error) {
			console.error(error)
		}
		return []
	}

	async upsert(path: string, id: string, data: any): Promise<void> {
		const found = await this.findOneById(path, id)
		if (found === undefined) {
			await this.insertOne(path, data, id)
		} else {
			this.update(path, id, data)
		}
	}

	async update(path: string, docId: string, data: any): Promise<void> {
		const options = { merge: true }
		const { id, ...rest } = data
		const docRef = doc(this.db, path, docId)
		await updateDoc(docRef, rest)
	}

	async count(path: string): Promise<number> {
		const colRef = collection(this.db, path)
		const snapshot = await getDocs(colRef)
		return snapshot.size
	}

	// https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
	updateField = async (path: string, id: string, field: string, value: any) => {
		const docRef = doc(this.db, path, id)
		await updateDoc(docRef, { [field]: value })
	}

	/**
	 * Writes to the document referred to by the provided DocumentReference.
	 * If the document does not exist yet, it will be created.
	 * If you provide merge or mergeFields, the provided data can be merged into an existing document.
	 */
	async updateFieldAll(path: string, fieldUpdates: FieldUpdate[]) {
		if (fieldUpdates.length === 0) return
		try {
			const chunks = this.chunk(fieldUpdates, 500)
			//console.log(`insert ${chunks.length} chunks of ${chunks.map((x) => x.length)}`)
			for (const chunk of chunks) {
				const batch = writeBatch(this.db)
				chunk.forEach((fieldUpdates) => {
					let { id, field, value } = fieldUpdates
					const toUpdate = doc(this.db, path, id)

					if (fieldUpdates.secondField && fieldUpdates.secondValue) {
						batch.update(toUpdate, { [field]: value, [fieldUpdates.secondField]: fieldUpdates.secondValue })
					}

					batch.update(toUpdate, { [field]: value, [field]: value })
				})

				await batch.commit()
				await delay(1000)
			}
		} catch (error) {
			console.error(`${error} during update many fields in path ${path}`)
		}
	}

	/**
	 * Writes to the document referred to by the provided DocumentReference.
	 * If the document does not exist yet, it will be created.
	 * If you provide merge or mergeFields, the provided data can be merged into an existing document.
	 */
	async updateAll(path: string, docs: any[]) {
		if (docs.length === 0) return
		const options = { merge: true }

		try {
			const chunks = this.chunk(docs, 500)
			//console.log(`insert ${chunks.length} chunks of ${chunks.map((x) => x.length)}`)
			for (const chunk of chunks) {
				const batch = writeBatch(this.db)
				chunk.forEach((item) => {
					let { id, ...rest } = item
					const toUpdate = doc(this.db, path, id)
					batch.set(toUpdate, rest, options)
				})

				await batch.commit()
				await delay(1000)
			}
		} catch (error) {
			console.error(`${error} during update many in path ${path}`)
		}
	}
}
