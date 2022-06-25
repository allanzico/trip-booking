import React, { useState } from "react";

function AddSectionForm(props) {
  const [text, setText] = useState("");

  const handleChange = e => {
    setText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.addNewSection(text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="text"
        placeholder="Create Homepage"
        value={text}
      />

      <input className="add-section-button" type="submit" value="Add Section" />
    </form>
  );
}

export default AddSectionForm;
