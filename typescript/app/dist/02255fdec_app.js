FuseBox.pkg("default", {}, function(___scope___){
___scope___.file("app/src/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("~/common/src/index.js");
console.log(common_1.TestHello);
//# sourceMappingURL=index.js.map
});
___scope___.file("common/src/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestHello = "Hello World";
//# sourceMappingURL=index.js.map
});
	___scope___.entry = "app/src/index.js";
})
FuseBox.import("fuse-box-hot-reload").connect({"useCurrentURL":true})
//# sourceMappingURL=02255fdec_app.js.map