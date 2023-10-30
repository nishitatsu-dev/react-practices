import "./App.css";
import { useState, useEffect } from "react";
import { LoginProvider } from "./LoginProvider.js";
import MemoList from "./MemoList";
import MemoEditor from "./MemoEditor";

export default function App() {
  const [memos, setMemos] = useState(() => initialMemos());
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    localStorage.setItem("memoApp", JSON.stringify(memos));
  }, [memos]);

  function initialMemos() {
    const memosString = localStorage.getItem("memoApp");
    return memosString ? JSON.parse(memosString) : [];
  }

  return (
    <>
      <LoginProvider>
        <MemoList
          activeId={activeId}
          setActiveId={setActiveId}
          memos={memos}
          setMemos={setMemos}
        />
        {activeId && (
          <MemoEditor
            key={activeId}
            activeId={activeId}
            setActiveId={setActiveId}
            memos={memos}
            setMemos={setMemos}
          />
        )}
      </LoginProvider>
    </>
  );
}
