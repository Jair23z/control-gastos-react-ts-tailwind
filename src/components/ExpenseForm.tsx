import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { useEffect, useState } from "react";
import type { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";
import { formatCurrency } from "../helpers";

export default function ExpenseForm() {

    const { state, dispatch, remainingBudget } = useBudget();

    const initialExpense = {
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    }
    useEffect(() => {

        if (state.editingId) {
            const expenseItem = state.expense.filter(exp => exp.id === state.editingId)[0];
            setExpense(expenseItem)
            setPreviusAmount(expenseItem.amount);
        }
    }, [state.editingId])

    const [expense, setExpense] = useState<DraftExpense>(initialExpense);

    const [error, setError] = useState('');

    const [previusAmount, setPreviusAmount] = useState(0);

    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const isNumber = ['amount'].includes(name);

        setExpense({
            ...expense,
            [name]: isNumber ? +value : value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //validar

        if (Object.values(expense).includes("")) {
            setError('Todos los campos son obligatorios');
            return;
        }
        if ((expense.amount - previusAmount) > remainingBudget) {
            setError(`La cantidad es superior al limite disponible: ${formatCurrency(remainingBudget)}`);
            return;
        }
        if (state.editingId) {
            dispatch({ type: 'update-expence', payload: { expense: { ...expense, id: state.editingId } } })
        } else {
            dispatch({ type: 'add-expense', payload: { expense } })
        }

        setExpense(initialExpense)
        setPreviusAmount(0);

    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend
                className="uppercase text-center text-2xl font-black border-b-4 py-2
            border-blue-500 dark:border-blue-300 dark:text-blue-200"
            >
                {state.editingId ? 'Actualizar Gasto' : 'Nuevo Gasto'}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="expenseName"
                    className="text-xl dark:text-blue-200"
                >
                    Nombre Gasto:
                </label>

                <input
                    onChange={handleChange}
                    value={expense.expenseName}
                    type="text"
                    id='expenseName'
                    placeholder="Añade el nombre del gasto"
                    className="bg-slate-100 dark:bg-gray-800 dark:text-white p-2"
                    name="expenseName"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl dark:text-blue-200"
                >
                    Cantidad:
                </label>

                <input
                    onChange={handleChange}
                    value={expense.amount}
                    type="number"
                    id='amount'
                    placeholder="Añade la cantidad del gasto: ej. 300"
                    className="bg-slate-100 dark:bg-gray-800 dark:text-white p-2"
                    name="amount"
                />
            </div>


            <div className="flex flex-col gap-2">
                <label
                    htmlFor="category"
                    className="text-xl dark:text-blue-200"
                >
                    Categoria:
                </label>

                <select
                    id='category'
                    className="bg-slate-100 dark:bg-gray-800 dark:text-white p-2"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                >

                    <option value=""> --Seleccione --</option>

                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label
                    htmlFor="amount"
                    className="text-xl dark:text-blue-200"
                >
                    Fecha Gasto:
                </label>

                <DatePicker
                    className='bg-slate-100 dark:bg-gray-800 dark:text-white p-2 border-0'
                    value={expense.date}
                    onChange={e => handleChangeDate(e)}
                />
            </div>

            <input
                type="submit"
                className="font-bold rounded-lg w-full bg-blue-400 dark:bg-blue-900 cursor-pointer p-2 text-white uppercase"
                value={state.editingId ? 'Actualizar Gasto' : 'Añadir Gasto'}
            />

        </form>
    )


}