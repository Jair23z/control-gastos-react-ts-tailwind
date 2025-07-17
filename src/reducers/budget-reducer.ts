import { v4 as uuidv4 } from 'uuid';
import type { Category, DraftExpense, Expense, Value } from "../types"

export type BudgetActions =
    { type: 'add-budget', payload: { budget: number } } |
    { type: 'show-modal' } |
    { type: 'close-modal' } |
    { type: 'add-expense', payload: { expense: DraftExpense } } |
    { type: 'remove-expense', payload: { id: Expense['id'] } } |
    { type: 'editing-id', payload: { id: Expense['id'] } } |
    { type: 'update-expence', payload: { expense: Expense } } |
    { type: 'reset-app' } |
    { type: 'add-filter-category', payload: { id: Category['id'] } } |
    { type: 'add-filter-date', payload: { valor: string } } |
    { type: 'from-date', payload: { date: Value } } |
    { type: 'to-date', payload: { date: Value } } |
    { type: 'error-date', payload: { condition: string } } |
    { type: 'budget-modal' }

export type BudgetState = {
    budget: number
    modal: boolean
    expense: Expense[]
    editingId: Expense['id']
    currentCategory: Category['id']
    currentDate: string
    fromDate: Value
    toDate: Value
    errorDate: string
    budgetModal: boolean
}

const initialBudget = (): number => {
    const localBudget = localStorage.getItem('budget');

    return localBudget ? +localBudget : 0;
}

const initialExpense = (): Expense[] => {
    const localExpense = localStorage.getItem('expense');

    return localExpense ? JSON.parse(localExpense) : [];
}

export const initialState = {
    budget: initialBudget(),
    modal: false,
    expense: initialExpense(),
    editingId: '',
    currentCategory: '',
    currentDate: 'todos',
    fromDate: new Date,
    toDate: new Date,
    errorDate: '',
    budgetModal: false
}

const createExpense = (draftExpense: DraftExpense): Expense => {

    return {
        ...draftExpense,
        id: uuidv4()
    }
}

export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions,
) => {

    if (action.type === 'add-budget') {

        return {
            ...state,
            budget: action.payload.budget
        }
    }

    if (action.type === 'show-modal') {

        return {
            ...state,
            modal: true
        }
    }

    if (action.type === 'close-modal') {
        return {
            ...state,
            modal: false,
            editingId: ''
        }
    }

    if (action.type === 'add-expense') {

        const expense = createExpense(action.payload.expense);
        return {
            ...state,
            expense: [...state.expense, expense],
            modal: false
        }

    }


    if (action.type === 'remove-expense') {

        const updatedExpense = state.expense.filter(expenseItem => expenseItem.id !== action.payload.id);

        return {
            ...state,
            expense: updatedExpense,
        }
    }

    if (action.type === 'editing-id') {

        return {
            ...state,
            editingId: action.payload.id,
            modal: true
        }
    }


    if (action.type === 'update-expence') {
        const expense = state.expense.map(exp => exp.id === action.payload.expense.id ? action.payload.expense : exp);
        return {
            ...state,
            expense: expense,
            modal: false,
            editingId: ''
        }
    }


    if (action.type === 'reset-app') {
        return {
            ...state,
            expense: [],
            budget: 0
        }
    }

    if (action.type === 'add-filter-category') {

        return {
            ...state,
            currentCategory: action.payload.id
        }
    }

    if (action.type === 'add-filter-date') {

        return {
            ...state,
            currentDate: action.payload.valor
        }
    }

    if (action.type === 'from-date') {

        return {
            ...state,
            fromDate: action.payload.date
        }
    }

    if (action.type === 'to-date') {

        return {
            ...state,
            toDate: action.payload.date
        }
    }

    if (action.type === 'error-date') {

        return {
            ...state,
            errorDate: action.payload.condition
        }
    }

    if (action.type === 'budget-modal') {

        return {
            ...state,
            budgetModal: !state.budgetModal
        }
    }
    return state;
}