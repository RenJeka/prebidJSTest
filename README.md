# prebidJSTest
simple add that explained how prebidJS adapter works

##### Official documentation:

[How to Add a New Prebid.js Bidder Adapter](https://docs.prebid.org/dev-docs/bidder-adaptor.html#bidder-adaptor-Required-Adapter-Conventions)



Adapter interface
https://docs.prebid.org/dev-docs/bidder-adaptor.html#creating-the-adapter


valid validBidRequests Array

https://docs.prebid.org/dev-docs/bidder-adaptor.html#ad-unit-params-in-the-validbidrequests-array



Interpreting the Response
https://docs.prebid.org/dev-docs/bidder-adaptor.html#bidder-adaptor-Interpreting-the-Response

to show debug messages from prebid:
add `&pbjs_debug=true` (or `?pbjs_debug=true`)  to URL in browser

for example: 
`http://localhost:63342/prebidJSTest/index.html?_ijt=c9t47surk553rmdk2a1jkhoghs&pbjs_debug=true`

INSTALLING AND RUN 

###### 1. Install:
```
npm install
``` 

###### 2. Copy adapter files:
Navigate to the ***Adapters*** directory and copy the
***advertiseXPrebidAdapter.js*** and ***advertiseXPrebidAdapter.md*** 
files to the ***/node_modules/prebid.js/modules*** directory.

```
cd node_modules/prebid.js
```

###### 3. Install dependencies for Prebit.js:
```
npm install
```

###### 4 Build Prebid.js with your adapter:
```
gulp build --modules=advertiseXPrebidAdapter
```

###### 5. Start mock server:
navigate to root of the project:
```
cd ../..
```

```
npm run start-mock-server
```

###### 6. Run project:
Open different terminal and run:
```
npm run start
```
