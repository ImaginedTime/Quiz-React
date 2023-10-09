import React from 'react'

import { Box, CircularProgress } from '@mui/material';
import { circularProgressClasses } from '@mui/material/CircularProgress';


export default function Loader() {
	return (
		<Box className='loader' sx={{ display: 'flex' }}>
			<CircularProgress
				// disableShrink
				sx={{
					color: '#fca311',
					[`& .${circularProgressClasses.circle}`]: {
						strokeLinecap: 'round',
					},
				}}
				size={60}
				thickness={6}
			/>
			<p className='loading-text'>Loading</p>
		</Box>
	)
}
