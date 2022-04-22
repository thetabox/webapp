import { Text } from 'grommet'
import { FormCheckmark, FormSubtract } from 'grommet-icons'
import { format, fromUnixTime } from 'date-fns'
import { FileStatus, JobStatus } from '@thetabox/model'
import numbro from 'numbro'
import { getTimezoneOffset } from 'date-fns-tz'

export function checkmark(checked: boolean = false) {
	return checked ? <FormCheckmark /> : <FormSubtract />
}

export function jobStatus(jobStatus: JobStatus) {
	return <Text>{jobStatus}</Text>
}

export function fileStatus(fileStatus: FileStatus) {
	return <Text>{fileStatus}</Text>
}

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
const offset = getTimezoneOffset(timezone)

export function dateTime(dateTime: string | undefined | number) {
	return dateTime ? <Text>{format(new Date(dateTime), 'yyyy-MM-dd HH:mm')}</Text> : <Text></Text>
}

export function date(dateTime: string | undefined | number) {
	return dateTime ? <Text>{format(new Date(dateTime), 'yyyy-MM-dd')}</Text> : <Text></Text>
}

export function bytes(size: number = 0) {
	return <Text>{numbro(size).format({ output: 'byte', base: 'binary', mantissa: 1, spaceSeparated: true })}</Text>
}

export function unixToDateTime(unixTime: number | undefined) {
	return unixTime ? <Text>{format(fromUnixTime(unixTime / 1000 - offset / 1000), 'yyyy-MM-dd HH:mm')}</Text> : <Text></Text>
}

export function unixToDate(unixTime: number | undefined) {
	return unixTime ? <Text>{format(fromUnixTime(unixTime / 1000 - offset / 1000), 'yyyy-MM-dd')}</Text> : <Text></Text>
}
