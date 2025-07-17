import { useReducer, createContext, type ReactNode, useMemo, useState } from "react"
import { budgetReducer, initialState, type BudgetActions, type BudgetState } from "../reducers/budget-reducer";


type BudgetContextProps = {
    state: BudgetState
    dispatch: React.ActionDispatch<[actions: BudgetActions]>
    totalExpenses: number
    remainingBudget: number
    currency: string
    setCurrency: (currency: string) => void
}

type BudgetProviderProps = {
    children: ReactNode
}

const BudgetContext = createContext<BudgetContextProps>(undefined!)

function BudgetProvider({ children }: BudgetProviderProps) {

    const [state, dispatch] = useReducer(budgetReducer, initialState)
    const totalExpenses = useMemo(() => state.expense.reduce((total, expenceItem) => total = total + expenceItem.amount, 0), [state.expense]);
    const remainingBudget = state.budget - totalExpenses;
    const [currency, setCurrency] = useState('USD');


    return (
        <BudgetContext.Provider
            value={{
                state, 
                dispatch, 
                totalExpenses,
                remainingBudget,
                currency,
                setCurrency
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}


export { BudgetContext, BudgetProvider }