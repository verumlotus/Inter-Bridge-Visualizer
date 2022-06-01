import * as React from 'react';
import Box from '@mui/material/Box';
import styles from '../styles/Home.module.css'
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
