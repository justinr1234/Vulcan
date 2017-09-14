Package.describe({
  name: 'example-sql',
});

Npm.depends({
  "knex": "0.13.0",
  "sqlite3": "3.1.9",
  "alasql": "0.4.2",
  "sql.js": "0.4.0",
});

Package.onUse(function (api) {

  api.use([

    // vulcan core
    'vulcan:core',

    // vulcan packages
    'vulcan:forms',
    'vulcan:accounts',
    
  ]);

  api.addFiles('lib/stylesheets/style.css');
  
  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');

});
