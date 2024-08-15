import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import SchoolIcon from '@mui/icons-material/School';
import { useState } from 'react';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Outlet, useNavigate, NavLink, Link } from 'react-router-dom';
import MainNavbar from '@components/MainNavbar';
import PropTypes from 'prop-types';
import classes from './style.module.scss';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const AdminLayout = ({ children }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();

  return (
    <div>
      <MainNavbar />
      <div className={classes.container}>
        <Box sx={{ flexGrow: 1, marginTop: '2rem' }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Item>
                <List
                  sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  // subheader={
                  //   <ListSubheader component="div" id="nested-list-subheader">
                  //     Nested List Items
                  //   </ListSubheader>
                  // }
                >
                  <Link to="/dashboard/profile" style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.6)' }}>
                    <ListItemButton>
                      <ListItemIcon>
                        <AccountBoxIcon />
                      </ListItemIcon>
                      <ListItemText primary="Profile" />
                    </ListItemButton>
                  </Link>
                  <Link to="/dashboard/instructor" style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.6)' }}>
                    <ListItemButton>
                      <ListItemIcon>
                        <SchoolIcon />
                      </ListItemIcon>
                      <ListItemText primary="Instructor" />
                    </ListItemButton>
                  </Link>
                  <Link to="/dashboard/student" style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 0.6)' }}>
                    <ListItemButton>
                      <ListItemIcon>
                        <VideoLibraryIcon />
                      </ListItemIcon>
                      <ListItemText primary="Student" />
                    </ListItemButton>
                  </Link>
                  {/* <ListItemButton onClick={handleClick}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inbox" />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton> */}
                  {/* <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Starred" />
                    </ListItemButton>
                  </List>
                </Collapse> */}
                </List>
              </Item>
            </Grid>
            <Grid item xs={8}>
              <Item> {children}</Item>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AdminLayout;
