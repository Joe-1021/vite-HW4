import { Outlet }from "react-router-dom";

function Public (){
    return(
        <>
            <div className="bg-yellow ">
                <div className="container signUpPage vhContainer">
                <div className="side">
                    <img className="logoImg" src="/logo.png" alt="logo" />
                    <img className="d-m-n" src="/img.png" alt="workImg" />
                </div>
                <div>
                    <Outlet />
                </div>
                </div>
            </div>
        </>
    )
}

export default Public

