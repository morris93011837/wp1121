import { useRef, useState } from "react";

import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Divider from "@mui/material/Divider";
import Input from "@mui/material/Input";

import Typography from "@mui/material/Typography";

import useCards from "@/hooks/useCards";
import { updateList } from "@/utils/client";

import Card from "./Card";
import type { CardProps } from "./Card";
import CardDialog from "./CardDialog";

export type CardListProps = {
  id: string;
  name: string;
  descript: string;
  cards: CardProps[];
};

export default function CardList({ id, name, descript, cards }: CardListProps) {
  const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [editingDescript, setEditingDescript] = useState(false);
  const { fetchLists } = useCards();
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);

  const handleUpdateName = async () => {
    if (!inputRef.current) return;

    const newName = inputRef.current.value;
    if (newName !== name) {
      try {
        await updateList(id, { name: newName, descript: descript });
        fetchLists();
      } catch (error) {
        alert("Error: Failed to update list name");
      }
    }
    setEditingName(false);
  };

  const handleUpdateDescript = async () => {
    if (!inputRef2.current) return;

    const newDescript = inputRef2.current.value;
    if (newDescript !== descript) {
      try {
        await updateList(id, { name: name, descript: newDescript });
        fetchLists();
      } catch (error) {
        alert("Error: Failed to update list name");
      }
    }
    setEditingDescript(false);
  };

  return (
    <>
        <div className="flex-col gap-4">
          {editingName ? (
            <ClickAwayListener onClickAway={handleUpdateName}>
              <Input
                autoFocus
                defaultValue={name}
                className="grow"
                placeholder="Enter a name for this playlist"
                sx={{ fontSize: "2rem" }}
                inputRef={inputRef}
              />
            </ClickAwayListener>
          ) : (
            <button
              onClick={() => setEditingName(true)}
              className="w-full rounded-md p-2 hover:bg-white/10"
            >
              <Typography className="text-start" variant="h4">
                {name}
              </Typography>
            </button>
          )}

          {editingDescript ? (
            <ClickAwayListener onClickAway={handleUpdateDescript}>
              <Input
                autoFocus
                defaultValue={descript}
                className="grow"
                placeholder="Enter description for this playlist"
                sx={{ fontSize: "1rem" }}
                inputRef={inputRef2}
              />
            </ClickAwayListener>
          ) : (
            <button
              onClick={() => setEditingDescript(true)}
              className="w-full rounded-md p-2 hover:bg-white/10"
            >
              <Typography className="text-start" variant="h6">
                {descript}
              </Typography>
            </button>
          )}
          <div className="mx-auto flex max-h-full flex-row gap-6 px-6 py-6">
            <Button
              variant="contained"
              className="w-20"
              onClick={() => setOpenNewCardDialog(true)}
            >
              Add
            </Button>
            <Button variant="contained"
              className="w-30"
            >
              Delete
            </Button>
          </div>
        </div>

        <Divider variant="middle" sx={{ mt: 1, mb: 2 }} />
        <div className="flex flex-col gap-4 grid">
          {cards.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
      
      <CardDialog
        variant="new"
        open={openNewCardDialog}
        onClose={() => setOpenNewCardDialog(false)}
        listId={id}
      />
    </>
  );
}
