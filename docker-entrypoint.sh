echo "wait db server"
chmod +x ./wait-for-it.sh
./wait-for-it.sh  $DBaddress:$DBport

echo "start node server"
npm run preview
