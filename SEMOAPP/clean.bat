del node_modules
npm cache clean --force
npm install
watchman watch-del-all
del %appdata%\Temp\haste-map-*
del %appdata%\Temp\metro-cache
expo start --clear