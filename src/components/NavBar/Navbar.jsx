import React, { useState, useEffect } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Link from '@material-ui/core/Link';
import { Button } from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import {Link as RouterLink} from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'


const useStyles = makeStyles(() => ({
    header: {
      backgroundColor: "transparent",
      boxShadow: 'none',
      paddingRight: "79px",
      paddingLeft: "118px",
      "@media (max-width: 900px)": {
        paddingLeft: 0,
      },
    },
    onScrollHeader:{
      backgroundColor: '#7de8ff',
      boxShadow:'0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
      paddingRight: "79px",
      paddingLeft: "118px",
      "@media (max-width: 900px)": {
        paddingLeft: 0,
      },
    },
    drawerContainer: {
        padding: "20px 30px",
      },
      menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginLeft: "38px",
     },
     toolbar: {
        display: "flex",
        justifyContent: "space-between",
      },
}))


export default function Header() {
    const [state, setState] = useState({
      mobileView: false,
      drawerOpen: false
    });
  const [scrollNav, setScrollNav] = useState(false)

  
    const { mobileView, drawerOpen } = state;
    const classes = useStyles()

    const changeNav = () => {
      if(window.scrollY >= 80){
        setScrollNav(true)
      } else{
        setScrollNav(false)
      }
    }
  
    useEffect(() => {
      window.addEventListener('scroll', changeNav)
      const setResponsiveness = () => {
        return window.innerWidth < 900
          ? setState((prevState) => ({ ...prevState, mobileView: true }))
          : setState((prevState) => ({ ...prevState, mobileView: false }));
      };
  
      setResponsiveness();
      window.addEventListener("resize", () => setResponsiveness());
  
      return () => {
        window.removeEventListener("resize", () => setResponsiveness());
      }
    }, []);
    const headersData = [
        {
          label: "Home",
          href: "/listings",
        },
        {
          label: "Booking",
          href: "/mentors",
        },
        {
          label: "Sales",
          href: "/account",
        },
        {
          label: "About Us",
          href: "/logout",
        },
      ];

    const getDrawerChoices = () => {
        return headersData.map(({ label, href }) => {
          return (
            <Link
              {...{
                component: RouterLink,
                to: href,
                color: "inherit",
                style: { textDecoration: "none" },
                key: label,
              }}
            >
              <MenuItem>{label}</MenuItem>
            </Link>
          );
        });
      };

      const getMenuButtons = () => {
        return headersData.map(({ label, href }) => {
          return (
            <Button
              {...{
                key: label,
                color: "inherit",
                to: href,
                component: RouterLink,
                className: classes.menuButton

              }}
            >
              {label}
            </Button>
          );
        });
      };

      const displayDesktop = () => {
        return (
          <Toolbar className={classes.toolbar}>
            {'Ark Hostels'}
            {getMenuButtons()}
          </Toolbar>
        );
      };

    const displayMobile = () => {
            const handleDrawerOpen = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: true }));
            const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
        return (
          <Toolbar>
            <IconButton
              {...{
                edge: "start",
                color: "inherit",
                "aria-label": "menu",
                "aria-haspopup": "true",
                onClick: handleDrawerOpen,
              }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
            backgroundColor: '#7de8ff'
          }}
        >
          <div className={classes.drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>
    <div>{'Ark Hostels'}</div>
    </Toolbar>
        );
      };

    return(
        <header>
        <AppBar className={scrollNav ? classes.onScrollHeader : classes.header}>
          {mobileView ? displayMobile() : displayDesktop()}
        </AppBar>
      </header>
    )

}