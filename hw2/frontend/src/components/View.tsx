import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";

import albumCover from "@img/album_cover.jpg"
import useCards from "@/hooks/useCards";
import { deleteList } from "@/utils/client";

export type viewProps = {
  id: string;
  name: string;
  count: number;
  callback: ()=>any;
  deleteMode: boolean;
};

export default function View({ id, name, count, callback, deleteMode }: viewProps) {
  var word:string = "songs"
  if(count<2)  word="song"

  const { fetchLists } = useCards()
  const handleDelete = async () => {
    try {
      await deleteList(id);
      fetchLists();
    } catch (error) {
      alert("Error: Failed to delete list");
    }
  };

  return (
    <>
      <Paper className="flex flex-col gap-4 w-70 p-6">
        <div className="flex grid justify-end space-x-1" style={{ visibility: deleteMode ? "visible" : "hidden" }}>
          <IconButton color="error" onClick={handleDelete}>
            <CloseIcon />
          </IconButton>
        </div>
        <img src={albumCover} alt='an album cover' width={'240px'} onClick={callback}/>
        <Typography className="text-start" variant="h6">
          {count} {word}
        </Typography>
        <Typography className="text-start" variant="h6">
          {name}
        </Typography>       
      </Paper>
    </>
  );
}
