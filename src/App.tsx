import { useEffect, useMemo, useState } from "react";
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import ExpenseList from "./components/ExpenseList";
import Filters from "./components/Filters";

function App() {
  const { state } = useBudget();

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])
  const [theme, setTheme] = useState(true);

  useEffect(() => {
    localStorage.setItem('budget', JSON.stringify(state.budget));

  }, [state.budget])

  useEffect(() => {
    localStorage.setItem('expense', JSON.stringify(state.expense))
  }, [state.expense]);


  function currentTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', next)

    setTheme(!theme)
  }
  return (



    <>
      <header className="dark:bg-gray-900 py-8 max-h-72 bg-white relative ">
        <div className="relative max-w-170 mx-auto">
          <h1 className="uppercase text-center font-black text-4xl text-blue-950 dark:text-white">
            Planificador de Gastos
          </h1>

         
          <button className="absolute top-[.7rem] right-[3rem] cursor-pointer"
            type="button"
            onClick={() => currentTheme()}>
            <img src={`./icon-${theme ? 'moon' : 'sun'}.svg`} alt="icono" />
          </button>
        </div>

      </header>

      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget ?
          <BudgetTracker

          />
          : <BudgetForm

          />}
      </div>

      {
        isValidBudget &&

        <main className="max-w-3xl mx-auto py-10">


          <Filters

          />

          <ExpenseList />

          <ExpenseModal />
        </main>
      }

    </>
  )
}

export default App
