import { FunctionComponent, useState } from 'react'
import { FileEdgeStore } from '@thetabox/model'
import { Button, Text, TextArea, TextInput } from 'grommet'
import { Label } from '../common/label'
import { Save } from 'grommet-icons'
import { Db } from '../../services/firebase/Firestore'
import { CollectionNames, FieldUpdate } from '@thetabox/services'

type Props = {
	fileEdgeStore: FileEdgeStore
}

export const PlayerForm: FunctionComponent<Props> = ({ fileEdgeStore }) => {
	const [comments, setComments] = useState(fileEdgeStore.comments)
	const [name, setName] = useState(fileEdgeStore.name)

	const save = async () => {
		const fieldUpdates : FieldUpdate = {field : 'comments', value: comments,id: fileEdgeStore.id, secondField: 'name', secondValue : name}
		await new Db().updateFieldAll(CollectionNames.files, [fieldUpdates])
	}

	return (
		<>
			<Text size="large" weight="bold">
				{name}
			</Text>

			<Label text="Name" />
			<TextInput placeholder="type here" size="small" value={name} onChange={(event) => setName(event.target.value)} />

			<Label text="Comments" />
			<TextArea placeholder="type here" size="small" value={comments} onChange={(event) => setComments(event.target.value)} />

			<Button alignSelf="end" tip="Save" onClick={() => save()} icon={<Save />} />
		</>
	)
}

export default PlayerForm
