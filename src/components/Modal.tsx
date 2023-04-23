import {
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from '@mui/material'
import React from 'react'
import InviteForm from './InviteForm'

interface IModalProps {
	open: boolean
	handleClose: () => void
	Component: React.ReactNode
}

const Modal: React.FC<IModalProps> = ({ open, handleClose, Component }) => {
	// const handleClose = () => {
	// }

	return (
		<Dialog open={open} onClose={handleClose}>
			{Component}
		</Dialog>
	)
}

export default Modal
