docker compose up -d
docker exec -i mysql_db mysql -u root -p rootpassword eshop_db < ./drop_tables.sql
docker exec -i mysql_db mysql -u root -p rootpassword eshop_db < ./shop.sql
