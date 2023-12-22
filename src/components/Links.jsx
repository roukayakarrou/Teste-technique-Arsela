import { useState } from "react";
import { actions, useLinksContext } from "../context/LinksContext";

const Links = () => {
  const [editLinkId, seteditLinkId] = useState(null);
  const [editLinkText, seteditLinkText] = useState("null");
  const { state, dispatch, text, setText } = useLinksContext();

  function handleAdd() {
    dispatch({
      type: actions.ADD,
      payload: text,
    });
    setText("");
  }

  function handleEdit(item) {
    seteditLinkText(item.link);
    seteditLinkId(item.id);
  }

  function handleSave() {
    dispatch({
      type: actions.EDIT,
      payload: {
        id: editLinkId,
        updatedText: editLinkText,
      },
    });
    seteditLinkId(null);
    seteditLinkText("");
  }

  return (
    <>
      <h1>
        Customize your links
      </h1>
      <p>Add/edit/remove links below and then share all your profiles with the world!</p>
      <button onClick={handleAdd} className="add-link">+ Add new link</button>
      <div className="links">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <select name="type" id="type">
          <option value="Instagram">Instagram</option>
          <option value="Facebook">Facebook</option>
          <option value="Youtube">Youtube</option>
        </select>
      </div>
        <div>
          {state.Tasks.length > 1 && (
              <button
                onClick={() => dispatch({ type: actions.DELETEALL })}
              >
                Delete
              </button>
          )}
        </div>
      <ul>
        {state.Tasks.map((item, index) => {
          return (
            <li key={index}>
              {editLinkId === item.id ? (
                <input
                  type="text"
                  value={editLinkText}
                  onChange={(e) => seteditLinkText(e.target.value)}
                />
              ) : (
                <span>
                  {index + 1}. {item.link}
                </span>
              )}

              <div>
                {editLinkId === item.id ? (
                  <button onClick={handleSave}>
                    SAVE
                  </button>
                ) : (
                  <button onClick={() => handleEdit(item)}>
                    EDIT
                  </button>
                )}

                <button
                  onClick={() =>
                    dispatch({
                      type: actions.DELETE,
                      payload: item.id,
                    })
                  }
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Links;
