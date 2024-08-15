import { Box } from '@mui/material';
import { FaXTwitter, FaTiktok } from 'react-icons/fa6';
import { PiInstagramLogoFill } from 'react-icons/pi';

import classes from './style.module.scss';

const Footer = () => (
  <Box className={classes.container} sx={{ textAlign: 'center', bgcolor: '#2196F3', textColor: 'white' }}>
    <div className={classes.copyright}>
      <div>All rights Reserved</div>
      <div style={{ fontWeight: 'semi-bold', fontSize: '1.5rem', marginTop: '0.1rem' }}>&copy;</div>
      <Box sx={{ fontWeight: 'semi-bold' }}>Old Kebayoran Dev, 2024</Box>
    </div>
    <div className={classes.icon}>
      <FaXTwitter />
      <PiInstagramLogoFill />
      <FaTiktok />
    </div>
  </Box>
);

export default Footer;
