import FilterByCategory from "./FilterByCategory";
import FilterByDate from "./FilterByDate";

export default function Filters() {
    return (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-10">

            <form>
                <div className="flex flex-col gap-5">
                    <label
                    className="dark:text-white"
                    htmlFor="category">Filtrar Gastos:</label>
                    <FilterByCategory
                    />

                    <FilterByDate

                    />

                </div>
            </form >
        </div >
    )
}
