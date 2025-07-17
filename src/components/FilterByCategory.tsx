import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";


export default function FilterByCategory() {

    const { dispatch } = useBudget();


    const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: 'add-filter-category', payload: { id: e.target.value } })
    }

    return (
        <select
            id="category"
            className="flex-1 bg-slate-100 dark:bg-slate-600 dark:text-white p-3 rounded"
            onChange={handleChangeCategory}
        >
            <option value="">--Todas las categorias</option>

            {categories.map(category => (
                <option
                    key={category.id}
                    value={category.id}>
                    {category.name}</option>
            ))}
        </select>
    )
}
