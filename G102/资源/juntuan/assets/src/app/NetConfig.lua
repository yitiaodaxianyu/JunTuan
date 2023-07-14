NET_FLAG_IS_LOCAL = false                 -- 是否连本地

-------------socket-------------
if NET_FLAG_IS_LOCAL then
    --NET_SERVER_IP = "192.168.0.35"       -- 本地
    --NET_SERVER_IP = "192.168.0.222"       -- 本地
    --NET_SERVER_IP = "172.16.0.150"       -- 本地
    NET_SERVER_IP = "172.16.0.109"       -- 本地

    NET_SERVER_PORT = 8300
    NET_GAME_SERVER_PORT = 8500
else
    --NET_SERVER_IP = "113.108.233.80"      -- 外网
    NET_SERVER_IP = "120.25.198.198"      -- 外网

    NET_SERVER_PORT = 10100
    NET_GAME_SERVER_PORT = 10110
end

--------------------------------

--------------http--------------

--------------------------------