import { Box, FileInput, Meter, Stack, Text } from 'grommet'
import { useState } from 'react'
import { CardBox } from '../common/CardBox'
import { ViewLabel } from '../common/CardLabel'
import numbro from 'numbro'
import { useEthers } from '@usedapp/core'
import { FileHub, FileUpload } from '@thetabox/model'
import { CollectionNames, DateHelper } from '@thetabox/services'
import { Db } from '../../services/firebase/Firestore'
import axios, { AxiosRequestHeaders, AxiosRequestConfig } from 'axios'
import { FileStatus } from '@thetabox/model'

export default function Upload() {
	const [progress, setProgress] = useState(0)
	const { account } = useEthers()

	if (!account) {
		return <Box>Not logged in</Box>
	}

	return (
		<CardBox>
			<ViewLabel text="edge store upload" />
			<Box direction="row-responsive">
				<FileInput
					name="file"
					multiple={true}
					onChange={async (event: { target: { files: any } }) => {
						setProgress(0)
						const fileList = event.target.files
						if (fileList === null) return
						for (let i = 0; i < fileList.length; i += 1) {
							try {
								const file = fileList[i]

								const fileUpload = await uploadFile(file, (event: { loaded: number; total: number }) => {
									setProgress(Math.round((100 * event.loaded) / event.total))
								})

								const db = new Db()

								const fileBase: FileHub = {
									...fileUpload,
									account: account,
									size: file.size,
									file_status: FileStatus.New,
									upload_time: DateHelper.dayInUnix(),
									name: fileUpload.name,
								}

								await db.insertOne(CollectionNames.files, fileBase)
							} catch (error) {
								console.error(error)
								setProgress(0)
							}
						}
					}}
				/>
				<Box align="center" pad="large">
					<Stack anchor="center">
						<Meter type="circle" values={[{ value: progress }]} size="xsmall" thickness="xsmall" />
						<Box direction="row" align="center" pad={{ bottom: 'xsmall' }}>
							<Text size="xlarge">{numbro(progress).format({ mantissa: 1 })}</Text>
							<Text size="small">%</Text>
						</Box>
					</Stack>
				</Box>
			</Box>
		</CardBox>
	)
}

export async function uploadFile(data: Blob, onUploadProgress: any): Promise<FileUpload> {
	try {
		const form = new FormData()
		form.append('file', data)

		const headers: AxiosRequestHeaders = {
			'Content-Type': 'multipart/form-data',
		}

		const config: AxiosRequestConfig = {
			method: 'post',
			url: `https://${process.env.REACT_APP_IP_GATEWAY}:${process.env.REACT_APP_PORT_GATEWAY}/api/uploads`,
			headers,
			data: form,
			onUploadProgress: onUploadProgress,
		}
		const result = await axios(config)
		return result.data as FileUpload
	} catch (error) {
		console.error(error)
		throw error
	}
}
