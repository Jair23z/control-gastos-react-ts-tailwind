import { useEffect, useMemo } from "react";
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail";
import { valorFiltrado } from "../helpers";



export default function ExpenseList() {

    const { state, dispatch } = useBudget();

    useEffect(() => {
        if (!state.fromDate || !state.toDate)
            return;

        if (state.currentDate === 'rango' && state.fromDate! > state.toDate!) {

            dispatch({ type: 'error-date', payload: { condition: 'La fecha Desde no puede ser mayor que la Hasta' } })

        } else {
            dispatch({ type: 'error-date', payload: { condition: '' } })
        }

    }, [state.currentDate, state.fromDate, state.toDate]);
    

    const filtros = valorFiltrado(state);


    const isEmpty = useMemo(() => filtros.length === 0, [filtros]);


    return (
        <div className="mt-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-10">
            {isEmpty ? (
                <p className="text-gray-600 dark:text-white text-2xl font-bold">No hay Gastos</p>
            ) : (
                <>
                    <p className="text-gray-600 dark:text-white text-2xl font-bold my-5">Listado de gastos</p>
                    {filtros.map(expense => (

                        <ExpenseDetail
                            key={expense.id}
                            expense={expense}
                        />))}

                </>
            )}
        </div>
    )
}
