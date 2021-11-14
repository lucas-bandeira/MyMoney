import {Container} from "./styles";
import {useEffect, useState} from "react";
import {api} from "../../services/api";

interface ITransactions{
    id: number,
    title: string,
    type: string,
    amount: number,
    category: string,
    createdAt: string
}

export function TransactionsTable() {
    const [transactions, setTransactions] = useState<ITransactions[]>([]);

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, [])

    return (
        <Container>
            <table>
                <thead>
                <tr>
                    <th>Titulo</th>
                    <th>Valor</th>
                    <th>Categorias</th>
                    <th>Data</th>
                </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.title}</td>
                            <td className={transaction.type}>
                                {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(transaction.amount)}
                            </td>
                            <td>{transaction.category}</td>
                            <td>
                                {new Intl.DateTimeFormat('pt-BR').format(
                                    new Date(transaction.createdAt
                                    ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )
}