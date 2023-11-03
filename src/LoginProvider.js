import { createContext, useContext, useState } from "react";

const LoginContext = createContext(false);

export function LoginProvider({ children }) {
  const [login, setLogin] = useState(false);
  return (
    <>
      <LoginContext.Provider value={login}>
        <div className={"login-button"}>
          <button
            onClick={() => {
              setLogin(!login);
            }}
          >
            {login ? "ログアウト" : "ログイン"}
          </button>
        </div>
        <div> {children} </div>
      </LoginContext.Provider>
    </>
  );
}

export function useLogin() {
  return useContext(LoginContext);
}
