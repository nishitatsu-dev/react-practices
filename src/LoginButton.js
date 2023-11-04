import { useLogin } from "./LoginProvider";

export default function LoginButton() {
  const { login, setLogin } = useLogin();

  return (
    <div className={"login-button"}>
      <button
        onClick={() => {
          setLogin(!login);
        }}
      >
        {login ? "ログアウト" : "ログイン"}
      </button>
    </div>
  );
}
