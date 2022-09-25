import { Fragment } from "react"
import MealsSummary from './MealsSummary'
import AvailbleMeals from './AvailableMeals'

const Meals = () => {
    return <Fragment>
        <MealsSummary />
        <AvailbleMeals />
    </Fragment>
}
export default Meals