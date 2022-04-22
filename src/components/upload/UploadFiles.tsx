import { Box, DataTable, Text } from 'grommet'
import { FunctionComponent, useEffect, useState } from 'react'
import { CardBox } from '../common/CardBox'
import { ViewLabel } from '../common/CardLabel'
import { onSnapshot } from 'firebase/firestore'
import { collection, query, where } from 'firebase/firestore'
import { FileHub, FileStatus } from '@thetabox/model'
import { CollectionNames, DateHelper } from '@thetabox/services'
import { firestore } from '../../services/firebase/Firebase'
import { bytes, fileStatus, unixToDateTime } from '../common/ColumnHelpers'

type Props = {
	account: string | null | undefined
}

export const UploadFiles: FunctionComponent<Props> = ({ account = '' }) => {
	const [fileInfos, setFileInfos] = useState<FileHub[]>([])
	const [error, setError] = useState('')

	useEffect(() => {
		const colRef = collection(firestore, CollectionNames.files.toString())
		const newFiles = where('file_status', 'in', [FileStatus.New, FileStatus.ToStore, FileStatus.Stored])
		const lastDayFiles = where('upload_time', '>=', DateHelper.yesterday())
		const q = query(colRef, newFiles, lastDayFiles, where('account', '==', account))
		const unsubscribe = onSnapshot(
			q,
			(querySnapshot) => {
				const files = querySnapshot.docs.map((docSnapshot) => {
					let fileInfo = docSnapshot.data() as FileHub
					fileInfo.id = docSnapshot.id
					return fileInfo
				})
				setFileInfos(files)
			},
			(error) => {
				console.error(error)
				setError(error.message)
			}
		)
		return unsubscribe
	}, [account])

	return (
		<CardBox>
			<ViewLabel text="upload box" />

			<Box direction="row-responsive">
				<DataTable
					sortable
					step={10}
					paginate
					primaryKey={true}
					columns={[
						{
							property: 'name',
							header: <Text>Name</Text>,
						},
						{
							property: 'id',
							primary: true,
							render: () => <></>,
						},
						{
							property: 'file_status',
							header: <Text>File status</Text>,
							align: 'center',
							render: (datum: FileHub) => fileStatus(datum.file_status),
						},
						{
							property: 'size',
							header: <Text>Size</Text>,
							sortable: true,
							render: (datum: FileHub) => bytes(datum.size),
						},
						{
							property: 'upload_time',
							header: <Text>Upload time</Text>,
							sortable: true,
							render: (datum: FileHub) => unixToDateTime(datum.upload_time),
						},
					]}
					data={fileInfos}
				/>
			</Box>
		</CardBox>
	)
}

export default UploadFiles