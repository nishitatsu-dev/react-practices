import { useLoginState } from "./LoginProvider";

export default function MemoList({ activeId, setActiveId, memos, setMemos }) {
  const allMemos = memos.map((memo) => (
    <li key={memo.id}>
      <span
        className={memo.id === activeId ? "li-active" : "li-others"}
        onClick={() => setActiveId(memo.id)}
      >
        {memo.title}
      </span>
    </li>
  ));

  function handleAddMemo() {
    const ids = memos.map((memo) => memo.id);
    const nextId = ids.length === 0 ? 1 : Math.max(...ids) + 1;
    setMemos([...memos, { id: nextId, title: "新規メモ", body: "" }]);
    setActiveId(nextId);
  }

  return (
    <div className={"memo-list"}>
      <ul>
        {allMemos}
        {useLoginState() && (
          <li>
            <span className={"li-add"} onClick={handleAddMemo}>
              ＋
            </span>
          </li>
        )}
      </ul>
    </div>
  );
}
