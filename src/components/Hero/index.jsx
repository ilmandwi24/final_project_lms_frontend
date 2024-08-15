import { Button } from '@mui/material';
import hero from '@static/images/hero.png';
import classes from './style.module.scss';

const Hero = () => (
  <div className={classes.container}>
    <div className={classes.description}>
      <h2>Best Online Course</h2>
      <p>Best place online course in kebayoran. Connect student with lecturer</p>
      <Button variant="contained">Explore</Button>
    </div>
    <div className={classes.illustration}>
      <img src={hero} alt="" width={520} />
    </div>
  </div>
);

export default Hero;
