import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';

import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
import { IconContext} from 'react-icons';


const [isPlaying, setIsPlaying] = useState(false);
const [play, {pause, duration, sound}] = useSound()