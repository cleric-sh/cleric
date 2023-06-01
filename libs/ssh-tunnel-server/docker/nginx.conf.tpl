stream {

    map $ssl_preread_server_name $port {
$MAP
    }
    
$UPSTREAM        

    server {
        listen     80;
        listen     443;
        proxy_pass $port;
        ssl_preread on;
    }
}
events {}