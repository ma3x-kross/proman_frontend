import { Grid } from '@mui/material'
import { observer } from 'mobx-react-lite'
import CustomCard from '../../components/CustomCard'

// const icons = [FormatListBulletedIcon, RecentActorsIcon, CurrencyRubleIcon]

interface IPages {
	projects?: string
	people?: string
	reports?: string
}

const GridHomePage = ({
	pages,
	icons,
}: {
	pages: IPages
	icons: React.ElementType[]
}) => {

	return (
		<>
			<Grid
				mt={12}
				container
				spacing={4}
				sx={{ display: 'flex', justifyContent: 'center' }}
			>
				{Object.entries(pages).map(([key, value], idx) => (
					<Grid item key={key}>
						<CustomCard link={key} title={value} IconComponent={icons[idx]} />
					</Grid>
				))}
			</Grid>
		</>
	)
}
export default observer(GridHomePage)
