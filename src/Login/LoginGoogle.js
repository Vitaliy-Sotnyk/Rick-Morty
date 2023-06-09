import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode"
import './Login.scss';

function LoginGoogle({ setLoginImg }) {
    const [user, setUser] = useState('')

    function handleCallbackResponse(response) {
        let userObject = jwt_decode(response.credential)
        setUser(userObject)
        document.getElementById("signInDiv").hidden = true;
    }
    function handleSignOut(params) {
        setUser({})
        document.getElementById("signInDiv").hidden = false;
    }

    useEffect(() => {
        if (user.picture) {
            setLoginImg(<img src={`${user.picture}`} alt={`${user.name}`} />)
        } else {
            setLoginImg(<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.7799 3.02098C11.3376 4.63187 10.8131 6.41925 9.47333 7.47333C11.765 8.38282 13.3676 10.4829 13.64 12.9333C13.679 13.2974 13.4171 13.6248 13.0533 13.6667H12.98C12.6386 13.6687 12.3509 13.4126 12.3133 13.0733C12.0102 10.3752 9.72847 8.33535 7.01333 8.33535C4.29819 8.33535 2.01642 10.3752 1.71333 13.0733C1.67283 13.4415 1.34152 13.7072 0.973328 13.6667C0.605138 13.6262 0.339494 13.2949 0.379995 12.9267C0.651073 10.4834 2.24473 8.38756 4.52666 7.47333C3.1869 6.41925 2.6624 4.63187 3.22014 3.02098C3.77787 1.41008 5.29528 0.329666 7 0.329666C8.70471 0.329666 10.2221 1.41008 10.7799 3.02098ZM4.33333 4.33333C4.33333 5.80609 5.52724 7 7 7C7.70724 7 8.38552 6.71905 8.88561 6.21895C9.38571 5.71885 9.66666 5.04057 9.66666 4.33333C9.66666 2.86057 8.47275 1.66666 7 1.66666C5.52724 1.66666 4.33333 2.86057 4.33333 4.33333Z" fill="#555555" />
            </svg>)
        }
    }, [user, setLoginImg])

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "54831513503-l6922nko3buprsitiaiuksdfi4gq0ffc.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "outline", size: "large" }
        )
    }, []);
    return (
        <div className="login-wrapper">
            <div className="login-wrapper__LoginGoogle">
                <div id="signInDiv"></div>
                {Object.keys(user).length !== 0 &&
                    <button className={`exitButton ${user ? '' : 'hidden'}`} onClick={(e) => handleSignOut(e)}>
                        <h2>{']'}</h2><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z" fill="black" />
                        </svg>
                    </button>}

            </div>
        </div>
    );
}

export default LoginGoogle;
