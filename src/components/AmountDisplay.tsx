import { formatCurrency } from "../helpers"
import { useBudget } from "../hooks/useBudget"


type AmountDisplayProps = {
    label?: string,
    amount: number
}

export default function AmountDisplay({ label, amount }: AmountDisplayProps) {
    const { currency } = useBudget();
    return (
        <p className="text-2xl text-blue-600 font-bold dark:text-gray-100 ">
            {label && `${label}: `}
            <span className="font-semibold text-black dark:text-white">{formatCurrency(amount, currency)}</span>
        </p>
    )
}
