import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import PlayGround from './Components/Playground/index';

const render = (Component: any) => {
    ReactDOM.render(
        <AppContainer>
            <Component title = "drag n drop fields" />
        </AppContainer>,
        document.getElementById('root')
    );
  }
  
render(PlayGround);

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./Components/Playground/index', () => {
        render(PlayGround)
    })
}


