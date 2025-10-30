import { useState } from "react";
import { Button } from "./common-components/button";
import { TextField } from "./common-components/text-field";
import { ModalDialog } from "./common-components/dialog";
import DeleteIcon from "./common-components/Icons/IconDelete";

const parseContent = (text) => {
  return text
    .split("\n")
    .map((line) => <p className="text-red-500 text-preset-6">{line}</p>);
};

function App() {
  const [value, setValue] = useState(
    `this
     is 
    new note`
  );
  console.log(value);

  return (
    <>
      <div
        contentEditable={true}
        onInput={(e) => {
          console.log(e.target.innerText);
          setValue(e.target.innerText);
        }}
      >
        {parseContent(`this
      is 
      new note`)}
      </div>
      <Button>Save</Button>
      <TextField label="label" helperText="this is a test input" />
      <ModalDialog
        open={false}
        title="test"
        icon={<DeleteIcon />}
        actions={[
          {
            variant: "secondary",
            onClick: () => {
              console.log("cancel click");
            },
            text: "Cancel",
          },
          {
            variant: "danger",
            text: "Archieve Note",
            onClick: () => {
              console.log("archive button is clicked");
            },
          },
        ]}
      >
        Are you sure you want to archive this note? You can find it in the
        Archived Notes section and restore it anytime.
      </ModalDialog>
    </>
  );
}

export default App;
