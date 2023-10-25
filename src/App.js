import "./App.css";
import { useState, useEffect } from "react";
import MemoEditor from "./MemoEditor";

export default function App() {
  const [memos, setMemos] = useState(() => initialMemos());
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    localStorage.setItem("memoApp", JSON.stringify(memos));
  }, [memos]);

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

  function initialMemos() {
    const memosString = localStorage.getItem("memoApp");
    return memosString ? JSON.parse(memosString) : [];
  }

  function handleAddMemo() {
    const ids = memos.map((memo) => memo.id);
    const nextId = ids.length === 0 ? 1 : Math.max(...ids) + 1;
    setMemos([...memos, { id: nextId, title: "新規メモ", body: "" }]);
    setActiveId(nextId);
  }

  return (
    <>
      <div className={"memo-list"}>
        <ul>
          {allMemos}
          <li>
            <span className={"li-add"} onClick={handleAddMemo}>
              ＋
            </span>
          </li>
        </ul>
      </div>
      {activeId && (
        <MemoEditor
          key={activeId}
          activeId={activeId}
          setActiveId={setActiveId}
          memos={memos}
          setMemos={setMemos}
        />
      )}
    </>
  );
}
