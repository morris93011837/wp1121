import * as React from 'react';
import Dialog from '@mui/material/Dialog';
/*import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';*/
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import type { TransitionProps } from '@mui/material/transitions';

import albumCover from "@img/album_cover.jpg"
import CardList from "@/components/CardList";
import useCards from "@/hooks/useCards";
import type { CardProps } from "./Card";

type FullListDialogProps = {
    open: boolean;
    onClose: () => void;
    listId: string;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, onClose, listId }: FullListDialogProps) {
  const { lists } = useCards();
  let selectedList={
    id:"",
    name:"",
    descript:"",
    cards: [] as CardProps[],  
  };
  for(const list of lists){
    if(list.id===listId){
      selectedList = list;
      break;
    }
  }

  return (
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h5" component="div">
              WP Music
            </Typography>
          </Toolbar>
        </AppBar>
        <div  className="flex p-6">
          <img src={albumCover} alt='an album cover' width={'240px'} height={'240px'}/>
          <div className="flex-col p-6">
            <CardList key={selectedList.id} {...selectedList} />
          </div>
        </div>
      </Dialog>
  );
}
