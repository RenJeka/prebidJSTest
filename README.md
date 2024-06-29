# prebidJSTest
simple add that explained how prebidJS adapter works

## INSTALLING AND RUN 

###### 1. Install:

```
npm install
``` 

###### 2. Copy adapter files:
Copy adapters files to the `/node_modules/prebid.js/modules` directory.

```
cp advertiseXPrebidAdapter/advertiseXPrebidAdapter.js advertiseXPrebidAdapter/advertiseXPrebidAdapter.md node_modules/prebid.js/modules
```

###### 3. Install dependencies for Prebit.js:

```
cd node_modules/prebid.js
```

```
npm install
```

###### 4 Build Prebid.js with your adapter:
```
npx gulp build --modules=advertiseXPrebidAdapter
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
>TIP: if You use AdBlock — you should turn it off.

###### 7. Open WebPage:
Open one of link below `Available on:` in terminal

**Tip**: try to open link that starts from: 
```
    http://172...
    http://192...
    http://127...
```
---

## Test:

```
npm run test
```


##### Official documentation and useful links:

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
```
http://localhost:63342/prebidJSTest/index.html?_ijt=c9t47surk553rmdk2a1jkhoghs&pbjs_debug=true
```

