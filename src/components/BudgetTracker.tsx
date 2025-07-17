import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { useBudget } from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import 'react-circular-progressbar/dist/styles.css';
import BudgetForm from "./BudgetForm";
import { useState } from "react";
import { categories } from "../data/categories";
import { isDark, valorFiltrado } from "../helpers";
import GraficaPie from "./GraficaPie";

export default function BudgetTracker() {

    const { state, totalExpenses, remainingBudget, dispatch, currency, setCurrency } = useBudget();
    const [mostrarCategoria, setMostrarCategoria] = useState(true);

    const percentaje = +((totalExpenses * 100) / state.budget).toFixed(2);

    const handleChangePorcentage = () => {
        dispatch({ type: 'budget-modal' });
    }

    const filtros = valorFiltrado(state);

    const costoCategoria = filtros.reduce((acc, expenceItem) => {
        acc[expenceItem.category] = (acc[expenceItem.category] || 0) + expenceItem.amount

        return acc
    }, {} as Record<string, number>)



    const data = Object.entries(costoCategoria).map(([categoria, valor]) => ({
        name: categories.filter(cat => cat.id === categoria)[0].name,
        cantidad: valor
    }));

    const dataTotal = data.length > 0 ? [...data, { name: 'Restante', cantidad: state.currentCategory ? totalExpenses - data[0].cantidad : remainingBudget }] : []


    return (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 dark:bg-gray-800 ">


            <div className="flex flex-col gap-5">
                <div className="flex gap-2">
                    <button
                        onClick={() => setMostrarCategoria(true)}
                        className={`bg-lime-500 dark:bg-lime-700 w-full p-3 rounded-lg text-white font-bold hover:opacity-70 cursor-pointer transition-opacity duration-300 ${mostrarCategoria && 'opacity-70'}`}
                    >Gráfica general</button>
                    <button
                        onClick={() => setMostrarCategoria(false)}
                        className={`bg-violet-500 w-full p-3 rounded-lg text-white font-bold hover:opacity-70 cursor-pointer transition-opacity duration-300  ${!mostrarCategoria && 'opacity-70'}`}
                    >Por Categoria</button>

                </div>

                {mostrarCategoria ? (
                    <CircularProgressbar
                        text={`${percentaje}% Gastado `}
                        value={percentaje}
                        styles={buildStyles({
                            pathColor: isDark() ? (percentaje === 100 ? "#FCA5A5" : "#93C5FD") : (percentaje === 100 ? "#DC2626" : "#3B82F6"),
                            trailColor: "#f5f5f5",
                            textSize: 10,
                            textColor: isDark() ? (percentaje === 100 ? "#FCA5A5" : "#93C5FD") : (percentaje === 100 ? "#DC2626" : "#3B82F6")
                        })}
                    />) : (
                    dataTotal.length > 0 ? (<div className="relative">
                        {state.currentCategory && (
                            <h3 className="absolute dark:text-white text-sm font-semibold"> Gastado:</h3>
                        )}
                        <GraficaPie
                            data={dataTotal}
                        />
                    </div>)
                        :

                        <GraficaPie
                            data={dataTotal}
                        />
                )}
            </div>

            <div className="flex relative flex-col justify-start mt-15 items-center gap-7">

                <select
                    className="absolute top-[-3.4rem] right-[0rem] cursor-pointer bg-slate-200 dark:bg-gray-700 text-black dark:text-white p-2 rounded"
                    value={currency}
                    onChange={e => setCurrency(e.target.value)}
                >
                    <option value="USD">USD</option>
                    <option value="MXN">MXN</option>
                    <option value="EUR">EUR</option>
                    <option value="COP">COP</option>
                </select>

                <div className="flex gap-5 w-[90%]">
                    <button
                        onClick={() => dispatch({ type: 'reset-app' })}
                        type="button"
                        className="bg-purple-400 w-full p-2 text-white uppercase font-bold rounded-lg
                    cursor-pointer hover:opacity-90 text-xs flex-1"
                    >
                        Resetear App
                    </button>

                    <button
                        onClick={handleChangePorcentage}
                        type="button"
                        className="bg-blue-500 w-full p-1.5 text-white uppercase font-bold rounded-lg
                    cursor-pointer hover:opacity-90 text-xs flex-1"
                    >
                        Presupuesto
                    </button>


                    {state.budgetModal && (
                        <div
                            onClick={() => dispatch({ type: 'budget-modal' })}
                            className="inset-0 z-20 bg-[#2d19192f] fixed flex items-center justify-center">
                            <div
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white p-13 rounded-2xl">
                                <BudgetForm
                                    update={'update'}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <AmountDisplay
                    label='Presupuesto'
                    amount={state.budget}
                />

                <AmountDisplay
                    label='Disponible'
                    amount={remainingBudget}
                />

                <AmountDisplay
                    label='Gastado'
                    amount={totalExpenses}
                />


            </div>
        </div>
    )
}
