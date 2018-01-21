Package.describe({
  name: "vulcan:ui-bootstrap3",
  summary: "Boostrap3 via react-bootstrap npm package",
  version: '1.8.4',
  git: "https://github.com/VulcanJS/Vulcan.git"
});

Package.onUse(function(api) {

  api.versionsFrom("METEOR@1.6");

  api.use([
    'ecmascript',
    'vulcan:core@1.8.4',
  ]);

  api.mainModule("lib/client/main.js", ["client"]);
  api.mainModule("lib/server/main.js", ["server"]);

});

Package.onTest(function(api) {
  api.use([
    'ecmascript',
    'tinytest',
    'vulcan:ui-bootstrap3'
  ]);

});
