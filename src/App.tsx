import {Globalstyle} from "./style/global";
import {Header} from "./components/Header";
import {Dashboard} from "./components/Dashboard";
import Modal from "react-modal";
import {useState} from "react";
import {NewTransactionModal} from "./components/NewTransactionModal";

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
        <>
            <Header onOpenNewTransactionModal={handleOpenNewTransactionModal}/>
            <Dashboard/>
            <NewTransactionModal isOpen={isNewTrasactionModalOpen} onRequestClose={handleCloseNewTransactionModal}/>

            <Globalstyle/>
        </>
    );
}
