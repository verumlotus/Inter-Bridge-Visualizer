import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import styles from '../styles/Home.module.css'
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import Image from "next/image"
import { Tabs, Tab } from "@mui/material"
import ChartOptions from './ChartOptions'

export default function NavBar() {
  return (
    <Box sx={{ flexDirection: "row", justifyContent: "center", alignContent: "center", display: "flex", minWidth: "100vw", backgroundColor: "#faf0e6"}}>
          {/* <IconButton
            size="large"
            edge="start"
            color="default"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          {/* <Image src="/images/bridge.png" width={"100px"} height={"100px"}>
          </Image> */}
          <h5 className={styles.title} >
            Inter-Bridge Explorer
          </h5>
          <ChartOptions></ChartOptions>
            {/* <Image src="/images/bridge.png" width={"100px"} height={"100px"}>
            </Image> */}


    </Box>
  );
}
