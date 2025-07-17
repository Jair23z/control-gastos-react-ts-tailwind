import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

type GraficaPieProps = {
    data: {
        name: string;
        cantidad: number;
    }[]
}


const COLORS = ['#493dd8','#7da8b3', '#ff9800', '#4caf50', '#9c27b0', '#00bcd4', '#e91e63', '#2196f3'];


export default function GraficaPie({ data }: GraficaPieProps) {

    const tieneDatos = data.length > 0;

    const dataFinal = tieneDatos ? data : [{name: 'Sin datos', cantidad: 100}]

    return (
        <>
            <div className="w-full h-80 relative ">

                <ResponsiveContainer className='-mt-10'>
                    <PieChart>
                        <Pie
                            data={dataFinal}
                            dataKey="cantidad"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={115}
                            labelLine={false}
                            label={false}
                        >
                            {dataFinal.map((entry, index) => (
                                <Cell className='mt-10'
                                    key={`cell-${index}`}
                                    fill={tieneDatos ? COLORS[index % COLORS.length] : '#d1d5db'}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) =>
                                tieneDatos ? 
                                `$${Number(value).toLocaleString('es-MX')}`
                                : ''
                            }
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}
