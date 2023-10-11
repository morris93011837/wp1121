import { useEffect, useState } from "react";

import { Button } from "@mui/material";

import CardList from "@/components/CardList";
import HeaderBar from "@/components/HeaderBar";
import NewListDialog from "@/components/NewListDialog";
import useCards from "@/hooks/useCards";
import Typography from "@mui/material/Typography";
import View from "@/components/View.tsx";

function App() {
  const { lists, fetchLists, fetchCards, counts } = useCards();
  const [newListDialogOpen, setNewListDialogOpen] = useState(false);

  useEffect(() => {
    fetchLists();
    fetchCards();
  }, [fetchCards, fetchLists]);

  return (
    <>
      <HeaderBar />
      <main>
        <div className="mx-auto flex max-h-full flex-row gap-6 px-6 py-6">
          <Typography variant="h5">My Playlists</Typography>
          <Button
            variant="contained"
            className="w-20"
            onClick={() => setNewListDialogOpen(true)}
          >
            ADD
          </Button>
          <Button
            variant="contained"
            className="w-30"
          >
            DELETE
          </Button>
        </div>
        <div className="mx-auto flex max-h-full flex-row gap-6 px-24 py-12">
          {/*lists.map((list) => (
            <CardList key={list.id} {...list} />
          ))*/}
          {lists.map((list) => (
            <View key={list.id} {...list} count={counts[list.id]}/>
          ))}
        </div>
        <NewListDialog
          open={newListDialogOpen}
          onClose={() => setNewListDialogOpen(false)}
        />
      </main>
    </>
  );
}

export default App;
