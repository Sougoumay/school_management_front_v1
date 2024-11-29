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
        connectionString: 'InstrumentationKey=ebab4efd-6aca-46a2-b692-57dc408ccca3;IngestionEndpoint=https://francecentral-1.in.applicationinsights.azure.com/;LiveEndpoint=https://francecentral.livediagnostics.monitor.azure.com/;ApplicationId=a2ce0ebc-7426-4efb-b3e0-2d19111fc6d1',
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
