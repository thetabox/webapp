import { ReactText } from 'react'
import { FileStatus, JobStatus } from '@thetabox/model'
import { CollectionNames, FieldUpdate } from '@thetabox/services'
import { Db } from '../../services/firebase/Firestore'
import { dayInUnix } from '../../services/helpers/DateHelper'

export async function QueForTranscode(ids: ReactText[]) {
	const db = new Db()
	await db.updateFieldAll(
		CollectionNames.files,
		ids.map((x): FieldUpdate => {
			return { id: x.toString(), field: 'transcode_status', value: JobStatus.Queued }
		})
	)
}

export async function ScheduleOnAir(ids: string[], on_air_date: Date) {
	const db = new Db()
	await db.updateFieldAll(
		CollectionNames.files,
		ids.map((x): FieldUpdate => {
			return { id: x.toString(), field: 'on_air_date', value: dayInUnix(on_air_date), secondField: 'file_status', secondValue: FileStatus.Stored }
		})
	)
}

export async function ScheduleDeletion(ids: ReactText[], delete_date: Date) {
	const db = new Db()
	await db.updateFieldAll(
		CollectionNames.files,
		ids.map((x): FieldUpdate => {
			return { id: x.toString(), field: 'delete_date', value: dayInUnix(delete_date) }
		})
	)
}
