import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

const Login = () => {

    const { store, actions } = useContext(Context);
    const history = useHistory();

    useEffect(() => {

    }, [])

    useEffect(() => {
        if(store.currentUser !== null) history.push('/');
    }, [store])

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-center">
                    <form className="m-5" style={{ width: '450px' }} onSubmit={(e) =>  actions.handleLogin(e, history)}>
                        <div className="row mb-3">
                            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                                Email:
                            </label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" id="email" name="email" value={store.email} onChange={actions.handleChange} />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                                Password:
                            </label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="password" name="password" value={store.password} onChange={actions.handleChange}/>
                            </div>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary gap-2">
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;