import { Box, Button, CheckBox, Collapsible, DataTable, Layer, Meter, Text, Tip } from 'grommet'
import { FunctionComponent, useEffect, useState } from 'react'
import { CardBox } from '../common/CardBox'
import { ViewLabel } from '../common/CardLabel'
import { PlayFill, Share, Clipboard, Tree, StatusGood, FormClose } from 'grommet-icons'
import { onSnapshot } from 'firebase/firestore'
import { collection, query, where, orderBy } from 'firebase/firestore'
import { FileNetwork } from '@thetabox/model'
import { CollectionNames } from '@thetabox/services'
import { firestore } from '../../services/firebase/Firebase'
import { FileStatus } from '@thetabox/model/lib/interfaces/thetabox/FileStatus'
import { jobStatus, checkmark, date, unixToDate } from '../common/ColumnHelpers'
import Player from '../common/Player'
import { JsonView } from '../common/file/JsonView'
import { MediaInfoDetails } from '../common/file/MediaInfoDetails'
import { FileDetails } from '../common/file/FileDetails'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { okColor } from '../../theme'
import { ScheduleView } from '../common/file/ScheduleView'

type Props = {
	account: string | null | undefined
}

export const NetworkFiles: FunctionComponent<Props> = ({ account = '' }) => {
	const [filesNetwork, setFilesNetwork] = useState<FileNetwork[]>([])
	const [showPlayer, setShowPlayer] = useState(false)
	const [error, setError] = useState('')
	const [fileNetwork, setFileNetwork] = useState<FileNetwork>()
	const [checked, setChecked] = useState<string[]>([])
	const [showJson, setShowJson] = useState(false)
	const [copied, setCopied] = useState<boolean>(false)
	const [open, setOpen] = useState<boolean>()

	useEffect(() => {
		const colRef = collection(firestore, CollectionNames.files.toString())
		const q = query(colRef, where('account', '==', account), where('file_status', '==', FileStatus.OnNetwork), orderBy('update_time', "desc"))
		const unsubscribe = onSnapshot(
			q,
			(querySnapshot) => {
				const files = querySnapshot.docs.map((docSnapshot) => {
					let fileInfo = docSnapshot.data() as FileNetwork
					fileInfo.id = docSnapshot.id
					return fileInfo
				})
				setFilesNetwork(files)
			},
			(error) => {
				console.error(error)
				setError(error.message)
			}
		)
		return unsubscribe
	}, [account])

	const onClose = () => setOpen(undefined)

	const onCheck = (event: { target: { checked: boolean } }, value: string) => {
		if (event.target.checked) {
			setChecked([...checked, value])
		} else {
			setChecked(checked.filter((item) => item !== value))
		}
	}

	const onCopied = () => {
		setCopied(true)
		setTimeout(() => {
			setCopied(false)
		}, 3000)
	}

	return (
		<CardBox>
			{open && (
				<Layer position="bottom-right" onClickOutside={onClose} onEsc={() => setShowPlayer(false)} modal={false} plain>
					{fileNetwork && <Player setShow={onClose} file={fileNetwork} />}
				</Layer>
			)}

			<ViewLabel text="Theta Network box" />
			<ScheduleView checked={checked} setChecked={setChecked} />

			{copied && (
				<Layer position="bottom" modal={false} margin={{ vertical: 'medium', horizontal: 'small' }} onEsc={onClose} responsive={false} plain>
					<Box
						align="center"
						direction="row"
						gap="small"
						justify="between"
						round="xxsmall"
						pad={{ vertical: 'xsmall', horizontal: 'small' }}
						background={okColor}
					>
						<Box align="center" direction="row" gap="xsmall">
							<StatusGood />
							<Text>Copied to clipboard (this message will close after 3 seconds)</Text>
						</Box>
						<Button icon={<FormClose />} onClick={() => setCopied(false)} plain />
					</Box>
				</Layer>
			)}

			<Box direction="row-responsive">
				<DataTable
					data={filesNetwork}
					sortable
					step={40}
					paginate
					primaryKey={true}
					columns={[
						{
							property: 'checkbox',
							render: (datum: FileNetwork) => {
								return (
									<Tip content="Select to set play out date">
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
							render: (datum: FileNetwork) => (
								<Button
									tip="Open video player"
									size="small"
									plain
									onClick={(e) => {
										setFileNetwork(datum)
										setOpen(true)
									}}
									icon={<PlayFill />}
								/>
							),
						},
						{
							property: 'presigned_url',
							header: '',
							size: '30px',
							verticalAlign: 'top',
							render: (datum: FileNetwork) => (
								<CopyToClipboard text={datum.video?.player_uri || ''} onCopy={() => onCopied()}>
									<Button plain size="small" tip="Copy to clipboard" icon={<Clipboard />} onClick={() => {}} />
								</CopyToClipboard>
							),
						},
						{
							property: 'presigned_url_2',
							header: '',
							size: '30px',
							verticalAlign: 'top',
							render: (datum: FileNetwork) => (
								<Button plain size="small" tip="Open in new tab" icon={<Share />} href={datum.video?.player_uri} target="_blank" />
							),
						},
						{
							property: 'transcode_status',
							size: '80px',
							header: <Text>Transcoded</Text>,
							align: 'center',
							verticalAlign: 'top',
							render: (datum: FileNetwork) => jobStatus(datum.transcode_status),
						},
						{
							property: 'Progress',
							header: 'progress',
							size: '80px',
							verticalAlign: 'top',
							align: 'center',
							render: (datum: FileNetwork) => (
								<Box pad={{ vertical: 'xsmall' }}>
									<Meter type="bar" values={[{ value: datum.video?.progress || 0 }]} thickness="xsmall" size="xsmall" />
								</Box>
							),
						},
						{
							property: 'on_air_date',
							header: <Text>On air date</Text>,
							sortable: true,
							align: 'center',
							render: (datum: FileNetwork) => unixToDate(datum.on_air_date),
							verticalAlign: 'top',
							size: '125px',
						},
						{
							property: 'presigned_url_expiration',
							header: <Text>Expiration date</Text>,
							size: '125px',
							align: 'center',
							sortable: true,
							verticalAlign: 'top',
							render: (datum: FileNetwork) => date(datum.network?.presigned_url_expiration),
						},
						{
							property: 'presigned_url_expired',
							header: <Text>Expired</Text>,

							sortable: true,
							align: 'center',
							verticalAlign: 'top',
							render: (datum: FileNetwork) => checkmark(datum.network?.presigned_url_expired),
						},
						{
							property: 'comments',
							header: <Text>Comments</Text>,
							verticalAlign: 'top',
							sortable: true,
						},
						{
							property: 'error',
							header: <Text>Error</Text>,
							sortable: true,
							verticalAlign: 'top',
							render: (datum: FileNetwork) => {
								return <Text>{datum.video?.error || ''}</Text>
							},
						},
					]}
					rowDetails={(datum: FileNetwork) => {
						return (
							<Box direction="row-responsive" gap="small" pad={{ left: 'small' }} border>
								<MediaInfoDetails datum={datum} />
								<FileDetails datum={datum} />
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
			</Box>
		</CardBox>
	)
}

export default NetworkFiles
