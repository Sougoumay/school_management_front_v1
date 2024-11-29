import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { createBrowserHistory } from "history";
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import App from "./App";
import reportWebVitals from "./reportWebVitals";


const browserHistory = createBrowserHistory({ basename: '' });
var reactPlugin = new ReactPlugin();
// *** Add the Click Analytics plug-in. ***
/* var clickPluginInstance = new ClickAnalyticsPlugin();
   var clickPluginConfig = {
     autoCapture: true
}; */
var appInsights = new ApplicationInsights({
    config: {
        connectionString: 'YOUR_CONNECTION_STRING_GOES_HERE',
        enableAutoRouteTracking: true,
        // *** If you're adding the Click Analytics plug-in, delete the next line. ***
        extensions: [reactPlugin],
        // *** Add the Click Analytics plug-in. ***
        // extensions: [reactPlugin, clickPluginInstance],
        extensionConfig: {
            [reactPlugin.identifier]: { history: browserHistory }
            // *** Add the Click Analytics plug-in. ***
            // [clickPluginInstance.identifier]: clickPluginConfig
        }
    }
});
appInsights.loadAppInsights();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
