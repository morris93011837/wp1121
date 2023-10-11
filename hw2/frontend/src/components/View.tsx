import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import albumCover from "@img/album_cover.jpg"

export type viewProps = {
  id: string;
  name: string;
  count: number;
};

export default function View({ id, name, count }: viewProps) {

  return (
    <>
      <Paper className="flex flex-col gap-4 w-70 p-6">
        <img src={albumCover} alt='an album cover' width={'240px'}/>
        <Typography className="text-start" variant="h6">
          {count} songs
        </Typography>
        <Typography className="text-start" variant="h6">
          {name}
        </Typography>       
      </Paper>
    </>
  );
}
