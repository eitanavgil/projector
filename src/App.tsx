import React, {useState, useEffect} from "react";
import "./App.css";
import Projector from "../src/components/Projector";
import Api from "./utils/Api";
import {AdminUserLoginAction, AdminUserLoginActionArgs} from "kaltura-typescript-client/api/types/AdminUserLoginAction";
import {InputType} from "zlib";

const App: React.FC = () => {

        const [ks, setKs] = useState("");
        let api: Api = new Api();
        let userInput: any;
        let pwdInput: any;

        const handleSubmit = () => {
            const user = userInput.value;
            const pwd = pwdInput.value;
            if (!user || !pwd) {
                return;
                // alert("Please make sure to fill both user and password");
            }
            const adminUserArgs: AdminUserLoginActionArgs = {email: user, password: pwd, partnerId: 2612182};
            const adminUserAction: AdminUserLoginAction = new AdminUserLoginAction(adminUserArgs);
            api!.client.request(adminUserAction)
                .then(response => {
                    if (response) {
                        api.setKs(response);
                        setTimeout(() => setKs(response), 1000);
                    }
                }, err => {
                    console.error(err);
                })

        };

        return (
            <div className="App">
                <header className="App-header">
                    {
                        !ks &&
                        <div className="login-form">
                            <input type="text" placeholder="email" className="input" id="user" ref={(input) => {
                                userInput = input;
                            }} value={""} onChange={() => {
                            }}/>
                            <input type="text" placeholder="password" className="input" id="password" ref={(input) => {
                                pwdInput = input;
                            }} value={""} onChange={() => {
                            }}/>
                            <button className="submit" onClick={handleSubmit}>Submit</button>
                        </div>
                    }
                    {
                        ks &&
                        <Projector ks={ks}></Projector>
                    }
                </header>
            </div>
        );
    }
;

export default App;
