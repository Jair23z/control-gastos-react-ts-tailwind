import type { BudgetState } from "../reducers/budget-reducer";
import type { Value } from "../types";


export function formatCurrency(amount: number, currency: string = 'USD') {
    return new Intl.NumberFormat('en-Us', {
        style: "currency",
        currency
    }).format(amount)
}

export function formatDate(dateStr: string): string {

    const dateObj = new Date(dateStr)
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    return Intl.DateTimeFormat('es-Es', options).format(dateObj)
}




export function valorFiltrado(state: BudgetState) {
    const filterExpenses = state.currentCategory ? state.expense.filter(expenseItem => expenseItem.category === state.currentCategory) : state.expense;

    const hoy: Value = new Date;
    const ultimos7Dias: Value = new Date(hoy);
    ultimos7Dias.setDate(hoy.getDate() - 7);
    const inicioMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);

    const filtroFechas = filterExpenses.filter(expenseItem => {

        if (state.currentDate === 'todos') {
            return expenseItem;
        }

        const data = new Date(`${expenseItem.date}`)

        const dateExpense = new Date(data.getFullYear(), data.getMonth(), data.getDate());

        if (state.currentDate === '7dias' && hoy > dateExpense && dateExpense > ultimos7Dias) {
            return expenseItem
        }

        if (state.currentDate === 'mes' && inicioMes <= dateExpense && dateExpense <= hoy) {

            return expenseItem
        }

        if (state.currentDate === 'rango') {
            if (state.fromDate! > state.toDate!) {
                return false
            }
            if (state.fromDate! <= dateExpense && dateExpense <= state.toDate!) {
                return expenseItem
            }
        }


    })
    return filtroFechas
}

export function isDark() {
    const current = document.documentElement.getAttribute('data-theme')
    return current === 'dark' ? true : false
}
