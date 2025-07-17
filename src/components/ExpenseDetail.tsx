import { useMemo } from "react"
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import { formatDate } from "../helpers"
import type { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"
import 'react-swipeable-list/dist/styles.css';
import { useBudget } from "../hooks/useBudget"

type ExpenseDetailProps = {
    expense: Expense
}

export default function ExpenseDetail({ expense }: ExpenseDetailProps) {

    const { dispatch } = useBudget();

    const categotyInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => dispatch({ type: 'editing-id', payload: { id: expense.id } })}>
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                destructive={true}
                onClick={() => dispatch({ type: 'remove-expense', payload: { id: expense['id'] } })}
            >
                Delete
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={30}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}

            >
                <div className="bg-white dark:bg-slate-700 shadow-lg p-8 w-full border-b border-gray-200 flex gap-5 items-center select-none">

                    <div className="">
                        <img src={`/icono_${categotyInfo.icon}.svg`} alt="icono gasto" className="w-20" />
                    </div>

                    <div className="flex-1 space-y-2">
                        <p className="text-sm font-bold uppercase text-slate-500 dark:text-white">{categotyInfo.name}</p>
                        <p className="dark:text-gray-100">{expense.expenseName}</p>
                        <p className="text-slate-600 dark:text-white text-sm">{formatDate(expense.date!.toString())}</p>
                    </div>

                    <AmountDisplay
                        amount={expense.amount}
                    />

                </div>
            </SwipeableListItem>
        </SwipeableList>

    )
}