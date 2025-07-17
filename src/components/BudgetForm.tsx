import { useMemo, useState } from "react"
import { useBudget } from "../hooks/useBudget"
import ErrorMessage from "./ErrorMessage"

type BudgetFormProps = {
    update?: string
}

export default function BudgetForm({ update }: BudgetFormProps) {


    const [budget, setBudget] = useState(0)
    const [error, setError] = useState('');

    const { dispatch, totalExpenses } = useBudget();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(+e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (update) {

            if (budget < totalExpenses) {
                setError('No se puede Ingresar un Presupuesto Menor a lo Gastado');
                return;
            }
            dispatch({ type: 'budget-modal' })
        }
        dispatch({ type: 'add-budget', payload: { budget } })
    }

    const isDisabled = useMemo(() => {
        return budget > 0 && !isNaN(budget)
    }, [budget])

    return (
        <form
            onSubmit={e => handleSubmit(e)}
            className="space-y-5">

            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-blue-600 dark:text-blue-300 font-bold text-center">
                    {`${update ? 'Actualizar Presupuesto' : 'Definir Presupuesto'}`}
                </label>

                <input
                    id="budget"
                    type="number"
                    className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-2 text-black dark:text-white"
                    placeholder={`${update ? 'Actualizar Presupuesto' : 'Define tu Presupuesto'}`}
                    name="budget"
                    onChange={e => handleChange(e)}
                />

                {error &&
                    (<ErrorMessage>
                        {error}
                    </ErrorMessage>)}
            </div>

            <input
                disabled={!isDisabled}
                type="submit"
                value='Definir Presupuesto'
                className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 cursor-pointer w-full p-2 text-white font-black uppercase disabled:opacity-40 disabled:cursor-default"
            />


        </form>
    )
}
