#!/bin/bash
set -e

export TZ=Asia/Shanghai
ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

#copy flume lib-dir and bin-file
\cp -R /usr/local/apache-flume-1.7.0-bin/bin/flume-ng /usr/bin/flume-ng
\cp -R /usr/local/apache-flume-1.7.0-bin/lib /usr/lib/flume
cat /root/hosts >> /etc/hosts

#开发测试环境先屏蔽

#service flume start

crontab /usr/local/tomcat/tomcat_cron
crontab -l
service crond start

#cd /usr/local
cd /usr/local/tomcat/bin
./startup.sh

#需要修改成自己的服务名
#java -jar zte-crm-epmsscopemanagement-deliveryconfig.jar --spring.profiles.active=test

echo "start sleep........."
while [ 1 ]
do
        sleep 300
done