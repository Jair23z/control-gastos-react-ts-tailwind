import DatePicker from 'react-date-picker';
import { useBudget } from "../hooks/useBudget";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import type { Value } from '../types';
import ErrorMessage from './ErrorMessage';

export default function FilterByDate() {

    const { state, dispatch } = useBudget();

    const handleChangeDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: 'add-filter-date', payload: { valor: e.target.value } })
    }

    const handleChangeFrom = (e: Value) => {
        dispatch({ type: 'from-date', payload: { date: e } })
    }

    const handleChangeTo = (e: Value) => {
        dispatch({ type: 'to-date', payload: { date: e } })
    }


    return (

        <>
            <select
                id="date"
                className="flex-1 bg-slate-100 dark:bg-slate-600 dark:text-white p-3 rounded"
                onChange={handleChangeDate}
            >
                <option value="todos">--Filtrar Por Fecha</option>
                <option value="7dias">Ultimos 7 días</option>
                <option value="mes">Inicio de Mes</option>
                <option value="rango">Rango</option>

            </select>

            {state.currentDate === 'rango' && (
                <div className='space-y-3'>
                    <h3 className='dark:text-white'>Rango: </h3>
                    <div className='flex dark:text-white flex-col gap-3'>
                        <label htmlFor="from">Desde: </label>

                        <DatePicker
                            id='from'
                            className='bg-slate-50 dark:bg-slate-800 dark:text-white p-2 cursor-pointer border border-blue-100'
                            value={state.fromDate}
                            onChange={handleChangeFrom}
                        />

                    </div>

                    <div className='flex dark:text-white flex-col gap-3'>
                        <label htmlFor="from">Hasta: </label>

                        <DatePicker
                            id='from'
                            className='bg-slate-50 dark:bg-slate-800 p-2 cursor-pointer border border-blue-100'
                            value={state.toDate}
                            onChange={handleChangeTo}
                        />
                    </div>

                    {state.errorDate && (
                        <ErrorMessage
                        >{state.errorDate}</ErrorMessage>)}
                </div>
            )}
        </>


    )
}
