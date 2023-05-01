import React from 'react'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material'

interface IModalDelete {
	name: string
	open: boolean
	onClose: () => void
	setDeleteResult: () => void
	isProfile?: boolean
}

const ModalDelete: React.FC<IModalDelete> = ({
	name,
	open,
	onClose,
	setDeleteResult,
	isProfile,
}) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
				Удаление
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{isProfile
						? 'Вы действительно хотите удалить свой аккаунт навсегда, без возможности восстановления?'
						: `Вы действительно хотите навсегда удалить "${name}", без возможности восстановления? `}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Отменить</Button>
				<Button color='error' onClick={setDeleteResult}>
					Удалить
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default ModalDelete
