import { Dialog } from '@mui/material'
import React from 'react'

interface IModalProps {
		open: boolean
		handleClose: () => void
	Component: React.ReactNode
}

const Modal: React.FC<IModalProps> = ({ open, handleClose, Component }) => {
	return (
		<Dialog open={open} onClose={handleClose}>
			{Component}
		</Dialog>
	)
}

export default Modal
