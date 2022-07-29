import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

const Home = () => {

    const { store, actions } = useContext(Context);
    const history = useHistory();

    useEffect(() => {

    }, [])

    useEffect(() => {
        if(store.currentUser === null) history.push('/login');
    }, [store.currentUser])


    return (
        <h1>Home</h1>
    )
}

export default Home;