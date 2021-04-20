import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import States from '../pages/States';
import Climate from '../pages/Climate';
import HoursSeasons from '../pages/HoursSeasons';
import Covid from '../pages/Covid';
import Severity from '../pages/Severity';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="US States" href="/States" {...a11yProps(0)} />
          <LinkTab label="Climate" href="/Climate" {...a11yProps(1)} />
          <LinkTab label="Hours/Seasons" href="/Hours-Seasons" {...a11yProps(2)} />
          <LinkTab label="COVID-19" href="/Covid" {...a11yProps(3)} />
          <LinkTab label="Weather" href="/Severity" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <States></States>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Climate></Climate>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <HoursSeasons></HoursSeasons>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Covid></Covid>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Severity></Severity>
      </TabPanel>
    </div>
  );
}