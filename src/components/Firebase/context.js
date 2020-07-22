import React from 'react';

const fireBaseContext = React.createContext(null);

/**
 * la on a acces a deux objets , le consumer et le provider
 * donc je peux faire fireBaseContext.Provider = value
 * Et pour avoir acces a value je fais firebaseContext.consumer
 */

 export default fireBaseContext ;