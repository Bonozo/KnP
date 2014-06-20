YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "Download",
        "InAppProductsModule",
        "Product",
        "Purchase"
    ],
    "modules": [
        "Readme"
    ],
    "allModules": [
        {
            "displayName": "Readme",
            "name": "Readme",
            "description": "## Introduction\n\nThis module allows the Titanium developer to provide in-app products.\n\n## Usage\n\n**Note**: This module provides functionality that **will not work** in the\nsimulator. Please run your tests on an actual device.\n\nThis module provides access to the products defined in iTunes Connect.\nYou will need to add your app to iTunes Connect and define the in-app\nproducts there.\n\nThe following code segments are not complete; they only demonstrate the\nessentials of using the module. See <code>example/app.js</code> for a complete\nexample.\n\nYou load the module as usual:\n\n\tvar InAppProducts = require('com.logicallabs.inappproducts');\n\nBasic steps to get a list of available products:\n\n\tInAppProducts.addEventListener('receivedProducts', function(e) {\n\t\te.products.forEach(...\n\t});\n\t\n\tif (InAppProducts.getProducts({ SKUs: productIDs })) {\n\t\tTi.API.info('getProducts request started successfully.');\n\t} else {\n\t\talert('Error: could not start getProducts request!');\n\t}\n\nBasic steps to purchase a product:\n\n\tInAppProducts.addEventListener('purchaseUpdate', function(e) {\n       switch (e.purchase.state) {\n\t\t\t...\n\t});\n\tproductObj.purchase();\n\n## Completing a Purchase\n\nThe purchase process of in-app products on iOS separates the steps of completing\nthe payment and completing the purchase itself. When the payment for the\nproduct is received, the related {{#crossLink \"Purchase\"}}{{/crossLink}}\nobject goes into\n{{#crossLink \"InAppProductsModule/PURCHASE\\_STATE\\_PURCHASED:attribute\"}}\n{{/crossLink}} state. This signals to the app that the purchased functionality\nshould be made available to the user in the app's environment.\n\nOnce the app completed the processing of a purchase, it must call the\n{{#crossLink \"Purchase/complete:method\"}}{{/crossLink}} method. If the app\nfails to do this, perhaps because it is terminated before it can completely\nprocess the purchase, it will receive a\n{{#crossLink \"InAppProductsModule/purchaseUpdate:event\"}}{{/crossLink}} event\nfor the uncompleted purchase the next time it starts up. The module will\ncache these events until the\n{{#crossLink \"InAppProductsModule/purchaseUpdate:event\"}}{{/crossLink}} event\nhandler becomes available and then deliver all the outstanding events at once.\nFor this reason it is important to prepare this event handler for handling such\nseemingly unsolicited events.\n\n## Issues and Limitations\n\nWeb receipt verification with the iTunes Store is not part of the module at\nthis time -- the best\npractice encouraged by Apple is to perform this verification on an independent\nserver, not on the device.\n\n## Change Log\n\n### Version 1.0.0\n\n* First release\n\n## Author\n\ntitanium@logicallabs.com\n\n## License\n\nLogical Labs Commercial License\n\n## Copyright\n\nCopyright (c) 2013 by Logical Labs, LLC"
        }
    ]
} };
});