import { styled } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import speaker1 from '../media/speaker1.gif';
import speakerCircle from '../media/speakercircle.gif';
import speakerAnim from '../media/speakeranim.gif';
import rain from '../media/Planet-Q-Radio.gif';

const RainBox = styled(Box)(({ theme }) => ({
    backgroundImage: `url(${rain})`,
    width: '100%',
    height: 'calc((100vh - 100px) *1.15)',
    backgroundSize: 'cover',
    objectFit: 'scale-down',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
}));

const Mics = () => {
   return (
      <>
     
         <RainBox>
            {/* <img src={rain} alt='' /> */}
         </RainBox>
      </>
   );
};

export default Mics;
