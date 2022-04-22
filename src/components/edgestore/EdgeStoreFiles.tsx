import { Box, Button, DataTable, Layer, Text, CheckBox, Collapsible, Tip } from 'grommet'
import { FunctionComponent, useEffect, useState } from 'react'
import { CardBox } from '../common/CardBox'
import { ViewLabel } from '../common/CardLabel'
import { PlayFill, Tree } from 'grommet-icons'
import { onSnapshot } from 'firebase/firestore'
import { collection, query, where, orderBy } from 'firebase/firestore'
import { FileEdgeStore, FileStatus } from '@thetabox/model'
import { CollectionNames } from '@thetabox/services'
import { firestore } from '../../services/firebase/Firebase'
import Player from '../common/Player'
import { fileStatus, unixToDate, unixToDateTime } from '../common/ColumnHelpers'
import { MediaInfoDetails } from '../common/file/MediaInfoDetails'
import { JsonView } from '../common/file/JsonView'
import { ScheduleView } from '../common/file/ScheduleView'

type Props = {
	account: string | null | undefined
}

export const EdgeStoreFiles: FunctionComponent<Props> = ({ account = '' }) => {
	const [filesEdgeStore, setFilesEdgeStore] = useState<FileEdgeStore[]>([])
	const [error, setError] = useState('')
	const [fileEdgeStore, setFileEdgeStore] = useState<FileEdgeStore>()
	const [showPlayer, setShowPlayer] = useState<boolean>()
	const [checked, setChecked] = useState<string[]>([])
	const [showJson, setShowJson] = useState(false)

	useEffect(() => {
		const colRef = collection(firestore, CollectionNames.files.toString())
		const q = query(colRef, where('account', '==', account), where('file_status', 'in', [FileStatus.Stored, FileStatus.OnNetwork])
		, orderBy('update_time', 'desc')
		)
		const unsubscribe = onSnapshot(
			q,
			(querySnapshot) => {
				const files = querySnapshot.docs.map((docSnapshot) => {
					let fileInfo = docSnapshot.data() as FileEdgeStore
					fileInfo.id = docSnapshot.id
					return fileInfo
				})
				setFilesEdgeStore(files)
			},
			(error) => {
				console.error(error)
				setError(error.message)
			}
		)
		return unsubscribe
	}, [account])

	const onClose = () => setShowPlayer(undefined)

	const onCheck = (event: { target: { checked: boolean } }, value: string) => {
		if (event.target.checked) {
			setChecked([...checked, value])
		} else {
			setChecked(checked.filter((item) => item !== value))
		}
	}

	return (
		<CardBox>
			{showPlayer && (
				<Layer position="bottom-right" onClickOutside={onClose} onEsc={() => setShowPlayer(false)} modal={false} plain>
					{fileEdgeStore && <Player setShow={onClose} file={fileEdgeStore} />}
				</Layer>
			)}

			<ViewLabel text="edge storage box" />
			<ScheduleView checked={checked} setChecked={setChecked} />
			<DataTable
				data={filesEdgeStore}
				sortable
				step={40}
				paginate
				primaryKey={true}
				columns={[
					{
						property: 'checkbox',
						render: (datum: FileEdgeStore) => {
							return (
								<Tip  content="Select to set play out date">
								<Box>

									<CheckBox key={datum.id} checked={checked.indexOf(datum.id) !== -1} onChange={(e) => onCheck(e, datum.id)} />
								</Box>
								</Tip>
							)
						},
						sortable: false,
						verticalAlign: 'top',
					},
					{
						property: 'name',
						header: <Text>Name</Text>,
						search: true,
						verticalAlign: 'top',
						size: 'small',
					},
					{
						property: 'id',
						primary: true,
						render: () => <></>,
					},
					{
						property: 'url',
						header: <Text>Video</Text>,
						align: 'center',
						size: '50px',
						verticalAlign: 'top',
						render: (datum: FileEdgeStore) => {
							return (
								<>
									{datum.edgeStore.key ? (
										<Button
											plain
											size="small"
											tip="Open video player"
											onClick={(e) => {
												// e.preventDefault()
												setFileEdgeStore(datum)
												setShowPlayer(true)
											}}
											icon={<PlayFill />}
										/>
									) : (
										<></>
									)}
								</>
							)
						},
					},
					{
						property: 'file_status',
						header: <Text>File status</Text>,
						align: 'center',
						render: (datum: FileEdgeStore) => fileStatus(datum.file_status),
						verticalAlign: 'top',
						size: '100px',
					},
					{
						property: 'upload_time',
						header: <Text>Upload date</Text>,
						sortable: true,
						align: 'center',
						render: (datum: FileEdgeStore) => unixToDate(datum.upload_time),
						verticalAlign: 'top',
						size: '125px',
					},
					{
						property: 'on_air_date',
						header: <Text>On air date</Text>,
						sortable: true,
						align: 'center',
						render: (datum: FileEdgeStore) => unixToDate(datum.on_air_date),
						verticalAlign: 'top',
						size: '125px',
					},
					{
						property: 'update_time',
						header: <Text>Last updated</Text>,
						sortable: true,
						align: 'center',
						render: (datum: FileEdgeStore) => unixToDateTime(datum.update_time),
						verticalAlign: 'top',
						size: '125px',
					},
					{
						property: 'comments',
						header: <Text>Comments</Text>,
						sortable: true,
						verticalAlign: 'top',
					},
				]}
				rowDetails={(datum: FileEdgeStore) => {
					return (
						<Box direction="row-responsive" gap="small" pad={{ left: 'small' }} border>
							<MediaInfoDetails datum={datum} />
							<Box>
								<Button plain size="small" tip="Toggle show raw JSON" margin="small" onClick={() => setShowJson(!showJson)} icon={<Tree />} />
							</Box>
							<Collapsible open={showJson}>
								<JsonView datum={datum} />
							</Collapsible>
						</Box>
					)
				}}
			/>
		</CardBox>
	)
}

export default EdgeStoreFiles
