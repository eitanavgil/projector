import React, {useState, useEffect} from "react";
import "./App.css";
import Projector from "../src/components/Projector";
import Api from "./utils/Api";
import {AdminUserLoginAction, AdminUserLoginActionArgs} from "kaltura-typescript-client/api/types/AdminUserLoginAction";

const App: React.FC = () => {

    const [ks, setKs] = useState("");
    const [fullscreen, setFullscreen] = useState(false);
    let api: Api = new Api();
    let userInput: any;
    let pwdInput: any;
    let headerRef: any;

    const dev = true;

    const handleFullscreen = (type: number) => {
        let elem = headerRef;
        if (!elem) {
            return
        }
        if (!document.fullscreenElement) {
            elem.requestFullscreen().catch((err: any) => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
        setFullscreen(true);
    };
    const handleSubmit = () => {
        // return;
        const user = userInput.value;
        const pwd = pwdInput.value;
        if (!user || !pwd) {
            alert("Please make sure to fill both user and password");
        }
        const adminUserArgs: AdminUserLoginActionArgs = {email: user, password: pwd, partnerId: 2612182};
        const adminUserAction: AdminUserLoginAction = new AdminUserLoginAction(adminUserArgs);

        api!.client.request(adminUserAction)
            .then(response => {
                if (response) {


                    setTimeout(() => setKs(response), 0);
                }
            }, err => {
                console.error(err);
            })

    };

    // run once (componentDidMount)
    useEffect(() => {
        handleSubmit();
    }, []);

    return (
        <div className="App">
            <header className="App-header" ref={(projector: any) => {
                headerRef = projector;
            }}>
                {
                    !ks &&
                    <div className="login-form">
                        <input type="text" placeholder="email" defaultValue={""} className="input"
                               id="user" ref={(input) => {
                            userInput = input;
                        }}
                        />
                        <input type="text" placeholder="password" defaultValue={""} className="input"
                               id="password" ref={(input) => {
                            pwdInput = input;
                        }}
                        />
                        <button className="submit" onClick={handleSubmit}>Submit</button>
                    </div>
                }
                {
                    ks &&
                    <Projector ks={ks}></Projector>
                }
                {
                    !fullscreen &&
                    <button className="fullscreen" onClick={() => handleFullscreen(1)}>Fullscreen</button>
                }
            </header>
        </div>
    );
};

export default App;
