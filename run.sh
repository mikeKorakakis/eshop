docker compose up -d
docker exec -i mysql_db mysql -u root -prootpassword eshop_db < ./DataBase/shop.sql
