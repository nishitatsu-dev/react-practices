import { useLogin } from "./LoginProvider";

export default function MemoEditor({ activeId, setActiveId, memos, setMemos }) {
  const login = useLogin();
  const activeMemo = memos.find((memo) => memo.id === activeId);

  function handleDelete() {
    const newMemos = memos.filter((memo) => memo.id !== activeId);
    setMemos(newMemos);
    setActiveId(null);
  }

  function handleEditMemo(e) {
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const newBody = formJson.newMemo;

    if (newBody === "") {
      handleDelete();
    } else {
      const newTitle =
        newBody.split("\n")[0] === ""
          ? "（タイトル無し）"
          : newBody.split("\n")[0];
      setMemos(
        memos.map((memo) => {
          if (memo.id === activeId) {
            return { id: activeId, title: newTitle, body: newBody };
          } else {
            return memo;
          }
        }),
      );
      setActiveId(null);
    }
  }

  return (
    <div className={"memo-editor"}>
      <form onSubmit={handleEditMemo}>
        <textarea name="newMemo" defaultValue={activeMemo.body} />
        {login && (
          <div>
            <button type="submit">編集</button>
            <button type="button" onClick={handleDelete}>
              削除
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
