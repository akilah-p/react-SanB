import React from 'react';

class CardProfile extends React.Component {
    state = {
        index: 3,
        currentTime: '0:00',
        musicList: [{name: 'Aguacero', artist: 'Bad Bunny', img:'https://media.giphy.com/media/DD4FroTT30PeSamZbG/giphy.gif', audio:'./12-Aguacero.mp3', duration: '3:31' }, 
        {name: 'Thank You For Being a Friend', artist: 'Golden Girls', img:'https://media.giphy.com/media/l2QZO0FcZJWZ0LLCE/giphy.gif', audio:'./Golden-Girls.mp3', duration: '0:42' },
        {name: 'Yonaguni', artist: 'Bad Bunny', img:'https://media.giphy.com/media/5O6tM5hqIOcSwQdaWs/giphy.gif', audio:'./01-Yonaguni.mp3', duration: '3:26' }, 
    ]
    }
}