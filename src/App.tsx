import {useState} from "react";
import Modal from "react-modal";
import {Dashboard} from "./components/Dashboard";
import {Header} from "./components/Header";
import {NewTransactionModal} from "./components/NewTransactionModal";
import {TransactionsProvider} from "./hooks/useTransactions";

import {Globalstyle} from "./style/global";

Modal.setAppElement('#root');

export default function App() {
    const [isNewTrasactionModalOpen, setIsNewTrasactionModalOpen] = useState(false);

    function handleOpenNewTransactionModal() {
        setIsNewTrasactionModalOpen(true);
    }

    function handleCloseNewTransactionModal() {
        setIsNewTrasactionModalOpen(false);
    }

    return (
        <TransactionsProvider>
            <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
            <Dashboard/>
            <NewTransactionModal isOpen={isNewTrasactionModalOpen} onRequestClose={handleCloseNewTransactionModal}/>

            <Globalstyle/>
        </TransactionsProvider>
    );
}
