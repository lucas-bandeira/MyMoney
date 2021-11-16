import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {api} from "../services/api";

interface ITransactions{
    id: number,
    title: string,
    type: string,
    amount: number,
    category: string,
    createdAt: string
}

// interface TransactionInput{
//     title:string,
//     value:number,
//     type:string
//     category:string,
// }

// type TransactionInput = Pick<ITransactions, 'title' | 'amount' | 'type' | 'category'>


type TransactionInput = Omit<ITransactions, 'id' | 'createdAt'>

interface TransactionsContextData{
    transactions: ITransactions[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

interface TransactionsProviderProps{
    children: ReactNode;
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({children}:TransactionsProviderProps){
    const [transactions, setTransactions] = useState<ITransactions[]>([]);

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions))
    }, [])

    async function createTransaction(transactionInput:TransactionInput) {
        const response = await api.post('transactions', {
            ...transactionInput,
            createdAt: new Date(),
        });
        const { transaction } = response.data;

        setTransactions([
            ...transactions,
            transaction
        ])
    }

    return(
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions(){
    return useContext(TransactionsContext);
}