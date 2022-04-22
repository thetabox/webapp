import { ThemeType } from 'grommet'
import { CaretDownFill, CaretLeftFill } from 'grommet-icons'

export const baseColor = '#2A3C48'
export const dimColor = 'light-5'
export const light = '#F8F8F8'
export const round = '1px'
export const inactive = '#999999'
export const active = '#333333'
export const okColor = '#4AD977'
export const alertColor = '#FFAA15'
export const rewardColor = '#00678D'
export const balanceColor = 'dark-4'
export const darkBlue = '#004B66'
export const editColor = 'light-5'
export const formButtonsColor = '#F35653'
export const notificationColor = 'dark-4'
export const analyticsColor = 'dark-2'
export const iconSize = '17px'
export const padSize = '8px'
export const selectedColor = '#333333'
export const white = 'light-5'

export const theme: ThemeType = {
	global: {
		font: {
			family: 'Roboto, sans-serif;',
		},
		input: { padding: { horizontal: '5px', vertical: '5px' }, font: { weight: 400 } },

		colors: { placeholder: dimColor },
		focus: {
			border: {
				color: 'baseColor',
			},
		},

		elevation: {
			dark: {
				small: '0px 4px 10px rgba(0, 0, 0, 0.20)',
			},
		},
		control: { border: { radius: '0px' } },
		hover: { background: undefined, color: undefined },
		selected: { background: selectedColor, color: white },
	},

	tip: {
		content: {
			background: baseColor,
		},
	},

	menu: {
		background: baseColor,
		icons: { color: white },
	},

	collapsible: {
		minSpeed: 100,
	},

	card: {
		container: {
			background: '#FFFFFF12',
			elevation: 'none',
		},
		footer: {
			pad: { horizontal: 'medium', vertical: 'small' },
			background: '#FFFFFF06',
		},
	},

	select: { icons: { color: '#FFFFFF' } },

	carousel: {
		icons: {
			color: selectedColor,
		},
	},
	paragraph: {
		small: {
			size: '17px',
		},
	},

	calendar: {
		extend: {
			color: '#FFFFFF',
			background: baseColor,
		},
	},

	/* accordion */
	accordion: {
		heading: {
			margin: { vertical: 'xsmall', horizontal: 'none' },
		},

		icons: {
			collapse: CaretDownFill,
			expand: CaretLeftFill,
			color: '#FFFFFF',
		},
		border: undefined,
		panel: {
			border: undefined,
		},
	},
	/* text */
	text: {
		xsmall: {
			size: '13px',
			height: '16px',
			maxWidth: '288px',
		},
		small: {
			size: '14px',
			height: '18px',
			maxWidth: '336px',
		},
		medium: {
			size: '15px',
			height: '20px',
			maxWidth: '332px',
		},
	},

	/* meter */
	meter: { color: okColor },

	/* button */
	button: {
		border: {
			radius: 'small',
			width: '1px',
			color: formButtonsColor,
		},

		padding: {
			vertical: '10px',
			horizontal: '10px',
		},
		primary: {
			color: formButtonsColor,
		},
		active: {},
		// color: dimColor
	},

	/* link/anchor*/
	anchor: {
		textDecoration: 'none',
		color: dimColor,
		hover: { textDecoration: 'none' },
	},

	/* file input */
	fileInput: {
		border: undefined,
		pad: 'large',
		hover: { border: undefined },
		//hover: { background: { image: 'url(LogoSmall.svg)' } },
		dragOver: { background: { image: 'url(LogoSmall.svg)' }, border: undefined },
	},

	/* checkbox */
	checkBox: { size: '20px', check: {}, color: light },

	heading: {
		weight: 400,

		level: {
			1: {
				font: {},
				small: {
					size: '14px',
					height: '20px',
					maxWidth: '336px',
				},
				medium: {
					size: '15px',
					height: '20px',
					// maxWidth: '336px',
				},
				large: {
					size: '14px',
					height: '20px',
					maxWidth: '336px',
				},
				xlarge: {
					size: '14px',
					height: '20px',
					maxWidth: '336px',
				},
			},
			2: {
				font: {},
				small: {
					size: '14px',
					height: '20px',
					maxWidth: '336px',
				},
				medium: {
					size: '14px',
					height: '20px',
					// maxWidth: '336px',
				},
				large: {
					size: '14px',
					height: '20px',
					maxWidth: '336px',
				},
				xlarge: {
					size: '14px',
					height: '20px',
					maxWidth: '336px',
				},
			},
			3: {
				font: {},
				small: {
					size: '14px',
					height: '20px',
					maxWidth: '336px',
				},
				medium: {
					size: '14px',
					height: '20px',
					// maxWidth: '336px',
				},
				large: {
					size: '14px',
					height: '20px',
					maxWidth: '336px',
				},
				xlarge: {
					size: '14px',
					height: '20px',
					maxWidth: '336px',
				},
			},
			4: {
				font: {},
				small: {
					size: '18px',
					height: '24px',
					maxWidth: '432px',
				},
				medium: {
					size: '18px',
					height: '24px',
					maxWidth: '432px',
				},
				large: {
					size: '18px',
					height: '24px',
					maxWidth: '432px',
				},
				xlarge: {
					size: '18px',
					height: '24px',
					maxWidth: '432px',
				},
			},
			5: {
				font: {},
				small: {
					size: '16px',
					height: '22px',
					maxWidth: '384px',
				},
				medium: {
					size: '16px',
					height: '22px',
					maxWidth: '384px',
				},
				large: {
					size: '16px',
					height: '22px',
					maxWidth: '384px',
				},
				xlarge: {
					size: '16px',
					height: '22px',
					maxWidth: '384px',
				},
			},
			6: {
				font: {},
				small: {
					size: '14px',
					height: '20px',
					maxWidth: '336px',
				},
				medium: {
					size: '14px',
					height: '20px',
					maxWidth: '336px',
				},
				large: {
					size: '14px',
					height: '20px',
					maxWidth: '336px',
				},
				xlarge: {
					size: '14px',
					height: '20px',
					maxWidth: '336px',
				},
			},
		},
	},
}
